const APP_STORAGE_VERSION = "taskify-client-clean-2026-04-26";
const SETTINGS_PREFERENCES_KEY = "ttm_settings_preferences";
const WORKSPACE_THEME_FALLBACK_KEY = "taskify-theme";
const DEFAULT_WORKSPACE_THEME = "taskify-purple";
const WORKSPACE_THEMES = new Set([
  "taskify-purple",
  "ocean-blue",
  "mint-green",
  "sunset-orange",
  "rose-pink",
  "lavender",
  "sky-cyan",
  "peach-pastel"
]);
const MAX_ATTACHMENT_SIZE = 750 * 1024;
const MAX_VOICE_SIZE = 1200 * 1024;

// -----------------------------
// BASIC ELEMENTS
// -----------------------------
const loginScreen = document.getElementById("login-screen");
const joinScreen = document.getElementById("join-screen");
const welcomeScreen = document.getElementById("welcome-screen");
const appScreen = document.getElementById("app-screen");

const loginForm = document.getElementById("login-form");
const loginBtn = document.getElementById("login-btn");
const welcomeStartBtn = document.getElementById("welcome-start-btn");
const loginMessage = document.getElementById("login-message");
const openJoinBtn = document.getElementById("open-join-btn");
const backToLoginBtn = document.getElementById("back-to-login-btn");
const joinForm = document.getElementById("join-form");
const joinNameInput = document.getElementById("join-name");
const joinEmailInput = document.getElementById("join-email");
const joinSubmitBtn = document.getElementById("join-submit-btn");
const joinMessage = document.getElementById("join-message");

const sidebarUserName = document.getElementById("sidebar-user-name");
const sidebarUserRole = document.getElementById("sidebar-user-role");
const sidebarPresenceStatus = document.getElementById("sidebar-presence-status");
const topbarUserName = document.getElementById("topbar-user-name");
const userAvatar = document.getElementById("user-avatar");
const logoutBtn = document.getElementById("logout-btn");

const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".content-section");
const pageTitle = document.getElementById("page-title");
const sidebar = document.getElementById("app-sidebar");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileSidebarOverlay = document.getElementById("mobile-sidebar-overlay");

// -----------------------------
// CHAT ELEMENTS
// -----------------------------
const chatInput = document.getElementById("chat-message-input");
const sendMessageBtn = document.getElementById("send-message-btn");
const chatMessages = document.getElementById("chat-messages");
const chatUsersList = document.getElementById("chat-users-list");
const chatTypingIndicator = document.getElementById("chat-typing-indicator");
const startCallBtn = document.getElementById("start-call-btn");
const chatFileInput = document.getElementById("chat-file-input");
const chatAttachBtn = document.getElementById("chat-attach-btn");
const chatRecordBtn = document.getElementById("chat-record-btn");
const chatAttachmentPreview = document.getElementById("chat-attachment-preview");
const chatVoicePanel = document.getElementById("chat-voice-panel");
const chatVoiceStatus = document.getElementById("chat-voice-status");
const chatStopRecordBtn = document.getElementById("chat-stop-record-btn");
const chatSendVoiceBtn = document.getElementById("chat-send-voice-btn");
const chatCancelRecordBtn = document.getElementById("chat-cancel-record-btn");

// -----------------------------
// TASK ELEMENTS
// -----------------------------
const openTaskModalBtn = document.getElementById("open-task-modal-btn");
const closeTaskModalBtn = document.getElementById("close-task-modal-btn");
const taskModalOverlay = document.getElementById("task-modal-overlay");
const taskForm = document.getElementById("task-form");

const taskTitleInput = document.getElementById("task-title");
const taskDescriptionInput = document.getElementById("task-description");
const taskSeverityInput = document.getElementById("task-severity");
const taskStatusInput = document.getElementById("task-status");
const taskDeadlineInput = document.getElementById("task-deadline");
const taskAssignedToInput = document.getElementById("task-assigned-to");
const taskAttachmentsInput = document.getElementById("task-attachments");
const taskAssignmentHelp = document.getElementById("task-assignment-help");
const taskTagInputs = document.querySelectorAll('input[name="task-tags"]');

const recentTaskList = document.getElementById("recent-task-list");
const pendingTaskColumn = document.getElementById("pending-task-column");
const inprogressTaskColumn = document.getElementById("inprogress-task-column");
const completedTaskColumn = document.getElementById("completed-task-column");

const totalTasksCount = document.getElementById("total-tasks-count");
const inProgressCount = document.getElementById("in-progress-count");
const completedCount = document.getElementById("completed-count");
const notificationsCount = document.getElementById("notifications-count");
const dueSoonCount = document.getElementById("due-soon-count");
const highPriorityCount = document.getElementById("high-priority-count");
const completionRate = document.getElementById("completion-rate");
const teamLoadSummary = document.getElementById("team-load-summary");
const upcomingEventsList = document.getElementById("upcoming-events-list");
const taskSearchInput = document.getElementById("task-search-input");
const taskSearchResults = document.getElementById("task-search-results");
const totalTasksDetail = document.getElementById("total-tasks-detail");
const progressTasksDetail = document.getElementById("progress-tasks-detail");
const completedTasksDetail = document.getElementById("completed-tasks-detail");
const notificationsDetail = document.getElementById("notifications-detail");
const dueSoonDetail = document.getElementById("due-soon-detail");
const highPriorityDetail = document.getElementById("high-priority-detail");
const completionRateDetail = document.getElementById("completion-rate-detail");
const teamLoadDetail = document.getElementById("team-load-detail");
const taskStatusChart = document.getElementById("task-status-chart");
const completedTrendCount = document.getElementById("completed-trend-count");
const pendingTrendCount = document.getElementById("pending-trend-count");
const overdueTrendCount = document.getElementById("overdue-trend-count");
const teamContributionDonut = document.getElementById("team-contribution-donut");
const teamContributionTotal = document.getElementById("team-contribution-total");
const teamContributionLegend = document.getElementById("team-contribution-legend");
const teamPerformanceList = document.getElementById("team-performance-list");
const driveFileGrid = document.getElementById("drive-file-grid");

// -----------------------------
// NOTIFICATION ELEMENTS
// -----------------------------
const notificationList = document.getElementById("notification-list");
const enableBrowserNotificationsBtn = document.getElementById("enable-browser-notifications-btn");
const disableBrowserNotificationsBtn = document.getElementById("disable-browser-notifications-btn");
const notificationPermissionStatus = document.getElementById("notification-permission-status");
const inAppToastToggle = document.getElementById("in-app-toast-toggle");
const notificationSoundToggle = document.getElementById("notification-sound-toggle");
const themeToggle = document.getElementById("theme-toggle");
const themeModeState = document.getElementById("theme-mode-state");
const themeStatusText = document.getElementById("theme-status-text");
const workspaceThemeOptions = document.querySelectorAll('input[name="workspace-theme"]');
const rememberDataToggle = document.getElementById("remember-data-toggle");
const storageStatusText = document.getElementById("storage-status-text");
const clearNotificationsBtn = document.getElementById("clear-notifications-btn");
const resetAppDataBtn = document.getElementById("reset-app-data-btn");
const settingsCategoryCards = document.querySelectorAll(".settings-category-card[data-settings-pane]");
const languageOptions = document.querySelectorAll('input[name="settings-language"]');
const settingsProfileForm = document.getElementById("settings-profile-form");
const settingsFirstNameInput = document.getElementById("settings-first-name");
const settingsLastNameInput = document.getElementById("settings-last-name");
const settingsProfilePhotoInput = document.getElementById("settings-profile-photo");
const settingsProfilePreview = document.getElementById("settings-profile-preview");
const settingsProfileUserIdInput = document.getElementById("settings-profile-user-id");
const settingsProfileEmailInput = document.getElementById("settings-profile-email");
const settingsProfileRoleInput = document.getElementById("settings-profile-role");
const settingsAccountEmailInput = document.getElementById("settings-account-email");
const settingsAccountRoleInput = document.getElementById("settings-account-role");
const settingsSaveAccountBtn = document.getElementById("settings-save-account-btn");
const settingsLoginAlertsToggle = document.getElementById("settings-login-alerts-toggle");
const settingsLocalDataToggle = document.getElementById("settings-local-data-toggle");
const settingsPresenceToggle = document.getElementById("settings-presence-toggle");
const settingsChatTimestampsToggle = document.getElementById("settings-chat-timestamps-toggle");
const settingsChatTypingToggle = document.getElementById("settings-chat-typing-toggle");
const settingsChatPreviewsToggle = document.getElementById("settings-chat-previews-toggle");
const settingsCameraToggle = document.getElementById("settings-camera-toggle");
const settingsMicrophoneToggle = document.getElementById("settings-microphone-toggle");
const teamMembersList = document.getElementById("team-members-list");
const teamMemberForm = document.getElementById("team-member-form");
const teamMemberNameInput = document.getElementById("team-member-name");
const teamMemberEmailInput = document.getElementById("team-member-email");
const teamMemberRoleInput = document.getElementById("team-member-role");

// -----------------------------
// TOAST CONTAINER
// -----------------------------
let toastContainer = document.getElementById("toast-container");
if (!toastContainer) {
  toastContainer = document.createElement("div");
  toastContainer.id = "toast-container";
  toastContainer.className = "toast-container";
  document.body.appendChild(toastContainer);
}

function t(key, params = {}) {
  return window.AppI18n?.t?.(key, params) || key;
}

function translateStatusLabel(status) {
  const statusKeys = {
    Pending: "common.pending",
    "In Progress": "common.inProgress",
    Completed: "common.completed"
  };

  return statusKeys[status] ? t(statusKeys[status]) : status;
}

function translateSeverityLabel(severity) {
  const severityKeys = {
    High: "common.high",
    Medium: "common.medium",
    Low: "common.low"
  };

  return severityKeys[severity] ? t(severityKeys[severity]) : severity;
}

function updatePageTitleTranslation() {
  if (!pageTitle) return;

  const activeItem = document.querySelector(".nav-item.active .nav-label");
  if (activeItem) {
    pageTitle.textContent = activeItem.textContent;
  }
}

function updateThemeText(theme = getSavedTheme()) {
  const normalizedTheme = theme === "dark" ? "dark" : "light";
  if (themeModeState) {
    themeModeState.textContent = normalizedTheme === "dark"
      ? t("settings.theme.on")
      : t("settings.theme.off");
  }
  if (themeStatusText) {
    themeStatusText.textContent = normalizedTheme === "dark"
      ? t("settings.theme.statusDark")
      : t("settings.theme.statusLight");
  }
}

function normalizeWorkspaceTheme(theme) {
  return WORKSPACE_THEMES.has(theme) ? theme : DEFAULT_WORKSPACE_THEME;
}

function getWorkspaceThemeStorageKey(user = getUserFromLocalStorage()) {
  const userId = String(user?.userId || "").trim();
  return userId ? `${WORKSPACE_THEME_FALLBACK_KEY}-${userId}` : WORKSPACE_THEME_FALLBACK_KEY;
}

function getSavedWorkspaceTheme(user = getUserFromLocalStorage()) {
  try {
    return normalizeWorkspaceTheme(localStorage.getItem(getWorkspaceThemeStorageKey(user)));
  } catch {
    return DEFAULT_WORKSPACE_THEME;
  }
}

function updateWorkspaceThemeControls(theme = getSavedWorkspaceTheme()) {
  const normalizedTheme = normalizeWorkspaceTheme(theme);
  workspaceThemeOptions.forEach((option) => {
    option.checked = option.value === normalizedTheme;
  });
}

function applyWorkspaceTheme(theme, options = {}) {
  const normalizedTheme = normalizeWorkspaceTheme(theme);
  const user = Object.prototype.hasOwnProperty.call(options, "user")
    ? options.user
    : getUserFromLocalStorage();

  document.documentElement.setAttribute("data-workspace-theme", normalizedTheme);
  if (options.persist !== false) {
    try {
      localStorage.setItem(getWorkspaceThemeStorageKey(user), normalizedTheme);
    } catch {}
  }

  updateWorkspaceThemeControls(normalizedTheme);
  return normalizedTheme;
}

function updateLanguageControls() {
  const selectedLanguage = window.AppI18n?.getLanguage?.() || "en";
  languageOptions.forEach((option) => {
    option.checked = option.value === selectedLanguage;
  });
}

function refreshLocalizedDynamicUI() {
  document.title = t("app.title");
  updatePageTitleTranslation();
  updateThemeText(getSavedTheme());
  updateWorkspaceThemeControls(getSavedWorkspaceTheme());
  updateStorageStatusText();
  updateNotificationPermissionUI();
  renderNotifications();
  renderAllTaskUI();
  renderSelectedChatMessages();
  window.renderCalendarMeetings?.();
  window.renderTeamGroupsUI?.();
  window.refreshGroupChatLanguage?.();
}

function applyAppTranslations() {
  window.AppI18n?.applyTranslations?.();
  updateLanguageControls();
  refreshLocalizedDynamicUI();
}

// -----------------------------
// DATA
// -----------------------------
const defaultGroupMembers = [];

let groupMembers = getTeamMembersForApp();
let pendingProfilePhotoData = "";

const PRESENCE_STORAGE_KEY = "ttm_user_presence";
const PRESENCE_ONLINE_WINDOW_MS = 120000;
const PRESENCE_HEARTBEAT_MS = 30000;
let presenceChannel = null;
let presenceHeartbeatTimer = null;

const defaultTasks = [];

const defaultNotifications = [];

let selectedChatMember = "";
let privateChatChannel = null;
let privateTypingTimer = null;
let privateVoiceRecorder = null;
let privateVoiceChunks = [];
let privateVoiceAttachment = null;
let privateVoiceCancelled = false;
let privateAttachmentPreviewUrls = [];
let currentDriveFiles = [];
let activeMeeting = null;
let pendingMeetingFromHash = null;

const defaultChatConversations = {};

// -----------------------------
// UI HELPERS
// -----------------------------
function showWelcomeScreen() {
  closeMobileNav();
  if (welcomeScreen) welcomeScreen.classList.remove("hidden");
  if (loginScreen) loginScreen.classList.add("hidden");
  if (joinScreen) joinScreen.classList.add("hidden");
  if (appScreen) appScreen.classList.add("hidden");
}

function showLoginScreen() {
  closeMobileNav();
  if (welcomeScreen) welcomeScreen.classList.add("hidden");
  if (loginScreen) loginScreen.classList.remove("hidden");
  if (joinScreen) joinScreen.classList.add("hidden");
  if (appScreen) appScreen.classList.add("hidden");
}

function showJoinScreen() {
  closeMobileNav();
  if (welcomeScreen) welcomeScreen.classList.add("hidden");
  if (loginScreen) loginScreen.classList.add("hidden");
  if (joinScreen) joinScreen.classList.remove("hidden");
  if (appScreen) appScreen.classList.add("hidden");
  if (joinMessage) {
    joinMessage.textContent = "";
    joinMessage.className = "login-message";
  }
  joinEmailInput?.focus();
}

function showAppScreen() {
  closeMobileNav();
  if (welcomeScreen) welcomeScreen.classList.add("hidden");
  if (loginScreen) loginScreen.classList.add("hidden");
  if (joinScreen) joinScreen.classList.add("hidden");
  if (appScreen) appScreen.classList.remove("hidden");
  window.TeamDirectory?.ensureLoggedInMember?.(getUserFromLocalStorage());
  refreshTeamDirectoryUI();
  showDashboardSection();
}

function setMobileNavOpen(isOpen) {
  if (!appScreen || !sidebar || !mobileMenuBtn || !mobileSidebarOverlay) return;

  appScreen.classList.toggle("mobile-nav-open", isOpen);
  mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  mobileSidebarOverlay.classList.toggle("hidden", !isOpen);
  document.body.classList.toggle("mobile-nav-lock", isOpen);
}

function closeMobileNav() {
  setMobileNavOpen(false);
}

function setLoginMessage(message, type = "") {
  if (!loginMessage) return;
  loginMessage.textContent = message;
  loginMessage.className = "login-message";
  if (type) loginMessage.classList.add(type);
}

