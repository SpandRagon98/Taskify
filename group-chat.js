// -----------------------------
// LOCAL REAL-TIME GROUP CHAT
// -----------------------------
// Uses localStorage for persistence and BroadcastChannel for same-browser-tab
// real-time updates. This avoids external Firebase import failures breaking the UI.

const BASE_GROUP_ROOMS = {
  general: {
    label: "General",
    i18nKey: "chat.roomGeneral",
    seed: []
  },
  tasks: {
    label: "Tasks",
    i18nKey: "chat.roomTasks",
    seed: []
  },
  announcements: {
    label: "Announcements",
    i18nKey: "chat.roomAnnouncements",
    seed: []
  }
};
let GROUP_ROOMS = getAvailableGroupRooms();

const GROUP_STORAGE_KEY = "ttm_group_messages";
const GROUP_CHANNEL_NAME = "ttm_group_chat_channel";

const groupChatMessages = document.getElementById("group-chat-messages");
const groupChatInput = document.getElementById("group-chat-input");
const groupSendBtn = document.getElementById("group-send-btn");
const groupFileInput = document.getElementById("group-file-input");
const groupAttachBtn = document.getElementById("group-attach-btn");
const groupRecordBtn = document.getElementById("group-record-btn");
const groupMeetNowBtn = document.getElementById("group-meet-now-btn");
const groupAttachmentPreview = document.getElementById("group-attachment-preview");
const groupVoicePanel = document.getElementById("group-voice-panel");
const groupVoiceStatus = document.getElementById("group-voice-status");
const groupStopRecordBtn = document.getElementById("group-stop-record-btn");
const groupSendVoiceBtn = document.getElementById("group-send-voice-btn");
const groupCancelRecordBtn = document.getElementById("group-cancel-record-btn");
const groupRoomButtons = document.querySelectorAll(".group-room-btn");
const activeGroupRoomLabel = document.getElementById("active-group-room-label");
const groupTypingIndicator = document.getElementById("group-typing-indicator");

let activeGroupRoom = "general";
let groupChannel = null;
let groupTypingTimer = null;
let groupVoiceRecorder = null;
let groupVoiceChunks = [];
let groupVoiceAttachment = null;
let groupVoiceCancelled = false;
let groupAttachmentPreviewUrls = [];

const GROUP_MAX_ATTACHMENT_SIZE = 750 * 1024;
const GROUP_MAX_VOICE_SIZE = 1200 * 1024;

function groupT(key, params = {}) {
  return window.AppI18n?.t?.(key, params) || key;
}

function getAvailableGroupRooms() {
  return {
    ...BASE_GROUP_ROOMS,
    ...(window.TeamDirectory?.getGroupRoomsForChat?.() || {})
  };
}

function getGroupRoomLabel(room) {
  const roomConfig = GROUP_ROOMS[room];
  if (!roomConfig) return "";
  return roomConfig.i18nKey ? groupT(roomConfig.i18nKey) : roomConfig.label;
}

function refreshGroupRooms(preferredRoom = activeGroupRoom) {
  GROUP_ROOMS = getAvailableGroupRooms();
  if (!GROUP_ROOMS[preferredRoom]) {
    preferredRoom = GROUP_ROOMS.general ? "general" : Object.keys(GROUP_ROOMS)[0];
  }
  if (preferredRoom) setActiveRoom(preferredRoom);
  if (typeof window.renderGroupManagement === "function") window.renderGroupManagement();
}

