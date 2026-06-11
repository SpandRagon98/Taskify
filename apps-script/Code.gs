const TASKIFY_MEMBERS_PROPERTY = "TASKIFY_MEMBERS_V1";
const TASKIFY_COMMON_PASSWORD = "Company@1234";
const TASKIFY_FIRST_USER_NUMBER = 2021;

function doGet() {
  return taskifyJson_({
    success: true,
    message: "Taskify authentication service is running",
    capabilities: ["loginByUserId", "onboardMember"]
  });
}

function doPost(event) {
  try {
    const payload = JSON.parse((event && event.postData && event.postData.contents) || "{}");
    if (payload.action === "loginByUserId") return taskifyLogin_(payload);
    if (payload.action === "onboardMember") return taskifyOnboard_(payload);
    return taskifyJson_({ success: false, message: "Unsupported authentication action." });
  } catch (error) {
    return taskifyJson_({ success: false, message: error.message || "Authentication request failed." });
  }
}

function taskifyLogin_(payload) {
  const userId = taskifyNormalizeUserId_(payload.userId);
  if (!userId || payload.password !== TASKIFY_COMMON_PASSWORD) {
    return taskifyJson_({ success: false, message: "Invalid User ID or password." });
  }

  const member = taskifyGetMembers_().find(function (item) {
    return taskifyNormalizeUserId_(item.userId) === userId;
  });
  if (!member || member.password !== TASKIFY_COMMON_PASSWORD) {
    return taskifyJson_({ success: false, message: "Invalid User ID or password." });
  }

  const user = Object.assign({}, member);
  delete user.password;
  return taskifyJson_({ success: true, user: user });
}

function taskifyOnboard_(payload) {
  const email = String(payload.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return taskifyJson_({ success: false, message: "Enter a valid email address." });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const members = taskifyGetMembers_();
    let member = members.find(function (item) {
      return String(item.email || "").trim().toLowerCase() === email;
    });

    if (!member) {
      member = {
        id: Utilities.getUuid(),
        name: String(payload.name || taskifyNameFromEmail_(email)).trim() || "Member",
        email: email,
        role: members.length ? "Member" : "Admin",
        userId: taskifyNextUserId_(members),
        password: TASKIFY_COMMON_PASSWORD
      };
      members.push(member);
      taskifySaveMembers_(members);
    } else {
      member.password = TASKIFY_COMMON_PASSWORD;
      taskifySaveMembers_(members);
    }

    MailApp.sendEmail({
      to: member.email,
      subject: "Welcome to Taskify - Your Login Credentials",
      body: [
        "Welcome to Taskify.",
        "",
        "Your login credentials are:",
        "",
        "User ID: " + member.userId,
        "Password: " + TASKIFY_COMMON_PASSWORD,
        "",
        "Please use these credentials to login to Taskify."
      ].join("\n")
    });

    return taskifyJson_({ success: true, member: member, emailSent: true });
  } finally {
    lock.releaseLock();
  }
}

function taskifyGetMembers_() {
  const raw = PropertiesService.getScriptProperties().getProperty(TASKIFY_MEMBERS_PROPERTY);
  if (!raw) return [];
  try {
    const members = JSON.parse(raw);
    return Array.isArray(members) ? members : [];
  } catch (error) {
    return [];
  }
}

function taskifySaveMembers_(members) {
  PropertiesService.getScriptProperties().setProperty(TASKIFY_MEMBERS_PROPERTY, JSON.stringify(members));
}

function taskifyNextUserId_(members) {
  const highest = members.reduce(function (maximum, member) {
    const normalized = taskifyNormalizeUserId_(member.userId);
    const number = normalized ? Number(normalized.split("-")[1]) : 0;
    return Math.max(maximum, number);
  }, TASKIFY_FIRST_USER_NUMBER - 1);
  return "USER-" + Math.max(TASKIFY_FIRST_USER_NUMBER, highest + 1);
}

function taskifyNormalizeUserId_(value) {
  const match = String(value || "").trim().toUpperCase().match(/^USER-(\d+)$/);
  return match ? "USER-" + Number(match[1]) : "";
}

function taskifyNameFromEmail_(email) {
  return String(email || "").split("@")[0].split(/[._-]+/).filter(Boolean).map(function (part) {
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join(" ");
}

function taskifyJson_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
