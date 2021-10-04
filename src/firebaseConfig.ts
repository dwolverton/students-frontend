import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIwmz27L-L5Nh78lKLmdffJlr0xvGDteI",
  authDomain: "gc-students-demo.firebaseapp.com",
  projectId: "gc-students-demo",
  storageBucket: "gc-students-demo.appspot.com",
  messagingSenderId: "407875754910",
  appId: "1:407875754910:web:d7a405caa1a567d540548f"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}