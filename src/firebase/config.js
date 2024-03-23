// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR5j4W_Wn5o_h45QHudyLxWueMiDUwvaQ",
  authDomain: "x-clone-ae36c.firebaseapp.com",
  projectId: "x-clone-ae36c",
  storageBucket: "x-clone-ae36c.appspot.com",
  messagingSenderId: "428263972670",
  appId: "1:428263972670:web:d83f0afbcc613fda64966f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase auth un referansını alma
export const auth = getAuth(app);

// google sağlayıcısını kurma
export const provider = new GoogleAuthProvider();

//veri tabanının referansını al
export const db = getFirestore(app);

//Dosya yükleme alanının Referansını al
export const storage = getStorage(app);
