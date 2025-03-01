Firebase configuration:

my-react-app/
├── public/             // Static assets (index.html, etc.)  Firebase will look for this
│   └── index.html      // Your app's HTML entry point
├── src/               // Your React source code
│   ├── App.js         // Main app component
│   ├── firebaseConfig.js // Firebase configuration
│   ├── ...            // Other components, etc.
├── package.json       // Project dependencies
└── firebase.json      // Firebase hosting configuration (optional, but recommended)


npm install firebase

# Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

# TODO: Add SDKs for Firebase products that you want to use 

# Your web app's Firebase configuration
# For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
#  apiKey: "AIzaSyBvOUuP5kDjzeSFYrq6v0G0l9aX4xaNsdo",
#  authDomain: "recipe-gen-13cf2.firebaseapp.com",
#  projectId: "recipe-gen-13cf2",
#  storageBucket: "recipe-gen-13cf2.firebasestorage.app",
#  messagingSenderId: "758278389617",
#  appId: "1:758278389617:web:ff3247c54ad6a10d1000d0",
#  measurementId: "G-C0M5SRJLS5"
};

# Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

# For Hosting Firebase Apps
npm install -g firebase-tools
firebase login
firebase init

# Deploying To Firebase
firebase deploy
https://recipe-gen-13cf2.web.app/

npm install -g firebase-tools

firebase login
firebase init
# Select Hosting option and follow the prompts
npm run build
firebase deploy

# Get a json list of app users
firebase login
firebase auth:export users.json

<!-- FIX 
DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
To fix this, you may need to update your dependencies or use an alternative module for handling Punycode.
Consider using the `punycode.js` library or a similar alternative.
-->
>
