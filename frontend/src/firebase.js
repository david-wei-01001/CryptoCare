// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCokO3-OoAFFZ1eWCaQ-eRT2_bNXgewj4o",
  authDomain: "charity-app-a0bae.firebaseapp.com",
  projectId: "charity-app-a0bae",
  storageBucket: "charity-app-a0bae.appspot.com",
  messagingSenderId: "431411881363",
  appId: "1:431411881363:web:f7bf522825363dd4547466",
  measurementId: "G-EK5FRR1NM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Export the Firebase services for components to use.
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

