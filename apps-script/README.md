# Taskify authentication backend

GitHub Pages cannot securely send credential emails or provide shared
cross-device authentication by itself.

To enable those two capabilities:

1. Create a Google Apps Script project.
2. Replace its code with `Code.gs`.
3. Deploy it as a web app that executes as the project owner.
4. Set **Who has access** to **Anyone** so the public GitHub Pages app can
   onboard members and authenticate them.
5. Copy the deployment `/exec` URL into `backendUrl` in `auth-config.js`.

Until that URL is configured, User ID login and onboarding use the current
browser's local member directory. The onboarding screen reports that access
was created but the credential email could not be sent; it never displays the
generated User ID or password.

The backend rejects duplicate email addresses, stores each new member before
attempting delivery, and sends credentials with Google Apps Script `MailApp`.
If mail delivery fails after the record is saved, the response reports that
failure without returning the password to the page.
