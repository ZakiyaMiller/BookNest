import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup 
} from "firebase/auth";
import { auth } from "./firebase.config";

export const registerWithEmailPassword = (email, password) => 
    createUserWithEmailAndPassword(auth, email, password);

export const loginWithEmailPassword = (email, password) => 
    signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