function getInitial(name) {
  return (name || "U").trim().charAt(0).toUpperCase() || "U";
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

function normalizeGroupMessage(message) {
  return {
    ...message,
    sender: message?.sender || "Team",
    text: message?.text || "",
    timestamp: message?.timestamp || new Date().toISOString(),
    attachments: normalizeAttachments(message?.attachments)
  };
}

function readFileAsAttachment(file, kind = "file", maxSize = GROUP_MAX_ATTACHMENT_SIZE) {
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

async function readInputAttachments(input, maxSize = GROUP_MAX_ATTACHMENT_SIZE) {
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

    return `
      <div class="message-attachments">
        <a class="attachment-chip" href="${attachment.dataUrl}" download="${escapeHTML(attachment.name)}" target="_blank" rel="noopener noreferrer">
          <span class="attachment-icon">${getFileTypeLabel(attachment.type, attachment.name)}</span>
          <span class="attachment-meta">
            <strong>${escapeHTML(attachment.name)}</strong>
            <small>${escapeHTML(getFileTypeLabel(attachment.type, attachment.name))} &bull; ${formatFileSize(attachment.size)}</small>
          </span>
        </a>
      </div>
    `;
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

function clearGroupAttachmentPreview() {
  clearAttachmentPreview(groupFileInput, groupAttachmentPreview, groupAttachmentPreviewUrls);
}

function renderGroupAttachmentPreview() {
  renderComposerAttachmentPreview(groupFileInput, groupAttachmentPreview, groupAttachmentPreviewUrls);
}

function getCurrentGroupUserName() {
  try {
    const savedUser = localStorage.getItem("ttm_logged_in_user");
    const user = savedUser ? JSON.parse(savedUser) : null;
    return user?.name || user?.email || "User";
  } catch {
    return "User";
  }
}

function saveGroupMessages(messages) {
  try {
    localStorage.setItem(GROUP_STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    alert("Unable to save group chat data. Please remove large attachments and try again.");
    throw error;
  }
}

function getSeedMessages() {
  const initialMessages = {};
  Object.entries(GROUP_ROOMS).forEach(([room, config]) => {
    initialMessages[room] = config.seed.map((message, index) => ({
      id: `${room}-${index + 1}`,
      sender: message.sender,
      text: message.text,
      timestamp: new Date(Date.now() - (config.seed.length - index) * 60000).toISOString()
    }));
  });
  return initialMessages;
}

function getGroupMessages() {
  try {
    const saved = localStorage.getItem(GROUP_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const normalized = parsed && typeof parsed === "object" ? parsed : {};
      Object.keys(normalized).forEach((room) => {
        normalized[room] = Array.isArray(normalized[room]) ? normalized[room].map(normalizeGroupMessage) : [];
      });
      return normalized;
    }
  } catch {
    // Fall through to defaults.
  }

  const initialMessages = getSeedMessages();
  saveGroupMessages(initialMessages);
  return initialMessages;
}

function formatMessageTime(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

function renderTypingIndicator(name = "") {
  if (!groupTypingIndicator) return;

  if (!name) {
    groupTypingIndicator.classList.add("hidden");
    groupTypingIndicator.innerHTML = "";
    return;
  }

  groupTypingIndicator.classList.remove("hidden");
  groupTypingIndicator.innerHTML = `
    <div class="typing-indicator-inner">
      <span class="typing-dots"><span></span><span></span><span></span></span>
      <span class="typing-indicator-text">${escapeHTML(name)} is typing...</span>
    </div>
  `;
}

function broadcastGroupTyping(isTyping) {
  if (!groupChannel) return;

  groupChannel.postMessage({
    type: "typing",
    room: activeGroupRoom,
    sender: getCurrentGroupUserName(),
    isTyping
  });
}

function renderGroupMessages() {
  if (!groupChatMessages) return;

  const messagesByRoom = getGroupMessages();
  const messages = messagesByRoom[activeGroupRoom] || [];
  const currentUserName = getCurrentGroupUserName();

  groupChatMessages.innerHTML = "";

  if (messages.length === 0) {
    groupChatMessages.innerHTML = `
      <div class="message-bubble received">
        <strong>${escapeHTML(groupT("chat.system"))}:</strong> ${escapeHTML(groupT("chat.noMessagesInRoom", { room: getGroupRoomLabel(activeGroupRoom) }))}
      </div>
    `;
    return;
  }

  messages.forEach((message) => {
    const isMine = message.sender === currentUserName || message.sender === "You";
    const senderName = isMine ? currentUserName : message.sender;
    const row = document.createElement("div");
    row.className = `group-message-row ${isMine ? "mine" : "other"}`;

    row.innerHTML = `
      <div class="group-chat-avatar">${escapeHTML(getInitial(senderName))}</div>
      <div class="group-chat-content">
        <div class="group-chat-meta">
          <span class="group-chat-sender">${escapeHTML(senderName)}</span>
          <span class="group-chat-time">${escapeHTML(formatMessageTime(message.timestamp))}</span>
        </div>
        <div class="message-bubble ${isMine ? "sent" : "received"}">
          ${message.text ? escapeHTML(message.text) : ""}
          ${renderMessageAttachments(message.attachments)}
        </div>
      </div>
    `;

    groupChatMessages.appendChild(row);
  });

  groupChatMessages.scrollTop = groupChatMessages.scrollHeight;
}

function setActiveRoom(room) {
  GROUP_ROOMS = getAvailableGroupRooms();
  if (!GROUP_ROOMS[room]) return;

  activeGroupRoom = room;

  groupRoomButtons.forEach((button) => {
    button.classList.toggle("active-room-btn", button.dataset.room === room);
  });

  if (activeGroupRoomLabel) {
    activeGroupRoomLabel.textContent = groupT("chat.activeRoom", { room: getGroupRoomLabel(room) });
  }

  if (groupChatInput) {
    groupChatInput.placeholder = groupT("chat.roomPlaceholder", { room: getGroupRoomLabel(room).toLowerCase() });
  }

  renderTypingIndicator("");
  renderGroupMessages();
  if (typeof window.renderGroupManagement === "function") window.renderGroupManagement();
}

function appendGroupMessage(room, message, shouldBroadcast = true) {
  const messagesByRoom = getGroupMessages();
  if (!messagesByRoom[room]) messagesByRoom[room] = [];

  if (messagesByRoom[room].some((item) => item.id === message.id)) return;

  messagesByRoom[room].push(message);
  saveGroupMessages(messagesByRoom);

  if (room === activeGroupRoom) renderGroupMessages();
  if (typeof window.renderGoogleDriveFiles === "function") window.renderGoogleDriveFiles();

  if (shouldBroadcast && groupChannel) {
    groupChannel.postMessage({ room, message });
  }
}

async function sendGroupMessage() {
  if (!groupChatInput) return;

  const text = groupChatInput.value.trim();
  let attachments = [];

  try {
    attachments = await readInputAttachments(groupFileInput, GROUP_MAX_ATTACHMENT_SIZE);
  } catch (error) {
    alert(error.message || "Unable to attach the selected file.");
    return;
  }

  if (!text && attachments.length === 0) return;

  const sender = getCurrentGroupUserName();
  const room = activeGroupRoom;
  const message = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    sender,
    text,
    timestamp: new Date().toISOString(),
    attachments
  };

  appendGroupMessage(room, message);
  groupChatInput.value = "";
  clearGroupAttachmentPreview();
  broadcastGroupTyping(false);
  renderTypingIndicator("");

  if (typeof window.addAppNotification === "function") {
    window.addAppNotification("Group chat", `Message sent in ${GROUP_ROOMS[room].label}.`);
  }

  if (typeof window.renderGoogleDriveFiles === "function") {
    window.renderGoogleDriveFiles();
  }
}

function setGroupVoicePanel(state, message = "") {
  if (!groupVoicePanel) return;

  const isIdle = state === "idle";
  groupVoicePanel.classList.toggle("hidden", isIdle);
  if (groupVoiceStatus) groupVoiceStatus.textContent = message;
  if (groupStopRecordBtn) groupStopRecordBtn.classList.toggle("hidden", state !== "recording");
  if (groupSendVoiceBtn) groupSendVoiceBtn.classList.toggle("hidden", state !== "ready");
}

async function startGroupVoiceRecording() {
  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
    alert("Voice recording is not supported in this browser.");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    groupVoiceChunks = [];
    groupVoiceAttachment = null;
    groupVoiceCancelled = false;
    groupVoiceRecorder = new MediaRecorder(stream);

    groupVoiceRecorder.addEventListener("dataavailable", (event) => {
      if (event.data?.size) groupVoiceChunks.push(event.data);
    });

    groupVoiceRecorder.addEventListener("stop", async () => {
      stream.getTracks().forEach((track) => track.stop());
      if (groupVoiceCancelled) {
        groupVoiceChunks = [];
        groupVoiceAttachment = null;
        setGroupVoicePanel("idle");
        return;
      }

      const blob = new Blob(groupVoiceChunks, { type: groupVoiceRecorder?.mimeType || "audio/webm" });
      if (blob.size > GROUP_MAX_VOICE_SIZE) {
        groupVoiceAttachment = null;
        setGroupVoicePanel("idle");
        alert(`Voice message is too large. Maximum size is ${formatFileSize(GROUP_MAX_VOICE_SIZE)}.`);
        return;
      }

      const file = new File([blob], `Voice message ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}.webm`, {
        type: blob.type || "audio/webm"
      });
      groupVoiceAttachment = await readFileAsAttachment(file, "voice", GROUP_MAX_VOICE_SIZE);
      setGroupVoicePanel("ready", "Voice message ready to send.");
    });

    groupVoiceRecorder.start();
    setGroupVoicePanel("recording", "Recording voice message...");
  } catch {
    setGroupVoicePanel("idle");
    alert("Microphone access was denied or unavailable.");
  }
}

function stopGroupVoiceRecording() {
  if (groupVoiceRecorder && groupVoiceRecorder.state === "recording") {
    groupVoiceRecorder.stop();
  }
}

function cancelGroupVoiceRecording() {
  groupVoiceCancelled = true;
  if (groupVoiceRecorder && groupVoiceRecorder.state === "recording") {
    groupVoiceRecorder.stream?.getTracks().forEach((track) => track.stop());
    groupVoiceRecorder.stop();
  }
  groupVoiceAttachment = null;
  groupVoiceChunks = [];
  setGroupVoicePanel("idle");
}

function sendGroupVoiceMessage() {
  if (!groupVoiceAttachment) return;

  const room = activeGroupRoom;
  appendGroupMessage(room, {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    sender: getCurrentGroupUserName(),
    text: "",
    timestamp: new Date().toISOString(),
    attachments: [groupVoiceAttachment]
  });

  groupVoiceAttachment = null;
  groupVoiceChunks = [];
  setGroupVoicePanel("idle");

  if (typeof window.addAppNotification === "function") {
    window.addAppNotification("Group chat", `Voice message sent in ${GROUP_ROOMS[room].label}.`);
  }

  if (typeof window.renderGoogleDriveFiles === "function") {
    window.renderGoogleDriveFiles();
  }
}

function setupGroupChannel() {
  if (!("BroadcastChannel" in window)) return;

  groupChannel = new BroadcastChannel(GROUP_CHANNEL_NAME);
  groupChannel.addEventListener("message", (event) => {
    const data = event.data || {};

    if (data.type === "typing") {
      if (data.room !== activeGroupRoom) return;
      if (!data.sender || data.sender === getCurrentGroupUserName()) return;

      renderTypingIndicator(data.isTyping ? data.sender : "");

      if (groupTypingTimer) clearTimeout(groupTypingTimer);
      if (data.isTyping) {
        groupTypingTimer = setTimeout(() => renderTypingIndicator(""), 1800);
      }
      return;
    }

    const { room, message } = data;
    if (!room || !message) return;
    appendGroupMessage(room, message, false);
  });
}

groupRoomButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveRoom(button.dataset.room);
  });
});

