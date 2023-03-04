// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXBYGjTSi2nMIbWzfNoYvg1kTSW2oVc1o",
    authDomain: "react-baspan.firebaseapp.com",
    projectId: "react-baspan",
    storageBucket: "react-baspan.appspot.com",
    messagingSenderId: "257121816384",
    appId: "1:257121816384:web:05b06054dff4d0414234a5",
    measurementId: "G-T23V8S31DK"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

export { firebase, analytics }