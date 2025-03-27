import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
    authDomain: `${import.meta.env.VITE_FIREBASE_authDomain}`,
    projectId: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
    storageBucket: `${import.meta.env.VITE_FIREBASE_storageBucket}`,
    messagingSenderId: `${import.meta.env.VITE_FIREBASE_messegingSenderId}`,
    appId: `${import.meta.env.VITE_FIREBASE_appId}`,
    measurementId: `${import.meta.env.VITE_FIREBASE_measurementId}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function to sign in with Google
const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result); // Fixed
        const token = credential ? credential.accessToken : null; // Check if credential exists
        console.log("User Info:", result.user);
        console.log("Access Token:", token);
        return { user: result.user, token };
    } catch (error) {
        console.error("Google Sign-In Error:", error);
    }
};

// Function to sign out
const logOut = async () => {
    try {
        await signOut(auth);
        console.log("User logged out");
    } catch (error) {
        console.error("Logout Error:", error);
    }
};

export { auth, signInWithGoogle, logOut };
