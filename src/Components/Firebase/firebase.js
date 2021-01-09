import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBlJo9nci-3H-zZs26iPzBIsbnvrd4I3ck",
    authDomain: "frontend-project-d2c1e.firebaseapp.com",
    projectId: "frontend-project-d2c1e",
    storageBucket: "frontend-project-d2c1e.appspot.com",
    messagingSenderId: "69316839170",
    appId: "1:69316839170:web:9cc25d653e85cf3cc7641b",
    measurementId: "G-R1JSKJRDYF"
};

export var firebaseApp = firebase.initializeApp(firebaseConfig);
var db = firebaseApp.firestore();

export default db;