(function () {
  const TEAM_MEMBERS_STORAGE_KEY = "ttm_team_members";
  const COMMON_PASSWORD = "Company@1234";
  const USER_ID_PREFIX = "USER-";
  const FIRST_USER_NUMBER = 2021;

  function safeParse(value, fallback) {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }

  function normalizeEmail(value) {
    return String(value || "").trim().toLowerCase();
  }

  function nameFromEmail(email) {
    const localPart = normalizeEmail(email).split("@")[0] || "Member";
    return localPart
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") || "Member";
  }

  function normalizeRole(value) {
    return String(value || "").trim().toLowerCase() === "admin" ? "Admin" : "Member";
  }

  function normalizeUserId(value) {
    const match = String(value || "").trim().toUpperCase().match(/^USER-(\d+)$/);
    return match ? `${USER_ID_PREFIX}${Number(match[1])}` : "";
  }

  function userIdNumber(value) {
    const normalized = normalizeUserId(value);
    return normalized ? Number(normalized.slice(USER_ID_PREFIX.length)) : 0;
  }

  function nextAvailableUserId(members) {
    const used = new Set((Array.isArray(members) ? members : []).map((member) => normalizeUserId(member?.userId)).filter(Boolean));
    const highest = Array.from(used).reduce(
      (maximum, userId) => Math.max(maximum, userIdNumber(userId)),
      FIRST_USER_NUMBER - 1
    );
    let nextNumber = Math.max(FIRST_USER_NUMBER, highest + 1);
    while (used.has(`${USER_ID_PREFIX}${nextNumber}`)) nextNumber += 1;
    return `${USER_ID_PREFIX}${nextNumber}`;
  }

  function migrateMembers(input) {
    const source = Array.isArray(input) ? input : [];
    const validIds = source.map((member) => normalizeUserId(member?.userId)).filter(Boolean);
    let nextNumber = Math.max(
      FIRST_USER_NUMBER,
      validIds.reduce((maximum, userId) => Math.max(maximum, userIdNumber(userId)), FIRST_USER_NUMBER - 1) + 1
    );
    const usedIds = new Set();
    const usedEmails = new Set();
    const migrated = [];

    source.forEach((member, index) => {
      const email = normalizeEmail(member?.email);
      if (email && usedEmails.has(email)) return;

      let userId = normalizeUserId(member?.userId);
      if (!userId || usedIds.has(userId)) {
        while (usedIds.has(`${USER_ID_PREFIX}${nextNumber}`)) nextNumber += 1;
        userId = `${USER_ID_PREFIX}${nextNumber}`;
        nextNumber += 1;
      }

      const name = String(member?.name || nameFromEmail(email)).trim() || "Member";
      migrated.push({
        ...member,
        id: String(member?.id || `member-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 6)}`),
        name,
        email,
        role: normalizeRole(member?.role),
        userId,
        password: COMMON_PASSWORD
      });
      usedIds.add(userId);
      if (email) usedEmails.add(email);
    });

    return migrated;
  }

  function saveMembers(members) {
    const migrated = migrateMembers(members);
    localStorage.setItem(TEAM_MEMBERS_STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  }

  function getMembers() {
    const parsed = safeParse(localStorage.getItem(TEAM_MEMBERS_STORAGE_KEY), []);
    const migrated = migrateMembers(parsed);
    if (JSON.stringify(parsed) !== JSON.stringify(migrated)) {
      localStorage.setItem(TEAM_MEMBERS_STORAGE_KEY, JSON.stringify(migrated));
    }
    return migrated;
  }

  function publicUser(member) {
    if (!member) return null;
    const { password, ...user } = member;
    return user;
  }

  function findMemberByUserId(userId, members = getMembers()) {
    const normalized = normalizeUserId(userId);
    return members.find((member) => normalizeUserId(member.userId) === normalized) || null;
  }

  function findMemberByEmail(email, members = getMembers()) {
    const normalized = normalizeEmail(email);
    return members.find((member) => normalizeEmail(member.email) === normalized) || null;
  }

  function ensureMemberForUser(user) {
    if (!user) return null;
    let members = getMembers();
    let member = findMemberByUserId(user.userId, members) || findMemberByEmail(user.email, members);

    if (member) {
      member.name = String(user.name || member.name || nameFromEmail(member.email)).trim() || "Member";
      member.email = normalizeEmail(user.email || member.email);
      member.role = normalizeRole(user.role || member.role);
      member.password = COMMON_PASSWORD;
    } else {
      member = {
        id: String(user.id || `member-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
        name: String(user.name || nameFromEmail(user.email)).trim() || "Member",
        email: normalizeEmail(user.email),
        role: normalizeRole(user.role || (members.length ? "Member" : "Admin")),
        userId: nextAvailableUserId(members),
        password: COMMON_PASSWORD
      };
      members.push(member);
    }

    members = saveMembers(members);
    return members.find((item) => item.id === member.id) || findMemberByUserId(member.userId, members);
  }

  function getBackendUrl() {
    return String(window.TASKIFY_AUTH_CONFIG?.backendUrl || "").trim();
  }

  async function requestBackend(payload) {
    const backendUrl = getBackendUrl();
    if (!backendUrl) return { configured: false, success: false };

    const controller = new AbortController();
    const timeout = window.setTimeout(
      () => controller.abort(),
      Number(window.TASKIFY_AUTH_CONFIG?.requestTimeoutMs) || 12000
    );

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      const result = await response.json();
      return { configured: true, ...result };
    } catch (error) {
      return {
        configured: true,
        success: false,
        message: error?.name === "AbortError" ? "Authentication server timed out." : "Authentication server is unavailable."
      };
    } finally {
      window.clearTimeout(timeout);
    }
  }

  async function authenticate(userId, password) {
    const normalizedUserId = normalizeUserId(userId);
    if (!normalizedUserId || password !== COMMON_PASSWORD) {
      return { success: false, message: "Invalid User ID or password." };
    }

    const localMember = findMemberByUserId(normalizedUserId);
    if (localMember && localMember.password === COMMON_PASSWORD) {
      return { success: true, user: publicUser(localMember), source: "local" };
    }

    const remote = await requestBackend({
      action: "loginByUserId",
      userId: normalizedUserId,
      password
    });
    if (remote.success && remote.user) {
      const member = ensureMemberForUser({ ...remote.user, userId: normalizedUserId });
      return { success: true, user: publicUser(member), source: "remote" };
    }

    return {
      success: false,
      message: remote.configured ? (remote.message || "Invalid User ID or password.") : "Invalid User ID or password."
    };
  }

  function createLocalMember({ name, email, role }) {
    const members = getMembers();
    const normalizedEmail = normalizeEmail(email);
    const existing = findMemberByEmail(normalizedEmail, members);
    if (existing) {
      existing.name = String(name || existing.name || nameFromEmail(normalizedEmail)).trim() || "Member";
      existing.role = normalizeRole(existing.role);
      existing.password = COMMON_PASSWORD;
      return saveMembers(members).find((member) => member.id === existing.id);
    }

    const member = {
      id: `member-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: String(name || nameFromEmail(normalizedEmail)).trim() || "Member",
      email: normalizedEmail,
      role: normalizeRole(members.length ? role : "Admin"),
      userId: nextAvailableUserId(members),
      password: COMMON_PASSWORD
    };
    members.push(member);
    return saveMembers(members).find((item) => item.id === member.id);
  }

  async function onboardMember({ name, email, role = "Member" }) {
    const normalizedEmail = normalizeEmail(email);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return { success: false, message: "Enter a valid email address." };
    }

    const backendResult = await requestBackend({
      action: "onboardMember",
      name: String(name || "").trim(),
      email: normalizedEmail,
      role: normalizeRole(role)
    });

    if (backendResult.success && backendResult.member) {
      const member = ensureMemberForUser(backendResult.member);
      return {
        success: true,
        member,
        emailSent: Boolean(backendResult.emailSent),
        backendConfigured: true
      };
    }

    const member = createLocalMember({ name, email: normalizedEmail, role });
    return {
      success: true,
      member,
      emailSent: false,
      backendConfigured: backendResult.configured,
      emailMessage: backendResult.configured
        ? (backendResult.message || "Credential email could not be sent.")
        : "Credential email delivery is not configured yet."
    };
  }

  function migrateStoredMembers() {
    return saveMembers(getMembers());
  }

  window.TaskifyAuth = {
    COMMON_PASSWORD,
    USER_ID_PREFIX,
    FIRST_USER_NUMBER,
    normalizeEmail,
    normalizeUserId,
    normalizeRole,
    nameFromEmail,
    nextAvailableUserId,
    migrateMembers,
    migrateStoredMembers,
    getMembers,
    saveMembers,
    findMemberByEmail,
    findMemberByUserId,
    ensureMemberForUser,
    authenticate,
    onboardMember,
    publicUser,
    getBackendUrl
  };

  migrateStoredMembers();
})();
