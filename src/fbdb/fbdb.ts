import * as firebase from "firebase/app";
import "firebase/firestore";
import { GameType } from "./GameType";

firebase.initializeApp({
  apiKey: "AIzaSyATcPjz-ja1AUgIBIORWPDGRZNV7TpwO9Y",
  authDomain: "card-game-2379.firebaseapp.com",
  databaseURL: "https://card-game-2379.firebaseio.com",
  projectId: "card-game-2379",
  storageBucket: "card-game-2379.appspot.com",
  messagingSenderId: "558958088338",
  appId: "1:558958088338:web:a0adb1986e5fd666ded64b",
});

type CollRef = firebase.firestore.CollectionReference;
type CollQuery = firebase.firestore.Query;
type DBQueryType = {
  find: {
    [key: string]: any;
  };
  limit?: number;
};

const fbdb = firebase.firestore();
const arrayUnion = (el: any) => firebase.firestore.FieldValue.arrayUnion(el);

const dbCols: { [key: string]: CollRef } = {
  games: fbdb.collection("games"),
};

const gamesDB: CollRef = fbdb.collection("games");

export class FBQuery {
  collRef: CollRef;
  constructor(colName: string) {
    this.collRef = dbCols[colName];
  }

  query(q: DBQueryType) {
    let newRef: CollQuery = this.collRef;
    for (let key in q.find) {
      newRef = newRef.where(key, "==", q.find[key]);
    }
    if (q.limit) newRef = newRef.limit(q.limit);
    return newRef.get().then((querySnapshot) => {
      const docs: firebase.firestore.DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      if (docs.length === 0) return null;
      else if (docs.length === 1) return docs[0];
      else return docs;
    });
  }

  updateDoc() {}
}

export { dbCols, gamesDB, arrayUnion };
