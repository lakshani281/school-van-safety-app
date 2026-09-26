import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCC3RrAA0S-A3pqmvU8H8FqoTkivpmk_qc",
  authDomain: "saferide-98b62.firebaseapp.com",
  projectId: "saferide-98b62",
  storageBucket: "saferide-98b62.firebasestorage.app",
  messagingSenderId: "1056238105476",
  appId: "1:1056238105476:web:7a17f6b952ff836ac0a3d1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;