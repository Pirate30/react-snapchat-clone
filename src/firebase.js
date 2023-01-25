import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQExF7K8ZD62haBrqpdrcbIsRY04gZFm4",
  authDomain: "react-snapchat-clone-ee8ec.firebaseapp.com",
  projectId: "react-snapchat-clone-ee8ec",
  storageBucket: "react-snapchat-clone-ee8ec.appspot.com",
  messagingSenderId: "1065886314098",
  appId: "1:1065886314098:web:13157a1a7052dcf5155ceb",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { db, auth, provider, storage };