function updateUserUI(user) {
  const userName = user?.name || "User";
  const userRole = normalizeUserRole(user?.role);
  const firstLetter = userName.charAt(0).toUpperCase();
  applyWorkspaceTheme(getSavedWorkspaceTheme(user), { persist: false, user });

  if (sidebarUserName) sidebarUserName.textContent = userName;
  if (sidebarUserRole) sidebarUserRole.textContent = userRole;
  if (topbarUserName) topbarUserName.textContent = userName;
  if (userAvatar) {
    if (user?.profilePhoto) {
      userAvatar.textContent = "";
      userAvatar.style.backgroundImage = `url("${user.profilePhoto}")`;
      userAvatar.style.backgroundSize = "cover";
      userAvatar.style.backgroundPosition = "center";
    } else {
      userAvatar.textContent = firstLetter;
      userAvatar.style.backgroundImage = "";
    }
  }

  document.querySelectorAll(".current-user-chat-name").forEach((element) => {
    element.textContent = `${userName}:`;
  });

  populateSettingsUserFields(user);
  applyRoleBasedUI();
  updateCurrentUserPresence();
  renderPresenceUI();
}

function setJoinMessage(message, type = "") {
  if (!joinMessage) return;
  joinMessage.textContent = message;
  joinMessage.className = "login-message";
  if (type) joinMessage.classList.add(type);
}

function isInAppToastEnabled() {
  return localStorage.getItem("ttm_in_app_toast_enabled") !== "false";
}

function setInAppToastEnabled(value) {
  localStorage.setItem("ttm_in_app_toast_enabled", value ? "true" : "false");
}

function isNotificationSoundEnabled() {
  return localStorage.getItem("ttm_notification_sound_enabled") === "true";
}

function setNotificationSoundEnabled(value) {
  localStorage.setItem("ttm_notification_sound_enabled", value ? "true" : "false");
}

function getSavedTheme() {
  return localStorage.getItem("ttm_theme") === "dark" ? "dark" : "light";
}

function applyTheme(theme) {
  const normalizedTheme = theme === "dark" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", normalizedTheme);
  localStorage.setItem("ttm_theme", normalizedTheme);

  if (themeToggle) themeToggle.checked = normalizedTheme === "dark";
  updateThemeText(normalizedTheme);
}

function getSettingsPreferences() {
  const defaults = {
    loginAlerts: true,
    localData: true,
    presence: true,
    chatTimestamps: true,
    chatTyping: true,
    chatPreviews: true,
    camera: true,
    microphone: true
  };

  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_PREFERENCES_KEY) || "{}");
    return { ...defaults, ...saved };
  } catch {
    return defaults;
  }
}

function saveSettingsPreferences(preferences) {
  localStorage.setItem(SETTINGS_PREFERENCES_KEY, JSON.stringify({
    ...getSettingsPreferences(),
    ...preferences
  }));
  updateStorageStatusText();
}

function getLocalStorageUsageBytes() {
  try {
    let total = 0;
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index) || "";
      const value = localStorage.getItem(key) || "";
      total += new Blob([key, value]).size;
    }
    return total;
  } catch {
    return null;
  }
}

function formatStorageSize(bytes) {
  if (bytes === null) return "";
  if (bytes < 1024) return `${bytes} B`;
  const kilobytes = bytes / 1024;
  if (kilobytes < 1024) return `${kilobytes.toFixed(kilobytes >= 10 ? 0 : 1)} KB`;
  const megabytes = kilobytes / 1024;
  return `${megabytes.toFixed(megabytes >= 10 ? 1 : 2)} MB`;
}

function updateStorageStatusText(preferences = getSettingsPreferences()) {
  if (!storageStatusText) return;

  const usageBytes = getLocalStorageUsageBytes();
  if (usageBytes === null) {
    storageStatusText.textContent = t("settings.storageStatusUnavailable");
    return;
  }

  const statusKey = preferences.localData
    ? "settings.storageStatusActiveDetail"
    : "settings.storageStatusPausedDetail";
  storageStatusText.textContent = t(statusKey, { size: formatStorageSize(usageBytes) });
}

function setLocalDataPreference(enabled) {
  const nextValue = Boolean(enabled);
  saveSettingsPreferences({ localData: nextValue });
  if (rememberDataToggle) rememberDataToggle.checked = nextValue;
  if (settingsLocalDataToggle) settingsLocalDataToggle.checked = nextValue;
  updateStorageStatusText({ ...getSettingsPreferences(), localData: nextValue });
}

function splitUserName(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ")
  };
}

function setSettingsProfilePreview(user) {
  if (!settingsProfilePreview) return;

  const userName = user?.name || "User";
  const photo = pendingProfilePhotoData || user?.profilePhoto;
  if (photo) {
    settingsProfilePreview.textContent = "";
    settingsProfilePreview.style.backgroundImage = `url("${photo}")`;
  } else {
    settingsProfilePreview.textContent = userName.charAt(0).toUpperCase() || "U";
    settingsProfilePreview.style.backgroundImage = "";
  }
}

function populateSettingsUserFields(user = getUserFromLocalStorage()) {
  const currentUser = user || {};
  const nameParts = splitUserName(currentUser.name);
  const preferences = getSettingsPreferences();

  if (settingsFirstNameInput) settingsFirstNameInput.value = currentUser.firstName || nameParts.firstName;
  if (settingsLastNameInput) settingsLastNameInput.value = currentUser.lastName || nameParts.lastName;
  if (settingsProfileUserIdInput) settingsProfileUserIdInput.value = currentUser.userId || "";
  if (settingsProfileEmailInput) settingsProfileEmailInput.value = currentUser.email || "";
  if (settingsProfileRoleInput) settingsProfileRoleInput.value = normalizeUserRole(currentUser.role);
  if (settingsAccountEmailInput) settingsAccountEmailInput.value = currentUser.email || "";
  if (settingsAccountRoleInput) settingsAccountRoleInput.value = normalizeUserRole(currentUser.role);
  if (settingsLoginAlertsToggle) settingsLoginAlertsToggle.checked = preferences.loginAlerts;
  if (rememberDataToggle) rememberDataToggle.checked = preferences.localData;
  if (settingsLocalDataToggle) settingsLocalDataToggle.checked = preferences.localData;
  if (settingsPresenceToggle) settingsPresenceToggle.checked = preferences.presence;
  if (settingsChatTimestampsToggle) settingsChatTimestampsToggle.checked = preferences.chatTimestamps;
  if (settingsChatTypingToggle) settingsChatTypingToggle.checked = preferences.chatTyping;
  if (settingsChatPreviewsToggle) settingsChatPreviewsToggle.checked = preferences.chatPreviews;
  if (settingsCameraToggle) settingsCameraToggle.checked = preferences.camera;
  if (settingsMicrophoneToggle) settingsMicrophoneToggle.checked = preferences.microphone;

  setSettingsProfilePreview(currentUser);
  updateStorageStatusText(preferences);
}

function playNotificationSound() {
  if (!isNotificationSoundEnabled()) return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 820;
    gain.gain.setValueAtTime(0.001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.18);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.2);
  } catch (error) {
    console.warn("Notification sound could not be played:", error);
  }
}