if (groupSendBtn) {
  groupSendBtn.addEventListener("click", sendGroupMessage);
}

if (groupMeetNowBtn) {
  groupMeetNowBtn.addEventListener("click", () => {
    if (typeof window.startAppMeeting !== "function") {
      alert("Meetings are not available in this browser.");
      return;
    }

    window.startAppMeeting({
      type: "group",
      title: `${GROUP_ROOMS[activeGroupRoom].label} Meeting`,
      target: activeGroupRoom
    });
  });
}

if (groupAttachBtn && groupFileInput) {
  groupAttachBtn.addEventListener("click", () => groupFileInput.click());
}

if (groupFileInput) {
  groupFileInput.addEventListener("change", renderGroupAttachmentPreview);
}

if (groupAttachmentPreview) {
  groupAttachmentPreview.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest(".composer-preview-remove")) {
      clearGroupAttachmentPreview();
    }
  });
}

if (groupRecordBtn) {
  groupRecordBtn.addEventListener("click", startGroupVoiceRecording);
}

if (groupStopRecordBtn) {
  groupStopRecordBtn.addEventListener("click", stopGroupVoiceRecording);
}

if (groupCancelRecordBtn) {
  groupCancelRecordBtn.addEventListener("click", cancelGroupVoiceRecording);
}

if (groupSendVoiceBtn) {
  groupSendVoiceBtn.addEventListener("click", sendGroupVoiceMessage);
}

if (groupChatInput) {
  groupChatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendGroupMessage();
    }
  });

  groupChatInput.addEventListener("input", () => {
    broadcastGroupTyping(Boolean(groupChatInput.value.trim()));
  });

  groupChatInput.addEventListener("blur", () => broadcastGroupTyping(false));
}

setupGroupChannel();
setActiveRoom(activeGroupRoom);

window.setGroupChatRoom = setActiveRoom;
window.refreshGroupRooms = refreshGroupRooms;
window.getActiveGroupRoom = () => activeGroupRoom;
window.refreshGroupChatLanguage = () => setActiveRoom(activeGroupRoom);
