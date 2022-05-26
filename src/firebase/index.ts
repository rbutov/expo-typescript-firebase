import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

const config = {
  apiKey: Constants.manifest?.extra?.apiKey,
  authDomain: Constants.manifest?.extra?.authDomain,
  databaseURL: Constants.manifest?.extra?.databaseURL,
  projectId: Constants.manifest?.extra?.projectId,
  storageBucket: Constants.manifest?.extra?.storageBucket,
  messagingSenderId: Constants.manifest?.extra?.messagingSenderId,
  appId: Constants.manifest?.extra?.appId,
  measurementId: Constants.manifest?.extra?.measurementId,
};

console.log(process.env, Constants, config);

const app = initializeApp(config);
const db = getDatabase(app);
const firestore = getFirestore(app);

export { app, db, firestore };