function showToast(title, message) {
  if (!toastContainer) return;
  if (!isInAppToastEnabled()) return;

  const toast = document.createElement("div");
  toast.className = "toast-item";
  toast.innerHTML = `
    <h4>${title}</h4>
    <p>${message}</p>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(18px)";
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// -----------------------------
// LOCAL STORAGE HELPERS
// -----------------------------
function saveUserToLocalStorage(user) {
  const teamMember = window.TaskifyAuth?.ensureMemberForUser?.(user)
    || (window.TeamDirectory?.getTeamMembers?.() || []).find((member) => (
      (user?.userId && member.userId === user.userId)
      || window.TeamDirectory.normalizeEmail(member.email) === window.TeamDirectory.normalizeEmail(user?.email)
    ));
  const storedUser = {
    ...user,
    ...(teamMember ? window.TaskifyAuth?.publicUser?.(teamMember) || teamMember : {})
  };
  delete storedUser.password;
  localStorage.setItem("ttm_logged_in_user", JSON.stringify(storedUser));
  window.TeamDirectory?.ensureLoggedInMember?.(storedUser);
  return storedUser;
}

function getUserFromLocalStorage() {
  const savedUser = localStorage.getItem("ttm_logged_in_user");
  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser);
  } catch {
    return null;
  }
}

function clearUserFromLocalStorage() {
  localStorage.removeItem("ttm_logged_in_user");
}

function normalizeUserRole(role) {
  const normalizedRole = String(role || "").trim().toLowerCase();

  if (["admin", "manager", "project manager"].includes(normalizedRole)) return "Admin";
  if (["member", "employee", "developer", "designer", "business analyst"].includes(normalizedRole)) return "Member";
  return "Admin";
}

function getTeamMembersForApp() {
  const members = window.TeamDirectory?.getTeamMembers?.() || defaultGroupMembers;
  return members.map((member) => ({
    id: member.id,
    name: member.name,
    email: member.email || "",
    userId: member.userId || "",
    role: normalizeUserRole(member.role),
    active: true
  }));
}

function syncTaskAssigneeOptions() {
  if (!taskAssignedToInput) return;

  const selected = new Set(Array.from(taskAssignedToInput.selectedOptions || []).map((option) => option.value));
  taskAssignedToInput.innerHTML = groupMembers.map((member) => `
    <option value="${escapeHTML(member.name)}" ${selected.has(member.name) ? "selected" : ""}>${escapeHTML(member.name)}</option>
  `).join("");
}

function renderTeamMembers() {
  if (!teamMembersList) return;

  if (!groupMembers.length) {
    teamMembersList.innerHTML = `
      <div class="team-empty">
        <h4>No members yet</h4>
        <p>Add a member by email to start building your team.</p>
      </div>
    `;
    return;
  }

  teamMembersList.innerHTML = groupMembers.map((member) => `
    <div class="team-card managed-team-card" data-team-member="${escapeHTML(member.name)}" data-team-email="${escapeHTML(member.email)}">
      <div class="team-avatar">${escapeHTML(member.name.charAt(0).toUpperCase())}</div>
      <h4>${escapeHTML(member.name)}</h4>
      <p class="team-user-id">${escapeHTML(member.userId || "")}</p>
      <p>${escapeHTML(member.email || "No email")}</p>
      <span class="role-chip">${escapeHTML(member.role)}</span>
      <select class="team-role-select" data-team-email="${escapeHTML(member.email)}" aria-label="Role for ${escapeHTML(member.name)}">
        <option value="Admin" ${member.role === "Admin" ? "selected" : ""}>Admin</option>
        <option value="Member" ${member.role === "Member" ? "selected" : ""}>Member</option>
      </select>
      ${renderPresenceBadge(member.name)}
      <button type="button" class="danger-btn team-remove-btn" data-team-email="${escapeHTML(member.email)}">Remove</button>
    </div>
  `).join("");
}

function refreshTeamDirectoryUI() {
  groupMembers = getTeamMembersForApp();
  syncTaskAssigneeOptions();
  renderTeamMembers();
  renderChatUsers();
  renderPresenceUI();
  updateDashboardInsights();
  updateDashboardCounts();
  applyRoleBasedUI();

  if (typeof window.renderGroupManagement === "function") window.renderGroupManagement();
  if (typeof window.refreshGroupRooms === "function") window.refreshGroupRooms();
}

function canAssignTasks(user = getUserFromLocalStorage()) {
  return normalizeUserRole(user?.role) === "Admin";
}

function getTaskAssignees(task) {
  if (Array.isArray(task.assignees)) {
    return task.assignees.filter(Boolean);
  }

  if (typeof task.assignedTo === "string" && task.assignedTo.trim()) {
    return task.assignedTo
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);
  }

  return [];
}

function formatTaskAssignees(taskOrAssignees) {
  const assignees = Array.isArray(taskOrAssignees)
    ? taskOrAssignees
    : getTaskAssignees(taskOrAssignees);

  return assignees.length ? assignees.join(", ") : "Unassigned";
}

function applyRoleBasedUI() {
  const isAdmin = canAssignTasks();

  if (openTaskModalBtn) {
    openTaskModalBtn.disabled = !isAdmin;
    openTaskModalBtn.title = isAdmin ? t("task.createAssignTitle") : t("task.memberAssignTitle");
  }

  if (taskAssignedToInput) {
    taskAssignedToInput.disabled = !isAdmin;
  }

  if (taskAssignmentHelp) {
    taskAssignmentHelp.textContent = isAdmin
      ? t("task.assignmentHelp")
      : t("task.memberAssignmentHelp");
  }
}

function getPresenceFromStorage() {
  try {
    const savedPresence = localStorage.getItem(PRESENCE_STORAGE_KEY);
    return savedPresence ? JSON.parse(savedPresence) : {};
  } catch {
    return {};
  }
}

function savePresenceToStorage(presence) {
  localStorage.setItem(PRESENCE_STORAGE_KEY, JSON.stringify(presence));
}

function updateCurrentUserPresence(status = "online") {
  const user = getUserFromLocalStorage();
  const userName = user?.name || user?.email;
  if (!userName) return;

  const presence = getPresenceFromStorage();
  presence[userName] = {
    status,
    lastSeen: new Date().toISOString()
  };

  savePresenceToStorage(presence);

  if (presenceChannel) {
    presenceChannel.postMessage({ type: "presence", userName, status });
  }
}

function isUserOnline(memberName) {
  const presence = getPresenceFromStorage();
  const record = presence[memberName];
  if (!record || record.status === "offline") return false;

  const lastSeen = new Date(record.lastSeen);
  if (Number.isNaN(lastSeen.getTime())) return false;

  return Date.now() - lastSeen.getTime() <= PRESENCE_ONLINE_WINDOW_MS;
}

function renderPresenceBadge(memberName) {
  const online = isUserOnline(memberName);
  const statusClass = online ? "presence-online" : "presence-offline";
  const statusText = online ? "Online" : "Offline";

  return `<span class="presence-badge ${statusClass}">${statusText}</span>`;
}

function renderPresenceUI() {
  const user = getUserFromLocalStorage();
  const userName = user?.name || user?.email;

  if (sidebarPresenceStatus && userName) {
    const online = isUserOnline(userName);
    sidebarPresenceStatus.className = `presence-badge ${online ? "presence-online" : "presence-offline"}`;
    sidebarPresenceStatus.textContent = online ? "Online" : "Offline";
  }

  document.querySelectorAll("[data-team-member]").forEach((card) => {
    const memberName = card.getAttribute("data-team-member");
    const badge = card.querySelector(".presence-badge");
    if (!memberName || !badge) return;

    const online = isUserOnline(memberName);
    badge.className = `presence-badge ${online ? "presence-online" : "presence-offline"}`;
    badge.textContent = online ? "Online" : "Offline";
  });

  renderChatUsers();
}

function setupPresenceTracking() {
  if ("BroadcastChannel" in window) {
    presenceChannel = new BroadcastChannel("ttm_presence_channel");
    presenceChannel.addEventListener("message", (event) => {
      if (event.data?.type === "presence") renderPresenceUI();
    });
  }

  updateCurrentUserPresence();
  renderPresenceUI();

  if (presenceHeartbeatTimer) clearInterval(presenceHeartbeatTimer);
  presenceHeartbeatTimer = setInterval(() => {
    updateCurrentUserPresence();
    renderPresenceUI();
  }, PRESENCE_HEARTBEAT_MS);

  window.addEventListener("beforeunload", () => updateCurrentUserPresence("offline"));
}

function cloneDefaultTasks() {
  return JSON.parse(JSON.stringify(defaultTasks));
}

function cloneDefaultNotifications() {
  return JSON.parse(JSON.stringify(defaultNotifications));
}

function escapeHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatFileSize(size) {
  const bytes = Number(size) || 0;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileTypeLabel(type, name = "") {
  if (type) return type.split("/")[1]?.toUpperCase() || type;
  const extension = String(name).split(".").pop();
  return extension && extension !== name ? extension.toUpperCase() : "FILE";
}

function normalizeAttachment(attachment) {
  if (!attachment || typeof attachment !== "object") return null;
  if (!attachment.dataUrl || !attachment.name) return null;

  return {
    id: attachment.id || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: String(attachment.name),
    type: attachment.type || "",
    size: Number(attachment.size) || 0,
    dataUrl: attachment.dataUrl,
    kind: attachment.kind === "voice" ? "voice" : "file",
    createdAt: attachment.createdAt || ""
  };
}

function normalizeAttachments(attachments) {
  if (!Array.isArray(attachments)) return [];
  return attachments.map(normalizeAttachment).filter(Boolean);
}

function readFileAsAttachment(file, kind = "file", maxSize = MAX_ATTACHMENT_SIZE) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    if (file.size > maxSize) {
      reject(new Error(`${file.name} is too large. Maximum size is ${formatFileSize(maxSize)}.`));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: file.name || (kind === "voice" ? "Voice message.webm" : "Attachment"),
        type: file.type || "",
        size: file.size || 0,
        dataUrl: reader.result,
        kind,
        createdAt: new Date().toISOString()
      });
    };
    reader.onerror = () => reject(new Error("Unable to read the selected file."));
    reader.readAsDataURL(file);
  });
}

async function readInputAttachments(input, maxSize = MAX_ATTACHMENT_SIZE) {
  const files = Array.from(input?.files || []);
  if (files.length > 3) {
    throw new Error("Please attach no more than 3 files at a time.");
  }
  const attachments = [];

  for (const file of files) {
    attachments.push(await readFileAsAttachment(file, "file", maxSize));
  }

  return attachments.filter(Boolean);
}

function renderAttachmentList(attachments, className = "attachment-list") {
  const safeAttachments = normalizeAttachments(attachments);
  if (safeAttachments.length === 0) return "";

  return `
    <div class="${className}">
      ${safeAttachments.map((attachment) => `
        <a class="attachment-chip ${attachment.kind === "voice" ? "voice-attachment" : ""}"
          href="${attachment.dataUrl}"
          download="${escapeHTML(attachment.name)}"
          target="_blank"
          rel="noopener noreferrer">
          <span class="attachment-icon">${attachment.kind === "voice" ? "Audio" : getFileTypeLabel(attachment.type, attachment.name)}</span>
          <span class="attachment-meta">
            <strong>${escapeHTML(attachment.name)}</strong>
            <small>${escapeHTML(getFileTypeLabel(attachment.type, attachment.name))} &bull; ${formatFileSize(attachment.size)}</small>
          </span>
        </a>
      `).join("")}
    </div>
  `;
}

function renderMessageAttachments(attachments) {
  const safeAttachments = normalizeAttachments(attachments);
  if (safeAttachments.length === 0) return "";

  return safeAttachments.map((attachment) => {
    if (attachment.kind === "voice") {
      return `
        <div class="voice-message">
          <audio controls src="${attachment.dataUrl}"></audio>
          <a href="${attachment.dataUrl}" download="${escapeHTML(attachment.name)}">Download voice</a>
        </div>
      `;
    }

    return renderAttachmentList([attachment], "message-attachments");
  }).join("");
}

function clearAttachmentPreview(input, container, previewUrls) {
  previewUrls.forEach((url) => URL.revokeObjectURL(url));
  previewUrls.length = 0;
  if (input) input.value = "";
  if (container) {
    container.innerHTML = "";
    container.classList.add("hidden");
  }
}

function renderComposerAttachmentPreview(input, container, previewUrls) {
  if (!input || !container) return;

  previewUrls.forEach((url) => URL.revokeObjectURL(url));
  previewUrls.length = 0;

  const files = Array.from(input.files || []);
  if (files.length === 0) {
    container.innerHTML = "";
    container.classList.add("hidden");
    return;
  }

  container.classList.remove("hidden");
  container.innerHTML = `
    <div class="composer-preview-header">
      <span>${files.length} file${files.length === 1 ? "" : "s"} ready to send</span>
      <button type="button" class="composer-preview-remove">Remove</button>
    </div>
    <div class="composer-preview-list">
      ${files.map((file) => {
        const isImage = file.type.startsWith("image/");
        const imageUrl = isImage ? URL.createObjectURL(file) : "";
        if (imageUrl) previewUrls.push(imageUrl);

        return `
          <div class="composer-preview-item">
            ${isImage
              ? `<img src="${imageUrl}" alt="${escapeHTML(file.name)}" />`
              : `<span class="attachment-icon">${escapeHTML(getFileTypeLabel(file.type, file.name))}</span>`
            }
            <span class="attachment-meta">
              <strong>${escapeHTML(file.name)}</strong>
              <small>${escapeHTML(getFileTypeLabel(file.type, file.name))} &bull; ${formatFileSize(file.size)}</small>
            </span>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function clearPrivateAttachmentPreview() {
  clearAttachmentPreview(chatFileInput, chatAttachmentPreview, privateAttachmentPreviewUrls);
}

function renderPrivateAttachmentPreview() {
  renderComposerAttachmentPreview(chatFileInput, chatAttachmentPreview, privateAttachmentPreviewUrls);
}

function getStoredGroupMessagesForDrive() {
  try {
    const saved = localStorage.getItem("ttm_group_messages");
    const parsed = saved ? JSON.parse(saved) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function collectDriveFiles() {
  const files = [];

  getTasksFromStorage().forEach((task) => {
    normalizeAttachments(task.attachments).forEach((attachment) => {
      files.push({
        ...attachment,
        source: "Task",
        sourceDetail: task.title || "Untitled task"
      });
    });
  });

  const chats = getChatsFromStorage();
  Object.entries(chats).forEach(([memberName, messages]) => {
    (messages || []).forEach((message) => {
      normalizeAttachments(message.attachments).forEach((attachment) => {
        files.push({
          ...attachment,
          source: "Chat",
          sourceDetail: memberName,
          createdAt: attachment.createdAt || message.timestamp || ""
        });
      });
    });
  });

  const groupMessages = getStoredGroupMessagesForDrive();
  Object.entries(groupMessages).forEach(([roomName, messages]) => {
    (Array.isArray(messages) ? messages : []).forEach((message) => {
      normalizeAttachments(message.attachments).forEach((attachment) => {
        files.push({
          ...attachment,
          source: "Group Chat",
          sourceDetail: roomName,
          createdAt: attachment.createdAt || message.timestamp || ""
        });
      });
    });
  });

  return files.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

function formatDriveDate(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return t("drive.unknownDate");

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function isSafeDriveDataUrl(dataUrl) {
  return typeof dataUrl === "string" && dataUrl.startsWith("data:");
}

function getDrivePreviewType(file) {
  const type = String(file?.type || "").toLowerCase();
  const name = String(file?.name || "").toLowerCase();

  if (!isSafeDriveDataUrl(file?.dataUrl)) return "unsupported";
  if (type.startsWith("image/")) return "image";
  if (type.startsWith("audio/") || file?.kind === "voice") return "audio";
  if (type === "application/pdf" || name.endsWith(".pdf")) return "frame";
  if (type.startsWith("text/") || name.endsWith(".txt") || name.endsWith(".csv")) return "frame";
  return "unsupported";
}

function ensureDrivePreviewModal() {
  let modal = document.getElementById("drive-preview-modal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.id = "drive-preview-modal";
  modal.className = "modal-overlay hidden";
  modal.innerHTML = `
    <div class="drive-preview-modal" role="dialog" aria-modal="true" aria-labelledby="drive-preview-title">
      <div class="drive-preview-header">
        <div>
          <h3 id="drive-preview-title">${escapeHTML(t("drive.filePreview"))}</h3>
          <p id="drive-preview-meta"></p>
        </div>
        <button type="button" class="secondary-btn drive-preview-close" aria-label="${escapeHTML(t("drive.closePreview"))}">${escapeHTML(t("actions.cancel"))}</button>
      </div>
      <div id="drive-preview-body" class="drive-preview-body"></div>
      <div class="drive-preview-footer">
        <a id="drive-preview-download" class="primary-btn" href="#" download>${escapeHTML(t("drive.download"))}</a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  modal.addEventListener("click", (event) => {
    const closeButton = event.target instanceof Element ? event.target.closest(".drive-preview-close") : null;
    if (event.target === modal || closeButton) {
      closeDrivePreviewModal();
    }
  });

  return modal;
}

function closeDrivePreviewModal() {
  const modal = document.getElementById("drive-preview-modal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

function openDriveFilePreview(file) {
  const modal = ensureDrivePreviewModal();
  const title = modal.querySelector("#drive-preview-title");
  const meta = modal.querySelector("#drive-preview-meta");
  const body = modal.querySelector("#drive-preview-body");
  const download = modal.querySelector("#drive-preview-download");
  const closeButton = modal.querySelector(".drive-preview-close");

  if (!body || !download) return;

  const previewType = getDrivePreviewType(file);
  const safeName = escapeHTML(file?.name || "Attachment");
  const safeType = escapeHTML(getFileTypeLabel(file?.type, file?.name));
  const safeSize = formatFileSize(file?.size);

  if (title) title.textContent = file?.name || "Attachment";
  if (meta) meta.textContent = `${getFileTypeLabel(file?.type, file?.name)} • ${safeSize}`;

  if (closeButton) {
    closeButton.textContent = t("actions.cancel");
    closeButton.setAttribute("aria-label", t("drive.closePreview"));
  }
  download.textContent = t("drive.download");
  download.href = isSafeDriveDataUrl(file?.dataUrl) ? file.dataUrl : "#";
  download.setAttribute("download", file?.name || "attachment");

  if (previewType === "image") {
    body.innerHTML = `<img class="drive-preview-image" src="${file.dataUrl}" alt="${safeName}" />`;
  } else if (previewType === "audio") {
    body.innerHTML = `<audio class="drive-preview-audio" controls src="${file.dataUrl}"></audio>`;
  } else if (previewType === "frame") {
    body.innerHTML = `<iframe class="drive-preview-frame" src="${file.dataUrl}" title="${safeName}"></iframe>`;
  } else {
    body.innerHTML = `
      <div class="drive-preview-unavailable">
        <span>${safeType}</span>
        <h4>${escapeHTML(t("drive.previewUnavailable"))}</h4>
        <p>${escapeHTML(t("drive.downloadFallback"))}</p>
      </div>
    `;
  }

  modal.classList.remove("hidden");
}

function renderGoogleDriveFiles() {
  if (!driveFileGrid) return;

  currentDriveFiles = collectDriveFiles();
  if (currentDriveFiles.length === 0) {
    driveFileGrid.innerHTML = `
      <div class="drive-empty">
        <h4>${escapeHTML(t("drive.emptyTitle"))}</h4>
        <p>${escapeHTML(t("drive.emptyBody"))}</p>
      </div>
    `;
    return;
  }

  driveFileGrid.innerHTML = currentDriveFiles.map((file, index) => {
    const isImage = String(file.type || "").startsWith("image/");
    return `
      <article class="drive-file-card">
        <div class="drive-file-preview">
          ${isImage
            ? `<img src="${file.dataUrl}" alt="${escapeHTML(file.name)}" />`
            : `<span>${escapeHTML(file.kind === "voice" ? "AUDIO" : getFileTypeLabel(file.type, file.name))}</span>`
          }
        </div>
        <div class="drive-file-info">
          <h4>${escapeHTML(file.name)}</h4>
          <p>${escapeHTML(file.source)} &bull; ${escapeHTML(file.sourceDetail)}</p>
          <p>${escapeHTML(getFileTypeLabel(file.type, file.name))} &bull; ${formatFileSize(file.size)} &bull; ${formatDriveDate(file.createdAt)}</p>
        </div>
        <div class="drive-file-actions">
          <button class="secondary-btn" type="button" data-drive-open="${index}">${escapeHTML(t("drive.open"))}</button>
          <a class="primary-btn" href="${file.dataUrl}" download="${escapeHTML(file.name)}">${escapeHTML(t("drive.download"))}</a>
        </div>
      </article>
    `;
  }).join("");
}

window.renderGoogleDriveFiles = renderGoogleDriveFiles;

function isValidTaskList(tasks) {
  if (!Array.isArray(tasks)) return false;
  if (tasks.length === 0) return true;

  return tasks.every((task) => (
    task &&
    typeof task.title === "string" &&
    typeof task.status === "string" &&
    ["Pending", "In Progress", "Completed"].includes(task.status)
  ));
}

function normalizeTaskList(tasks) {
  return tasks.map((task) => {
    const assignees = getTaskAssignees(task);

    return {
      ...task,
      assignedTo: formatTaskAssignees(assignees),
      assignees,
      tags: Array.isArray(task.tags) ? task.tags : [],
      comments: Array.isArray(task.comments) ? task.comments : [],
      attachments: normalizeAttachments(task.attachments)
    };
  });
}

function isValidNotificationList(notifications) {
  if (!Array.isArray(notifications)) return false;
  if (notifications.length === 0) return true;

  return notifications.every((notification) => (
    notification &&
    typeof notification.title === "string" &&
    typeof notification.message === "string"
  ));
}

function showDashboardSection() {
  navItems.forEach((item) => {
    item.classList.toggle("active", item.getAttribute("data-section") === "dashboard-section");
  });

  sections.forEach((section) => {
    section.classList.toggle("active-section", section.id === "dashboard-section");
  });

  if (pageTitle) pageTitle.textContent = t("nav.dashboard");
  updateTopbarTaskAction("dashboard-section");
}

function updateTopbarTaskAction(sectionId) {
  if (!openTaskModalBtn) return;

  const shouldShow = sectionId === "dashboard-section" || sectionId === "tasks-section";
  openTaskModalBtn.classList.toggle("hidden", !shouldShow);
}

function getTasksFromStorage() {
  const savedTasks = localStorage.getItem("ttm_tasks");

  if (!savedTasks) {
    const tasks = normalizeTaskList(cloneDefaultTasks());
    localStorage.setItem("ttm_tasks", JSON.stringify(tasks));
    return tasks;
  }

  try {
    const tasks = normalizeTaskList(JSON.parse(savedTasks));
    if (!isValidTaskList(tasks)) throw new Error("Invalid task storage");
    localStorage.setItem("ttm_tasks", JSON.stringify(tasks));
    return tasks;
  } catch {
    const tasks = normalizeTaskList(cloneDefaultTasks());
    localStorage.setItem("ttm_tasks", JSON.stringify(tasks));
    return tasks;
  }
}

function saveTasksToStorage(tasks) {
  try {
    localStorage.setItem("ttm_tasks", JSON.stringify(tasks));
  } catch (error) {
    alert("Unable to save task data. Please remove large attachments and try again.");
    throw error;
  }
}

function getNotificationsFromStorage() {
  const savedNotifications = localStorage.getItem("ttm_notifications");

  if (!savedNotifications) {
    const notifications = cloneDefaultNotifications();
    localStorage.setItem("ttm_notifications", JSON.stringify(notifications));
    return notifications;
  }

  try {
    const notifications = JSON.parse(savedNotifications);
    if (!isValidNotificationList(notifications)) throw new Error("Invalid notification storage");
    return notifications;
  } catch {
    const notifications = cloneDefaultNotifications();
    localStorage.setItem("ttm_notifications", JSON.stringify(notifications));
    return notifications;
  }
}

function saveNotificationsToStorage(notifications) {
  localStorage.setItem("ttm_notifications", JSON.stringify(notifications));
}

function getChatsFromStorage() {
  const savedChats = localStorage.getItem("ttm_chats");

  if (!savedChats) {
    const chats = normalizeChatConversations(defaultChatConversations);
    localStorage.setItem("ttm_chats", JSON.stringify(chats));
    return chats;
  }

  try {
    const chats = normalizeChatConversations(JSON.parse(savedChats));
    localStorage.setItem("ttm_chats", JSON.stringify(chats));
    return chats;
  } catch {
    const chats = normalizeChatConversations(defaultChatConversations);
    localStorage.setItem("ttm_chats", JSON.stringify(chats));
    return chats;
  }
}

function saveChatsToStorage(chats) {
  try {
    localStorage.setItem("ttm_chats", JSON.stringify(chats));
  } catch (error) {
    alert("Unable to save chat data. Please remove large attachments and try again.");
    throw error;
  }
}

function normalizeChatConversations(chats) {
  const normalizedChats = {};
  const sourceChats = chats && typeof chats === "object" ? chats : {};

  groupMembers.forEach((member) => {
    const messages = Array.isArray(sourceChats[member.name])
      ? sourceChats[member.name]
      : [];

    normalizedChats[member.name] = messages.map((message, index) => normalizeChatMessage(message, index));
  });

  return normalizedChats;
}

function normalizeChatMessage(message, index) {
  const messageType = message?.type === "sent" ? "sent" : "received";
  const fallbackTime = new Date(Date.now() - (index + 1) * 60000).toISOString();

  return {
    sender: message?.sender || (messageType === "sent" ? getCurrentUserName() : "Team"),
    text: message?.text || "",
    type: messageType,
    timestamp: message?.timestamp || fallbackTime,
    read: messageType === "sent" ? true : message?.read === true,
    attachments: normalizeAttachments(message?.attachments)
  };
}

function isKnownDemoName(value) {
  return ["rahul", "sneha", "amit", "priya", "demo user", "you"]
    .includes(String(value || "").trim().toLowerCase());
}

function isKnownDemoEmail(value) {
  return [
    "demo@company.com",
    "rahul@example.com",
    "sneha@example.com",
    "amit@example.com",
    "priya@example.com"
  ].includes(String(value || "").trim().toLowerCase());
}

function isKnownDemoTask(task) {
  const signature = [
    task?.title,
    task?.description,
    task?.severity,
    task?.status,
    task?.deadline
  ].map((part) => String(part || "").trim().toLowerCase()).join("|");

  return new Set([
    "prepare sales presentation|prepare the sales presentation for leadership review|high|in progress|2026-04-20",
    "update product pricing sheet|refresh pricing sheet with latest numbers|low|completed|2026-04-18",
    "client follow-up email|send follow-up email to the client|medium|pending|2026-04-17",
    "prepare charts|prepare charts for the team dashboard|medium|pending|2026-04-22",
    "prepare charts|prepare charts for the manager dashboard|medium|in progress|2026-04-23"
  ]).has(signature);
}

function isKnownDemoNotification(notification) {
  const signature = `${String(notification?.title || "").trim().toLowerCase()}|${String(notification?.message || "").trim().toLowerCase()}`;
  return new Set([
    'new task assigned|you have been assigned "prepare weekly status report"',
    'task completed|sneha completed "update pricing sheet"',
    "new message|rahul sent you a message",
    'task due soon|"prepare sales presentation" is due soon',
    'task updated|priya updated "prepare charts"'
  ]).has(signature);
}

function isKnownDemoChatMessage(message) {
  const signature = `${String(message?.sender || "").trim().toLowerCase()}|${String(message?.text || "").trim().toLowerCase()}`;
  return new Set([
    "rahul|hi, please share the task status.",
    "you|i am working on it.",
    "sneha|pricing sheet has been updated.",
    "amit|okay, please update by evening.",
    "priya|please share the latest design version.",
    "rahul|please review the latest task updates.",
    "rahul|please update your task status before eod.",
    "amit|development tasks are on track.",
    "rahul|sprint review is scheduled for friday at 3 pm."
  ]).has(signature);
}

function safeReadStorageJSON(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function cleanupDemoDataFromStorage() {
  const savedUser = safeReadStorageJSON("ttm_logged_in_user", null);
  if (savedUser && (isKnownDemoEmail(savedUser.email) || String(savedUser.name || "").trim().toLowerCase() === "demo user")) {
    localStorage.removeItem("ttm_logged_in_user");
  }

  const tasks = safeReadStorageJSON("ttm_tasks", []);
  if (Array.isArray(tasks)) {
    localStorage.setItem("ttm_tasks", JSON.stringify(tasks.filter((task) => !isKnownDemoTask(task))));
  } else {
    localStorage.setItem("ttm_tasks", JSON.stringify([]));
  }

  const notifications = safeReadStorageJSON("ttm_notifications", []);
  if (Array.isArray(notifications)) {
    localStorage.setItem("ttm_notifications", JSON.stringify(notifications.filter((notification) => !isKnownDemoNotification(notification))));
  } else {
    localStorage.setItem("ttm_notifications", JSON.stringify([]));
  }

  const chats = safeReadStorageJSON("ttm_chats", {});
  const cleanedChats = {};
  if (chats && typeof chats === "object") {
    Object.entries(chats).forEach(([memberName, messages]) => {
      if (isKnownDemoName(memberName)) return;
      const cleanedMessages = Array.isArray(messages)
        ? messages.filter((message) => !isKnownDemoChatMessage(message))
        : [];
      if (cleanedMessages.length) cleanedChats[memberName] = cleanedMessages;
    });
  }
  localStorage.setItem("ttm_chats", JSON.stringify(cleanedChats));

  const groupMessages = safeReadStorageJSON("ttm_group_messages", {});
  const cleanedGroupMessages = {};
  if (groupMessages && typeof groupMessages === "object") {
    Object.entries(groupMessages).forEach(([room, messages]) => {
      cleanedGroupMessages[room] = Array.isArray(messages)
        ? messages.filter((message) => !isKnownDemoChatMessage(message))
        : [];
    });
  }
  localStorage.setItem("ttm_group_messages", JSON.stringify(cleanedGroupMessages));

  const teamMembers = safeReadStorageJSON("ttm_team_members", []);
  if (Array.isArray(teamMembers)) {
    localStorage.setItem("ttm_team_members", JSON.stringify(teamMembers.filter((member) => !isKnownDemoEmail(member?.email))));
  } else {
    localStorage.setItem("ttm_team_members", JSON.stringify([]));
  }

  const teamGroups = safeReadStorageJSON("ttm_team_groups", []);
  if (Array.isArray(teamGroups)) {
    localStorage.setItem("ttm_team_groups", JSON.stringify(teamGroups.filter((group) => {
      const members = Array.isArray(group?.members) ? group.members : [];
      if (!members.length) return true;
      return members.some((email) => !isKnownDemoEmail(email));
    })));
  } else {
    localStorage.setItem("ttm_team_groups", JSON.stringify([]));
  }
}

function getUnreadChatCount(memberName) {
  const chats = getChatsFromStorage();
  const conversation = chats[memberName] || [];

  return conversation.filter((message) => message.type === "received" && !message.read).length;
}

function markConversationAsRead(memberName) {
  const chats = getChatsFromStorage();
  const conversation = chats[memberName] || [];
  let changed = false;

  conversation.forEach((message) => {
    if (message.type === "received" && !message.read) {
      message.read = true;
      changed = true;
    }
  });

  if (changed) saveChatsToStorage(chats);
}

function migrateAppStorageIfNeeded() {
  try {
    localStorage.removeItem("ttm_member_registry");
  } catch {}

  if (localStorage.getItem("ttm_app_storage_version") === APP_STORAGE_VERSION) return;

  cleanupDemoDataFromStorage();
  localStorage.setItem("ttm_app_storage_version", APP_STORAGE_VERSION);
}

// -----------------------------
// NAVIGATION
// -----------------------------
function setupNavigation() {
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((btn) => btn.classList.remove("active"));
      item.classList.add("active");

      sections.forEach((section) => section.classList.remove("active-section"));

      const targetSectionId = item.getAttribute("data-section");
      const targetSection = document.getElementById(targetSectionId);

      if (targetSection) {
        targetSection.classList.add("active-section");
      }

      if (pageTitle) pageTitle.textContent = item.querySelector(".nav-label")?.textContent || item.textContent.trim();
      updateTopbarTaskAction(targetSectionId);
      closeMobileNav();
    });
  });
}

// -----------------------------
// CHAT
// -----------------------------
function renderChatUsers() {
  if (!chatUsersList) return;

  chatUsersList.innerHTML = "";

  const activeMembers = groupMembers.filter((member) => member.active);
  if (activeMembers.length && !activeMembers.some((member) => member.name === selectedChatMember)) {
    selectedChatMember = activeMembers[0].name;
  }

  if (!activeMembers.length) {
    selectedChatMember = "";
    chatUsersList.innerHTML = `
      <div class="team-empty">
        <h4>${escapeHTML(t("team.noMembersTitle"))}</h4>
        <p>${escapeHTML(t("team.noMembersBody"))}</p>
      </div>
    `;
    return;
  }

  activeMembers.forEach((member) => {
    const unreadCount = getUnreadChatCount(member.name);
    const userDiv = document.createElement("div");
    userDiv.className =
      member.name === selectedChatMember ? "chat-user active-chat-user" : "chat-user";

    userDiv.innerHTML = `
      <div>
        <strong>${member.name}</strong><br>
        <small>${member.role}</small>
        ${renderPresenceBadge(member.name)}
      </div>
      ${unreadCount > 0 ? `<span class="chat-unread-badge">${unreadCount}</span>` : ""}
    `;

    userDiv.addEventListener("click", function () {
      selectedChatMember = member.name;
      renderSelectedChatMessages();
      renderChatUsers();
    });

    chatUsersList.appendChild(userDiv);
  });
}

function scrollChatToBottom() {
  if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getCurrentUserName() {
  const user = getUserFromLocalStorage();
  return user?.name || user?.email || "User";
}

function formatChatMessageTime(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

function getChatDisplaySender(message) {
  if (message.type === "sent" || message.sender === "You") {
    return getCurrentUserName();
  }

  return message.sender || selectedChatMember || "Team";
}

function createMessageBubble(message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message-bubble", message.type);
  const senderName = getChatDisplaySender(message);
  const messageTextMarkup = message.text
    ? `<div><strong>${escapeHTML(senderName)}:</strong> ${escapeHTML(message.text)}</div>`
    : `<div><strong>${escapeHTML(senderName)}:</strong></div>`;
  messageDiv.innerHTML = `
    ${messageTextMarkup}
    ${renderMessageAttachments(message.attachments)}
    <span class="message-time">
      ${escapeHTML(formatChatMessageTime(message.timestamp))}
      ${message.type === "received" && !message.read ? " &bull; Unread" : ""}
    </span>
  `;
  return messageDiv;
}

function renderPrivateTypingIndicator(name = "") {
  if (!chatTypingIndicator) return;

  if (!name) {
    chatTypingIndicator.classList.add("hidden");
    chatTypingIndicator.innerHTML = "";
    return;
  }

  chatTypingIndicator.classList.remove("hidden");
  chatTypingIndicator.innerHTML = `
    <div class="typing-indicator-inner">
      <span class="typing-dots"><span></span><span></span><span></span></span>
      <span class="typing-indicator-text">${escapeHTML(name)} is typing...</span>
    </div>
  `;
}

function broadcastPrivateTyping(isTyping) {
  if (!privateChatChannel) return;

  privateChatChannel.postMessage({
    type: "typing",
    from: getCurrentUserName(),
    to: selectedChatMember,
    isTyping
  });
}

function setupPrivateChatChannel() {
  if (!("BroadcastChannel" in window)) return;

  privateChatChannel = new BroadcastChannel("ttm_private_chat_channel");
  privateChatChannel.addEventListener("message", (event) => {
    const data = event.data || {};
    if (data.type !== "typing") return;
    if (!data.from || data.from === getCurrentUserName()) return;
    if (data.from !== selectedChatMember) return;

    renderPrivateTypingIndicator(data.isTyping ? data.from : "");

    if (privateTypingTimer) clearTimeout(privateTypingTimer);
    if (data.isTyping) {
      privateTypingTimer = setTimeout(() => renderPrivateTypingIndicator(""), 1800);
    }
  });
}

function renderSelectedChatMessages() {
  if (!chatMessages) return;

  if (!selectedChatMember) {
    chatMessages.innerHTML = `
      <div class="message-bubble received">
        <strong>${escapeHTML(t("chat.system"))}:</strong> ${escapeHTML(t("chat.noMembers"))}
      </div>
    `;
    renderPrivateTypingIndicator("");
    return;
  }

  const chats = getChatsFromStorage();
  const selectedConversation = chats[selectedChatMember] || [];

  chatMessages.innerHTML = "";

  if (!selectedConversation.length) {
    chatMessages.innerHTML = `
      <div class="message-bubble received">
        <strong>${escapeHTML(t("chat.system"))}:</strong> ${escapeHTML(t("chat.noMessages"))}
      </div>
    `;
    renderPrivateTypingIndicator("");
    return;
  }

  selectedConversation.forEach((message) => {
    const bubble = createMessageBubble(message);
    chatMessages.appendChild(bubble);
  });

  renderPrivateTypingIndicator("");
  markConversationAsRead(selectedChatMember);
  scrollChatToBottom();
}

async function sendMessage() {
  if (!chatInput) return;

  if (!selectedChatMember) {
    alert("Add a team member before sending a chat message.");
    return;
  }

  const messageText = chatInput.value.trim();
  let attachments = [];

  try {
    attachments = await readInputAttachments(chatFileInput, MAX_ATTACHMENT_SIZE);
  } catch (error) {
    alert(error.message || "Unable to attach the selected file.");
    return;
  }

  if (!messageText && attachments.length === 0) return;

  const chats = getChatsFromStorage();

  if (!chats[selectedChatMember]) {
    chats[selectedChatMember] = [];
  }

  chats[selectedChatMember].push({
    sender: getCurrentUserName(),
    text: messageText,
    type: "sent",
    timestamp: new Date().toISOString(),
    read: true,
    attachments
  });

  saveChatsToStorage(chats);
  chatInput.value = "";
  clearPrivateAttachmentPreview();
  broadcastPrivateTyping(false);
  renderPrivateTypingIndicator("");
  renderSelectedChatMessages();
  renderChatUsers();
  renderGoogleDriveFiles();

  addNotification("New chat message", `${getCurrentUserName()} sent a message to ${selectedChatMember}`);
}

function setPrivateVoicePanel(state, message = "") {
  if (!chatVoicePanel) return;

  const isIdle = state === "idle";
  chatVoicePanel.classList.toggle("hidden", isIdle);
  if (chatVoiceStatus) chatVoiceStatus.textContent = message;
  if (chatStopRecordBtn) chatStopRecordBtn.classList.toggle("hidden", state !== "recording");
  if (chatSendVoiceBtn) chatSendVoiceBtn.classList.toggle("hidden", state !== "ready");
}

async function startPrivateVoiceRecording() {
  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
    alert("Voice recording is not supported in this browser.");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    privateVoiceChunks = [];
    privateVoiceAttachment = null;
    privateVoiceCancelled = false;
    privateVoiceRecorder = new MediaRecorder(stream);

    privateVoiceRecorder.addEventListener("dataavailable", (event) => {
      if (event.data?.size) privateVoiceChunks.push(event.data);
    });

    privateVoiceRecorder.addEventListener("stop", async () => {
      stream.getTracks().forEach((track) => track.stop());
      if (privateVoiceCancelled) {
        privateVoiceChunks = [];
        privateVoiceAttachment = null;
        setPrivateVoicePanel("idle");
        return;
      }
      const blob = new Blob(privateVoiceChunks, { type: privateVoiceRecorder?.mimeType || "audio/webm" });

      if (blob.size > MAX_VOICE_SIZE) {
        privateVoiceAttachment = null;
        setPrivateVoicePanel("idle");
        alert(`Voice message is too large. Maximum size is ${formatFileSize(MAX_VOICE_SIZE)}.`);
        return;
      }

      const file = new File([blob], `Voice message ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}.webm`, {
        type: blob.type || "audio/webm"
      });
      privateVoiceAttachment = await readFileAsAttachment(file, "voice", MAX_VOICE_SIZE);
      setPrivateVoicePanel("ready", "Voice message ready to send.");
    });

    privateVoiceRecorder.start();
    setPrivateVoicePanel("recording", "Recording voice message...");
  } catch {
    setPrivateVoicePanel("idle");
    alert("Microphone access was denied or unavailable.");
  }
}

function stopPrivateVoiceRecording() {
  if (privateVoiceRecorder && privateVoiceRecorder.state === "recording") {
    privateVoiceRecorder.stop();
  }
}

function cancelPrivateVoiceRecording() {
  privateVoiceCancelled = true;
  if (privateVoiceRecorder && privateVoiceRecorder.state === "recording") {
    privateVoiceRecorder.stream?.getTracks().forEach((track) => track.stop());
    privateVoiceRecorder.stop();
  }
  privateVoiceAttachment = null;
  privateVoiceChunks = [];
  setPrivateVoicePanel("idle");
}

function sendPrivateVoiceMessage() {
  if (!privateVoiceAttachment) return;

  const chats = getChatsFromStorage();
  if (!chats[selectedChatMember]) chats[selectedChatMember] = [];

  chats[selectedChatMember].push({
    sender: getCurrentUserName(),
    text: "",
    type: "sent",
    timestamp: new Date().toISOString(),
    read: true,
    attachments: [privateVoiceAttachment]
  });

  saveChatsToStorage(chats);
  privateVoiceAttachment = null;
  privateVoiceChunks = [];
  setPrivateVoicePanel("idle");
  renderSelectedChatMessages();
  renderChatUsers();
  renderGoogleDriveFiles();
  addNotification("Voice message sent", `${getCurrentUserName()} sent a voice message to ${selectedChatMember}`);
}

// -----------------------------
// MEETINGS / CALLS
// -----------------------------
const MEETING_CHANNEL_PREFIX = "ttm_meeting_";
const MEETING_STORAGE_KEY = "ttm_meeting_sessions";
const MEETING_RTC_CONFIG = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

function getMeetingsFromStorage() {
  try {
    const saved = localStorage.getItem(MEETING_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveMeetingsToStorage(meetings) {
  localStorage.setItem(MEETING_STORAGE_KEY, JSON.stringify(meetings));
}

function upsertMeetingSession(session) {
  const meetings = getMeetingsFromStorage();
  meetings[session.id] = session;
  saveMeetingsToStorage(meetings);
}

function getMeetingById(sessionId) {
  return getMeetingsFromStorage()[sessionId] || null;
}

function createMeetingSession(context) {
  const session = {
    id: `meet-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type: context.type || "private",
    title: context.title || "Meeting",
    target: context.target || "",
    createdBy: getCurrentUserName(),
    createdAt: new Date().toISOString()
  };
  upsertMeetingSession(session);
  return session;
}

function getMeetingLink(sessionId) {
  const url = new URL(window.location.href);
  url.hash = `meeting=${encodeURIComponent(sessionId)}`;
  return url.toString();
}

function ensureMeetingModal() {
  let modal = document.getElementById("meeting-modal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.id = "meeting-modal";
  modal.className = "modal-overlay hidden";
  modal.innerHTML = `
    <div class="meeting-modal" role="dialog" aria-modal="true" aria-labelledby="meeting-title">
      <div class="meeting-header">
        <div>
          <h3 id="meeting-title">Meeting</h3>
          <p id="meeting-status">Preparing meeting...</p>
        </div>
        <div class="meeting-header-actions">
          <button type="button" class="secondary-btn meeting-copy-btn" id="meeting-copy-link-btn">Copy Link</button>
          <button type="button" class="secondary-btn meeting-expand-btn" id="meeting-expand-btn" aria-label="Expand meeting" title="Expand meeting">
            <svg class="meeting-control-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M21 16v5h-5M3 3l6 6M21 3l-6 6M3 21l6-6M21 21l-6-6" />
            </svg>
          </button>
        </div>
      </div>
      <div class="meeting-stage">
        <div class="meeting-video-tile">
          <video id="meeting-local-video" autoplay playsinline muted></video>
          <span id="meeting-local-name">You</span>
        </div>
        <div class="meeting-video-tile">
          <video id="meeting-remote-video" autoplay playsinline></video>
          <span id="meeting-remote-name">Waiting for participant</span>
        </div>
      </div>
      <div id="meeting-error" class="meeting-error hidden"></div>
      <div class="meeting-controls">
        <button type="button" class="secondary-btn meeting-control-btn" id="meeting-mute-btn"></button>
        <button type="button" class="secondary-btn meeting-control-btn" id="meeting-camera-btn"></button>
        <button type="button" class="secondary-btn meeting-control-btn" id="meeting-screen-btn"></button>
        <button type="button" class="danger-btn meeting-control-btn" id="meeting-leave-btn"></button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

const meetingControlIcons = {
  mute: '<svg class="meeting-control-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z" /><path d="M18 11a6 6 0 0 1-12 0M12 17v4M9 21h6" /></svg>',
  unmute: '<svg class="meeting-control-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 4 16 16M9.5 5.4V11a2.5 2.5 0 0 0 3.7 2.2M15 9.5V6a3 3 0 0 0-5.2-2M18 11a6 6 0 0 1-2 4.5M6 11a6 6 0 0 0 8.4 5.5M12 17v4M9 21h6" /></svg>',
  camera: '<svg class="meeting-control-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h7A2.5 2.5 0 0 1 16 8.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 4 15.5v-7Z" /><path d="m16 10 4-2.3v8.6L16 14" /></svg>',
  cameraOff: '<svg class="meeting-control-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 4 16 16M4 8.5A2.5 2.5 0 0 1 6.5 6h4M16 10l4-2.3v7.1M13.5 18h-7A2.5 2.5 0 0 1 4 15.5v-7" /></svg>',
  screen: '<svg class="meeting-control-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H4zM8 20h8M12 16v4M12 13V8M9 10l3-3 3 3" /></svg>',
  stopShare: '<svg class="meeting-control-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 4 16 16M4 5h11M20 8v8H9M8 20h8M12 16v4" /></svg>',
  leave: '<svg class="meeting-control-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7.5c.5 3.9 2.7 6.1 6.5 6.5l1.8-1.8a1.3 1.3 0 0 1 1.4-.32l2.7.9a1.4 1.4 0 0 1 .96 1.33v2.8a1.5 1.5 0 0 1-1.6 1.5C11.3 18.1 5.9 12.7 5.1 5.25A1.5 1.5 0 0 1 6.6 3.6h2.8a1.4 1.4 0 0 1 1.33.96l.9 2.7a1.3 1.3 0 0 1-.32 1.4L9.5 10.5" /></svg>'
};

function setMeetingControlContent(button, icon, label) {
  if (!button) return;
  button.innerHTML = `${icon}<span>${label}</span>`;
}

function getMeetingElements() {
  const modal = ensureMeetingModal();
  const meetingWindow = modal.querySelector(".meeting-modal");
  return {
    modal,
    meetingWindow,
    title: modal.querySelector("#meeting-title"),
    status: modal.querySelector("#meeting-status"),
    error: modal.querySelector("#meeting-error"),
    localVideo: modal.querySelector("#meeting-local-video"),
    remoteVideo: modal.querySelector("#meeting-remote-video"),
    localName: modal.querySelector("#meeting-local-name"),
    remoteName: modal.querySelector("#meeting-remote-name"),
    muteBtn: modal.querySelector("#meeting-mute-btn"),
    cameraBtn: modal.querySelector("#meeting-camera-btn"),
    screenBtn: modal.querySelector("#meeting-screen-btn"),
    leaveBtn: modal.querySelector("#meeting-leave-btn"),
    copyBtn: modal.querySelector("#meeting-copy-link-btn"),
    expandBtn: modal.querySelector("#meeting-expand-btn")
  };
}

function setMeetingStatus(message, isError = false) {
  const { status, error } = getMeetingElements();
  if (status && !isError) status.textContent = message;
  if (!error) return;
  if (isError) {
    error.textContent = message;
    error.classList.remove("hidden");
  } else {
    error.textContent = "";
    error.classList.add("hidden");
  }
}

function stopStream(stream) {
  if (stream) stream.getTracks().forEach((track) => track.stop());
}

async function getMeetingMedia() {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("This browser does not support audio or video calls.");
  }

  try {
    return await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  } catch (videoError) {
    try {
      const audioOnly = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      setMeetingStatus("Camera unavailable. Joined with audio only.", true);
      return audioOnly;
    } catch {
      throw videoError;
    }
  }
}

function createMeetingPeerConnection() {
  const peer = new RTCPeerConnection(MEETING_RTC_CONFIG);

  peer.onicecandidate = (event) => {
    if (event.candidate && activeMeeting?.channel) {
      activeMeeting.channel.postMessage({
        type: "ice-candidate",
        sessionId: activeMeeting.session.id,
        from: activeMeeting.peerId,
        candidate: event.candidate
      });
    }
  };

  peer.ontrack = (event) => {
    const { remoteVideo, remoteName } = getMeetingElements();
    if (remoteVideo) remoteVideo.srcObject = event.streams[0];
    if (remoteName && activeMeeting?.remoteName) remoteName.textContent = activeMeeting.remoteName;
    setMeetingStatus("Connected.");
  };

  peer.onconnectionstatechange = () => {
    if (peer.connectionState === "connected") setMeetingStatus("Connected.");
    if (peer.connectionState === "disconnected") setMeetingStatus("Participant disconnected.");
    if (peer.connectionState === "failed") setMeetingStatus("Connection failed. Try starting a new meeting.", true);
  };

  return peer;
}

function postMeetingSignal(payload) {
  if (!activeMeeting?.channel) return;
  activeMeeting.channel.postMessage({
    ...payload,
    sessionId: activeMeeting.session.id,
    from: activeMeeting.peerId,
    name: getCurrentUserName()
  });
}

async function makeMeetingOffer() {
  if (!activeMeeting?.peer) return;
  const offer = await activeMeeting.peer.createOffer();
  await activeMeeting.peer.setLocalDescription(offer);
  postMeetingSignal({ type: "offer", description: offer });
}

async function handleMeetingSignal(data) {
  if (!activeMeeting || data.sessionId !== activeMeeting.session.id || data.from === activeMeeting.peerId) return;

  activeMeeting.remoteName = data.name || "Participant";
  const { remoteName } = getMeetingElements();
  if (remoteName) remoteName.textContent = activeMeeting.remoteName;

  try {
    if (data.type === "join-request" && activeMeeting.isHost) {
      setMeetingStatus(`${activeMeeting.remoteName} is joining...`);
      await makeMeetingOffer();
      return;
    }

    if (data.type === "offer" && !activeMeeting.isHost) {
      await activeMeeting.peer.setRemoteDescription(new RTCSessionDescription(data.description));
      const answer = await activeMeeting.peer.createAnswer();
      await activeMeeting.peer.setLocalDescription(answer);
      postMeetingSignal({ type: "answer", description: answer });
      return;
    }

    if (data.type === "answer" && activeMeeting.isHost) {
      await activeMeeting.peer.setRemoteDescription(new RTCSessionDescription(data.description));
      return;
    }

    if (data.type === "ice-candidate" && data.candidate) {
      await activeMeeting.peer.addIceCandidate(new RTCIceCandidate(data.candidate));
      return;
    }

    if (data.type === "leave") {
      setMeetingStatus(`${activeMeeting.remoteName} left the meeting.`);
    }
  } catch (error) {
    console.warn("Meeting signal failed:", error);
    setMeetingStatus("Unable to connect this meeting. Please try again.", true);
  }
}

async function openMeetingSession(session, isHost = false) {
  if (!("RTCPeerConnection" in window)) {
    alert("This browser does not support WebRTC meetings.");
    return;
  }

  if (activeMeeting) leaveMeeting(false);

  const elements = getMeetingElements();
  elements.modal.classList.remove("hidden");
  elements.modal.classList.add("meeting-open-view");
  elements.modal.classList.remove("meeting-expanded");
  if (elements.title) elements.title.textContent = session.title;
  if (elements.localName) elements.localName.textContent = getCurrentUserName();
  if (elements.remoteName) elements.remoteName.textContent = "Waiting for participant";
  setMeetingStatus("Requesting microphone and camera access...");

  const peerId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const channel = "BroadcastChannel" in window ? new BroadcastChannel(`${MEETING_CHANNEL_PREFIX}${session.id}`) : null;
  const peer = createMeetingPeerConnection();

  activeMeeting = {
    session,
    peerId,
    channel,
    peer,
    localStream: null,
    screenStream: null,
    cameraTrack: null,
    isHost,
    muted: false,
    cameraOff: false,
    sharingScreen: false,
    remoteName: ""
  };
  updateMeetingControls();

  if (channel) {
    channel.addEventListener("message", (event) => handleMeetingSignal(event.data || {}));
  }

  try {
    const stream = await getMeetingMedia();
    activeMeeting.localStream = stream;
    activeMeeting.cameraTrack = stream.getVideoTracks()[0] || null;
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
    if (elements.localVideo) elements.localVideo.srcObject = stream;
    setMeetingStatus(isHost ? "Meeting started. Share the link or wait for the participant." : "Joining meeting...");

    if (!isHost) {
      postMeetingSignal({ type: "join-request" });
    }
  } catch (error) {
    console.warn("Meeting media failed:", error);
    setMeetingStatus("Microphone or camera access was not granted. Check browser permissions and try again.", true);
  }
}

function updateMeetingControls() {
  const { muteBtn, cameraBtn, screenBtn, leaveBtn } = getMeetingElements();
  const muted = Boolean(activeMeeting?.muted);
  const cameraOff = Boolean(activeMeeting?.cameraOff);
  const sharingScreen = Boolean(activeMeeting?.sharingScreen);
  setMeetingControlContent(muteBtn, muted ? meetingControlIcons.unmute : meetingControlIcons.mute, muted ? "Unmute" : "Mute");
  setMeetingControlContent(cameraBtn, cameraOff ? meetingControlIcons.camera : meetingControlIcons.cameraOff, cameraOff ? "Camera On" : "Camera Off");
  setMeetingControlContent(screenBtn, sharingScreen ? meetingControlIcons.stopShare : meetingControlIcons.screen, sharingScreen ? "Stop Share" : "Share Screen");
  setMeetingControlContent(leaveBtn, meetingControlIcons.leave, "Leave");
}

function toggleMeetingMute() {
  if (!activeMeeting?.localStream) return;
  activeMeeting.muted = !activeMeeting.muted;
  activeMeeting.localStream.getAudioTracks().forEach((track) => {
    track.enabled = !activeMeeting.muted;
  });
  updateMeetingControls();
}

function toggleMeetingCamera() {
  if (!activeMeeting?.localStream) return;
  activeMeeting.cameraOff = !activeMeeting.cameraOff;
  activeMeeting.localStream.getVideoTracks().forEach((track) => {
    track.enabled = !activeMeeting.cameraOff;
  });
  updateMeetingControls();
}

async function toggleScreenShare() {
  if (!activeMeeting) return;

  if (activeMeeting.sharingScreen) {
    stopScreenShare();
    return;
  }

  if (!navigator.mediaDevices?.getDisplayMedia) {
    setMeetingStatus("Screen sharing is not supported in this browser.", true);
    return;
  }

  try {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
    const screenTrack = screenStream.getVideoTracks()[0];
    if (!screenTrack) throw new Error("No screen track was provided.");
    const sender = activeMeeting.peer.getSenders().find((item) => item.track?.kind === "video");
    if (sender) await sender.replaceTrack(screenTrack);
    activeMeeting.screenStream = screenStream;
    activeMeeting.sharingScreen = true;
    const { localVideo } = getMeetingElements();
    if (localVideo) localVideo.srcObject = screenStream;
    screenTrack.onended = stopScreenShare;
    setMeetingStatus("Screen sharing is active.");
    updateMeetingControls();
  } catch (error) {
    console.warn("Screen share failed:", error);
    setMeetingStatus("Screen sharing was cancelled or blocked.", true);
  }
}

async function stopScreenShare() {
  if (!activeMeeting?.sharingScreen) return;
  const sender = activeMeeting.peer.getSenders().find((item) => item.track?.kind === "video");
  if (sender) await sender.replaceTrack(activeMeeting.cameraTrack || null);
  stopStream(activeMeeting.screenStream);
  activeMeeting.screenStream = null;
  activeMeeting.sharingScreen = false;
  const { localVideo } = getMeetingElements();
  if (localVideo) localVideo.srcObject = activeMeeting.localStream;
  setMeetingStatus("Screen sharing stopped.");
  updateMeetingControls();
}

function leaveMeeting(shouldSignal = true) {
  if (!activeMeeting) return;
  if (shouldSignal) postMeetingSignal({ type: "leave" });
  stopStream(activeMeeting.localStream);
  stopStream(activeMeeting.screenStream);
  activeMeeting.peer?.close();
  activeMeeting.channel?.close();
  activeMeeting = null;
  const { modal, localVideo, remoteVideo } = getMeetingElements();
  if (localVideo) localVideo.srcObject = null;
  if (remoteVideo) remoteVideo.srcObject = null;
  if (document.fullscreenElement === modal || document.fullscreenElement?.classList?.contains("meeting-modal")) {
    document.exitFullscreen().catch(() => {});
  }
  modal.classList.remove("meeting-expanded", "meeting-open-view");
  modal.classList.add("hidden");
}

async function toggleMeetingExpand() {
  const { modal, meetingWindow } = getMeetingElements();
  const target = meetingWindow || modal;

  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      modal.classList.remove("meeting-expanded");
      return;
    }

    if (target.requestFullscreen) {
      await target.requestFullscreen();
      modal.classList.add("meeting-expanded");
      return;
    }
  } catch (error) {
    console.warn("Fullscreen toggle failed:", error);
  }

  modal.classList.toggle("meeting-expanded");
}

async function copyMeetingLink() {
  if (!activeMeeting) return;
  const link = getMeetingLink(activeMeeting.session.id);
  try {
    await navigator.clipboard.writeText(link);
    setMeetingStatus("Meeting link copied.");
  } catch {
    window.prompt("Copy meeting link:", link);
  }
}

function startAppMeeting(context) {
  const session = createMeetingSession(context);
  openMeetingSession(session, true);
  addNotification("Meeting started", `${getCurrentUserName()} started ${session.title}.`);
}

function joinMeetingById(sessionId) {
  const session = getMeetingById(sessionId) || {
    id: sessionId,
    type: "meeting",
    title: "Team Meeting",
    target: "",
    createdBy: "",
    createdAt: new Date().toISOString()
  };
  upsertMeetingSession(session);
  openMeetingSession(session, false);
}

function maybeOpenMeetingFromHash() {
  const match = window.location.hash.match(/^#meeting=([^&]+)/);
  if (!match) return;
  pendingMeetingFromHash = decodeURIComponent(match[1]);
  window.history.replaceState(null, "", window.location.pathname + window.location.search);
  joinMeetingById(pendingMeetingFromHash);
}

window.startAppMeeting = startAppMeeting;

// -----------------------------
// NOTIFICATIONS
// -----------------------------
function formatNotificationTime(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function renderNotifications() {
  if (!notificationList) return;

  const notifications = getNotificationsFromStorage();
  notificationList.innerHTML = "";

  if (notifications.length === 0) {
    notificationList.innerHTML = `
      <div class="notification-item">
        <h4>${escapeHTML(t("notifications.noneTitle"))}</h4>
        <p>${escapeHTML(t("notifications.noneBody"))}</p>
      </div>
    `;
    return;
  }

  notifications.forEach((notification) => {
    const item = document.createElement("div");
    item.className = "notification-item";
    item.innerHTML = `
      <h4>${notification.title}</h4>
      <p>${notification.message}</p>
      <p style="margin-top:8px; font-size:12px; color:#94a3b8;">
        ${formatNotificationTime(notification.timestamp)}
      </p>
    `;
    notificationList.appendChild(item);
  });
}

function isBrowserNotificationEnabled() {
  return localStorage.getItem("ttm_browser_notifications_enabled") === "true";
}

function setBrowserNotificationEnabled(value) {
  localStorage.setItem("ttm_browser_notifications_enabled", value ? "true" : "false");
  updateNotificationPermissionUI();
}

function updateNotificationPermissionUI() {
  if (!notificationPermissionStatus) return;

  let permissionText = t("notifications.permissionUnsupported");
  if ("Notification" in window) {
    permissionText = t("notifications.permissionStatus", { permission: Notification.permission });
  }

  const enabledText = isBrowserNotificationEnabled() ? t("notifications.enabled") : t("notifications.disabled");
  notificationPermissionStatus.textContent = `${permissionText} | ${t("notifications.appStatus", { status: enabledText })}`;
}

async function enableBrowserNotifications() {
  if (!("Notification" in window)) {
    alert("This browser does not support notifications.");
    return;
  }

  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    setBrowserNotificationEnabled(true);
    alert("Browser notifications enabled.");
  } else {
    setBrowserNotificationEnabled(false);
    alert("Notification permission was not granted.");
  }
}

function disableBrowserNotifications() {
  setBrowserNotificationEnabled(false);
  alert("Browser notifications disabled for this app.");
}

function triggerBrowserNotification(title, message) {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  if (!isBrowserNotificationEnabled()) return;
  if (document.visibilityState === "visible") return;

  new Notification(title, {
    body: message
  });
}

function addNotification(title, message) {
  const notifications = getNotificationsFromStorage();

  const newNotification = {
    id: Date.now(),
    title,
    message,
    timestamp: new Date().toISOString()
  };

  notifications.unshift(newNotification);
  saveNotificationsToStorage(notifications);
  renderNotifications();
  updateDashboardCounts();
  triggerBrowserNotification(title, message);
  playNotificationSound();
  showToast(title, message);
}

window.addAppNotification = addNotification;

// -----------------------------
// TASKS
// -----------------------------
function getBadgeClass(status) {
  if (status === "In Progress") return "warning";
  if (status === "Completed") return "success";
  return "danger";
}

function formatDate(dateString) {
  if (!dateString) return t("common.noDeadline");

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function formatCommentTime(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "";

  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });

  return `${datePart}, ${timePart}`;
}

function getCurrentCommentAuthor() {
  const user = getUserFromLocalStorage();

  return {
    name: user?.name || user?.email || "User",
    identifier: user?.email || "Current user"
  };
}

function getPriorityBadgeClass(severity) {
  if (severity === "High") return "priority-high";
  if (severity === "Medium") return "priority-medium";
  if (severity === "Low") return "priority-low";
  return "";
}

function renderTaskTags(tags) {
  if (!Array.isArray(tags) || tags.length === 0) return "";

  return `
    <div class="task-tags">
      ${tags.map((tag) => `<span class="task-tag">${escapeHTML(tag)}</span>`).join("")}
    </div>
  `;
}

function renderTaskComments(task) {
  const comments = Array.isArray(task.comments) ? task.comments : [];

  return `
    <div class="task-comments">
      <div class="task-comments-header">
        <span>${escapeHTML(t("task.comments"))}</span>
        <small>${comments.length}</small>
      </div>
      <div class="task-comment-list">
        ${comments.length === 0
          ? `<p class="task-comment-empty">${escapeHTML(t("task.noComments"))}</p>`
          : comments.map((comment) => `
              <div class="task-comment">
                <div class="task-comment-meta">
                  <strong>${escapeHTML(comment.name)}</strong>
                  <span>${escapeHTML(comment.identifier)} &bull; ${formatCommentTime(comment.timestamp)}</span>
                </div>
                <p>${escapeHTML(comment.text)}</p>
              </div>
            `).join("")
        }
      </div>
      <div class="task-comment-form">
        <input type="text" class="task-comment-input" placeholder="${escapeHTML(t("task.addComment"))}" />
        <button type="button" class="task-comment-add" data-task-id="${escapeHTML(task.id)}">${escapeHTML(t("actions.add"))}</button>
      </div>
    </div>
  `;
}

function renderTaskAttachments(task) {
  const attachments = normalizeAttachments(task.attachments);

  return `
    <div class="task-attachments">
      <div class="task-comments-header">
        <span>${escapeHTML(t("task.attachments"))}</span>
        <small>${attachments.length}</small>
      </div>
      ${attachments.length === 0
        ? `<p class="task-comment-empty">${escapeHTML(t("task.noAttachments"))}</p>`
        : renderAttachmentList(attachments, "task-attachment-list")
      }
    </div>
  `;
}

function addCommentToTask(taskId, commentText) {
  const text = commentText.trim();
  if (!text) return;

  const tasks = getTasksFromStorage();
  const task = tasks.find((item) => String(item.id) === String(taskId));
  if (!task) return;

  const author = getCurrentCommentAuthor();
  const comment = {
    id: Date.now(),
    name: author.name,
    identifier: author.identifier,
    text,
    timestamp: new Date().toISOString()
  };

  if (!Array.isArray(task.comments)) task.comments = [];
  task.comments.push(comment);
  saveTasksToStorage(tasks);
  renderAllTaskUI();
  addNotification("Task comment added", `${author.name} commented on "${task.title}"`);
}

function getTaskCardMarkup(task, variant = "recent") {
  const titleTag = variant === "recent" ? "h4" : "h5";
  const priorityClass = getPriorityBadgeClass(task.severity);
  const showDoneAction = variant === "kanban" && task.status !== "Completed";

  return `
    <div class="${variant === "recent" ? "task-item-main" : "kanban-card-main"}">
      <div>
        <${titleTag}>${escapeHTML(task.title)}</${titleTag}>
        <p>${escapeHTML(t("task.assignedToPrefix"))} ${escapeHTML(formatTaskAssignees(task))}</p>
        ${variant === "kanban" ? `
          <p><strong>${escapeHTML(t("task.deadline"))}:</strong> ${formatDate(task.deadline)}</p>
        ` : ""}
      </div>
      <div class="task-card-meta-stack">
        <span class="priority-badge ${priorityClass}">${escapeHTML(task.severity ? translateSeverityLabel(task.severity) : t("task.noPriority"))}</span>
        <span class="badge ${getBadgeClass(task.status)}">${escapeHTML(translateStatusLabel(task.status))}</span>
      </div>
    </div>
    ${renderTaskTags(task.tags)}
    ${renderTaskAttachments(task)}
    ${renderTaskComments(task)}
    ${showDoneAction ? `
      <div class="task-card-actions">
        <button type="button" class="success-action-btn mark-done-btn" data-task-id="${escapeHTML(task.id)}">${escapeHTML(t("task.markDone"))}</button>
      </div>
    ` : ""}
  `;
}

function markTaskAsDone(taskId) {
  const tasks = getTasksFromStorage();
  const task = tasks.find((item) => String(item.id) === String(taskId));
  if (!task || task.status === "Completed") return;

  task.status = "Completed";
  saveTasksToStorage(tasks);
  renderAllTaskUI();

  if (taskSearchInput?.value.trim()) {
    renderTaskSearchResults(taskSearchInput.value);
  }
}

function isTaskDueSoon(task) {
  if (!task.deadline || task.status === "Completed") return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadline = new Date(`${task.deadline}T00:00:00`);
  if (Number.isNaN(deadline.getTime())) return false;

  const diffInDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  return diffInDays >= 0 && diffInDays <= 3;
}

function renderRecentTasks() {
  if (!recentTaskList) return;

  const tasks = getTasksFromStorage();
  recentTaskList.innerHTML = "";

  if (!tasks.length) {
    recentTaskList.innerHTML = `<p class="empty-task-text">${escapeHTML(t("task.noRecentTasks"))}</p>`;
    return;
  }

  tasks.slice().reverse().forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-item";
    taskDiv.innerHTML = getTaskCardMarkup(task, "recent");
    recentTaskList.appendChild(taskDiv);
  });
}

function getUpcomingTimelineTasks(tasks) {
  return tasks
    .filter((task) => task.deadline && task.status !== "Completed")
    .map((task) => ({
      ...task,
      dueDate: new Date(`${task.deadline}T00:00:00`)
    }))
    .filter((task) => !Number.isNaN(task.dueDate.getTime()))
    .sort((a, b) => a.dueDate - b.dueDate)
    .slice(0, 5);
}

function formatTimelineDay(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const diffDays = Math.round((target - today) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return t("timeline.today");
  if (diffDays === 1) return t("timeline.tomorrow");
  if (diffDays < 0) return t("timeline.overdue");

  return target.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short"
  });
}

function renderUpcomingTimeline() {
  if (!upcomingEventsList) return;

  const timelineTasks = getUpcomingTimelineTasks(getTasksFromStorage());

  if (timelineTasks.length === 0) {
    upcomingEventsList.innerHTML = `
      <div class="timeline-empty">
        <h4>${escapeHTML(t("task.noUpcomingDeadlines"))}</h4>
        <p>${escapeHTML(t("timeline.clear"))}</p>
      </div>
    `;
    return;
  }

  upcomingEventsList.innerHTML = timelineTasks.map((task) => `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <div class="timeline-meta">
          <span>${formatTimelineDay(task.dueDate)}</span>
          <span>${formatDate(task.deadline)}</span>
        </div>
        <h4>${escapeHTML(task.title)}</h4>
        <p>${escapeHTML(formatTaskAssignees(task))}</p>
        <span class="badge ${getBadgeClass(task.status)}">${escapeHTML(translateStatusLabel(task.status))}</span>
      </div>
    </div>
  `).join("");
}

function renderTaskCardsIntoColumn(columnElement, tasks) {
  if (!columnElement) return;

  if (tasks.length === 0) {
    columnElement.innerHTML = `<p class="empty-task-text">${escapeHTML(t("task.noTasks"))}</p>`;
    return;
  }

  tasks.slice().reverse().forEach((task) => {
    const card = document.createElement("div");
    card.className = `kanban-card ${getPriorityBadgeClass(task.severity)}`;
    card.innerHTML = getTaskCardMarkup(task, "kanban");
    columnElement.appendChild(card);
  });
}

function renderTaskBoard() {
  const tasks = getTasksFromStorage();

  if (pendingTaskColumn) pendingTaskColumn.innerHTML = "";
  if (inprogressTaskColumn) inprogressTaskColumn.innerHTML = "";
  if (completedTaskColumn) completedTaskColumn.innerHTML = "";

  const pendingTasks = tasks.filter((task) => task.status === "Pending");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  renderTaskCardsIntoColumn(pendingTaskColumn, pendingTasks);
  renderTaskCardsIntoColumn(inprogressTaskColumn, inProgressTasks);
  renderTaskCardsIntoColumn(completedTaskColumn, completedTasks);
}

function updateDashboardCounts() {
  const tasks = getTasksFromStorage();

  const total = tasks.length;
  const inProgress = tasks.filter((task) => task.status === "In Progress").length;
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const notifications = getNotificationsFromStorage().length;
  const dueSoon = tasks.filter(isTaskDueSoon).length;
  const highPriority = tasks.filter((task) => task.severity === "High" && task.status !== "Completed").length;
  const activeAssignments = tasks.filter((task) => task.status !== "Completed").length;
  const completionPercentage = total ? Math.round((completed / total) * 100) : 0;

  if (totalTasksCount) totalTasksCount.textContent = total;
  if (inProgressCount) inProgressCount.textContent = inProgress;
  if (completedCount) completedCount.textContent = completed;
  if (notificationsCount) notificationsCount.textContent = notifications;
  if (dueSoonCount) dueSoonCount.textContent = dueSoon;
  if (highPriorityCount) highPriorityCount.textContent = highPriority;
  if (completionRate) completionRate.textContent = `${completionPercentage}%`;
  if (teamLoadSummary) teamLoadSummary.textContent = activeAssignments;
  renderKpiHoverDetails(tasks);
}

function getRecentTasksByStatus(tasks, status) {
  return tasks
    .filter((task) => task.status === status)
    .slice()
    .reverse()
    .slice(0, 3);
}

function renderKpiTaskList(tasks, emptyText) {
  if (!tasks.length) return `<p class="kpi-empty">${escapeHTML(emptyText)}</p>`;

  return `
    <ul class="kpi-detail-list">
      ${tasks.map((task) => `
        <li>
          <strong>${escapeHTML(task.title)}</strong>
          <span>${escapeHTML(formatTaskAssignees(task))} &middot; ${escapeHTML(translateStatusLabel(task.status))}</span>
        </li>
      `).join("")}
    </ul>
  `;
}

function renderKpiNotificationList(notifications) {
  if (!notifications.length) return `<p class="kpi-empty">${escapeHTML(t("task.noRecentNotifications"))}</p>`;

  return `
    <ul class="kpi-detail-list">
      ${notifications.map((notification) => `
        <li>
          <strong>${escapeHTML(notification.title)}</strong>
          <span>${escapeHTML(notification.message)}</span>
        </li>
      `).join("")}
    </ul>
  `;
}

function setKpiDetail(element, title, content) {
  if (!element) return;

  element.innerHTML = `
    <h4>${escapeHTML(title)}</h4>
    ${content}
  `;
}

function renderKpiHoverDetails(tasks) {
  const notifications = getNotificationsFromStorage();
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const total = tasks.length;
  const completionPercentage = total ? Math.round((completed / total) * 100) : 0;
  const recentTasks = tasks.slice().reverse().slice(0, 3);
  const dueSoonTasks = tasks.filter(isTaskDueSoon).slice(0, 3);
  const highPriorityTasks = tasks
    .filter((task) => task.severity === "High")
    .slice()
    .reverse()
    .slice(0, 3);
  const loadItems = groupMembers.map((member) => {
    const activeTasks = tasks.filter((task) => (
      task.status !== "Completed" && getTaskAssignees(task).includes(member.name)
    )).length;

    return { name: member.name, activeTasks };
  });

  setKpiDetail(totalTasksDetail, t("kpi.topRecent"), renderKpiTaskList(recentTasks, t("task.noRecentTasks")));
  setKpiDetail(progressTasksDetail, t("kpi.inProgressNow"), renderKpiTaskList(getRecentTasksByStatus(tasks, "In Progress"), t("task.noInProgressTasks")));
  setKpiDetail(completedTasksDetail, t("kpi.recentlyCompleted"), renderKpiTaskList(getRecentTasksByStatus(tasks, "Completed"), t("task.noCompletedTasks")));
  setKpiDetail(notificationsDetail, t("kpi.recentNotifications"), renderKpiNotificationList(notifications.slice(0, 3)));
  setKpiDetail(dueSoonDetail, t("kpi.dueWithin3Days"), renderKpiTaskList(dueSoonTasks, t("task.noDueSoon")));
  setKpiDetail(highPriorityDetail, t("kpi.highPriorityWork"), renderKpiTaskList(highPriorityTasks, t("task.noHighPriority")));
  setKpiDetail(completionRateDetail, t("kpi.completionSnapshot"), `
    <div class="kpi-mini-chart">
      <div class="mini-donut" style="--completed:${completionPercentage};"><span>${completionPercentage}%</span></div>
      <p>${escapeHTML(t("dashboard.tasksCompletedSummary", { completed, assigned: total }))}</p>
    </div>
  `);
  setKpiDetail(teamLoadDetail, t("kpi.teamLoad"), `
    <ul class="kpi-detail-list">
      ${loadItems.map((item) => `
        <li>
          <strong>${escapeHTML(item.name)}</strong>
          <span>${item.activeTasks} ${escapeHTML(t(item.activeTasks === 1 ? "kpi.activeAssignment" : "kpi.activeAssignments"))}</span>
        </li>
      `).join("")}
    </ul>
  `);
}

function getTaskStatusCounts(tasks) {
  return {
    pending: tasks.filter((task) => task.status === "Pending").length,
    inProgress: tasks.filter((task) => task.status === "In Progress").length,
    completed: tasks.filter((task) => task.status === "Completed").length,
    overdue: tasks.filter(isDashboardTaskOverdue).length
  };
}

function isDashboardTaskOverdue(task) {
  if (!task?.deadline || task.status === "Completed") return false;

  const deadline = new Date(`${task.deadline}T00:00:00`);
  if (Number.isNaN(deadline.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return deadline < today;
}

function getMemberChartColor(index) {
  const themeAccent = getComputedStyle(document.documentElement).getPropertyValue("--accent-color").trim();
  const palette = [
    themeAccent || "#5b4df1",
    "#0ea5e9",
    "#22c55e",
    "#f59e0b",
    "#ec4899",
    "#8b5cf6",
    "#14b8a6",
    "#f97316"
  ];

  if (palette[index]) return palette[index];
  return `hsl(${Math.round((index * 137.508 + 230) % 360)} 72% 56%)`;
}

function getTeamAnalytics(tasks) {
  return groupMembers.map((member, index) => {
    const assignedTasks = tasks.filter((task) => getTaskAssignees(task).includes(member.name));
    const completedTasks = assignedTasks.filter((task) => task.status === "Completed").length;
    const productivity = assignedTasks.length
      ? Math.round((completedTasks / assignedTasks.length) * 100)
      : 0;

    return {
      name: member.name,
      assigned: assignedTasks.length,
      completed: completedTasks,
      productivity,
      color: getMemberChartColor(index)
    };
  });
}

function renderTeamInsightList(container, items, renderItem) {
  if (!container) return;

  if (!items.length) {
    container.innerHTML = `<p class="kpi-empty">${escapeHTML(t("team.noMembersBody"))}</p>`;
    return;
  }

  container.innerHTML = items.map(renderItem).join("");
}

function buildCurrentStateTrend(currentValue, factors) {
  const safeCurrent = Math.max(0, Number(currentValue) || 0);
  return factors.map((factor, index) => (
    index === factors.length - 1 ? safeCurrent : Math.max(0, Math.round(safeCurrent * factor))
  ));
}

function renderTaskStatusTrend(counts) {
  if (!taskStatusChart) return;

  const series = [
    {
      color: "#22c55e",
      values: buildCurrentStateTrend(counts.completed, [0.42, 0.5, 0.58, 0.67, 0.75, 0.88, 1])
    },
    {
      color: "#3b82f6",
      values: buildCurrentStateTrend(counts.pending, [1.32, 1.24, 1.18, 1.14, 1.08, 1.03, 1])
    },
    {
      color: "#f97316",
      values: buildCurrentStateTrend(counts.overdue, [0.55, 0.72, 0.68, 0.82, 0.78, 0.92, 1])
    }
  ];
  const width = 430;
  const height = 164;
  const padding = { top: 12, right: 12, bottom: 25, left: 30 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(1, ...series.flatMap((item) => item.values));
  const xFor = (index) => padding.left + (plotWidth * index) / 6;
  const yFor = (value) => padding.top + plotHeight - (Math.max(0, value) / maxValue) * plotHeight;
  const gridRatios = [0, 0.5, 1];
  const gridMarkup = gridRatios.map((ratio) => {
    const y = padding.top + plotHeight * ratio;
    const value = Math.round(maxValue * (1 - ratio));
    return `
      <line class="task-trend-grid-line" x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}"></line>
      <text class="task-trend-axis-label" x="${padding.left - 7}" y="${y + 4}" text-anchor="end">${value}</text>
    `;
  }).join("");
  const seriesMarkup = series.map((item) => {
    const points = item.values.map((value, index) => `${xFor(index)},${yFor(value)}`).join(" ");
    const lastX = xFor(item.values.length - 1);
    const lastY = yFor(item.values[item.values.length - 1]);
    return `
      <polyline class="task-trend-line" style="--trend-color:${item.color}" points="${points}"></polyline>
      <circle class="task-trend-point" style="--trend-color:${item.color}" cx="${lastX}" cy="${lastY}" r="3.5"></circle>
    `;
  }).join("");

  taskStatusChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHTML(t("dashboard.taskStatusTrend"))}">
      ${gridMarkup}
      ${seriesMarkup}
      <text class="task-trend-axis-caption" x="${padding.left}" y="${height - 5}">${escapeHTML(t("dashboard.earlier"))}</text>
      <text class="task-trend-axis-caption" x="${width - padding.right}" y="${height - 5}" text-anchor="end">${escapeHTML(t("dashboard.now"))}</text>
    </svg>
  `;
}

function renderTeamContribution(analytics) {
  const completedAssignments = analytics.reduce((total, item) => total + item.completed, 0);

  if (teamContributionTotal) teamContributionTotal.textContent = completedAssignments;
  if (teamContributionDonut) {
    if (!completedAssignments) {
      teamContributionDonut.style.background = "conic-gradient(var(--insight-chart-track) 0 100%)";
    } else {
      let start = 0;
      const segments = analytics
        .filter((item) => item.completed > 0)
        .map((item) => {
          const end = start + (item.completed / completedAssignments) * 100;
          const segment = `${item.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
          start = end;
          return segment;
        });
      teamContributionDonut.style.background = `conic-gradient(${segments.join(", ")})`;
    }
  }

  if (!teamContributionLegend) return;
  if (!analytics.length) {
    teamContributionLegend.innerHTML = `<p class="kpi-empty">${escapeHTML(t("team.noMembersBody"))}</p>`;
    return;
  }

  teamContributionLegend.innerHTML = analytics.map((item) => {
    const percentage = completedAssignments
      ? Math.round((item.completed / completedAssignments) * 100)
      : 0;
    return `
      <div class="team-contribution-legend-item">
        <i style="--member-color:${item.color}"></i>
        <span title="${escapeHTML(item.name)}">${escapeHTML(item.name)}</span>
        <strong>${item.completed} | ${percentage}%</strong>
      </div>
    `;
  }).join("");
}

function updateDashboardInsights() {
  const tasks = getTasksFromStorage();
  const counts = getTaskStatusCounts(tasks);
  if (completedTrendCount) completedTrendCount.textContent = counts.completed;
  if (pendingTrendCount) pendingTrendCount.textContent = counts.pending;
  if (overdueTrendCount) overdueTrendCount.textContent = counts.overdue;
  renderTaskStatusTrend(counts);

  const analytics = getTeamAnalytics(tasks);
  renderTeamContribution(analytics);
  renderTeamInsightList(teamPerformanceList, analytics, (item, index) => {
    const progress = Math.min(100, Math.max(0, Number(item.productivity) || 0));
    const assigneeLabel = item.name || `Assignee ${index + 1}`;

    return `
      <article class="member-progress-card" style="--member-color:${item.color};--score:${progress};">
        <h5>${escapeHTML(assigneeLabel)}</h5>
        <div class="member-progress-donut" role="img" aria-label="${escapeHTML(t("dashboard.doneLabel", { percent: progress }))}">
          <span>${progress}%</span>
        </div>
        <strong>${escapeHTML(t("dashboard.doneLabel", { percent: progress }))}</strong>
        <p>${escapeHTML(t("dashboard.tasksCompletedSummary", { completed: item.completed, assigned: item.assigned }))}</p>
      </article>
    `;
  });
}

function renderAllTaskUI() {
  renderRecentTasks();
  renderUpcomingTimeline();
  renderTaskBoard();
  updateDashboardCounts();
  updateDashboardInsights();
  renderGoogleDriveFiles();
}

function renderTaskSearchResults(query) {
  if (!taskSearchResults) return;

  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    taskSearchResults.classList.add("hidden");
    taskSearchResults.innerHTML = "";
    return;
  }

  const matches = getTasksFromStorage()
    .filter((task) => (
      task.title.toLowerCase().includes(normalizedQuery) ||
      task.status.toLowerCase().includes(normalizedQuery) ||
      task.severity.toLowerCase().includes(normalizedQuery) ||
      formatTaskAssignees(task).toLowerCase().includes(normalizedQuery) ||
      (Array.isArray(task.tags) && task.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)))
    ))
    .slice(0, 6);

  if (matches.length === 0) {
    taskSearchResults.innerHTML = `<div class="search-result-item">${escapeHTML(t("task.searchEmpty"))}</div>`;
  } else {
    taskSearchResults.innerHTML = matches.map((task) => `
      <div class="search-result-item">
        <strong>${task.title}</strong>
        <span>${escapeHTML(translateStatusLabel(task.status))} - ${escapeHTML(formatTaskAssignees(task))} - ${escapeHTML(formatDate(task.deadline))}</span>
      </div>
    `).join("");
  }

  taskSearchResults.classList.remove("hidden");
}

