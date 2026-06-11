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
  let member;
  try {
    const members = taskifyGetMembers_();
    const existingMember = members.find(function (item) {
      return String(item.email || "").trim().toLowerCase() === email;
    });

    if (existingMember) {
      return taskifyJson_({
        success: false,
        code: "EMAIL_EXISTS",
        message: "This email already has Taskify access. Please login with your existing credentials or contact admin."
      });
    }

    member = {
      id: Utilities.getUuid(),
      name: String(payload.name || taskifyNameFromEmail_(email)).trim() || "Member",
      email: email,
      role: taskifyNormalizeRole_(payload.role),
      userId: taskifyNextUserId_(members, payload.reservedUserIds),
      password: TASKIFY_COMMON_PASSWORD
    };
    members.push(member);
    taskifySaveMembers_(members);
  } finally {
    lock.releaseLock();
  }

  try {
    MailApp.sendEmail({
      to: member.email,
      subject: "Welcome to Taskify - Your Login Credentials",
      body: [
        "Hello " + member.name + ",",
        "",
        "Welcome to Taskify.",
        "",
        "Your login credentials are:",
        "",
        "User ID: " + member.userId,
        "Password: " + TASKIFY_COMMON_PASSWORD,
        "",
        "Please keep these credentials safe. You can use them to log in to Taskify anytime.",
        "",
        "Regards,",
        "Taskify Team"
      ].join("\n")
    });

    return taskifyJson_({
      success: true,
      accessCreated: true,
      member: taskifyPublicMember_(member),
      emailSent: true
    });
  } catch (error) {
    return taskifyJson_({
      success: true,
      accessCreated: true,
      member: taskifyPublicMember_(member),
      emailSent: false,
      message: "Access was created, but credential email could not be sent. Please contact the admin."
    });
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

function taskifyNextUserId_(members, reservedUserIds) {
  const allUserIds = members.map(function (member) {
    return member.userId;
  }).concat(Array.isArray(reservedUserIds) ? reservedUserIds : []);
  const used = {};
  const highest = allUserIds.reduce(function (maximum, value) {
    const normalized = taskifyNormalizeUserId_(value);
    if (normalized) used[normalized] = true;
    const number = normalized ? Number(normalized.split("-")[1]) : 0;
    return Math.max(maximum, number);
  }, TASKIFY_FIRST_USER_NUMBER - 1);
  let nextNumber = Math.max(TASKIFY_FIRST_USER_NUMBER, highest + 1);
  while (used["USER-" + nextNumber]) nextNumber += 1;
  return "USER-" + nextNumber;
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

function taskifyNormalizeRole_(value) {
  return String(value || "").trim().toLowerCase() === "admin" ? "Admin" : "Member";
}

function taskifyPublicMember_(member) {
  const publicMember = Object.assign({}, member);
  delete publicMember.password;
  return publicMember;
}

function taskifyJson_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
