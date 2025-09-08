// Importa las librerías compat (para service workers)
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAH8NSr0PoXAkFJw-WAVoPMg-5Qqg1dKKM",
  authDomain: "mi-planer-semanal.firebaseapp.com",
  projectId: "mi-planer-semanal",
  storageBucket: "mi-planer-semanal.firebasestorage.app",
  messagingSenderId: "892268634757",
  appId: "1:892268634757:web:2055cf5e282372c7c9ffec",
  measurementId: "G-RGTL8JSZ1T"
};

// Inicializa Firebase en el service worker
firebase.initializeApp(firebaseConfig);

// Inicializa messaging
const messaging = firebase.messaging();

// Manejo de notificaciones en background
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Notificación en background recibida:', payload);

  const notificationTitle = payload.notification?.title || "Recordatorio";
  const notificationOptions = {
    body: payload.notification?.body || "Tienes una tarea pendiente.",
    icon: "/icon-192.png", // asegúrate de tener un icono en tu carpeta pública
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Opcional: manejar clics en la notificación
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow("/");
    })
  );
});


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH8NSr0PoXAkFJw-WAVoPMg-5Qqg1dKKM",
  authDomain: "mi-planer-semanal.firebaseapp.com",
  projectId: "mi-planer-semanal",
  storageBucket: "mi-planer-semanal.firebasestorage.app",
  messagingSenderId: "892268634757",
  appId: "1:892268634757:web:2055cf5e282372c7c9ffec",
  measurementId: "G-RGTL8JSZ1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);