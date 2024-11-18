// // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// const { initializeApp } = require("firebase/app");
// const { getAnalytics, isSupported } = require("firebase/analytics");
// const { FIREBASE_APIKEY, FIREBASE_AUTHDOMAIN, FIREBASE_PROJECID, FIREBASE_BUCKET, messagingSenderId, measurementId } = require("../config/config");
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: FIREBASE_APIKEY,
//     authDomain: FIREBASE_AUTHDOMAIN,
//     projectId: FIREBASE_PROJECID,
//     storageBucket: FIREBASE_BUCKET,
//     messagingSenderId: messagingSenderId,
//     appId: FIREBASE_PROJECID,
//     measurementId: measurementId
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// let analytics;

// if (typeof window !== "undefined") {
//     isSupported().then((supported) => {
//         if (supported) {
//             analytics = getAnalytics(app);
//         } else {
//             console.log("Firebase Analytics is not supported in this environment.");
//         }
//     });
// }
// const storage = getStorage(app);

// module.exports = { app, analytics, storage };