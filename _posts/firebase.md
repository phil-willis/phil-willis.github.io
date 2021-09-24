---
title: 'firebase'
excerpt: ''
coverImage: '/assets/covers/firebase.jpg'
ogImage:
  url: '/assets/covers/firebase.jpg'
---


# Overview of firebase
- [firebase docs](https://firebase.google.com/docs/build)
  - Firebase allows you to:
  - authenticate users
  - Database
  - Server-side code via Functions
  - Security 
  - Analytics
  - Scale
- A huge thing is you pay $0 until you app builds a decent user base
- Opt in features DB, Storage, Serverless Functions, 
- `Backend as a Service`
- Firebase is just an extension of Google Cloud Platform, at it's core Firebase is an SDK that makes it easy for your frontend app to back google cloud infrastructure
- The console sidebar is divided into sections: *Build*, *Release & Monitor*, *Analytics*, & *Engage* 
- Firebase is `opt-in` 
- Firebase also has extenstions

# Get Started
1. Go to [Firebase console](https://console.firebase.google.com/) and log in with your gmail account
2. Create a Project
3. Install the node global packages
  ```shell
  $ npm install -g firebase-tools
  ```
4. You can initialize multiple firenase services or each seperatly (you can always add/remove very easily)
  ```shell
  $ firebase login
  # this will open up your browser & ask you to authenticate
  $ firebase init
  # ◉ Firestore: Configure security rules and indexes files for Firestore
  # ◉ Functions: Configure a Cloud Functions directory and its files
  # ◉ Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
  # ◉ Hosting: Set up GitHub Action deploys
  # ◉ Storage: Configure a security rules file for Cloud Storage
  # ◉ Emulators: Set up local emulators for Firebase products
  ```
  - Firebase files
    ```shell
    ├── .firebaserc
    ├── firebase.json
    ├── firebase/
    │   └── firestore.indexes.json
    │   └── firestore.rules
    │   └── storage.rules
    ```
5. If you are using VSCode you might want to install the [Firebase Explorer extension](https://marketplace.visualstudio.com/items?itemName=jsayol.firebase-explorer)













# Web hosting
- Hosting is where you web application will ultimately be deployed, it's a storage bucket that's available on the internet and served over a CDN make your web app really fast around the world
- Pricing is based on the GB stored on your account + GB transfered out to your users (it's VERY generous)
- Setup web hosting:
  1. Enable hoisting for you web application in the firebase console
    - Click the `Project Settings` gear icon in the side nav, under the `Your apps` click the `</>` button to initiate a web application
    - Register an App
    - Check the `Also setup Firebase Hosting for this app`
    - Copy the code snippet (This snippet is ok to be public, cause firebase does other stuff to secure it)
      ```js
      const firebaseConfig = {
        apiKey: "wertyuiop",
        authDomain: "some-awesome-app.firebaseapp.com",
        projectId: "some-awesome-app",
        storageBucket: "some-awesome-app.appspot.com",
        messagingSenderId: "1234567890",
        appId: "1:12345678:web:12345678",
        measurementId: "G-QWERTYUIOP"
      };
      ```
    - Security in Firebase is done on the database side
  2. Initiallize hosting with firebase-tools
    ```shell
    $ firebase init hosting
    ```
  3. Add emulator config
    - The above command will create a `firebase.json` & `.firebaserc` (resource config file just contains a project identifier for our project in the cloud), you want to add some configuration to the `firebase.json` to tell the firebase emulator what port to emulate the web hosting
    ```json
    {
    "emulators": {
        "hosting": {
          "port": 5000
        }
      }
    }
    ```
  4. Run the emulator
    ```shell
    $ firebase emulators:start 
    ```
- The `firebase.json` provides some information aout all the firebase services, in this case we are looking at `hosting`
- The `public` key points you your build version of the web application
- The `rewrites` is what you want to add if you are planning on hosting a Single Page Application (aka web app with client side routing)
- When a browser attempts to open a URL path that matches the specified source or regex URL pattern, the browser will be given the contents of the file at the destination URL instead. Specify URL rewrites by creating a rewrites attribute that contains an array of objects (called "rewrite rules").
- The `emulator` key is for emulating firebase services, in this case we provide a port that we want to emulate what the `hosting.public` folder show. This is great cause you can test how firebase web hosting will look like for the production version locally. (don't have to deploy multiple times to the actual service to test a behavior)
- Example of a `firebase.json` file:
  ```json
  {
    "hosting": {
      "public": "build", // the only required attribute for Hosting
      "ignore": [
         "firebase.json",  // the Firebase configuration file (the file described on this page)
        "**/.*",  // files with a leading period should be hidden from the system
        "**/node_modules/**"  // contains dependencies used to create your site but not run it
      ],
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html" // For SPA web app (clientside routing)
        }
      ]
    },
    "emulators": {
      "hosting": {
        "port": 5000
      }
    }
  }
  ```
- You can also use the `rewrite rules` to trigger a firebase function
  ```json
  "hosting": {
    // ...

    // Directs all requests from the page `/bigben` to execute the `bigben` function
    "rewrites": [ {
      "source": "/trigger-some-function",
      "function": "someAwesomeFunction"
    } ]
  }
  ```
- Learn more about [configuring rewrites here](https://firebase.google.com/docs/hosting/full-config)


- Example of a `.firebaserc`, the `project.default` name should match the one you made in the Firebase Console
  ```json 
  {
    "projects": {
      "default": "<YOUR_PROJECT_NAME>"
    }
  }
  ```
- Now you can run the hoisting emulator
  ```
  $ firebase emulators:start --only hosting
  ```
- You can deploy your app:
  ```shell
  $ firebase deploy --only hosting
  ```
- You can also deploy your app with [Github Actions](https://firebase.google.com/docs/hosting/github-integration)
  ```shell
  $ firebase init hosting
  $ firebase init hosting:github
  # Follow the CLI prompts, and the command will automatically take care of setting up the GitHub Action:
  ```

  - Example of a Github Actions files `.github/workflows/firebase-hosting-merge.yml`
    ```yml
    name: Deploy to Firebase Hosting on merge
    'on':
      push:
        branches:
          - main
    jobs:
      build_and_deploy:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v2
          - run: npm ci && npm run build
          - uses: FirebaseExtended/action-hosting-deploy@v0
            with:
              repoToken: '${{ secrets.GITHUB_TOKEN }}'
              firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_PIN_THAT_EXAMPLE }}'
              channelId: live
              projectId: pin-that-example
    ```
- In the Firebase Console, under the hosting tab you can also add a custom domain to your web app









# Auth
- The `Authentication` is kinda like a *read-only* database for your users
- You can add users manually & every user has a `User UID` is how you connect custome user data in your database
- When it comes to authentication there are multiple types that can be wired up quite easily
- Available options:
  - email/password
  - Google
  - Apple
  - Facebook
  - Twitter
  - Github
- You can also have anonymous auth
- Click the `Auth` tab, click the `enable` button & select the `sign-in providers`


- [Sign in with Email & Password](https://firebase.google.com/docs/auth/web/password-auth)
  ```js
  import { initializeApp } from 'firebase/app'
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, connectAuthEmulator } from 'firebase/auth'

  import config from '~/config'

  const firebaseApp = initializeApp(config.firebase)
  export const auth = getAuth(firebaseApp)
  ```


- [Sign in with Google](https://firebase.google.com/docs/auth/web/google-signin):
  ```js
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  ```

- If you are using React you can create a `Provider` to deal with the user state
  ```js
  import React, { useState, useContext, useEffect, createContext } from 'react'
  import config from '~/config'

  const firebaseApp = initializeApp(config.firebase)
  const auth = getAuth(firebaseApp)

  createContext(null)


  function App() {
    const [isAuthenticated, setAuthentication] = useState(useContext(AuthContext))

    useEffect(() => {
      // Things you should know: auth.onAuthStateChanged follows the observer pattern needs
      // to be unsubscribe on every run. The useEffect hook will check authentication state
      // after rerender. That means everytime the value from AuthContext is updated.
      const unsubscribe = auth.onAuthStateChanged((user) => {
        user ? setAuthentication(true) : setAuthentication(false)
        unsubscribe()
      })
    }, [])

    
    return (
      <AuthContext.Provider value={[isAuthenticated, setAuthentication]}>
        <h1>{auth?.currentUser?.email}</h1>
      </AuthContext.Provider>
    )
  }
  ```




























# FireStore
- You need to `Enable Cloud Firestore` before using it
  - Click the `Firestore` tab, click the `create database`
  - Select the `Start in production mode` 

- Production mode
  ```js
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if false;
      }
    }
  }
  ```
- Testing mode
  ```js
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if
            request.time < timestamp.date(2021, 6, 13);
      }
    }
  }
  ```
- The DB is a NoSQL database, where each key has a UID (you can create your own if you want or have firebase automatically generate one for you)
- Each document is a set of key/value
- When working with the emulator you can update the rules that you have referenced in your `firebase.json` file and it will update it in automatically

- Exmaple of adding a record to the DB
  ```js
  import { initializeApp } from 'firebase/app'
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, connectAuthEmulator } from 'firebase/auth'
  import { getFirestore, collection, getDocs, addDoc, connectFirestoreEmulator } from 'firebase/firestore'

  const firebaseApp = initializeApp(config.firebase)
  export const auth = getAuth(firebaseApp)
  export const db = getFirestore(firebaseApp)

  if (location.hostname === 'localhost') {
    connectAuthEmulator(auth, 'http://localhost:9099')
    connectFirestoreEmulator(db, 'localhost', 8088)
  }

  async function addUser() {
    const userCollection = collection(db, 'user')
    try {
      const docRef = await addDoc(userCollection, {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  async function getAllUsers() {
    const userCollection = collection(db, 'user')
    const querySnapshot = await getDocs(userCollection)
    let listData: any = []
    querySnapshot.forEach((doc) => listData.push(doc.data()))
    console.log(' [List] ', listData)
  }

  async function queryUser() {
    const userCollection = collection(db, 'user')
    const q = query(userCollection, where('name', '==', 'luis'))

    const querySnapshot = await getDocs(q)
    let listData: any = []
    querySnapshot.forEach((doc) => listData.push(doc.data()))
    console.log(' [List] ', listData)
  }

  async function queryUserRealtime() {
    const userCollection = collection(db, 'user')
    const q = query(userCollection, where('name', '==', 'phil'))

    // MAKE SURE YOU UNSUBSCRIBE! (this will run anytime the data changes)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let cities: any = []
      querySnapshot.forEach((doc) => {
        cities.push(doc.data().username)
      })
      console.log('username: ', cities.join(', '))
    })
  }
  ```
- Using a `batch` allows you to preform multiple functions on the DB and have them fail/success together
  ```js
  // Get a new write batch
  var batch = db.batch();

  // Set the value of 'NYC'
  var nycRef = db.collection("cities").doc("NYC");
  batch.set(nycRef, {name: "New York City"});

  // Update the population of 'SF'
  var sfRef = db.collection("cities").doc("SF");
  batch.update(sfRef, {"population": 1000000});

  // Delete the city 'LA'
  var laRef = db.collection("cities").doc("LA");
  batch.delete(laRef);

  // Commit the batch
  batch.commit().then(() => {
      // ...
  });
  ```



- You can view your current DB rules [here](http://localhost:8088/emulator/v1/projects/<database_name>:ruleCoverage.html)
- Make sure that when you create a **timestamp** that you use thee `serverTimestamp()` provided by firebase `import { serverTimestamp } from 'firebase/firestore'` to make sure the timestamp is consistent along all client devices
- [Docs on preforming simple & compound queries](https://firebase.google.com/docs/firestore/query-data/queries)
- Firebase will warn you if you need to create a `composite index`, but you just need to click on the link and it will create it for you
- Now Security Rules
  - Start by making the entire DB locked down
    ```js
    rules_version = '2';
    service cloud.firestore {

      match /databases/{database}/documents {
        match /{document=**} {
          allow read, write: if false;
        }
      }

    }
    ```
  - Now add in rights selectively
   ```js
    rules_version = '2';
    service cloud.firestore {

      match /databases/{database}/documents {
        match /{document=**} {
          allow read, write: if false;
        }
      }

    
    }
    ```








## Adding Geospatial to your DB
- You can do geospatial stuff with `firestore` because of geohashing
- A geohash is a convenient way of expressing a location (anywhere in the world) using a short alphanumeric string, with greater precision obtained with longer strings.
- A geohash actually identifies a rectangular cell: at each level, each extra character identifies one of 32 sub-cells.
- ![geohash](/assets/blog/geo/geohash.jpg)
- [Read more on geohashes](https://www.movable-type.co.uk/scripts/geohash.html)
- Vancouver, BC has coordinates of 49.2827° N, 123.1207° W and the geohash would be [`c2b2q7dhx`](http://geohash.org/c2b2q7dhx)



### Using `geofirestore`
- [geofirestore docs](https://geofirestore.com/)
- As of 09-2021 `geofirestore` only supports up to `firebase` v8
- Exmaple
  ```js
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import * as geofirestore from 'geofirestore';


  // Initialize the Firebase SDK
  firebase.initializeApp({
    // ...
  });

  // Create a Firestore reference
  const firestore = firebase.firestore();

  // Create a GeoFirestore reference
  const GeoFirestore = geofirestore.initializeApp(firestore);

  // Create a GeoCollection reference
  const geocollection = GeoFirestore.collection('restaurants');

  // Add a GeoDocument to a GeoCollection
  geocollection.add({
    name: 'Geofirestore',
    score: 100,
    // The coordinates field must be a GeoPoint!
    coordinates: new firebase.firestore.GeoPoint(40.7589, -73.9851)
  })

  // Create a GeoQuery based on a location
  const query = geocollection.near({ center: new firebase.firestore.GeoPoint(40.7589, -73.9851), radius: 1000 });

  // Get query (as Promise)
  query.get().then((value) => {
    // All GeoDocument returned by GeoQuery, like the GeoDocument added above
    console.log(value.docs);
  });
  ```


### Addig geospatial functionality with `geofirex`
- Unfortunately `geofirex` has a peer dependency of `"firebase": "^7.2.0"` and firebase is at v9 as of 2021 so this may not be the best option
- Start by adding some npm packages
  ```shell
  npm init -y
  npm i firebase-admin geofirex
  ```
- Create a file to seed the database
  ```js
  var admin = require("firebase-admin");
  var serviceAccount = require("./firebase-creds.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<FIREBASE_PROJECT_NAME>.firebaseio.com",
  });

  // Init GeoFireX
  const geofirex = require("geofirex");
  const geo = geofirex.init(admin);

  const pinsRef = admin.firestore().collection("pins");

  // Add some markers
  pinsRef.add({ name: "Phoenix", position: geo.point(40, -119) });
  pinsRef.add({ name: "Portland", position: geo.point(45.52054, -122.6795) });
  pinsRef.add({ name: "Vancouver", position: geo.point(49.2827, -123.1207) });
  pinsRef.add({ name: "Seattle", position: geo.point(47.604311, -122.33551) });
  pinsRef.add({ name: "San Francisco", position: geo.point(37.771800273, -122.416534) });
  pinsRef.add({ name: "Ottawa", position: geo.point(45.42062, -75.697174) });
  pinsRef.add({ name: "Victoria", position: geo.point(48.426922, -123.36341) });
  ```

- Now you can make queries against your table
  ```js
  var admin = require("firebase-admin");
  var serviceAccount = require("./firebase-creds.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<FIREBASE_PROJECT_NAME>.firebaseio.com",
  });

  // Init GeoFireX
  const geofirex = require("geofirex");
  const geo = geofirex.init(admin);

  const pinsRef = admin.firestore().collection("pins");
  // Query wthin
  async function getPointsWithin({ center, radius, field }) {
    const query = geo.query(pinsRef).within(center, radius, field, { log: true });
    const obs = query.pipe(geofirex.toGeoJSON("position", true));
    const geojson = await geofirex.get(obs);
    return geojson;
  }

  getPointsWithin({
    center: geo.point(47, -122),
    radius: 200, //km
    field: "position",
  });
  ```







# Firebase Storage 
- When working with an Application with user's it's best to make a folder in your storage with the uid of that user
- When you add files to the *Firebase Storage* it will create a storage location URL for that file