function openTaskModal() {
  if (!canAssignTasks()) {
    alert("Only Admin users can create and assign tasks.");
    return;
  }

  if (taskModalOverlay) taskModalOverlay.classList.remove("hidden");
  applyRoleBasedUI();

  if (taskStatusInput && !taskStatusInput.value) {
    taskStatusInput.value = "Pending";
  }

  if (taskSeverityInput && !taskSeverityInput.value) {
    taskSeverityInput.value = "Medium";
  }

  setTimeout(() => {
    taskTitleInput?.focus();
  }, 50);
}

function closeTaskModal() {
  if (taskModalOverlay) taskModalOverlay.classList.add("hidden");
  if (taskForm) taskForm.reset();
}

function createNewTask(taskData) {
  if (!canAssignTasks()) {
    alert("Only Admin users can assign tasks.");
    return;
  }

  const tasks = getTasksFromStorage();
  const assignees = taskData.assignees || [];
  const assignedTo = formatTaskAssignees(assignees);

  const newTask = {
    id: Date.now(),
    title: taskData.title.trim(),
    description: taskData.description.trim(),
    severity: taskData.severity,
    status: taskData.status,
    deadline: taskData.deadline,
    assignedTo,
    assignees,
    tags: taskData.tags,
    comments: [],
    attachments: normalizeAttachments(taskData.attachments)
  };

  tasks.push(newTask);
  saveTasksToStorage(tasks);
  renderAllTaskUI();

  addNotification("New task created", `${taskData.title} was assigned to ${assignedTo}`);
}

