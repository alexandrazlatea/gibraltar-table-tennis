import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyBX4Jk1CXbZN0VQU52nImNTMJLNhHbumXY",
    authDomain: "bravoaistil-1a5d2.firebaseapp.com",
    databaseURL: "https://bravoaistil-1a5d2.firebaseio.com",
    projectId: "bravoaistil-1a5d2",
    storageBucket: "bravoaistil-1a5d2.appspot.com",
    messagingSenderId: "497442093878"
};
export const  fire = firebase.initializeApp(config);

