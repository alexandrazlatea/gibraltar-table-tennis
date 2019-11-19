import firebase from 'firebase/app';
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';   // for cloud functions
var config = {
        apiKey: "AIzaSyDHk0KVxP14Mo9JMSI2JXExbfSJgJ5fORM",
        authDomain: "gibraltar-table-tennis.firebaseapp.com",
        databaseURL: "https://gibraltar-table-tennis.firebaseio.com",
        projectId: "gibraltar-table-tennis",
        storageBucket: "gibraltar-table-tennis.appspot.com",
        messagingSenderId: "986451977816",
        appId: "1:986451977816:web:459bba89ed2a3832024c2d",
        measurementId: "G-5SZ43WGYZ1"
};

/*var config = {
    apiKey: "AIzaSyAULDfIUoV0BYQXPS5l6QkijGM3tuwdiFA",
    authDomain: "tabletennis-test.firebaseapp.com",
    databaseURL: "https://tabletennis-test.firebaseio.com",
    projectId: "tabletennis-test",
    storageBucket: "tabletennis-test.appspot.com",
    messagingSenderId: "184582267824"
};*/
export const  fire = firebase.initializeApp(config);

