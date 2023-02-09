---
title: REST APIs'
excerpt: ''
coverImage: '/assets/covers/rest-api.jpg'
ogImage:
  url: '/assets/covers/rest-api.jpg'
---



# REST APIs
- `REpresentational State Transfer (REST)` is an architecture style for providing standards between computer systems which communicates over HTTP protocol
- `Hypertext Transfer Protocol (HTTP)` is an application-layer protocol for transmitting hypermedia documents
- REST is `stateless` in that the server doesn't need to know anything about the state of the client or vice versa. State can be added with the user of cookies or JWT
- REST works on a request/response pattern
- REST uses `HTTP verbs` (POST|GET|PUT|DELETE|etc) and do Create/Read/Update/Delete and more
- HTTP path are called Uniform Resource Identifier (URI)
- Request/response HTTP have `URI`, `headers` & `body`
- Response Codes:
  - [100–199] - Informational responses 
  - [200–299] - Successful responses 
  - [300–399] - Redirection messages 
  - [400–499] - Client error responses 
  - [500–599] - Server error responses 
- Links:
  - [MDN Docs on HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- Examples of REST APIs:
  - [SpaceX](https://docs.spacexdata.com/)
  - [nominatim](https://nominatim.org/release-docs/latest/api/Search/)
  - [NASA](https://images-api.nasa.gov/search?description="Kalpana"&media_type=image)


## Some Tools
- If you are using vscode there's a couple of really great extensions you can install so that you can do everything within your dev editor. Check out:
  - vscode extension [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
  - vscode extension [Thunder Client](https://www.thunderclient.com/)
- [Postman](https://www.postman.com/) is a great stand-alone client application to make http calls

- REST Client:
  - Make a `*.http` file, here an example:
    ```shell
    @BASE_URL = https://example.com
    @JWT = ...


    ###
    GET {{BASE_URL}}/comments HTTP/1.1



    ###
    POST {{BASE_URL}}/comments HTTP/1.1
    content-type: application/json
    Authorization: Bearer {{token}}

    {
        "name": "sample",
        "time": "Thu, 1 Sep 2022 18:27:50 GMT"
    }
    ```

# Creating a Nodejs REST API
- **note:** Since Node.js is a very flexible platform there multiple ways of dealing with folder structure for a REST API application, I'm gonna focus on `component-base` approach but there are multiple other ways of organizing your code, like traditional-MVC, MV-ish, component based, etc. The main importance is to avoid a benemoth monolith index.(ts|js) file and to focus on separation of concerns
- Focus on layers:
  - Routers/Routes
  - Controllers
  - Services
  - Data Access & Data Models
  - Persistent Data or External APIs

## App setup
- Going to setup a Node.js clientside/serverside in the same repo

1. Init
  - Setup
    ```shell
    $ mkdir rest-me-up && $_
    $ echo node_modules > .gitignore
    $ yarn init -y
    $ mkdir packages && mkdir packages/client && mkdir packages/server
    ```
  - Add `private` & `workspace` to the `package.json` file
    ```json
    {
      "private": true,
      "workspaces": [
        "packages/*"
      ]
    }
    ```
2. Linting packages
  ```shell
  $ yarn add -D -W @trivago/prettier-plugin-sort-imports @typescript-eslint/eslint-plugin @typescript-eslint/parser concurrently eslint-config-prettier eslint-plugin-prettier prettier
  $ mkdir .vscode && touch .prettierrc .eslintrc .vscode/settings.json
  ```
  - Linting configs
    - `./.vscode/settings.json`
      ```json
      {
        // Set prettier to be the default formatter
        "editor.defaultFormatter": "esbenp.prettier-vscode",

        // Don't format any files by default
        "editor.formatOnSave": false,
        
        // Define the file types to do the autoformatting
        "[javascript]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode",
          "editor.formatOnSave": true
        },
        "[typescript]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode",
          "editor.formatOnSave": true
        },
        "[typescriptreact]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode",
          "editor.formatOnSave": true
        },
        "[json]": {
          "editor.defaultFormatter": "esbenp.prettier-vscode",
          "editor.formatOnSave": true
        },
      }
      ```
  - `./.eslintrc`
    ```json
    {
      "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
      ],
      "plugins": ["react", "@typescript-eslint"],
      "env": {
        "browser": true,
        "es6": true,
      },
      "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
      },
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "ecmaFeatures": {
          "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
        "project": "./tsconfig.json"
      }
    }
    ```
  - `./.prettierrc`
    ```json
    {
      "semi": false,
      "trailingComma": "all",
      "singleQuote": true,
      "printWidth": 100,
      "importOrder": ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
      "importOrderSeparation": true
    }
    ```

3. Add some npm script & devDependencies
  - Add this to your `package.json` file
    ```json
    {
      "name": "rest-me-up",
      "version": "1.0.0",
      "main": "index.js",
      "private": true,
      "workspaces": [
        "packages/*"
      ],
      "scripts": {
        "start:client": "yarn workspace client dev",
        "start:server": "yarn workspace server dev",
        "start": "concurrently --kill-others-on-fail 'yarn start:server' 'yarn start:client' ",
        "build:client": "yarn workspace client build",
        "build:server": "yarn workspace server build",
        "build": "concurrently 'yarn build:server' 'yarn build:client'",
        "build:clean": "rm -rf packages/client/build packages/server/build",
        "lint": "prettier --write packages/{client,server}/src/**/*.{j,t}s{,x}"
      },
      "devDependencies": {
        "@trivago/prettier-plugin-sort-imports": "^3.3.0",
        "@typescript-eslint/eslint-plugin": "^5.36.1",
        "@typescript-eslint/parser": "^5.36.1",
        "concurrently": "^7.3.0",
        "eslint-config-prettier": "^8.5.0",
        "eslint-plugin-prettier": "^4.2.1",
        "prettier": "^2.7.1"
      }
    }
    ```
4. Setup the server-side code
  - Make some files/folders
    ```shell
    $ mkdir packages/server/src 
    $ cd packages/server 
    $ touch package.json & src/index.ts
    ```
  - Create the `packages/server/src/index.ts` file with the native `http`
    ```ts
    import http from 'http'

    const host = 'localhost'
    const POST = 3000

    const requestListener = (req: any, res: any) => {
      res.writeHead(200)
      res.end('My first server!')
    }

    const server = http.createServer(requestListener)
    server.listen(POST, host, () => {
      console.log(`Server is running on http://${host}:${port}`)
    })
    ```
  - Create a `./packages/server/package.json` file
    ```json
    {
      "name": "server",
      "version": "1.0.0",
      "main": "build/index.js",
      "types": "build/index.d.ts",
      "scripts": {
        "start": "node build/index.js",
        "dev": "ts-node-dev --respawn -- src/index.ts",
        "build": "tsc"
      },
      "devDependencies": {
        "ts-node-dev": "^2.0.0",
        "typescript": "^4.7.4",
        "@types/node": "^18.7.14"
      }
    }
    ```
  - Create a `./packages/server/tsconfig.json` file
    ```json
    {
      "compilerOptions": {
        "types": ["node"],
        "target": "es6",
        "module": "commonjs",
        "declaration": true,
        "sourceMap": true,
        "outDir": "build",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true,
      }
    }

    ```
5. Setup client-side code
  - Make some files/folders
    ```shell
    $ cd packages
    $ npm init vite
    ```
  - Update the vite dev server port
    ```ts
    import react from '@vitejs/plugin-react'
    import { defineConfig } from 'vite'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
      build: { outDir: "build" },
      server: { port: 8080 }
    })
    ```


6. Install both client/server side npm packages
  ```shell
  $ cd <ROOT_OF_REPO>
  $ yarn
  ```

7. Test our the dev/build
  ```shell
  $ yarn start
  $ yarn build
  ```


## REST API Structure
- Component based REST API structure
- `packages/server/src/<COMPONENT>`
  ```shell
  .
  └── <COMPONENT>
      ├── controller.ts
      ├── model.ts
      ├── routes.ts
      ├── service.ts
      ├── store.ts
      └── validation.ts
  ```




## MySQL Local Database
- We're gonna use Docker to create a local version of MySQL

1. Add vscode extension
2. Update the `./vscode/settings.json` file
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
        "database": "rest-me-up",
        "username": "root",
        "password": "password",
        "connectionTimeout": 15
      }
    ],
  }
  ```
3. Spin up the Docker container
4. Use the vscode extension to connect to the databse











## REST API with Express.js


1. Setup
  - Install some packages:
    ```shell
    $ cd packages/server
    $ yarn add express cors deepmerge
    $ yarn add -D @types/express @types/cors
    ```
  - Your `./packages/server/package.json` should look like:
    ```json
    {
      "name": "server",
      "version": "1.0.0",
      "main": "dist/index.js",
      "types": "dist/index.d.ts",
      "scripts": {
        "start": "node dist/index.js",
        "dev": "ts-node-dev --respawn -- src/index.ts",
        "build": "tsc"
      },
      "dependencies": {
        "cors": "^2.8.5",
        "deepmerge": "^4.2.2",
        "express": "^4.18.1"
      },
      "devDependencies": {
        "@types/cors": "^2.8.12",
        "@types/express": "^4.17.13",
        "@types/node": "^18.7.14",
        "ts-node-dev": "^2.0.0",
        "typescript": "^4.7.4"
      }
    }
    ```

2. Add a `./packages/server/src/config.ts` file
    ```ts
    import deepmerge from 'deepmerge'

    type EnvConfig = {
      REST_PORT: number
      CLIENT_PORT: number
      REST_API_URL: string
      LOCAL_CLIENT_URL: string
      corsOptions: {
        allowedHeaders: string[]
        credentials: boolean
        methods: string
        origin: string
        preflightContinue: boolean
      }
    }
    const REST_PORT = 3000
    const CLIENT_PORT = 8080
    const REST_API_URL = `http://localhost:${REST_PORT}`
    const LOCAL_CLIENT_URL = `http://localhost:${CLIENT_PORT}`
    const base = {
      REST_PORT,
      CLIENT_PORT,
      REST_API_URL,
      LOCAL_CLIENT_URL,
      corsOptions: {
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: LOCAL_CLIENT_URL,
        preflightContinue: false,
      },
    }

    const test: EnvConfig = deepmerge(base, {})
    const local: EnvConfig = deepmerge(base, {})

    function determinConfig() {
      switch (process.env.NODE_ENV) {
        case 'test':
          return test
        case 'dev':
          return local
        default:
          return base
      }
    }

    const config: EnvConfig = determinConfig()
    export default config
    ```
 3. `./packages/server/src/index.ts` to all you express.js entry file
    ```ts
    import cors from 'cors'
    import express from 'express'

    import config from './config'

    const { REST_PORT, REST_API_URL } = config
    const app = express()

    app.use(cors(config.corsOptions))

    app.get('/', (req, res) => {
      setTimeout(() => {
        res.json({ message: 'Hello from express.js!' })
      }, 500) // simulate some latency
    })
    app.all('*', (req, res) => {
      setTimeout(() => {
        res.json({ message: '[Catch all URI]' })
      }, 500) // simulate some latency
    })

    app.listen(REST_PORT, () => {
      console.log(`The magic happens at ${REST_API_URL}`)
    })
    ```




## REST API with AWS API Gateway
- This should leverage most of the base structure from the express.js example




















