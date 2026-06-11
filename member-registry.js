(function () {
  const REGISTRY_STORAGE_KEY = "ttm_member_registry";
  const REGISTRY_STATUSES = ["Active", "Inactive", "Removed"];
  const CSV_FILE_NAME = "taskify-member-registry.csv";

  const registryNav = document.getElementById("member-registry-nav");
  const registrySection = document.getElementById("member-registry-section");
  const registryContent = document.getElementById("member-registry-content");
  const registryDenied = document.getElementById("member-registry-denied");
  const registrySearch = document.getElementById("member-registry-search");
  const registryExportBtn = document.getElementById("member-registry-export-btn");
  const registryBody = document.getElementById("member-registry-body");
  const registryEmpty = document.getElementById("member-registry-empty");
  const registryCount = document.getElementById("member-registry-count");

  function registryT(key, params = {}) {
    return window.AppI18n?.t?.(key, params) || key;
  }

  function normalizeEmail(value) {
    return window.TaskifyAuth?.normalizeEmail?.(value) || String(value || "").trim().toLowerCase();
  }

  function normalizeUserId(value) {
    return window.TaskifyAuth?.normalizeUserId?.(value) || String(value || "").trim().toUpperCase();
  }

  function normalizeRole(value) {
    return String(value || "").trim().toLowerCase() === "admin" ? "Admin" : "Member";
  }

  function normalizeStatus(value) {
    const match = REGISTRY_STATUSES.find((status) => status.toLowerCase() === String(value || "").trim().toLowerCase());
    return match || "Active";
  }

  function escapeRegistryHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeRegistryRecord(record) {
    return {
      userId: normalizeUserId(record?.userId),
      name: String(record?.name || "").trim() || "Member",
      email: normalizeEmail(record?.email),
      role: normalizeRole(record?.role),
      status: normalizeStatus(record?.status)
    };
  }

  function recordIdentity(record) {
    const normalized = normalizeRegistryRecord(record);
    return normalized.userId || normalized.email;
  }

  function dedupeRegistry(records) {
    const output = [];

    (Array.isArray(records) ? records : []).forEach((record) => {
      const normalized = normalizeRegistryRecord(record);
      if (!normalized.userId && !normalized.email) return;

      const existingIndex = output.findIndex((item) => (
        (normalized.userId && item.userId === normalized.userId)
        || (normalized.email && item.email === normalized.email)
      ));

      if (existingIndex >= 0) {
        output[existingIndex] = { ...output[existingIndex], ...normalized };
      } else {
        output.push(normalized);
      }
    });

    return output;
  }

  function getRegistryRecords() {
    try {
      const parsed = JSON.parse(localStorage.getItem(REGISTRY_STORAGE_KEY) || "[]");
      return dedupeRegistry(parsed);
    } catch {
      return [];
    }
  }

  function saveRegistryRecords(records) {
    const sanitized = dedupeRegistry(records);
    try {
      localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(sanitized));
    } catch {
      // Keep the app usable when browser storage is unavailable.
    }
    return sanitized;
  }

  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem("ttm_logged_in_user") || "null");
    } catch {
      return null;
    }
  }

  function isCurrentUserAdmin() {
    return normalizeRole(getCurrentUser()?.role) === "Admin";
  }

  function syncMembers(members) {
    const registry = getRegistryRecords();

    (Array.isArray(members) ? members : []).forEach((member) => {
      const normalizedMember = normalizeRegistryRecord(member);
      if (!normalizedMember.userId && !normalizedMember.email) return;

      const existing = registry.find((record) => (
        (normalizedMember.userId && record.userId === normalizedMember.userId)
        || (normalizedMember.email && record.email === normalizedMember.email)
      ));

      if (existing) {
        existing.userId = normalizedMember.userId || existing.userId;
        existing.name = normalizedMember.name;
        existing.email = normalizedMember.email || existing.email;
        existing.role = normalizedMember.role;
        existing.status = normalizeStatus(existing.status);
      } else {
        registry.push(normalizedMember);
      }
    });

    const saved = saveRegistryRecords(registry);
    renderRegistry();
    return saved;
  }

  function markRemoved(member) {
    const normalizedMember = normalizeRegistryRecord({ ...member, status: "Removed" });
    const registry = getRegistryRecords();
    const existing = registry.find((record) => (
      (normalizedMember.userId && record.userId === normalizedMember.userId)
      || (normalizedMember.email && record.email === normalizedMember.email)
    ));

    if (existing) {
      Object.assign(existing, normalizedMember, { status: "Removed" });
    } else if (normalizedMember.userId || normalizedMember.email) {
      registry.push(normalizedMember);
    }

    const saved = saveRegistryRecords(registry);
    renderRegistry();
    return saved;
  }

  function setMemberStatus(identity, status) {
    if (!isCurrentUserAdmin()) return false;

    const normalizedIdentity = String(identity || "");
    const registry = getRegistryRecords();
    const record = registry.find((item) => recordIdentity(item) === normalizedIdentity);
    if (!record) return false;

    record.status = normalizeStatus(status);
    saveRegistryRecords(registry);
    renderRegistry();
    return true;
  }

  function getFilteredRecords() {
    const query = String(registrySearch?.value || "").trim().toLowerCase();
    const records = getRegistryRecords().sort((left, right) => (
      left.userId.localeCompare(right.userId, undefined, { numeric: true })
      || left.name.localeCompare(right.name)
    ));

    if (!query) return records;

    return records.filter((record) => (
      record.userId.toLowerCase().includes(query)
      || record.name.toLowerCase().includes(query)
      || record.email.toLowerCase().includes(query)
      || record.role.toLowerCase().includes(query)
      || record.status.toLowerCase().includes(query)
    ));
  }

  function renderRegistry() {
    const isAdmin = isCurrentUserAdmin();
    registryNav?.classList.toggle("hidden", !isAdmin);
    registryContent?.classList.toggle("hidden", !isAdmin);
    registryDenied?.classList.toggle("hidden", isAdmin);

    if (!isAdmin || !registryBody) {
      if (registryBody) registryBody.innerHTML = "";
      return;
    }

    const records = getFilteredRecords();
    registryBody.innerHTML = records.map((record) => {
      const identity = recordIdentity(record);
      return `
        <tr>
          <td class="registry-user-id">${escapeRegistryHTML(record.userId)}</td>
          <td>${escapeRegistryHTML(record.name)}</td>
          <td>${escapeRegistryHTML(record.email)}</td>
          <td>${escapeRegistryHTML(record.role)}</td>
          <td>
            <select
              class="member-registry-status"
              data-registry-identity="${escapeRegistryHTML(identity)}"
              aria-label="${escapeRegistryHTML(`${record.name} status`)}"
            >
              ${REGISTRY_STATUSES.map((status) => `
                <option value="${status}" ${record.status === status ? "selected" : ""}>${status}</option>
              `).join("")}
            </select>
          </td>
        </tr>
      `;
    }).join("");

    registryEmpty?.classList.toggle("hidden", records.length > 0);
    if (registryCount) {
      registryCount.textContent = registryT(
        records.length === 1 ? "registry.countOne" : "registry.countMany",
        { count: records.length }
      );
    }
  }

  function csvCell(value) {
    let text = String(value || "");
    if (/^[=+\-@]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  }

  function exportRegistry() {
    if (!isCurrentUserAdmin()) {
      renderRegistry();
      return false;
    }

    const rows = [
      ["User ID", "Name", "Email", "Role", "Status"],
      ...getRegistryRecords().map((record) => [
        record.userId,
        record.name,
        record.email,
        record.role,
        record.status
      ])
    ];
    const csv = `\uFEFF${rows.map((row) => row.map(csvCell).join(",")).join("\r\n")}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = CSV_FILE_NAME;
    anchor.hidden = true;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
    return true;
  }

  function refreshAccess() {
    const isAdmin = isCurrentUserAdmin();
    registryNav?.classList.toggle("hidden", !isAdmin);
    if (!isAdmin) registrySection?.classList.remove("active-section");
    renderRegistry();
    return isAdmin;
  }

  registryNav?.addEventListener("click", (event) => {
    if (!isCurrentUserAdmin()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      refreshAccess();
      return;
    }
    renderRegistry();
  }, true);

  registrySearch?.addEventListener("input", renderRegistry);
  registryExportBtn?.addEventListener("click", exportRegistry);
  registryBody?.addEventListener("change", (event) => {
    const select = event.target instanceof Element ? event.target.closest(".member-registry-status") : null;
    if (!select) return;
    setMemberStatus(select.getAttribute("data-registry-identity"), select.value);
  });

  window.addEventListener("storage", (event) => {
    if ([REGISTRY_STORAGE_KEY, "ttm_team_members", "ttm_logged_in_user"].includes(event.key)) {
      refreshAccess();
    }
  });

  window.MemberRegistry = {
    REGISTRY_STORAGE_KEY,
    getRecords: () => (isCurrentUserAdmin() ? getRegistryRecords() : []),
    syncMembers,
    markRemoved,
    setMemberStatus,
    exportRegistry,
    render: renderRegistry,
    refreshAccess,
    isCurrentUserAdmin
  };

  saveRegistryRecords(getRegistryRecords());
  syncMembers(window.TeamDirectory?.getTeamMembers?.() || []);
  refreshAccess();
})();
