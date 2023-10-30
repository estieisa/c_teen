import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/compat/auth';

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG) 

export const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
