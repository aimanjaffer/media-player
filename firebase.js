import firebase from 'firebase';
import "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyCjarK62aynyPR0q9VwWA8Mcfkc7EtEiFE",
    authDomain: "music-player-e5ebb.firebaseapp.com",
    projectId: "music-player-e5ebb",
    storageBucket: "music-player-e5ebb.appspot.com",
    messagingSenderId: "712153445084",
    appId: "1:712153445084:web:bb694dae7594fc4a033a19"
  };

const app = !firebase.apps.length 
? firebase.initializeApp(firebaseConfig) 
: firebase.app();

const db = app.firestore();

export { db };