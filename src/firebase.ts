// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getMessaging } from "firebase/messaging";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCWZ0geICPxNv9KNTUbIl5oq3_QV5xp_MU",
//   authDomain: "ferrientregas.firebaseapp.com",
//   projectId: "ferrientregas",
//   storageBucket: "ferrientregas.firebasestorage.app",
//   messagingSenderId: "345658624917",
//   appId: "1:345658624917:web:f0882010f311ee0672c49c",
//   measurementId: "G-B0FWQ2PJKM"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const messaging = getMessaging(app);
// export const getToken = async (messaging: any, options: any) => {
//   try {
//     const token = await messaging.getToken(options);
//     return token;
//   } catch (error) {
//     console.error("Error obteniendo token", error);
//   }
// };
// export const onMessage = (messaging: any, callback: (payload: any) => void) => {
//   messaging.onMessage(callback);
// };