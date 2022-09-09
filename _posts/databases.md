---
title: 'Databases'
excerpt: 'a getting started guide for popular databases'
coverImage: '/assets/covers/database.jpg'
ogImage:
  url: '/assets/covers/database.jpg'
---


# Databases 
- [x] MySQL + baked in spatial functions
- [x] PostgreSQL + PostGIS
- [x] Firebase
- [ ] DynamoDB
- [ ] SQLite + SpatiaLite
- [ ] MongoDB
- [ ] CouchDB


# MySQL
- Basic Docker stuff
  ```shell
  # show all running containers
  $ docker ps

  # Show all stoped containers
  $ docker ps -a

  # Pull the latest image
  $ docker pull mysql/mysql-server:latest

  # Create & run a container
  $ docker run --name some-mysql -p 3306:3306  -e MYSQL_ROOT_PASSWORD=123456789 -d mysql

  # stop/start
  $ docker stop some-mysql
  $ docker start some-mysql


  # Docker cleanups
  $ docker system prune
  $ docker image prune

  # Create a database dump
  $ docker exec some-mysql sh -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' > /some/path/on/your/host/all-databases.sql

  # Restoring data from a dump file
  $ docker exec -i some-mysql sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /some/path/on/your/host/all-databases.sql
  ```

## Connecting to your Database (MySQL v8)
- First spin up a docker container
  ```shell
  # Pull the latest image
  $ docker pull mysql/mysql-server:latest

  # Create & run a container
  $ docker run --name some-mysql -p 3306:3306 -p 33060:33060  -e MYSQL_ROOT_PASSWORD=123456789 -d mysql
  $ docker exec -it some-mysql mysql -uroot -p
  mysql> CREATE DATABASE letsgetspatial;
  ```

- Connecting to the `MySQL v8` Database with [`SQLTools` extension](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools). You will also have to download the Extensions drivers: MySQL
  - *NOTE* we had to make a database `letsgetspatial` manually above
  - Add the connection config to your `./.vscode/settings.json` file
    ```json
    {
      "sqltools.connections": [
        {
          "mysqlOptions": {
            "authProtocol": "xprotocol"
          },
          "previewLimit": 50,
          "server": "localhost",
          "port": 33060,
          "driver": "MySQL",
          "name": "MySQL_v8",
          "database": "letsgetspatial",
          "username": "root",
          "password": "123456789",
          "connectionTimeout": 15
        }
      ],
    }
    ```
    - ![vscode-sqltools](/assets/blog/database/vscode-sqltools.jpg)
  - Click the `Test Connection` (it kinda appears like a white rectanglar button)
  - Under the `Connection` section in the side panel click this `some-mysql` connection and it will open up a sql window where you can write queries
  - Use `--` to write comments & `-- @block` to write blocks that you can execute only the block
- Backing up data
  ```shell
  # Create a database dump
  $ docker exec some-mysql sh -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' > /some/path/on/your/host/all-databases.sql

  # Restoring data from a dump file
  $ docker exec -i some-mysql sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /some/path/on/your/host/all-databases.sql
  ```


## Docker Compose way
- Where gonna use `docker-compose` to make our lives easier
  - Create a `docker-compose.yml` files with:
    ```yml
    version: '3.3'
    services:
      db:
        image: mysql:latest
        restart: always
        environment:
          MYSQL_DATABASE: 'letsgetspatial'
          # So you don't have to use root, but you can if you like
          MYSQL_USER: 'user'
          # You can use whatever password you like
          MYSQL_PASSWORD: 'password'
          # Password for root access
          MYSQL_ROOT_PASSWORD: 'password'
        ports:
          # <Port exposed> : < MySQL Port running inside container>
          - '3306:3306'
          - '33060:33060'
        expose:
          # Opens port 3306 on the container
          - '3306'
          - '33060'
          # Where our data will be persisted
        volumes:
          - my-db:/var/lib/mysql
          
      # http://localhost:8080/ to log into your DB
      adminer:
        image: adminer
        restart: always
        ports:
          - 8080:8080
          
    # Names our volume
    volumes:
      my-db:
    ```
  
  - Now we can run one command to get it all running:
    ```shell
    # build/run contains
    $ docker-compose up
    
    # stop all containers (for ctl+c twice)
    $ docker-compose down

    # Clean up everything
    $ docker-compose down -v --rmi all --remove-orphans
    ```
  - You can connect to the container directly or connect with the mysql client or use the http://localhost:8080 to get a GUI for full access

  - ![mysql-gui](/assets/blog/database/mysql-gui.jpg)



