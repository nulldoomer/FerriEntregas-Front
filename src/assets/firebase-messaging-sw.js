importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCkBgdQ8E562iIyYhoocSs-A8PGgI_EHSI",
  authDomain: "ferridescuentos-4e582.firebaseapp.com",
  projectId: "ferridescuentos-4e582",
  storageBucket: "ferridescuentos-4e582.firebasestorage.app",
  messagingSenderId: "337284428853",
  appId: "1:337284428853:web:61de84c450975333e4ad7c",
  measurementId: "G-NB5LP2YN25"
});

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Obtiene una instancia de Firebase Messaging
const messaging = firebase.messaging();

// Maneja los mensajes en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Recibido mensaje en segundo plano:', payload);
  // Personaliza la notificación aquí
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // Reemplaza con el ícono de tu aplicación
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
