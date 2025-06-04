// src/lib/firebaseConfig.ts
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For Firebase Authentication
import { getFirestore } from "firebase/firestore"; // For Firestore Database
import { getStorage } from "firebase/storage"; // For Firebase Storage (if your app uses it)
// import { getAnalytics } from "firebase/analytics"; // Uncomment if you want to use Firebase Analytics (ensure enabled in project)

// Your web app's Firebase configuration, read from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // If using Analytics
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig as { [key: string]: string | undefined });
} else {
  firebaseApp = getApp(); // if already initialized, get the existing instance
}

// Export services that your application components will use
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp); // Uncomment this line IF your app uses Firebase Storage

// If you plan to use Firebase Analytics (and enabled it in Firebase Console), uncomment the line below:
// export const analytics = getAnalytics(firebaseApp);

export default firebaseApp;
