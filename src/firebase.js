import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBCkNouWUp4AT1JO4OJHtpkl51DvqQUC0I",
  authDomain: "fyp2021-a0c56.firebaseapp.com",
  projectId: "fyp2021-a0c56",
  storageBucket: "fyp2021-a0c56.appspot.com",
  messagingSenderId: "216906221268",
  appId: "1:216906221268:web:f44e6f7c32c5d2d5391d41"
})

export const auth = app.auth()
export const storageRef = app.storage()
export const firestore = app.firestore()
export default app