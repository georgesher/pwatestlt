// Инициализация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBRuZatY8-UVZjIx5f01BIYiTe2c7441so",
    authDomain: "teststl24.firebaseapp.com",
    projectId: "teststl24",
    storageBucket: "teststl24.appspot.com",
    messagingSenderId: "601498787082",
    appId: "1:601498787082:web:0ff88474a5e0a36774eef3"
};

firebase.initializeApp(firebaseConfig);

// Получение объекта для работы с Firebase Messaging
const messaging = firebase.messaging();

navigator.serviceWorker.register('./firebase-messaging-sw.js')
.then(function(registration) {
    console.log('Service Worker Registered:', registration);
    messaging.useServiceWorker(registration);
});

// Подписка на push-уведомления
document.getElementById('subscribe').addEventListener('click', function() {
    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
            messaging.getToken({ vapidKey: 'YOUR_PUBLIC_VAPID_KEY' }).then(function(currentToken) {
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