## MySQL SQL Statements
```sql
CREATE TABLE Users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  email  VARCHAR(255) NOT NULL UNIQUE,
  bio TEXT,
  country VARCHAR(2)
);

INSERT INTO Users(
  email,
  bio,
  country
) 
VALUES (
  'hello@world.com',
  'I love strangers',
  'US'
);

SELECT * FROM Users;

CREATE TABLE Bookings(
  id INT PRIMARY KEY AUTO_INCREMENT,
  guest_id INT,
  room_id INT,
  start_date datetime,
  end_date datetime,
  price int,
  total int,
  created_at datetime
);

CREATE TABLE Rooms(
  owner_id INT,
  price INT,
  hot_tub boolean,
  home_type VARCHAR(255) ,
  room_type VARCHAR(255) ,
  total_occupancy INT,
  total_bedrooms INT,
  total_bathrooms INT,
  summary VARCHAR(255),
  created_at datetime,
  updated_at datetime,
  latitude FLOAT,
  longitude FLOAT
);
```


## MySQL with Spatial Data
- **MySQL `POINT(lng,lat)`, just like PostGIS maintains (lng,lat), however... the `ST_GeomFromText` like `ST_GeomFromText('POINT(45.5051 -122.6750)', 4326)` DOES `LAT/LNG`??**
- There is HUGE difference from MySQL v5.7 to v8.0
- Prior to v8 spatial data there wasn't multiple spatial reference systems and geographic computations all computations were Catesian
- So what is the least you need to know about??
  - GIS libraries use [EPSG](https://epsg.io/) (EPSG actually stands for `European Petroleum Survey Group`) codes as Spatial Reference System Identifiers (SRIDs) 
  - All you need to know when working with spatial data on the web is most maps use the Spatial Reference System of `4326` which is `WGS 84 (Google Earth is in a Geographic coordinate system)`
  - Geospatial data is should be stored in internal geometry format either `Well-Known Text (WKT)` or `Well-Known Binary (WKB)` format. 
- `Point(X,Y)` is a constructor for numbers with precision and does not require converting first to text making it faster.
  ```sql
  -- Slower
  INSERT INTO SOME_DB (name, coordinates) VALUES ("Portland", ST_GeomFromText('POINT(45.5051 -122.6750)', 4326));
  -- Faster
  INSERT INTO SOME_DB (name, coordinates) VALUES ("Portland", ST_SRID(POINT(-122.6750, 45.5051),4326));
  ```

- Let's define some points instead of 2 columns lat/long
  ```sql
  CREATE TABLE `places` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(256) DEFAULT NULL,
    `coordinates` POINT SRID 4326 NOT NULL,
    PRIMARY KEY (`id`)
  );
  ```

- Let's create an idex
  ```sql
  CREATE INDEX pt_idx ON places(coordinates);
  ```

- Now let's add some points
  - **NOTE** the `POINT(LNG, LAT)` format
  ```sql
  INSERT INTO `places` ( `name`, `coordinates`)
  VALUES ("Portland", ST_SRID(POINT(-122.6795, 45.52054),4326));

  INSERT INTO `places` ( `name`, `coordinates`)
  VALUES ("Vancouver", ST_SRID(POINT(-123.1207, 49.2827),4326));

  INSERT INTO `places` ( `name`, `coordinates`)
  VALUES ("Seattle", ST_SRID(POINT(-122.33551, 47.604311),4326));

  INSERT INTO `places` ( `name`, `coordinates`)
  VALUES ("San Francisco", ST_SRID(POINT(-122.416534, 37.771800273),4326));

  INSERT INTO `places` ( `name`, `coordinates`)
  VALUES ("Ottawa", ST_SRID(POINT(-75.697174, 45.42062),4326));
  ```

- Select Data
  ```sql  
  SELECT  id, name, ST_AsText(coordinates) FROM places;
  SELECT  id, name, ST_AsGeoJSON(coordinates) FROM places;
  ``` 

- Calculate distances
  ```sql
  -- Distance from the montreal
  SELECT name,
  ST_Distance_Sphere(coordinates, ST_SRID(POINT(-73.6049652, 45.503459),4326))
  FROM places;

  -- Distance less that 500Km (500000m) from the montreal 
  SELECT name FROM places
  WHERE ST_Distance_Sphere(coordinates, ST_SRID(POINT(-73.6049652, 45.503459),4326)) < 500000;
  ```

- Selects all points in a polygon
- If you look closer, you’ll notice that the last point is the same as the first one and we have 5 points. This is because we need to “close” the polygon.
  ```sql
  SET @polygon = ST_SRID(
    ST_GeomFromText('POLYGON(( -125.903320 44.668, -119.22 44.668, -119.22 50.2612, -125.903320 50.2612, -125.903320 44.668))'),
    4326
  );
  SELECT  *, ST_AsText(coordinates)  FROM places WHERE ST_CONTAINS(@polygon, coordinates);
  ```

- Get the result as GeoJson
  ```sql
  SET @polygon = ST_SRID(
    ST_GeomFromText('POLYGON(( 
      -129.24316 43.16512263,
      -116.455078125 43.16512263,
      -116.455078125 52.24125614,
      -129.24316 52.24125614,
      -129.24316 43.165
    ))'),
    4326
  );
  SELECT json_merge(
    json_object( "type", "FeatureCollection"),
    json_object( "features", 
      json_arrayagg(
        json_merge(
          json_object( "type", "Feature"),
          json_object( "properties",  
            json_merge(
              json_object('id', id),
              json_object('name', name)
            )
          ),
          json_object('geometry', ST_AsGeoJSON(coordinates))
        )
      ) 
    )
  )
  FROM places WHERE ST_CONTAINS(@polygon, coordinates);
  ```



# Postgres & PostGIS
- The `postgis/postgis` image will have the following extensions installed:
  - postgis
  - postgis_topology
  - fuzzystrmatch
  - postgis_tiger_geocoder

## Docker stuff
- Create a `docker-compose.yml` file
  ```yml
  version: "3.4"
  services:
    pgAdmin:
      restart: always
      image: dpage/pgadmin4
      ports:
        - "8000:80"
      environment:
        PGADMIN_DEFAULT_EMAIL: 1234@admin.com
        PGADMIN_DEFAULT_PASSWORD: 1234
      volumes:
        - pgadmin:/var/lib/pgadmin
    postgis:
      restart: always
      image: postgis/postgis
      container_name: "postgis_container"
      ports:
        - "5432:5432"
      environment:
        POSTGRES_USER: me
        POSTGRES_PASSWORD: 1234
        POSTGRES_DB: letsgetspatial
      volumes:
        - pgvol:/var/lib/postgresql/data
  volumes:
    pgvol:
    pgadmin: 
  ```
- `docker-compose` commands:
  ```shell
  # Stop these services
  $ docker-compose stop

  # Start these services
  $ docker-compose start

  # Delete these services
  $ docker-compose down

  # Delete all docker volumes
  $ docker volume prune
  ```

## There are 2 ways to connect to the postgresdatabase server
1. PSQL
  - The above `docker-compose` command spins up a container that has postgres/postgis/psql installed in the container
    ```shell
    # Connect into the container
    $ docker exec -it postgis_container bash

    # Connect into postgres inside your container
    $ psql -d letsgetspatial -U me
    ```
2. PG Admin4
  - The `docker-compose` command also spins up a container for `pgadmin4`
  - To go to `pgadmin4` go to `http://localhost:8000/`
  - User name that has been defined in the `docker-compose` is: `1234@admin.com`, and the password is `1234`
  - Here you want to `Add new server` Take the below JSON data to fill in the GUI
    ```json
    {
      generalTab:{
        "name": "letsgetspatial-server"
      },
      connectionTab:{
        "host": "postgis",
        "port": "5432",
        "user": "me",
        "password": "1234",
        "maintenaceDatabase": "letsgetspatial",
      }
    }
    ```
  - You talbles will live in `letsgetspatial-server` > `Databases` > `letsgetspatial` > `Schemas` > `public` > `Tables`

## Postgres commands
```shell
# List databases
postgres=\#  \l

# Use or switch Databases
postgres=\# \c sales

# List tables
postgres=\# \dt
```

## Postgres/PostGIS Spatial Table

```sql
CREATE EXTENSION postgis;
SELECT PostGIS_version();

-- Create a table then add the spatial column
CREATE TABLE places (
  id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name text NOT NULL
);
SELECT AddGeometryColumn('places','geom','4326','POINT',2);

-- Add a spatial index (to drop the index ...`DROP INDEX places_geom_idx;`)
CREATE INDEX places_geom_idx ON places USING GIST (geom);


-- Insert some data
INSERT INTO places(name, geom)
VALUES('Portland',  ST_GeomFromText('POINT(-122.6795 45.52054)', 4326) );

INSERT INTO places(name, geom)
VALUES('Vancouver', ST_SetSRID(ST_MakePoint(-123.1207, 49.2827), 4326) );

INSERT INTO places(name, geom)
VALUES ('Seattle', ST_SetSRID(ST_MakePoint(-122.33551, 47.604311),4326));

INSERT INTO places(name, geom)
VALUES ('San Francisco', ST_SetSRID(ST_MakePoint(-122.416534, 37.771800273),4326));

INSERT INTO places(name, geom)
VALUES ('Ottawa', ST_SetSRID(ST_MakePoint(-75.697174, 45.42062),4326));


-- Get data 
SELECT  id, name, ST_AsText(geom) FROM places;
SELECT  id, name, ST_AsGeoJSON(geom) FROM places;


-- Distances
SELECT name,
ST_DistanceSpheroid(
  geom, 
  ST_SetSRID(ST_MakePoint(-73.6049652, 45.503459),4326),
  'SPHEROID["WGS84",6378137,298.257223563]'
) FROM places;   

SELECT name FROM places
WHERE ST_DistanceSpheroid(
  geom, 
  ST_SetSRID(ST_MakePoint(-73.6049652, 45.503459),4326), -- montreal
  'SPHEROID["WGS84",6378137,298.257223563]'
) < 500000;   


-- Tansform projections
ST_Transform(ST_GeomFromText('POINT(120.08 30.96)', 4326), 2163 );


-- Points in polygon
SELECT  *, ST_AsText(geom)  FROM places WHERE ST_CONTAINS(
  ST_SetSRID(
    ST_GeomFromText('POLYGON(( -125.903320 44.668, -119.22 44.668, -119.22 50.2612, -125.903320 50.2612, -125.903320 44.668))'),
    4326
  ),
  geom
);
```





====
# Firebase's Firestore
- Firebase has 2 flavor of NoSQL Database `Realtime Database` & `Firestore Database`
- The `Realtime Database` as the original database before Google aquired Firebase and the `Firestore Database` is if the Realtime database & Google had a baby.
- In most cases it's probably best to user `Firestore`, plus `Firestore` allow geo points
- A great feature of Firebase is that you can use the `Emulator` to test out all the Firebase services locally
- Resources
  - [Firebase Emulator](https://firebase.google.com/docs/emulator-suite)
  - [Add/Get data from a DB](https://firebase.google.com/docs/firestore/query-data/get-data)
  - [Firebase Reference Docs](https://firebase.google.com/docs/reference/js/v8)


- Initialize the Firebase application
  1. Go to the [Firebase Console](https://console.firebase.google.com/) 
    - Create or select a project
    - Go to the `Firestore` tab in the sidebase and click `Create Database`
  2. Initialize your application in your terminal
    ```shell
    # just need to install the `firebase-tools` globally once
    $ npm i -g firebase-tools

    $ firebase init
    # Select firestore & the emulator (you can alway add/remove later)
    # You should have a `firebase.json` & `.firebaserc` file
  ```
  3. Install some stuff
    ```shell
    $ npm init -y
    $ npm i firebase-admin
    $ npm i nodemon -D
    ```
  4. Update your `package.json`
    ```json
    {
      "scripts": {
        "start": "nodemon src",
        "local:firebase": "firebase emulators:start --import=firebase/backup --export-on-exit=firebase/backup"
      }
    }
    ```
- So Firebase uses configs and a `firebase.json` & `.firebaserc` file to connect your code to the project. The `firebase.json` file is absolutly fine to add you your source control because all the controls are done in the `firestore.rules` file
- Example of a `firebase.json`:
  ```json
  {
    "firestore": {
      "rules": "firebase/firestore.rules",
      "indexes": "firebase/firestore.indexes.json"
    },
    "emulators": {
      "auth": {
        "port": 9099
      },
      "firestore": {
        "port": 8088
      },
      "ui": {
        "enabled": true
      }
    }
  }
  ```
- Example of a `.firebaserc`:
  ```json
  {
    "projects": {
      "default": "<YOUR_PROJECT_NAME>"
    }
  }
  ```
- When you use the `firebase emulators:start` when you close the process the data do not persist in order to persist the data you have to tell it to import/export the data add `--import=firebase/backup --export-on-exit=firebase/backup`
- Make sure you have a `firebase/firestore.rules`, these current rules anyone to read/write to the database to don't publish this
  ```html
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write;
      }
    }
  }
  ```
- Almost time to add data... Go to your Firebase project in the Console and click the gear icon in the navbar, `Project settings` > `Service account` > `Generate new private key` copy this key to your source code **MAKE SURE YOU GITIGNORE THIS FILE**, this file provides admin access to your application



## Admin verses Firestore/app
- If you are using firebase on the client use the `firebase/app` package, if you are using Fiebase on the server where you can control your Firebase credentials use `firebase-admin`
- Exmaple of initializing a Firebase connection on the client:
  ```js
  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import config from '../config'

  // Only initialize the firebase app once
  if (!firebase?.apps.length) firebase.initializeApp(config.firebase)

  const db = firebase.firestore()
  ```
- Exmaple of initializing a Firebase connection on the server:
  ```js
  const admin = require("firebase-admin");

  const serviceAccount = require("./serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const db = admin.firestore();
  ```



## CRUD the Firestore Database
- [Docs](https://firebase.google.com/docs/firestore/query-data/get-data)
### Add
- When adding a document to a collection you can provide the id or you can let firebase create it for you
- Here's an example of you create the document id:
  ```js
  // Defining the document id explicityly
  const youRef = db.collection("you-define-ids");
  youRef.doc("some-document-id-001").set({ message: "" });
  youRef.doc("some-document-id-002").set({ message: "" });

  // Let firebase define the document id
  const fbRed = db.collection("firebase-define-ids");
  fbRed.add({ capital: true });
  fbRed.add({ capital: false});
  fbRed.add({ capital: true });
  fbRed.add({ capital: false});
  fbRed.add({ capital: false });
  fbRed.add({ capital: false});
  ```

### Read
- Get a specific document base of the document ID
  ```js
  const docRef = db.collection("you-define-ids").doc("some-document-id-001");
  docRef
    .get()
    .then((doc) => {
      doc.exists ? console.log("Document data:", doc.data()) : console.log("No such document!");
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  ```
- Query where a value equals something
  ```js
  db.collection("firebase-define-ids")
    .where("capital", "==", true)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => console.log("Error getting documents: ", error));
  ``
- Other queries like `orderBy()`, `.orderBy(<key>, "desc")`, `limit()`
- If you want to query all the times a user is tagged you an array value in the document
  ```json
  {
    "users":["user1", "user2"]
  }
  ```
- Query the following users
  ```js
  const usersRef = db.collection("users");
  usersRef.add({ following: ["user1", "user2"] });
  usersRef.add({ following: ["user1"] });
  usersRef.add({ following: ["user1", "user2"] });
  usersRef.add({ following: ["user1"] });
  usersRef.add({ following: [] });
  usersRef.add({ following: ["user3"] });

  usersRef
    .where("following", "array-contains-any", ["user3"])
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => console.log(doc.id, " => ", doc.data()));
    })
    .catch((error) => console.log("Error getting documents: ", error));
  ```

## Let's make it spatial!
- You can do geospatial stuff with `firestore` because of geohashing
- A geohash is a convenient way of expressing a location (anywhere in the world) using a short alphanumeric string, with greater precision obtained with longer strings.
- A geohash actually identifies a rectangular cell: at each level, each extra character identifies one of 32 sub-cells.
- ![geohash](/assets/blog/geo/geohash.jpg)
- [Read more on geohashes](https://www.movable-type.co.uk/scripts/geohash.html)
- Vancouver, BC has coordinates of 49.2827° N, 123.1207° W and the geohash would be [`c2b2q7dhx`](http://geohash.org/c2b2q7dhx)

### Using `geofirestore`
- [geofirestore docs](https://geofirestore.com/)
- As of 09-2021 `geofirestore` only supports up to `firebase` v8
- When using `geofirestore` all you need to provide in the document is a `coordinates: new firebase.firestore.GeoPoint(<lat>, <lng>)` property. Geofirestore will take this GeoPoint and create a geohash from it
- **NOTE** you can still query your collection with the regular Friebase querys however you now have the option to do some limited spatial queries

- Setup
  ```js
  // Firebase v8
  /*
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import * as geofirestore from 'geofirestore';
  */

  // *NOTE: Firebase v9 ( Currently geofirebase library only works with the Firebase Compat library. Support for the Firebase Modular library is coming down the road.)
  import firebase from 'firebase/compat/app'
  import 'firebase/compat/firestore'
  import * as geofirestore from 'geofirestore'

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
  ```
- Add a point to the collection
  ```js
  // Add a document to the collection containing `coordinates` key
  const uuid = uuidv4();
  geocollection.doc(uuid).set({
    coordinates: new firestore.firestore.GeoPoint(42.3547255, -71.0549425), // YOU NEED THIS LINE
    geojson: {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-71.0549425, 42.3547255] },
      properties: {
        uuid,
        uid: ["user1_000"], // This allows you to filter by multiple users
        name: "Starbucks",
        address: "211 Congress St,Boston, MA 02210",
        rating: 3.5,
        image: "https://s3-media4.fl.yelpcdn.com/bphoto/AVDfFF1OaqiNDqeg-Z2xEQ/o.jpg",
      },
    },
  });
  ```

- Query the collection
  ```js
  async function findNearest(point, radiusInKm, users = [], limit = 100) {
    // Create a GeoQuery based on a location
    const center = new firestore.firestore.GeoPoint(point.lat, point.lng);

    // perform the query
    const query = geocollection
      .near({ center, radius: radiusInKm }) //
      .where("geojson.properties.uid", "array-contains-any", users)
      .limit(limit);
    const value = await query.get();

    // Cleanup the data
    const results = value.docs.map(({ data }) => {
      const { geojson, g } = data();
      return { ...geojson, properties: { ...geojson.properties, geohash: g.geohash } };
    });
    console.log("[length]", results.length);
    return results;
  }

  findNearest({ lat: 42.3461, lng: -71.0974 }, 10, ["user3_000", "user1_000"]);
  ```


- Query nearest & property value

```ts
const geocollection: GeoCollectionReference = geofirestore.collection('Users');
const centerCoords = { lat: 42.3461, lng: -71.0974 }
const geoQuery = geocollection.near({
    center: new firebase.firestore.GeoPoint(centerCoords.lat,centerCoords.lng),
    radius: 10.5
    }).where('type', '==', 'coffee');
```









====
# DynamoDB
- DynamoDB is a hosted NoSQL database offered by Amazon Web Services (AWS). It offers:
  - Reliable performance even as it scales;
  - Managed experience, so you won't be SSH-ing into servers to upgrade the crypto libraries;
  - Small, simple API allowing for simple key-value access as well as more advanced query patterns.
- It works extremely well with Serverless applications (API Gateway & Lambda functions)
- Dynamodb you work with `tables`, `attributes`, & `items`. Each table needs to have a `Primary Key` which is a special attribute that is unique or a `Primary Key + Sort Key` aka `Composite Primary Key`.
- `Primary Key` or `Partition Key`is just that, a unique attribute to which you can query on it also allows 
- The  `Primary Key + Sort Key` is a combination of 2 attributes when used together makes a unique identificator. It allows for id flexibility
- In addition to `primary key` there's also `Secondary Indexes` where that allows you to query the table data with an alternate key. There are 2 kinds of secondary indexes:
  - Global Secondary Index: another index partion & sort keys that differ from the primary & sort key
  - Local Secondary Index: similar partition key but different sort key
- The basic Dynamodb API consist of:
  - PutItem (Create)
  - BatchWriteItem (Create)
  - GetItem (Read)
  - BatchGetItem (Read)
  - Query (Read)
  - Scan (Read)
  - UpdateItem (Update)
  - DeleteItem (Delete)
  - BatchWriteItem (Delete)
- `Global tables` provide a solution for deploying a multi-region, multi-master database, without having to build and maintain your own replication solution.
- `Time To Live (TTL)`, allows you to define when items in a table expire so that they can be automatically deleted from the database.
- When you create a table in DynamoDB you need to specify the throughput capacity for read/write capacity unit
  - One read capacity unit represents one strongly consistent read per second, for an item up to 4 KB in size. 
- When reading the data in the database you can do `scan` or `queries`. A Scan operation reads every item in a table or a secondary index. By default, a Scan operation returns all of the data attributes for every item in the table or index.
- You can also encrypt the data in the database
- You can also add automated tools for monitoring with CloudWatch Alarms, Logs, Events


## Anatomy of an Item
- When setting an attribute for a DynamoDB item, you must specify the Data Type (Scalar, Documents, & Sets) of the attribute.
- [AWS Dynamodb API Attribute Values](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeValue.html)
- Data Types:
  - **Scalar** Data Types:
    - `Numbers` (N) − They are limited to 38 digits, and are either positive, negative, or zero.
    - `String` (S) − They are Unicode using UTF-8, with a minimum length of >0 and maximum of 400KB.
    - `Binary` (B) − They store any binary data, e.g., encrypted data, images, and compressed text. DynamoDB views its bytes as unsigned.
    - `Boolean` (BOOL) − They store true or false.
    - `Null` (NULL) − They represent an unknown or undefined state.
  - **Document** Data Types:
    - `List` (L) − It stores ordered value collections, and uses square ([...]) brackets.
    - `Map` (M) − It stores unordered name-value pair collections, and uses curly ({...}) braces.
  - **Set** Data Type:
    - Available Attribute values: B(S|NS|SS)
    - Must contain elements of the same type whether number, string, or binary. The only limits placed on sets consist of the 400KB item size limit, and each element being unique.
- Here's an example of the Data Types:
  ```html
  {
      "Name": { "S": "Alex DeBrie" },
      "Age": { "N": "29" },
      "Roles": { "L": [{ "S": "Admin" }, { "S": "User" }] }
  }
  ```
- When creating a new table you need: [`AttributeDefinitions`, `KeySchema`, `ProvisionedThroughput`, `TableName`, & `StreamSpecification`]


## Defining a table's 
- [AWS Docs example on how to CRUD a table](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.CreateTable.html)
- [Node.js `@aws-sdk/client-dynamodb` reference](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html)
- When creating a new table you need to define the primary key (partion and/or sort key)
- Every item in a table is uniquely identified by its primary key.
- Key schema: (HASH|RANGE) (partition and sort key)
  ![](/assets/blog/database/aws-table-hash-range.png)
- `HASH` is for you primary key and `RANGE` is for when you use a composity key

- You can create a data and it's configuration via the AWS Console, aws-cli, or with code


### Create a Dynamodb table using `aws-cli`
  ![aws-console-dynamo](public/assets/blog/database/aws-console-dynamo.jpg)

### Create a Dynamodb table using `aws-cli`
  - Here's an exmaple using the `aws-cli`
    ```shell
    $ aws dynamodb create-table \
          --profile local-dev \
          --table-name WeatherForecast \
          --attribute-definitions \
              AttributeName=City,AttributeType=S \
              AttributeName=Date,AttributeType=S \
          --key-schema AttributeName=City,KeyType=HASH AttributeName=Date,KeyType=RANGE \
          --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
          --endpoint-url http://localhost:8000
    ```
### Create a Dynamodb table using javascript
- *NOTE:* `aws-sdk` is the v2 (~62 MB) is was most people are used to, v3 `@aws-sdk/client-dynamodb` (~4.5 MB) which is more modular which will decrease package size and increase performance. Along with v3 we're gonna use `@aws-sdk/util-dynamodb` to allow for converting from JavaScript object to DynamoDB Record (marshall & unmarshall)
- Let create a table [aws docs example](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.CreateTable.html):
  1. Install npm package
    ```shell
    $ yarn init
    $ yarn add @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
    $ mkdir src src/libs
    $ touch src/create-table.js src/config.js src/libs/db.js
    ```
  2. Create a table with Node.js
    - `src/config.js` file
      ```js
      const configPrimaryKey = {
        tableName: 'hello-primary-key',
        attributeDefinition: [
          {
            AttributeName: 'id',
            AttributeType: 'S',
          },
        ],
        keySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH',
          },
        ],
        key: {
          primaryKey: 'id',
        },
      }

      const configCompositeKey = {
        tableName: 'hello-composite-key',
        attributeDefinition: [
          {
            AttributeName: 'Season', // for primary key
            AttributeType: 'N',
          },
          {
            AttributeName: 'Episode', // for sort key
            AttributeType: 'N',
          },
        ],
        keySchema: [
          {
            AttributeName: 'Season',
            KeyType: 'HASH', // Primary key
          },
          {
            AttributeName: 'Episode',
            KeyType: 'RANGE', // Sort key
          },
        ],
      }

      const config = {
        aws: {
          clientConfig: {
            profile: 'local-dev',
            endpoint: 'http://localhost:8000',
            region: 'us-west-2',
          },
          dynamodb: {
            configPrimaryKey,
            configCompositeKey,
          },
        },
      }
      export default config

      ```
    - `src/libs/db.js` file
      ```js
      import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
      import {
        DynamoDBDocumentClient,
        PutCommand,
        GetCommand,
        ScanCommand,
        QueryCommand,
        DeleteCommand,
      } from '@aws-sdk/lib-dynamodb'

      import config from './config.js'

      // Bare-bones DynamoDB Client
      const client = new DynamoDBClient(config.aws.clientConfig)

      // ======== MARSHALL ==================================
      const marshallOptions = {
        // Whether to automatically convert empty strings, blobs, and sets to `null`.
        convertEmptyValues: false, // false, by default.
        // Whether to remove undefined values while marshalling.
        removeUndefinedValues: false, // false, by default.
        // Whether to convert typeof object to map attribute.
        convertClassInstanceToMap: false, // false, by default.
      }

      const unmarshallOptions = {
        // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
        wrapNumbers: false, // false, by default.
      }

      const translateConfig = { marshallOptions, unmarshallOptions }
      const ddbDocClient = DynamoDBDocumentClient.from(client, translateConfig)
      // ======== MARSHALL ==================================

      // =========================================
      export const addUpdateItem = async (Item) => {
        const { tableName } = config.aws.dynamodb.configPrimaryKey
        const params = {
          TableName: tableName,
          Item,
        }
        try {
          const data = await ddbDocClient.send(new PutCommand(params))
          console.log(`[Item added] into ${tableName}`, data)
          return data
        } catch (err) {
          console.log('Error', err)
        }
      }

      export const getItem = async (id) => {
        const { tableName } = config.aws.dynamodb.configPrimaryKey
        const params = {
          TableName: tableName,
          Key: { id },
        }
        try {
          const data = await ddbDocClient.send(new GetCommand(params))
          console.log('Success :', data.Item)
        } catch (err) {
          console.log('Error', err)
        }
      }

      export const deleteItem = async (id) => {
        const { tableName } = config.aws.dynamodb.configPrimaryKey
        const params = {
          TableName: tableName,
          Key: { id },
        }
        try {
          const data = await ddbDocClient.send(new DeleteCommand(params))
          console.log('Success :', data.Item)
        } catch (err) {
          console.log('Error', err)
        }
      }

      export const getAllItems = async () => {
        const { tableName } = config.aws.dynamodb.configPrimaryKey
        const params = {
          TableName: tableName,
        }
        try {
          const data = await ddbDocClient.send(new ScanCommand(params))
          console.log('Success :', data.Items)
        } catch (err) {
          console.log('Error', err)
        }
      }
      ```


## Local development
- You can run DynamoDB locally with [AWS official docker container](https://hub.docker.com/r/amazon/dynamodb-local/)
- You will also need the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) installed on your computer
  - Setup your aws config add this to your `~/.aws/credentials` file:
    ```shell
    [local-dev]
    aws_access_key_id = fakeMyKeyId
    aws_secret_access_key = fakeSecretAccessKey
    region = ap-southeast-2
    ```
  - This will allows us to pick the profile we want for local development
- [DynamoDB AWS CLI commands here](https://docs.aws.amazon.com/cli/latest/reference/dynamodb/index.html)
- [NoSQL Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.html) for Amazon DynamoDB


- Create a `docker-compose.yml` file (In order to make this local-dynamodb work with NoSQL Workbench you have to provide the `-sharedDb` flag). [More on the shared flag here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.UsageNotes.html) or [stackoverflow](https://stackoverflow.com/questions/63835658/can-not-find-table-using-nosql-workbench-for-dynamodb-when-connecting-to-dynamod)
  ```yml
  version: '3'
  services:
    local-dynamo:
      image: amazon/dynamodb-local
      command: -jar DynamoDBLocal.jar -sharedDb -dbPath .
      container_name: dynamodb-local
      ports:
        - "8000:8000"
  ```
- Run the local database!
  ```shell
  $ docker-compose up
  ```
- Create a table with the Terminal
  ```shell
  # Create the DynamoDB table. (make sure to pass in the `--profile`)
  $ aws dynamodb create-table \
      --profile local-dev \
      --table-name WeatherForecast \
      --attribute-definitions \
          AttributeName=City,AttributeType=S \
          AttributeName=Date,AttributeType=S \
      --key-schema AttributeName=City,KeyType=HASH AttributeName=Date,KeyType=RANGE \
      --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
      --endpoint-url http://localhost:8000

  # list all the tables 
  $ aws dynamodb list-tables --profile local-dev --endpoint-url http://localhost:8000
  ```

- NoSQL Workbench Steps:
  - Create a DB connection
  -  `Operation builder` > `+ Add connection` > `DynamoDB local` > provide connection name & port
    ![aws-workbench-db-connection](/assets/blog/database/aws-workbench-db-connection.jpg)

    ![aws-workbench-local-dynamodb-setup-active-connection](/assets/blog/database/aws-workbench-local-dynamodb-setup-active-connection.jpg)
    ![aws-workbench-local-dynamodb-active-connection](/assets/blog/database/aws-workbench-local-dynamodb-active-connection.jpg)

  - Now you can use the "Data Modeler" to create a model the 
    ![aws-workbench-create-table](/assets/blog/database/aws-workbench-create-table.jpg)


## batch load a json file

```shell
$ aws dynamodb batch-write-item --request-items file://my-data-seed.json --profile local-dev
```










