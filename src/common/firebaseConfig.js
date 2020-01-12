import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyC5R5gS6ucOHzjaAKdDaUBzv7vhwzA3uHs",
    authDomain: "tams-psu.firebaseapp.com",
    databaseURL: "https://tams-psu.firebaseio.com",
    projectId: "tams-psu",
    storageBucket: "tams-psu.appspot.com",
    messagingSenderId: "636557813868",
    appId: "1:636557813868:web:7e5ad7ba2e141177bbd049",
    measurementId: "G-YSXDFKTEWW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()

export default firebaseConfig