function getTaskFormValues() {
  const assignees = Array.from(taskAssignedToInput?.selectedOptions || [])
    .map((option) => option.value)
    .filter(Boolean);

  return {
    title: taskTitleInput?.value.trim() || "",
    description: taskDescriptionInput?.value.trim() || "",
    severity: taskSeverityInput?.value || "",
    status: taskStatusInput?.value || "",
    deadline: taskDeadlineInput?.value || "",
    assignedTo: formatTaskAssignees(assignees),
    assignees,
    attachments: [],
    tags: Array.from(taskTagInputs)
      .filter((input) => input.checked)
      .map((input) => input.value)
  };
}

function validateTaskForm(taskData) {
  if (!taskData.title) {
    alert("Please enter task title.");
    taskTitleInput?.focus();
    return false;
  }

  if (!taskData.description) {
    alert("Please enter task description.");
    taskDescriptionInput?.focus();
    return false;
  }

  if (!taskData.severity) {
    alert("Please select severity.");
    taskSeverityInput?.focus();
    return false;
  }

  if (!taskData.status) {
    alert("Please select status.");
    taskStatusInput?.focus();
    return false;
  }

  if (!taskData.deadline) {
    alert("Please select deadline.");
    taskDeadlineInput?.focus();
    return false;
  }

  if (!canAssignTasks()) {
    alert("Only Admin users can assign tasks.");
    return false;
  }

  if (!taskData.assignees || taskData.assignees.length === 0) {
    alert("Please select at least one assigned member.");
    taskAssignedToInput?.focus();
    return false;
  }

  return true;
}

