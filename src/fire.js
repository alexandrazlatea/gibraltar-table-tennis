import firebase from 'firebase'
/*var config = {
    apiKey: "AIzaSyDc4bVzpTl1vi78Fn_jvLlw6AXNVVtJwSs",
    authDomain: "tabletennis-ee399.firebaseapp.com",
    databaseURL: "https://tabletennis-ee399.firebaseio.com",
    projectId: "tabletennis-ee399",
    storageBucket: "",
    messagingSenderId: "308584425018"
};*/

var config = {
    apiKey: "AIzaSyAULDfIUoV0BYQXPS5l6QkijGM3tuwdiFA",
    authDomain: "tabletennis-test.firebaseapp.com",
    databaseURL: "https://tabletennis-test.firebaseio.com",
    projectId: "tabletennis-test",
    storageBucket: "tabletennis-test.appspot.com",
    messagingSenderId: "184582267824"
};
export const  fire = firebase.initializeApp(config);

