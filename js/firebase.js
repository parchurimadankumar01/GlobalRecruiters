const firebaseConfig = {
  apiKey: "AIzaSyAjQU3dbUx4hyv_1RaTByPGRb3dPrYYNH8",
  authDomain: "global-recruiters-8328.firebaseapp.com",
  projectId: "global-recruiters-8328",
};

firebase.initializeApp(firebaseConfig);
window.db = firebase.firestore();
