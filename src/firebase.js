import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBPs_XBtc2bPq038iFcbFjaJvjN13P6OhU",
    authDomain: "instagram-clone-66639.firebaseapp.com",
    databaseURL:
        "https://instagram-clone-66639-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "instagram-clone-66639",
    storageBucket: "instagram-clone-66639.appspot.com",
    messagingSenderId: "61516724191",
    appId: "1:61516724191:web:0eb699539c620881a7366a",
    measurementId: "G-DDGL043Y9B",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, storage, auth, provider };
