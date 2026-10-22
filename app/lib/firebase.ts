// lib/firebaseConfig.ts
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAXq-vbl2kgI05rDR6W5LrXJJYdIH8LPT0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "bimbel-kiddos.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "bimbel-kiddos",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "bimbel-kiddos.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "168588107421",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:168588107421:web:6b97ddaa8618c8ff67be74",
};

const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { db, auth };
