---
title: 'Databases'
excerpt: 'a getting started guide for popular databases'
coverImage: '/assets/blog/hello-world/cover.jpg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---


# Databases 
- [x] MySQL + baked in spatial functions
- [x] PostgreSQL + PostGIS
- [ ] SQLite + SpatiaLite
- [ ] DynamoDB
- [ ] Firebase
- [ ] MongoDB
- [ ] CouchDB


x

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
    ```json
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
    ```
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

























