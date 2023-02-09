---
title: 'docker'
excerpt: ''
coverImage: '/assets/covers/docker.jpg'
ogImage:
  url: '/assets/covers/docker.jpg'
---




# Basic Commands
- Basic commands
  ```shell
  # List all the images you have locally
  $ docker images

  # List all the running containers
  $ docker ps

  # List all available containers
  $ docker ps -a
  ```

- Images
  - Images are the blueprint to create a container
    ```shell
    $ docker rmi <IMAGE_NAME>
    $ docker build -t <IMAGE_NAME> -f Dockerfile .
    $ docker run <IMAGE_NAME> -n <CONTAINER_NAME> -p 8080:8080
    ```
  - *PORTS*. <Port exposed> : <Port running inside container>
- Containers
  - A container is a runnable instance of an image.
  - You can have multiple containers that were built from the same image
  - You can stop/start a container whenever
    ```shell
    $ docker start <CONTAINER_NAME>
    $ docker stop <CONTAINER_NAME>
    ```

- Creating an image
  - All Docker images are based off some other image
  - Creating a basic nodejs applications create a `Dockerfile`:
    1. Create a simple nodejs express application:
      - Add some dependencies
        ```shell
        $ npm init -y
        $ npm i -D @babel/node@7 @babel/preset-env@7 @babel/cli@7 @babel/core@7
        $ npm i express
        $ mkdir src
        $ touch src/index.js
        ```
      - Create a `.babelrc`
        ```json
        {
          "presets": [
            [
              "@babel/preset-env",
              { "targets": { "esmodules": true }}
            ]
          ]
        }
        ```
    - Add some script to your `package.json` file
      ```json
      {
        "scripts": {
          "start": "nodemon --exec babel-node src/index.js",
          "build": "babel src --out-dir dist",
          "serve": "node dist/index.js"
        }
      }
      ```
    - Create `src/index.js` file
      ```js
      import express from "express";
      const app = express();

      app.get("/", (req, res) => {
        res.status(200).json({ Hello: "Express" });
      });

      app.get("*", (req, res) => {
        res.send("all other routes");
      });

      const PORT = process.env.PORT || 8080;
      const ENV_VAR = process.env.ENV_VAR || "none passes in";
      app.listen(PORT, () => console.log(`...REST API is running, some ENV variable (${ENV_VAR})`));
      ```
    2. Create `Dockerfile` file
      ```Dockerfile
      FROM node:14

      # Create app directory
      WORKDIR /usr/src/app

      # Install app dependencies
      # A wildcard is used to ensure both package.json AND package-lock.json are copied
      COPY package*.json ./
      COPY src/ ./src

      RUN npm install
      RUN npm run build

      EXPOSE 3000
      CMD [ "npm", "run", "serve" ]
      ```

    3. Create image & run the container
      ```shell
      $ docker build -t pdotwdot/hello-simple-express:latest .
      $ docker images | grep pdotwdot/hello-simple-express
      $ docker run --name qqqqq -e ENV_VAR='some env!' --rm  -p 1234:3000 -t pdotwdot/hello-simple-express:latest
      ```
    4. You can connect to that running container
      ```shell
      $ docker exec -it <CONTAINER_NAME> bash 
      $ docker exec -it qqqqq bash 
      ```

# Docker Compose for development
- Update the `package.json` file
  ```json
  {
    "scripts": {
      "prestart": "npm i",
      "start": "nodemon --exec babel-node src/index.js",
      "build": "babel src --out-dir dist",
      "serve": "node dist/index.js"
    },
    "devDependencies": {
      "@babel/cli": "^7.14.8",
      "@babel/core": "^7.15.0",
      "@babel/node": "^7.14.9",
      "@babel/preset-env": "^7.15.0",
      "nodemon": "^2.0.12"
    },
    "dependencies": {
      "express": "^4.17.1"
    }
  }
  ```
- Add a `.dockerignore` file with this:
  ```
  node_modules
  npm-debug.log
  ```
- Update the `Dockerfile`
  - Basically a shell of because we are going to add in the `src` as a volume
    ```Dockerfile
    FROM node:14
    WORKDIR /usr/local/app/

    EXPOSE 3000
    CMD [ "npm", "run", "serve" ]
    ```
- Create a `docker-compose.yml` file
  ```yml
  version: '3'
  services:
    node:
      build: .
      command: npm start
      ports:
        - "3000:8080"
      volumes:
        - ./src/:/usr/local/app/src/
        - ./.babelrc:/usr/local/app/.babelrc
        - ./package.json:/usr/local/app/package.json
        - ./package-lock.json:/usr/local/app/package-lock.json
  ```
- Run a command to get it running & visit the site at `http://localhost:3000/`
  ```shell
  $ docker-compose up
  $ docker-compose -f docker-compose.yml up  -d 
  ```
- Cleanup
  ```shell
  $ docker-compose down --rmi all
  ```



# Good Practices with 
- Use .dockerignore to prevent leaking secrets
  - Include a .dockerignore file that filters out common secret files and development artifacts. 
  - By doing so, you might prevent secrets from leaking into the image. 
  - As a bonus the build time will significantly decrease. 
  - Also, ensure not to copy all files recursively rather explicitly choose what should be copied to Docker
  - Dependencies install first, then code
