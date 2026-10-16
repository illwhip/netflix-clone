import { initializeApp } from "firebase/app"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAc5fyWJRlMISPbbBTl2niSz31dTYtmS7c",
  authDomain: "netflix-clone-b01df.firebaseapp.com",
  projectId: "netflix-clone-b01df",
  storageBucket: "netflix-clone-b01df.firebasestorage.app",
  messagingSenderId: "171275082339",
  appId: "1:171275082339:web:d8b7449f5a9cca22057656"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email
    })
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(""))
  }
}

const login = async (email, password) => {
 try {
  await signInWithEmailAndPassword(auth, email, password)
 } catch (error) {
  console.log(error);
  toast.error(error.code.split('/')[1].split('-').join(""))
 }
}

const logout = () => {
  signOut(auth)
}

export {auth, db, login, signup, logout}