async function submitTaskForm() {
  const taskData = getTaskFormValues();

  if (!validateTaskForm(taskData)) return;

  try {
    taskData.attachments = await readInputAttachments(taskAttachmentsInput, MAX_ATTACHMENT_SIZE);
  } catch (error) {
    alert(error.message || "Unable to attach the selected file.");
    return;
  }

  createNewTask(taskData);
  closeTaskModal();
}

// -----------------------------
// LOGIN
// -----------------------------
async function handleLoginSubmit(event) {
  if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
  }

  const userIdField = document.getElementById("user-id");
  const passwordField = document.getElementById("password");

  const userId = userIdField ? userIdField.value.trim() : "";
  const password = passwordField ? passwordField.value.trim() : "";

  if (!userId || !password) {
    setLoginMessage(t("auth.missingCredentials"), "error");
    return;
  }

  try {
    if (loginBtn) {
      loginBtn.disabled = true;
      loginBtn.textContent = t("auth.loggingIn");
    }

    setLoginMessage(t("auth.checking"));

    const result = await window.TaskifyAuth.authenticate(userId, password);

    if (result.success) {
      const user = saveUserToLocalStorage(result.user);
      updateUserUI(user);
      setLoginMessage(t("auth.success"), "success");

      setTimeout(() => {
        showAppScreen();
        if (loginForm) loginForm.reset();
        setLoginMessage("");
      }, 400);
    } else {
      setLoginMessage(result.message || t("auth.failed"), "error");
    }
  } catch (error) {
    console.error("Login error:", error);
    setLoginMessage(t("auth.connectionError"), "error");
  } finally {
    if (loginBtn) {
      loginBtn.disabled = false;
      loginBtn.textContent = t("auth.login");
    }
  }
}

