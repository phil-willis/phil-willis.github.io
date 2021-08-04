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

  # List all the containers
  $ docker ps

  # List all running containers
  $ docker ps -a
  ```

- Images
  - Images are the blueprint to create a container
    ```shell
    $ docker rmi <IMAGE_NAME>
    $ docker build -t <IMAGE_NAME> -f Dockerfile .
    $ docker run <IMAGE_NAME> -n <CONTAINER_NAME> -p 8080:8080
    ```
- Containers
  - A container is a runnable instance of an image.
  - You can have multiple containers that were built from the same image

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