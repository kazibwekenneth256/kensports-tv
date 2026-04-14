// KenSports TV - Firebase Service Worker for Push Notifications
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBPG64VEQ7q_ivfJ2O2LVWQB0kpvS992hc",
  authDomain: "kensportstv-9f7af.firebaseapp.com",
  projectId: "kensportstv-9f7af",
  storageBucket: "kensportstv-9f7af.firebasestorage.app",
  messagingSenderId: "23049908827",
  appId: "1:23049908827:web:f34ed8df5b81fbd6fe857e",
  measurementId: "G-GDS4LRTPP5"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('Background message received:', payload);
  const data = payload.data || {};
  const title = data.title || payload.notification?.title || 'KenSports TV';
  const body = data.body || payload.notification?.body || '';
  const icon = data.icon || '/kensports_logo_round.png';
  const badge = '/kensports_logo_round.png';

  const notificationOptions = {
    body: body,
    icon: icon,
    badge: badge,
    vibrate: [300, 100, 300],
    data: { url: 'https://kensports.github.io' },
    actions: [
      { action: 'watch', title: '📺 Watch Now' },
      { action: 'close', title: '✕ Close' }
    ],
    requireInteraction: true
  };

  return self.registration.showNotification(title, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'watch' || !event.action) {
    event.waitUntil(
      clients.openWindow('https://kensports.github.io')
    );
  }
});
