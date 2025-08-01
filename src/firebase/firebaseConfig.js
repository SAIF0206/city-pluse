import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEl1CRUdzRzArX24Njdk4wAX-Pz_7Yblk",
  authDomain: "citypulse-56088.firebaseapp.com",
  projectId: "citypulse-56088",
  storageBucket: "citypulse-56088.firebasestorage.app",
  messagingSenderId: "189859318343",
  appId: "1:189859318343:web:1f8907317cbc2a72087f62",
  measurementId: "G-R56Y1ESKYL",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
