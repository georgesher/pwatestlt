importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging.js');

// Инициализация Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBRuZatY8-UVZjIx5f01BIYiTe2c7441so",
  authDomain: "teststl24.firebaseapp.com",
  projectId: "teststl24",
  storageBucket: "teststl24.appspot.com",
  messagingSenderId: "601498787082",
  appId: "1:601498787082:web:0ff88474a5e0a36774eef3"
});

const messaging = firebase.messaging();

// Обработка входящих push-уведомлений
messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icon.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
