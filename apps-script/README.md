# Taskify authentication backend

GitHub Pages cannot securely send credential emails or provide shared
cross-device authentication by itself.

To enable those two capabilities:

1. Create a Google Apps Script project.
2. Replace its code with `Code.gs`.
3. Deploy it as a web app that executes as the project owner.
4. Allow access for the users who need Taskify onboarding and login.
5. Copy the deployment `/exec` URL into `backendUrl` in `auth-config.js`.

Until that URL is configured, User ID login and onboarding use the current
browser's local member directory. The onboarding screen clearly reports that
credential email delivery is not configured.
