// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmm1WHSmprAWkf5KiWA6EH6EzRUY3M60A",
  authDomain: "wealth-wise-cdff0.firebaseapp.com",
  projectId: "wealth-wise-cdff0",
  storageBucket: "wealth-wise-cdff0.appspot.com",
  messagingSenderId: "236778243947",
  appId: "1:236778243947:web:1c815a671c487509ecae2e",
  databaseURL: "https://wealth-wise-cdff0-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();

export async function googleSignIn() {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  localStorage.setItem('username', user.displayName || user.email);

  // Save progress to Realtime Database
  const uid = user.uid;
  await set(ref(database, 'users/' + uid), {
    username: user.displayName || user.email,
    levelCompleted: 'Pinjaman'
  });

  localStorage.setItem('levelCompleted', 'Pinjaman');
}
