// -----------------------------
// TEAM MEMBERS / GROUP CHANNELS
// -----------------------------
// Shared localStorage-backed directory for team management and channel metadata.

const TEAM_MEMBERS_STORAGE_KEY = "ttm_team_members";
const TEAM_GROUPS_STORAGE_KEY = "ttm_team_groups";

const DEFAULT_TEAM_MEMBERS = [];

function safeParseTeamJSON(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    const parsed = saved ? JSON.parse(saved) : fallback;
    return parsed;
  } catch {
    return fallback;
  }
}

function normalizeEmail(email) {
  return window.TaskifyAuth?.normalizeEmail?.(email) || String(email || "").trim().toLowerCase();
}

function nameFromEmail(email) {
  if (window.TaskifyAuth?.nameFromEmail) return window.TaskifyAuth.nameFromEmail(email);
  const localPart = String(email || "").split("@")[0] || "Member";
  return localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ") || "Member";
}

function normalizeTeamRole(role) {
  return window.TaskifyAuth?.normalizeRole?.(role) || (role === "Admin" ? "Admin" : "Member");
}

function normalizeTeamMember(member, index = 0) {
  if (window.TaskifyAuth?.migrateMembers) {
    return window.TaskifyAuth.migrateMembers([member])[0];
  }
  const email = normalizeEmail(member?.email);
  const name = String(member?.name || nameFromEmail(email)).trim();
  return {
    id: String(member?.id || `member-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 6)}`),
    name: name || "Member",
    email,
    role: normalizeTeamRole(member?.role)
  };
}

