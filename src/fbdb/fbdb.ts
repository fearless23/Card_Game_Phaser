import * as firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyATcPjz-ja1AUgIBIORWPDGRZNV7TpwO9Y",
  authDomain: "card-game-2379.firebaseapp.com",
  databaseURL: "https://card-game-2379.firebaseio.com",
  projectId: "card-game-2379",
  storageBucket: "card-game-2379.appspot.com",
  messagingSenderId: "558958088338",
  appId: "1:558958088338:web:a0adb1986e5fd666ded64b",
});

const fbdb = firebase.firestore();
const gamesDB = fbdb.collection("games");
export const arrayUnion = (el: any) =>
  firebase.firestore.FieldValue.arrayUnion(el);
export { gamesDB };
