// ============================================
// НАСТРОЙКИ FIREBASE
// Заполни эти данные из Firebase Console
// (Project settings → Your apps → SDK setup)
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyBDwMd2-1johk2ZoqtSrd03cz7mP10Sb0c",
  authDomain: "emily-portfolio-c51ff.firebaseapp.com",
  projectId: "emily-portfolio-c51ff",
  storageBucket: "emily-portfolio-c51ff.firebasestorage.app",
  messagingSenderId: "373843975607",
  appId: "1:373843975607:web:4a1a8b69bab19966a59c32",
  measurementId: "G-DGZLTX941H"
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
