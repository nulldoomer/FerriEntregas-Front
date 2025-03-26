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

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Recibiste un mensaje en segundo plano ', payload);
});
