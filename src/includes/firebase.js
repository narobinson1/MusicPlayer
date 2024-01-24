import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8BhNe5BuiQbIRMGAN0xqoMvQjWgN551Q",
  authDomain: "music-player-6a94f.firebaseapp.com",
  projectId: "music-player-6a94f",
  storageBucket: "music-player-6a94f.appspot.com",
  messagingSenderId: "144796665796",
  appId: "1:144796665796:web:cb2076b4ed941ecbd84691"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const usersCollection = collection(db, "users");
const songsCollection = collection(db, "songs");
const commentsCollection = collection(db, "comments");

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
};
