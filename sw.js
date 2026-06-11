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

// 백그라운드 푸시 수신
messaging.onBackgroundMessage(payload => {
  const title = payload.notification?.title || '남한강마트';
  const body  = payload.notification?.body  || '';
  const icon  = payload.notification?.icon  || './icon-192.png';
  const image = payload.notification?.image || undefined;

  self.registration.showNotification(title, {
    body,
    icon,
    image,
    badge: './icon-192.png',
    vibrate: [200, 100, 200],
  });
});

// 캐시
const CACHE = 'namhangangmart-v1';
const ASSETS = ['./', './index.html'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('./')))
  );
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('./'));
});
