// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjQU3dbUx4hyv_1RaTByPGRb3dPrYYNH8",
  authDomain: "global-recruiters-8328.firebaseapp.com",
  projectId: "global-recruiters-8328",
  storageBucket: "global-recruiters-8328.firebasestorage.app",
  messagingSenderId: "51930093245",
  appId: "1:51930093245:web:bb184f5028ab4b408fc9d4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Expose services globally
window.db = firebase.firestore();
window.auth = firebase.auth();
