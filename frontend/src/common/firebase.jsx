import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth as appAuth,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZakXKMvdhzQxE74pwd7fav1IGANKyl5s",
  authDomain: "chronospace-3d550.firebaseapp.com",
  projectId: "chronospace-3d550",
  storageBucket: "chronospace-3d550.appspot.com",
  messagingSenderId: "81648675498",
  appId: "1:81648675498:web:01afe323f630b31299fed3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// google auth

const provider = new GoogleAuthProvider();

const auth = appAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((error) => {
      console.log(error);
    });

  return user;
};
