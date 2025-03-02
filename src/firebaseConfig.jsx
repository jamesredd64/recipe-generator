import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Import functions if you need them
// import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyBvOUuP5kDjzeSFYrq6v0G0l9aX4xaNsdo',
  authDomain: 'recipe-gen-13cf2.firebaseapp.com',
  projectId: 'recipe-gen-13cf2',
  storageBucket: 'recipe-gen-13cf2.appspot.com',
  messagingSenderId: '758278389617',
  appId: '1:758278389617:web:ff3247c54ad6a10d1000d0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Functions (only if you need it)
// const functions = getFunctions(app);

export { app, auth };