async function handleJoinSubmit(event) {
  event?.preventDefault?.();
  const email = joinEmailInput?.value.trim() || "";
  const name = joinNameInput?.value.trim() || "";
  if (!email) {
    setJoinMessage(t("auth.emailRequired"), "error");
    joinEmailInput?.focus();
    return;
  }

  try {
    if (joinSubmitBtn) {
      joinSubmitBtn.disabled = true;
      joinSubmitBtn.textContent = t("auth.creatingAccess");
    }
    setJoinMessage(t("auth.creatingCredentials"));

    const result = await window.TaskifyAuth.onboardMember({ name, email, role: "Member" });
    if (!result.success) {
      setJoinMessage(result.message || t("auth.onboardingFailed"), "error");
      return;
    }

    setJoinMessage(
      result.emailSent
        ? t("auth.credentialsEmailed")
        : (result.emailMessage || t("auth.emailSendFailed")),
      result.emailSent ? "success" : "error"
    );
    if (result.emailSent) joinForm?.reset();
    refreshTeamDirectoryUI();
  } catch (error) {
    console.error("Onboarding error:", error);
    setJoinMessage(t("auth.onboardingFailed"), "error");
  } finally {
    if (joinSubmitBtn) {
      joinSubmitBtn.disabled = false;
      joinSubmitBtn.textContent = t("auth.createAccess");
    }
  }
}

// -----------------------------
// EVENTS
// -----------------------------
if (loginBtn) {
  loginBtn.addEventListener("click", function () {
    handleLoginSubmit({
      preventDefault: function () {}
    });
  });
}