function getTeamMembers() {
  if (window.TaskifyAuth?.getMembers) return window.TaskifyAuth.getMembers();
  const parsed = safeParseTeamJSON(TEAM_MEMBERS_STORAGE_KEY, DEFAULT_TEAM_MEMBERS);
  const source = Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_TEAM_MEMBERS;
  const seen = new Set();
  return source
    .map(normalizeTeamMember)
    .filter((member) => {
      const key = member.email || member.name.toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function saveTeamMembers(members) {
  if (window.TaskifyAuth?.saveMembers) {
    return window.TaskifyAuth.saveMembers(members);
  }
  localStorage.setItem(TEAM_MEMBERS_STORAGE_KEY, JSON.stringify(members.map(normalizeTeamMember)));
  return getTeamMembers();
}

function ensureLoggedInMember(user) {
  if (window.TaskifyAuth?.ensureMemberForUser) {
    window.TaskifyAuth.ensureMemberForUser(user);
    return getTeamMembers();
  }
  const email = normalizeEmail(user?.email);
  if (!email) return getTeamMembers();

  const members = getTeamMembers();
  const existing = members.find((member) => normalizeEmail(member.email) === email);
  if (existing) {
    if (user?.name && existing.name !== user.name) existing.name = user.name;
    saveTeamMembers(members);
    return members;
  }

  const newMember = normalizeTeamMember({
    id: `member-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: user?.name || nameFromEmail(email),
    email,
    role: normalizeTeamRole(user?.role)
  });

  members.push(newMember);
  saveTeamMembers(members);
  return members;
}

function getCurrentTeamUser() {
  try {
    const savedUser = localStorage.getItem("ttm_logged_in_user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

function normalizeGroup(group, index = 0) {
  const members = Array.isArray(group?.members) ? group.members.map(normalizeEmail).filter(Boolean) : [];
  return {
    id: String(group?.id || `team-group-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 6)}`),
    name: String(group?.name || "Untitled Group").trim() || "Untitled Group",
    members: Array.from(new Set(members)),
    createdAt: group?.createdAt || new Date().toISOString()
  };
}

function getTeamGroups() {
  const parsed = safeParseTeamJSON(TEAM_GROUPS_STORAGE_KEY, []);
  return Array.isArray(parsed) ? parsed.map(normalizeGroup) : [];
}

function saveTeamGroups(groups) {
  localStorage.setItem(TEAM_GROUPS_STORAGE_KEY, JSON.stringify(groups.map(normalizeGroup)));
}

function canCurrentUserAccessGroup(group) {
  const user = getCurrentTeamUser();
  if (!user || normalizeTeamRole(user.role) === "Admin") return true;

  const userEmail = normalizeEmail(user.email);
  if (!userEmail) return false;
  return normalizeGroup(group).members.includes(userEmail);
}

function getAccessibleTeamGroups() {
  return getTeamGroups().filter(canCurrentUserAccessGroup);
}

function getGroupRoomsForChat() {
  return getAccessibleTeamGroups().reduce((rooms, group) => {
    rooms[group.id] = {
      label: group.name,
      seed: [],
      members: group.members,
      custom: true
    };
    return rooms;
  }, {});
}

window.TeamDirectory = {
  getTeamMembers,
  saveTeamMembers,
  ensureLoggedInMember,
  getTeamGroups,
  saveTeamGroups,
  getAccessibleTeamGroups,
  getGroupRoomsForChat,
  normalizeEmail,
  nameFromEmail,
  normalizeTeamRole
};

// -----------------------------
// GROUPS PAGE UI
// -----------------------------
const groupsList = document.getElementById("groups-list");
const groupCreateForm = document.getElementById("group-create-form");
const groupNameInput = document.getElementById("group-name-input");
const groupMemberOptions = document.getElementById("group-member-options");
const createGroupToggleBtn = document.getElementById("create-group-toggle-btn");

function escapeTeamHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function teamT(key, params = {}) {
  return window.AppI18n?.t?.(key, params) || key;
}

function renderGroupMemberOptions() {
  if (!groupMemberOptions) return;

  const members = getTeamMembers();
  if (!members.length) {
    groupMemberOptions.innerHTML = `<p class="groups-empty-text">${escapeTeamHTML(teamT("groups.addMembersFirst"))}</p>`;
    return;
  }

  groupMemberOptions.innerHTML = members.map((member) => `
    <label class="group-member-check">
      <input type="checkbox" value="${escapeTeamHTML(member.email)}" />
      <span>${escapeTeamHTML(member.name)} <small>${escapeTeamHTML(member.role)}</small></span>
    </label>
  `).join("");
}

function getGroupMemberNames(group) {
  const emails = new Set(normalizeGroup(group).members);
  return getTeamMembers()
    .filter((member) => emails.has(normalizeEmail(member.email)))
    .map((member) => member.name);
}

function switchToSection(sectionId) {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.getAttribute("data-section") === sectionId);
  });

  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.toggle("active-section", section.id === sectionId);
  });

  const pageTitle = document.getElementById("page-title");
  const label = document.querySelector(`.nav-item[data-section="${sectionId}"] .nav-label`);
  if (pageTitle && label) pageTitle.textContent = label.textContent;

  const newTaskBtn = document.getElementById("open-task-modal-btn");
  if (newTaskBtn) {
    newTaskBtn.classList.toggle("hidden", !["dashboard-section", "tasks-section"].includes(sectionId));
  }
}

function renderGroupManagement() {
  renderGroupMemberOptions();
  if (!groupsList) return;

  const groups = getAccessibleTeamGroups();
  const activeRoom = window.getActiveGroupRoom?.() || "";

  if (!groups.length) {
    groupsList.innerHTML = `
      <div class="groups-empty-state">
        <h4>${escapeTeamHTML(teamT("groups.noGroupsTitle"))}</h4>
        <p>${escapeTeamHTML(teamT("groups.noGroupsBody"))}</p>
      </div>
    `;
    return;
  }

  groupsList.innerHTML = groups.map((group) => {
    const memberNames = getGroupMemberNames(group);
    const isActive = activeRoom === group.id;
    return `
      <article class="group-channel-card ${isActive ? "active-group-channel" : ""}" data-group-id="${escapeTeamHTML(group.id)}">
        <div>
          <h4>${escapeTeamHTML(group.name)}</h4>
          <p>${memberNames.length ? escapeTeamHTML(memberNames.join(", ")) : escapeTeamHTML(teamT("groups.noMembersSelected"))}</p>
        </div>
        <button type="button" class="secondary-btn group-open-btn" data-group-id="${escapeTeamHTML(group.id)}">
          ${escapeTeamHTML(teamT(isActive ? "groups.active" : "groups.openChat"))}
        </button>
      </article>
    `;
  }).join("");
}

if (createGroupToggleBtn) {
  createGroupToggleBtn.addEventListener("click", () => {
    groupNameInput?.focus();
  });
}

if (groupCreateForm) {
  groupCreateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = groupNameInput?.value.trim();
    if (!name) {
      alert(teamT("groups.enterName"));
      groupNameInput?.focus();
      return;
    }

    const members = Array.from(groupMemberOptions?.querySelectorAll("input:checked") || [])
      .map((input) => normalizeEmail(input.value))
      .filter(Boolean);

    if (!members.length) {
      alert(teamT("groups.selectMember"));
      return;
    }

    const groups = getTeamGroups();
    const group = normalizeGroup({
      id: `team-group-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name,
      members,
      createdAt: new Date().toISOString()
    });

    groups.push(group);
    saveTeamGroups(groups);
    groupCreateForm.reset();
    window.refreshGroupRooms?.(group.id);
    renderGroupManagement();
  });
}

if (groupsList) {
  groupsList.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest(".group-open-btn") : null;
    if (!button) return;

    const groupId = button.getAttribute("data-group-id");
    if (!groupId) return;

    window.setGroupChatRoom?.(groupId);
    switchToSection("group-chat-section");
  });
}

window.renderGroupManagement = renderGroupManagement;
window.renderTeamGroupsUI = renderGroupManagement;
renderGroupManagement();
