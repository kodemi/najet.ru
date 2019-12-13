import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyDG7sqO0fI9-PArMJgpqYSN4JtawO5xNAM',
    authDomain: 'najetru.firebaseapp.com',
    databaseURL: 'https://najetru.firebaseio.com',
    projectId: 'najetru',
    storageBucket: 'najetru.appspot.com',
    messagingSenderId: '308840657015',
};

export default firebase.initializeApp(config);
