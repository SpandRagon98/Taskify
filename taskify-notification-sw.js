self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const sectionId = event.notification.data?.sectionId || "";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const taskifyClient = clients.find((client) => client.url.startsWith(self.registration.scope)) || clients[0];
      if (taskifyClient) {
        taskifyClient.postMessage({
          type: "taskify-notification-click",
          sectionId
        });
        return taskifyClient.focus();
      }
      return self.clients.openWindow("./");
    })
  );
});

// GitHub Pages has no push backend. Closed-app delivery will require a future
// Push API subscription and a trusted service such as Firebase Cloud Messaging.