- Install "system" packages first
- Use explicit image reference, avoid latest tag
- Prefer smaller Docker base images
- Scan images for multi-layers of vulnerabilities
 ```docker
  sudo apt-get install rpm
  $ wget https://github.com/aquasecurity/trivy/releases/download/{TRIVY_VERSION}/trivy_{TRIVY_VERSION}_Linux-64bit.deb
  $ sudo dpkg -i trivy_{TRIVY_VERSION}_Linux-64bit.deb
  trivy image [YOUR_IMAGE_NAME]
  ```

# Stop and remove all docker containers and images
  ```shell
  #List all containers (only IDs)
  $ docker ps -aq

  # Stop all running containers
  $ docker stop $(docker ps -aq)

  #Remove all containers
  $ docker rm $(docker ps -aq)

  #Remove all images
  $ docker rmi $(docker images -q)
  ```


# Run a docker image and pass in environment variables
- do this with the "-e" flag
- example:
  ```
  $ docker run --rm --name test -e PORT=6666  my-image
  ```

# Cleanup
- If you’ve ever ran a docker image ls you’ve likely noticed 1 or more items that have a <none> repository and a <none> tag.
- Dangling images are not referenced by other images and are safe to delete. 
  ```
  $ docker rmi -f $(docker images -f "dangling=true" -q)
  ```
- newer versions of Docker (1.13+) there’s an even better command called `$ docker system prune` which will not only remove dangling images but it will also remove all stopped containers, all networks not used by at least 1 container, all dangling images and build caches.

```
$ docker volume prune
```

# Tags

- Tagging your image during the build with the `-t` flag
  ```bash
  # docker build -t <USERNAME>/<IMAGE_NAME>:<TAG_NAME> .
  $ docker build -t philopian/simple-node-server:0.0.1 .
  ```
- You can tag an image after the fact with 
  ```bash
  # docker tag <IMAGE_ID> <TAG_NAME>
  $ docker tag def13b34dc63 jupyter-web-ui-base
  ```







# Docker Hub
- [Docker hub](https://hub.docker.com/search?q=)
- ![dockerhub](/assets/blog/docker/dockerhub-nodejs.jpg)
- If you take a look at the `supported tags` these are all the tags you can base your docker file off of. Most of the time people use the `node:latest` however you can pin it down to a specific version like `node:18` or `node:18-alpine3.15`


## Publishing a Docker image to DockerHub


# Publishing a Docker image to DockerHub
1. Initialize:
  ```shell
  # git
  $ git init
  $ echo -e "node_modules\n.env" > .gitignore

  # node
  $ yarn init -y
  $ yarn add express
  $ yarn
  $ echo "`jq '.scripts.start="node src/index.js"' package.json`" > package.json
  $ echo "`jq '.scripts.dev="PORT=1234 node src/index.js"' package.json`" > package.json
  # docker
  $ echo -e "node_modules\nnpm-debug.log" > .dockerignore
  ```

2. Create a simple server `./src/index.js`
  ```js
  const express = require("express");

  // Constants
  const PORT = process.env.PORT || 8080;
  const HOST = "0.0.0.0";

  // App
  const app = express();
  app.get("/", (req, res) => {
    res.send("Hello DockerHub");
  });

  app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });
  ```

3. Create a `./Dockerfile`
  ```shell
  FROM node:18

  # Create app directory
  WORKDIR /usr/src/app

  # Install app dependencies
  # A wildcard is used to ensure both package.json AND package-lock.json are copied
  # where available (npm@5+)
  COPY package*.json ./

  RUN npm install
  # If you are building your code for production
  # RUN npm ci --only=production

  # Bundle app source
  COPY . .

  EXPOSE 8080
  CMD [ "npm", "start" ]
  ```

4. Create a `./.env` file for all the variables
  ```shell
  DOCKER_APP_VERSION="0.0.1"
  DOCKER_NAMESPACE="pdotwdot"
  DOCKER_APP_NAME="simple-express"
  ```

5. Create a local docker image
  - Basic Docker commands:
    ```shell
    # list all the local containers
    $ docker ps -a

    # list all the local images
    $ docker images
    ```
  - Build the image locally
    ```
    $ export $(grep -v '^#' .env | xargs)

    # $ docker build -t <DOCKER_NAMESPACE>/<DOCKER_APP_NAME>:<DOCKER_APP_VERSION> <FILEPATH>
    $ DOCKER_IMAGE_NAME="$DOCKER_NAMESPACE/$DOCKER_APP_NAME:$DOCKER_APP_VERSION"
    $ docker build -t $DOCKER_IMAGE_NAME .
    ```

6. Run the docker container locally
  ```shell
  # docker run -d -p <Host port>:<Docker port> <docker-image-name>
  $ docker run -d -p 9090:8080 $DOCKER_IMAGE_NAME
  ```
7. Deploy to DockerHub

  ```shell
  $ docker login --username pdotwdot 
  $ docker push $DOCKER_IMAGE_NAME
  ```









# Docker Desktop enabling Kubernetes

```shell
$ docker run -it --rm -d -p 8080:80 --name web nginx


$ kubectl create deployment web --image=gcr.io/google-samples/hello-app:1.0
$ kubectl get pods
$ kubectl delete deployment web
$ kubectl get pods
``













