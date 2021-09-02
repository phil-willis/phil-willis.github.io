---
title: 'firebase'
excerpt: ''
coverImage: '/assets/covers/firebase.jpg'
ogImage:
  url: '/assets/covers/firebase.jpg'
---


# Overview of firebase
- [firebase docs](https://firebase.google.com/docs/build)


## Auth
- When it comes to authentication there are multiple types that can be wired up quite easily
- Available options:
  - email/password
  - Google
  - Apple
  - Facebook
  - Twitter
  - Github
- You can also have anonymous auth











# FireStore
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




# Adding Geospatial to your DB
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


















