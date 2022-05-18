import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEmLnkZ0_U1ok31zZq6e8F56yM7y4Wnhg",
  authDomain: "music-8f710.firebaseapp.com",
  projectId: "music-8f710",
  storageBucket: "music-8f710.appspot.com",
  messagingSenderId: "246169519251",
  appId: "1:246169519251:web:c01a40b7eb71b2030ff966",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

export const usersCollection = db.collection("user");
