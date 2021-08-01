import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// var firebaseConfig = {
//   apiKey: 'AIzaSyCdAw_8trR1XsutnbDe52J6AGW1OONQJZs',
//   authDomain: 'tostest-2fbf8.firebaseapp.com',
//   projectId: 'tostest-2fbf8',
//   storageBucket: 'gs://tostest-2fbf8.appspot.com/',
//   messagingSenderId: '23789624789',
//   appId: '1:23789624789:web:06f04a6c2d49a7d5a4b15c',
// };

var firebaseConfig = {
  apiKey: 'AIzaSyCCt8V-dLC5cEkbRoyIsWgsh4fcd4fmOh4',
  authDomain: 'toscana-accesorios.firebaseapp.com',
  projectId: 'toscana-accesorios',
  storageBucket: 'gs://toscana-accesorios.appspot.com',
  messagingSenderId: '997932510779',
  appId: '1:997932510779:web:adaf4625f303eac1a5361e',
  measurementId: 'G-565PXH28N6',
};

const fb = firebase.initializeApp(firebaseConfig);
export const storageBucket = firebaseConfig.storageBucket;
export const db = fb.firestore();
export const storage = firebase.storage();
