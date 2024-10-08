// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATIgU9uZHjEJj0UcASCFuZyiz9J5U7n5s",
  authDomain: "wahidahmed002-52671.firebaseapp.com",
  databaseURL: "https://wahidahmed002-52671-default-rtdb.firebaseio.com",
  projectId: "wahidahmed002-52671",
  storageBucket: "wahidahmed002-52671.appspot.com",
  messagingSenderId: "874202066227",
  appId: "1:874202066227:web:98260b0ce0e1e801cca246",
  measurementId: "G-5XQHF5ZQJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
