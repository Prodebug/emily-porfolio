const firebaseConfig = {
  apiKey: "AIzaSyBDwMd2-1johk2ZoqtSrd03cz7mP10Sb0c",
  authDomain: "emily-portfolio-c51ff.firebaseapp.com",
  projectId: "emily-portfolio-c51ff",
  storageBucket: "emily-portfolio-c51ff.firebasestorage.app",
  messagingSenderId: "373843975607",
  appId: "1:373843975607:web:4a1a8b69bab19966a59c32",
  measurementId: "G-DGZLTX941H"
};

import { initializeApp } from "https://gstatic.com";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://gstatic.com";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, orderBy, query, serverTimestamp } from "https://gstatic.com";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, signOut, onAuthStateChanged, collection, getDocs, addDoc, deleteDoc, doc, orderBy, query, serverTimestamp };
