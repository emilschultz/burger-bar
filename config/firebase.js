import firebase from 'firebase';
import 'firebase/auth';

// const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
// };

// // INITIALIZE FIREBASE
// try {
//   firebase.initializeApp(firebaseConfig);
// } catch(error) {
//   if (!/already exists/.test(error.message)) {
//     console.error("Firebase error");
//   }
// }

// const firebaseInstance = firebase;
// export default firebaseInstance;

if (typeof window !== "undefined" && !firebase.apps.length) {
  try {
    firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    });
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  } catch (error) {
    console.log(error);
  }
}

export default firebase;
