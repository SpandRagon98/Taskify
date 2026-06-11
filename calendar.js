// -----------------------------
// CALENDAR / MEETING SCHEDULER
// -----------------------------
// Keeps scheduler state isolated from task, chat, and dashboard logic.

const CALENDAR_STORAGE_KEY = "ttm_calendar_meetings";

const calendarForm = document.getElementById("calendar-meeting-form");
const meetingTitleInput = document.getElementById("meeting-title-input");
const meetingDateInput = document.getElementById("meeting-date-input");
const meetingTimeInput = document.getElementById("meeting-time-input");
const meetingLinkInput = document.getElementById("meeting-link-input");
const meetingParticipantsInput = document.getElementById("meeting-participants-input");
const meetingDescriptionInput = document.getElementById("meeting-description-input");
const upcomingMeetingsList = document.getElementById("upcoming-meetings-list");
const todayMeetingsList = document.getElementById("today-meetings-list");

function escapeCalendarHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function calendarT(key, params = {}) {
  return window.AppI18n?.t?.(key, params) || key;
}

function getCalendarMeetings() {
  try {
    const saved = localStorage.getItem(CALENDAR_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed.filter((meeting) => meeting && meeting.id) : [];
  } catch {
    return [];
  }
}

function saveCalendarMeetings(meetings) {
  localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(meetings));
}

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMeetingDateValue(meeting) {
  return new Date(`${meeting.date || "1970-01-01"}T${meeting.time || "00:00"}`);
}

function sortMeetings(meetings) {
  return meetings.slice().sort((a, b) => getMeetingDateValue(a) - getMeetingDateValue(b));
}

function normalizeMeetingLink(link) {
  const trimmed = String(link || "").trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function formatMeetingDate(dateString) {
  const date = new Date(`${dateString}T00:00`);
  if (Number.isNaN(date.getTime())) return calendarT("calendar.noDate");
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function formatMeetingTime(timeString) {
  if (!timeString) return calendarT("calendar.noTime");
  const date = new Date(`1970-01-01T${timeString}`);
  if (Number.isNaN(date.getTime())) return timeString;
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
}

function setCalendarError(input, message) {
  const error = document.querySelector(`[data-error-for="${input.id}"]`);
  input.classList.toggle("calendar-invalid", Boolean(message));
  if (error) error.textContent = message || "";
}

function clearCalendarErrors() {
  [meetingTitleInput, meetingDateInput, meetingTimeInput, meetingLinkInput].forEach((input) => {
    if (input) setCalendarError(input, "");
  });
}

function validateMeetingForm() {
  clearCalendarErrors();
  let isValid = true;

  if (!meetingTitleInput.value.trim()) {
    setCalendarError(meetingTitleInput, calendarT("calendar.titleRequired"));
    isValid = false;
  }

  if (!meetingDateInput.value) {
    setCalendarError(meetingDateInput, calendarT("calendar.dateRequired"));
    isValid = false;
  }

  if (!meetingTimeInput.value) {
    setCalendarError(meetingTimeInput, calendarT("calendar.timeRequired"));
    isValid = false;
  }

  const normalizedLink = normalizeMeetingLink(meetingLinkInput.value);
  if (!normalizedLink) {
    setCalendarError(meetingLinkInput, calendarT("calendar.linkRequired"));
    isValid = false;
  } else {
    try {
      const url = new URL(normalizedLink);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error("Invalid protocol");
    } catch {
      setCalendarError(meetingLinkInput, calendarT("calendar.linkInvalid"));
      isValid = false;
    }
  }

  return isValid;
}

function getMeetingFormValues() {
  return {
    id: `calendar-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: meetingTitleInput.value.trim(),
    date: meetingDateInput.value,
    time: meetingTimeInput.value,
    meetLink: normalizeMeetingLink(meetingLinkInput.value),
    participants: meetingParticipantsInput.value
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean),
    description: meetingDescriptionInput.value.trim(),
    createdAt: new Date().toISOString()
  };
}

function getMeetingParticipantsText(meeting) {
  const participants = Array.isArray(meeting.participants)
    ? meeting.participants
    : String(meeting.participants || "").split(",").map((name) => name.trim()).filter(Boolean);
  return participants.length ? participants.join(", ") : calendarT("calendar.noParticipants");
}

function getSafeMeetingLink(meeting) {
  try {
    const url = new URL(normalizeMeetingLink(meeting.meetLink));
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : "";
  } catch {
    return "";
  }
}

function renderMeetingCard(meeting, compact = false) {
  const safeLink = getSafeMeetingLink(meeting);
  return `
    <article class="${compact ? "today-meeting-item" : "calendar-meeting-card"}">
      <div>
        <h4>${escapeCalendarHTML(meeting.title || calendarT("calendar.untitled"))}</h4>
        <p>${escapeCalendarHTML(formatMeetingDate(meeting.date))} ${escapeCalendarHTML(calendarT("calendar.at"))} ${escapeCalendarHTML(formatMeetingTime(meeting.time))}</p>
        <p>${escapeCalendarHTML(getMeetingParticipantsText(meeting))}</p>
        ${!compact && meeting.description ? `<p>${escapeCalendarHTML(meeting.description)}</p>` : ""}
      </div>
      ${safeLink
        ? `<a class="primary-btn" href="${escapeCalendarHTML(safeLink)}" target="_blank" rel="noopener noreferrer">${escapeCalendarHTML(calendarT("calendar.joinMeet"))}</a>`
        : `<button class="secondary-btn" type="button" disabled>${escapeCalendarHTML(calendarT("calendar.linkUnavailable"))}</button>`
      }
    </article>
  `;
}

function renderUpcomingMeetings() {
  if (!upcomingMeetingsList) return;

  const now = new Date();
  const meetings = sortMeetings(getCalendarMeetings())
    .filter((meeting) => getMeetingDateValue(meeting) >= new Date(now.getFullYear(), now.getMonth(), now.getDate()));

  if (!meetings.length) {
    upcomingMeetingsList.innerHTML = `
      <div class="calendar-empty">
        <h4>${escapeCalendarHTML(calendarT("calendar.noUpcoming"))}</h4>
        <p>${escapeCalendarHTML(calendarT("calendar.emptyUpcomingBody"))}</p>
      </div>
    `;
    return;
  }

  upcomingMeetingsList.innerHTML = meetings.map((meeting) => renderMeetingCard(meeting)).join("");
}

function renderTodayMeetings() {
  if (!todayMeetingsList) return;

  const today = getLocalDateString();
  const meetings = sortMeetings(getCalendarMeetings())
    .filter((meeting) => meeting.date === today)
    .slice(0, 3);

  if (!meetings.length) {
    todayMeetingsList.innerHTML = `
      <div class="today-meetings-empty">
        <p>${escapeCalendarHTML(calendarT("calendar.noToday"))}</p>
      </div>
    `;
    return;
  }

  todayMeetingsList.innerHTML = meetings.map((meeting) => renderMeetingCard(meeting, true)).join("");
}

function renderCalendarMeetings() {
  renderUpcomingMeetings();
  renderTodayMeetings();
}

function handleCalendarSubmit(event) {
  event.preventDefault();
  if (!validateMeetingForm()) return;

  const meetings = getCalendarMeetings();
  meetings.push(getMeetingFormValues());
  saveCalendarMeetings(meetings);
  calendarForm.reset();
  clearCalendarErrors();
  renderCalendarMeetings();
}

if (calendarForm) {
  calendarForm.addEventListener("submit", handleCalendarSubmit);
}

window.renderCalendarMeetings = renderCalendarMeetings;
renderCalendarMeetings();
