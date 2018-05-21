  import firebase from 'firebase'
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA-shjfp5pFEanDW28dOSVj8_qbB5ZRbU8",
    authDomain: "skibao-40e74.firebaseapp.com",
    databaseURL: "https://skibao-40e74.firebaseio.com",
    projectId: "skibao-40e74",
    storageBucket: "skibao-40e74.appspot.com",
    messagingSenderId: "882996510356"
  };
  firebase.initializeApp(config);

  export default firebase