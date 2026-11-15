// ============================================
// НАСТРОЙКИ FIREBASE
// Заполни эти данные из Firebase Console
// (Project settings → Your apps → SDK setup)
// ============================================

const firebaseConfig = {
  apiKey: "СЮДА_API_KEY",
  authDomain: "СЮДА_PROJECT_ID.firebaseapp.com",
  projectId: "СЮДА_PROJECT_ID",
  storageBucket: "СЮДА_PROJECT_ID.appspot.com",
  messagingSenderId: "СЮДА_SENDER_ID",
  appId: "СЮДА_APP_ID"
};

// Не трогай ниже
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, orderBy, query, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, signInWithEmailAndPassword, signOut, onAuthStateChanged, collection, getDocs, addDoc, deleteDoc, doc, orderBy, query, serverTimestamp, ref, uploadBytesResumable, getDownloadURL, deleteObject };
