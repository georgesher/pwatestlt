// Инициализация Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Получение объекта для работы с Firebase Messaging
const messaging = firebase.messaging();

navigator.serviceWorker.register('firebase-messaging-sw.js')
.then(function(registration) {
    console.log('Service Worker Registered:', registration);
    messaging.useServiceWorker(registration);
});

// Подписка на push-уведомления
document.getElementById('subscribe').addEventListener('click', function() {
    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
            messaging.getToken({ vapidKey: 'YOUR_VAPID_KEY' }).then(function(currentToken) {
                if (currentToken) {
                    console.log('FCM токен:', currentToken);
                    alert('Subscribed to Push Notifications!');
                } else {
                    console.log('Нет токена. Пожалуйста, повторите запрос.');
                }
            }).catch(function(err) {
                console.log('Ошибка получения токена:', err);
            });
        }
    });
});

// Обработка входящих сообщений в foreground
messaging.onMessage(function(payload) {
    console.log('Message received. ', payload);
    // Здесь можно отобразить уведомление в UI
});