if (welcomeStartBtn) {
  welcomeStartBtn.addEventListener("click", showLoginScreen);
}

if (openJoinBtn) openJoinBtn.addEventListener("click", showJoinScreen);
if (backToLoginBtn) backToLoginBtn.addEventListener("click", showLoginScreen);
if (joinForm) joinForm.addEventListener("submit", handleJoinSubmit);

const loginUserIdInput = document.getElementById("user-id");
const loginPasswordInput = document.getElementById("password");

[loginUserIdInput, loginPasswordInput].forEach((field) => {
  if (field) {
    field.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handleLoginSubmit({
          preventDefault: function () {}
        });
      }
    });
  }
});

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    updateCurrentUserPresence("offline");
    clearUserFromLocalStorage();
    applyWorkspaceTheme(getSavedWorkspaceTheme(null), { persist: false, user: null });
    showWelcomeScreen();
  });
}

settingsCategoryCards.forEach((card) => {
  const trigger = card.querySelector(".settings-category-heading");
  if (!trigger) return;

  trigger.addEventListener("click", () => {
    const isOpen = card.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
});

if (settingsProfilePhotoInput) {
  settingsProfilePhotoInput.addEventListener("change", () => {
    const file = settingsProfilePhotoInput.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      settingsProfilePhotoInput.value = "";
      return;
    }

    if (file.size > 750 * 1024) {
      alert("Please choose an image smaller than 750 KB.");
      settingsProfilePhotoInput.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      pendingProfilePhotoData = String(reader.result || "");
      setSettingsProfilePreview({
        ...getUserFromLocalStorage(),
        profilePhoto: pendingProfilePhotoData
      });
    };
    reader.readAsDataURL(file);
  });
}

if (settingsProfileForm) {
  settingsProfileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = getUserFromLocalStorage();
    if (!user) return;

    const firstName = settingsFirstNameInput?.value.trim() || "";
    const lastName = settingsLastNameInput?.value.trim() || "";
    const name = [firstName, lastName].filter(Boolean).join(" ") || user.name || "User";
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      name,
      profilePhoto: pendingProfilePhotoData || user.profilePhoto || ""
    };

    pendingProfilePhotoData = "";
    const savedUser = saveUserToLocalStorage(updatedUser);
    updateUserUI(savedUser);
    refreshTeamDirectoryUI();
    showToast("Profile updated", "Your profile changes were saved.");
  });
}

if (settingsSaveAccountBtn) {
  settingsSaveAccountBtn.addEventListener("click", () => {
    const user = getUserFromLocalStorage();
    if (!user) return;

    const email = settingsAccountEmailInput?.value.trim() || "";
    if (!email) {
      alert("Please enter an account email.");
      settingsAccountEmailInput?.focus();
      return;
    }

    const updatedUser = {
      ...user,
      email,
      role: settingsAccountRoleInput?.value || user.role
    };

    const savedUser = saveUserToLocalStorage(updatedUser);
    updateUserUI(savedUser);
    refreshTeamDirectoryUI();
    showToast("Account updated", "Your account information was saved.");
  });
}

[
  [settingsLoginAlertsToggle, "loginAlerts"],
  [rememberDataToggle, "localData"],
  [settingsLocalDataToggle, "localData"],
  [settingsPresenceToggle, "presence"],
  [settingsChatTimestampsToggle, "chatTimestamps"],
  [settingsChatTypingToggle, "chatTyping"],
  [settingsChatPreviewsToggle, "chatPreviews"],
  [settingsCameraToggle, "camera"],
  [settingsMicrophoneToggle, "microphone"]
].forEach(([toggle, key]) => {
  if (!toggle) return;
  toggle.addEventListener("change", () => {
    if (key === "localData") {
      setLocalDataPreference(toggle.checked);
      return;
    }
    saveSettingsPreferences({ [key]: toggle.checked });
  });
});

if (sendMessageBtn) {
  sendMessageBtn.addEventListener("click", sendMessage);
}

if (startCallBtn) {
  startCallBtn.addEventListener("click", () => {
    startAppMeeting({
      type: "private",
      title: `Call with ${selectedChatMember}`,
      target: selectedChatMember
    });
  });
}

if (chatAttachBtn && chatFileInput) {
  chatAttachBtn.addEventListener("click", () => chatFileInput.click());
}

if (chatFileInput) {
  chatFileInput.addEventListener("change", renderPrivateAttachmentPreview);
}

if (chatAttachmentPreview) {
  chatAttachmentPreview.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest(".composer-preview-remove")) {
      clearPrivateAttachmentPreview();
    }
  });
}

if (driveFileGrid) {
  driveFileGrid.addEventListener("click", (event) => {
    const openButton = event.target instanceof Element ? event.target.closest("[data-drive-open]") : null;
    if (!openButton) return;

    const index = Number(openButton.getAttribute("data-drive-open"));
    const file = Number.isInteger(index) ? currentDriveFiles[index] : null;
    openDriveFilePreview(file);
  });
}

if (chatRecordBtn) {
  chatRecordBtn.addEventListener("click", startPrivateVoiceRecording);
}

const meetingElements = getMeetingElements();
updateMeetingControls();
if (meetingElements.muteBtn) meetingElements.muteBtn.addEventListener("click", toggleMeetingMute);
if (meetingElements.cameraBtn) meetingElements.cameraBtn.addEventListener("click", toggleMeetingCamera);
if (meetingElements.screenBtn) meetingElements.screenBtn.addEventListener("click", toggleScreenShare);
if (meetingElements.leaveBtn) meetingElements.leaveBtn.addEventListener("click", () => leaveMeeting(true));
if (meetingElements.copyBtn) meetingElements.copyBtn.addEventListener("click", copyMeetingLink);
if (meetingElements.expandBtn) meetingElements.expandBtn.addEventListener("click", toggleMeetingExpand);

document.addEventListener("fullscreenchange", () => {
  const { modal } = getMeetingElements();
  modal.classList.toggle("meeting-expanded", Boolean(document.fullscreenElement));
});

if (chatStopRecordBtn) {
  chatStopRecordBtn.addEventListener("click", stopPrivateVoiceRecording);
}

if (chatCancelRecordBtn) {
  chatCancelRecordBtn.addEventListener("click", cancelPrivateVoiceRecording);
}

if (chatSendVoiceBtn) {
  chatSendVoiceBtn.addEventListener("click", sendPrivateVoiceMessage);
}

if (chatInput) {
  chatInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

  chatInput.addEventListener("input", function () {
    broadcastPrivateTyping(Boolean(chatInput.value.trim()));
  });

  chatInput.addEventListener("blur", function () {
    broadcastPrivateTyping(false);
  });
}

if (taskForm) {
  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    submitTaskForm().catch(() => alert("Unable to save this task. Please try again."));
  });
}

if (teamMemberForm) {
  teamMemberForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = window.TeamDirectory?.normalizeEmail?.(teamMemberEmailInput?.value) || "";
    if (!email) {
      alert("Please enter a member email.");
      teamMemberEmailInput?.focus();
      return;
    }

    const submitButton = teamMemberForm.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    try {
      const result = await window.TaskifyAuth.onboardMember({
        name: teamMemberNameInput?.value.trim() || "",
        email,
        role: teamMemberRoleInput?.value || "Member"
      });
      if (!result.success) {
        alert(result.message || "Unable to add this member.");
        return;
      }

      const members = window.TeamDirectory?.getTeamMembers?.() || [];
      const member = members.find((item) => item.userId === result.member.userId);
      if (member) {
        member.name = teamMemberNameInput?.value.trim() || member.name;
        member.role = teamMemberRoleInput?.value || member.role;
        member.password = window.TaskifyAuth.COMMON_PASSWORD;
      }
      window.TeamDirectory?.saveTeamMembers?.(members);
      teamMemberForm.reset();
      refreshTeamDirectoryUI();
      showToast(
        "Member access created",
        `${result.member.userId} was assigned. ${result.emailSent ? "Credentials were emailed." : "Credential email delivery is awaiting backend configuration."}`
      );
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

if (teamMembersList) {
  teamMembersList.addEventListener("click", (event) => {
    const removeButton = event.target instanceof Element ? event.target.closest(".team-remove-btn") : null;
    if (!removeButton) return;

    const email = removeButton.getAttribute("data-team-email");
    if (!email) return;

    const currentUser = getUserFromLocalStorage();
    if (window.TeamDirectory?.normalizeEmail?.(currentUser?.email) === email) {
      alert("You cannot remove the currently logged-in user.");
      return;
    }

    const members = (window.TeamDirectory?.getTeamMembers?.() || [])
      .filter((member) => window.TeamDirectory.normalizeEmail(member.email) !== email);
    window.TeamDirectory?.saveTeamMembers?.(members);
    const groups = (window.TeamDirectory?.getTeamGroups?.() || []).map((group) => ({
      ...group,
      members: (group.members || []).filter((memberEmail) => window.TeamDirectory.normalizeEmail(memberEmail) !== email)
    }));
    window.TeamDirectory?.saveTeamGroups?.(groups);
    refreshTeamDirectoryUI();
  });

  teamMembersList.addEventListener("change", (event) => {
    const roleSelect = event.target instanceof Element ? event.target.closest(".team-role-select") : null;
    if (!roleSelect) return;

    const email = roleSelect.getAttribute("data-team-email");
    if (!email) return;

    const members = window.TeamDirectory?.getTeamMembers?.() || [];
    const member = members.find((item) => window.TeamDirectory.normalizeEmail(item.email) === email);
    if (!member) return;

    member.role = roleSelect.value === "Admin" ? "Admin" : "Member";
    window.TeamDirectory?.saveTeamMembers?.(members);

    const currentUser = getUserFromLocalStorage();
    if (window.TeamDirectory?.normalizeEmail?.(currentUser?.email) === email) {
      currentUser.role = member.role;
      localStorage.setItem("ttm_logged_in_user", JSON.stringify(currentUser));
    }

    refreshTeamDirectoryUI();
  });
}

[pendingTaskColumn, inprogressTaskColumn].forEach((column) => {
  if (!column) return;

  column.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest(".mark-done-btn") : null;
    if (!button) return;
    markTaskAsDone(button.getAttribute("data-task-id"));
  });
});

if (openTaskModalBtn) {
  openTaskModalBtn.addEventListener("click", openTaskModal);
}

if (closeTaskModalBtn) {
  closeTaskModalBtn.addEventListener("click", closeTaskModal);
}

if (taskModalOverlay) {
  taskModalOverlay.addEventListener("click", function (event) {
    if (event.target === taskModalOverlay) {
      closeTaskModal();
    }
  });
}

const taskModalInputs = [
  taskTitleInput,
  taskSeverityInput,
  taskStatusInput,
  taskDeadlineInput,
  taskAssignedToInput
];

taskModalInputs.forEach((field) => {
  if (field) {
    field.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        submitTaskForm().catch(() => alert("Unable to save this task. Please try again."));
      }
    });
  }
});

if (taskDescriptionInput) {
  taskDescriptionInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && event.ctrlKey) {
      event.preventDefault();
      submitTaskForm().catch(() => alert("Unable to save this task. Please try again."));
    }
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && taskModalOverlay && !taskModalOverlay.classList.contains("hidden")) {
    closeTaskModal();
  }
});

document.addEventListener("click", function (event) {
  if (!(event.target instanceof Element)) return;

  const addCommentButton = event.target.closest(".task-comment-add");
  if (!addCommentButton) return;

  const commentsContainer = addCommentButton.closest(".task-comments");
  const commentInput = commentsContainer?.querySelector(".task-comment-input");
  if (!commentInput) return;

  addCommentToTask(addCommentButton.dataset.taskId, commentInput.value);
});

document.addEventListener("keydown", function (event) {
  if (!(event.target instanceof Element)) return;
  if (!event.target.classList?.contains("task-comment-input")) return;
  if (event.key !== "Enter") return;

  event.preventDefault();
  const commentsContainer = event.target.closest(".task-comments");
  const addCommentButton = commentsContainer?.querySelector(".task-comment-add");
  if (!addCommentButton) return;

  addCommentToTask(addCommentButton.dataset.taskId, event.target.value);
});

if (enableBrowserNotificationsBtn) {
  enableBrowserNotificationsBtn.addEventListener("click", enableBrowserNotifications);
}

if (disableBrowserNotificationsBtn) {
  disableBrowserNotificationsBtn.addEventListener("click", disableBrowserNotifications);
}

if (inAppToastToggle) {
  inAppToastToggle.checked = isInAppToastEnabled();
  inAppToastToggle.addEventListener("change", function () {
    setInAppToastEnabled(inAppToastToggle.checked);
  });
}

if (notificationSoundToggle) {
  notificationSoundToggle.checked = isNotificationSoundEnabled();
  notificationSoundToggle.addEventListener("change", function () {
    setNotificationSoundEnabled(notificationSoundToggle.checked);
  });
}

if (themeToggle) {
  themeToggle.addEventListener("change", function () {
    applyTheme(themeToggle.checked ? "dark" : "light");
  });
}

workspaceThemeOptions.forEach((option) => {
  option.addEventListener("change", () => {
    if (!option.checked) return;
    applyWorkspaceTheme(option.value);
    renderAllTaskUI();
    showToast(t("settings.themes.changedTitle"), t("settings.themes.changedBody"));
  });
});

languageOptions.forEach((option) => {
  option.addEventListener("change", () => {
    if (!option.checked) return;
    window.AppI18n?.setLanguage?.(option.value);
    applyAppTranslations();
    showToast(t("settings.language.changedTitle"), t("settings.language.changedBody"));
  });
});

if (clearNotificationsBtn) {
  clearNotificationsBtn.addEventListener("click", function () {
    saveNotificationsToStorage([]);
    renderNotifications();
    updateDashboardCounts();
    showToast("Notifications cleared", "All notifications have been removed.");
  });
}

if (resetAppDataBtn) {
  resetAppDataBtn.addEventListener("click", function () {
    const confirmed = window.confirm("Reset all app data on this device?");
    if (!confirmed) return;

    localStorage.removeItem("ttm_tasks");
    localStorage.removeItem("ttm_notifications");
    localStorage.removeItem("ttm_chats");
    localStorage.removeItem("ttm_group_messages");

    renderChatUsers();
    renderSelectedChatMessages();
    renderAllTaskUI();
    renderNotifications();
    updateStorageStatusText();
    showToast("App data reset", "Local workspace data was cleared.");
  });
}

if (taskSearchInput) {
  taskSearchInput.addEventListener("input", function () {
    renderTaskSearchResults(taskSearchInput.value);
  });
}

document.addEventListener("click", function (event) {
  if (!taskSearchResults || !taskSearchInput) return;
  if (event.target === taskSearchInput || taskSearchResults.contains(event.target)) return;
  taskSearchResults.classList.add("hidden");
});

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = appScreen?.classList.contains("mobile-nav-open");
    setMobileNavOpen(!isOpen);
  });
}

if (mobileSidebarOverlay) {
  mobileSidebarOverlay.addEventListener("click", closeMobileNav);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileNav();
});

const mobileNavMedia = window.matchMedia?.("(min-width: 1025px)");
if (mobileNavMedia) {
  const handleMobileNavBreakpoint = (event) => {
    if (event.matches) closeMobileNav();
  };

  if (mobileNavMedia.addEventListener) {
    mobileNavMedia.addEventListener("change", handleMobileNavBreakpoint);
  } else if (mobileNavMedia.addListener) {
    mobileNavMedia.addListener(handleMobileNavBreakpoint);
  }
}

// -----------------------------
// INIT
// -----------------------------
function checkExistingLogin() {
  let savedUser = getUserFromLocalStorage();

  if (savedUser) {
    savedUser = saveUserToLocalStorage(savedUser);
    updateUserUI(savedUser);
    showAppScreen();
  } else {
    showWelcomeScreen();
  }
}

migrateAppStorageIfNeeded();
applyTheme(getSavedTheme());
applyWorkspaceTheme(getSavedWorkspaceTheme(), { persist: false });
setupNavigation();
setupPrivateChatChannel();
setupPresenceTracking();
checkExistingLogin();
applyRoleBasedUI();
refreshTeamDirectoryUI();
renderSelectedChatMessages();
renderAllTaskUI();
renderNotifications();
updateNotificationPermissionUI();
maybeOpenMeetingFromHash();
applyAppTranslations();
