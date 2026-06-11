importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCI51nLc-8tCdVAs8yalrxeKFYusVwCo5c",
  authDomain: "namhangangmart.firebaseapp.com",
  projectId: "namhangangmart",
  storageBucket: "namhangangmart.firebasestorage.app",
  messagingSenderId: "222555359715",
  appId: "1:222555359715:web:dba12309d3035b976938d6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload){
  const title = payload.notification?.title || '남한강마트';
  const options = {
    body: payload.notification?.body || '',
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [200, 100, 200],
  };
  if(payload.notification?.image) options.image = payload.notification.image;
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(e){
  e.notification.close();
  e.waitUntil(clients.openWindow('./'));
});
