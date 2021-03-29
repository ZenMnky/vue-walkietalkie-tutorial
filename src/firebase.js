import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDG2SiadT9iCSdzddhiCioDmHcHoQXE1Zg',
  authDomain: 'fireship-vuefire-walkietalkie.firebaseapp.com',
  projectId: 'fireship-vuefire-walkietalkie',
  storageBucket: 'fireship-vuefire-walkietalkie.appspot.com',
  messagingSenderId: '566099443067',
  appId: '1:566099443067:web:758ebdffe2333b0b6a51de',
  measurementId: 'G-494WWNBQVC',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
