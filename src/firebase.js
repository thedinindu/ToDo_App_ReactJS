import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBMdtfAbJnMR1qE559bAAnueTQsvTXvyVk",
    authDomain: "todo-app-b1533.firebaseapp.com",
    databaseURL: "https://todo-app-b1533.firebaseio.com",
    projectId: "todo-app-b1533",
    storageBucket: "todo-app-b1533.appspot.com",
    messagingSenderId: "688823561502",
    appId: "1:688823561502:web:ca0b08d007758ed1dc6d0f",
    measurementId: "G-5G8WVS2PGY"
})

const db = firebaseApp.firestore()

export default db