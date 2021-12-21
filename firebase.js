import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDZBPlwStK1JlJhAbcv6A50FdXwjsccHAA",
    authDomain: "whatsapp2-d4772.firebaseapp.com",
    projectId: "whatsapp2-d4772",
    storageBucket: "whatsapp2-d4772.appspot.com",
    messagingSenderId: "249241546608",
    appId: "1:249241546608:web:26d74ae316faeb821669b5"
};


const app = initializeApp({ ...firebaseConfig })
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider();

export {db,auth,provider};