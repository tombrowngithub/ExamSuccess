// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOXljk6Iwv5UtscTIl6TIGQlZmaUBv95g",
    authDomain: "examsuccess-e434e.firebaseapp.com",
    projectId: "examsuccess-e434e",
    storageBucket: "examsuccess-e434e.appspot.com",
    messagingSenderId: "457932394654",
    appId: "1:457932394654:web:9d7bc0c3d006f7413f6b8f"
};

firebase.initializeApp(firebaseConfig)
let db = firebase.firestore();