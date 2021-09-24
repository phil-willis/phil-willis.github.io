---
title: 'JavaScript'
excerpt: ''
coverImage: '/assets/covers/js.jpg'
ogImage:
  url: '/assets/covers/js.jpg'
---

# Overview
- What is JavaScript
- Brief History
- var, let, Const
- Primitive vs Reference types
- Data Types
- Interaction: alert, prompt, confirm
- Type conversions
- Array & Array methods
- Object & Object Method
- Basic operators
- Comparisons
- Conditionals
- Logical operations
- Advanced working with functions
- Prototype
- Prototypes, inheritance
- Classes
- Error handling
- Promises, async/await
- Generators, advanced iteration
- Modules
- Arrow Functions
- Destructuring
- Template literals
- How the web works
- npm scripts & package.json
- husky & nvm versions
- sessions, cookies, & jwt
- HTTP caching
- OAuth
- Security
  - CSRF attack
  - SQL injection
  - CORS
- Testing
  - mocks
  - stubs
  - spies
- Closures
- Hoisting
- Immutability
- Data types
- DOM
- Global & Local Scope
- Operators
- Undefined, null, & NaN
- logical operations
- Try/Catch block
- How to throw errors
- Error handling
- strict mode
- parameter vs arguments
- Functions vs Methods
- anonymous functions
- "this"
- bind
- Class
- Class inheritance
- recursion
- closures
- pure function
- side effects
- traverse the DOM
- sets
- symbols
- spread operator
- object.assign
- virtual DOM (how does react work with it)
- package managers
- Web APIs Specifications
  - Background Fetch API
  - Clipboard API
  - Console API
  - Geolocation API
  - HTML Drag and Drop API
  - History API
  - IndexedDB 
  - Service Workers API
  - Storage
  - URL API
  - Web Crypto API
  - Web Storage API
  - Websockets API
  - XMLHttpRequest
- Web APIs Interfaces
  - AbortController
- How does React's Virtual DOM work
- How does Redux work
- When to use a stateful or stateless component in react
- When to use React's internal state versus Redux
- Variable hoisting
- What are promises (3 states of a promise fulfilled/rejected/pending)
- Promises & async/await 
- HTTP methods
- Http status code
- CORS
- JSONP
- HTTP caching
- debounce 
- closure (What is the difference between lexical scoping and closures)
- web sockets
- Server Sent Events
- What is the benefits of using async/await to promises (cleaner, try/catch blocks catch exception, callback is 
- testing frameworks
- folder structure for server/client/package
- Loop over a number of times 
- Ternary & shorthand for setting a value if true `let o = variable && 3;`
- Recursive function
- `use strict`

- JSDoc
- Babel


# What is JavaScript
- Dynamic programming languages
  - Not pre-compiled
  - Code evaluated and executed at runtime
  - Code can change at runtime (variable types can change)
- Weakly types programming languages
  - Data types are assumed automatically
  - Strong types you have to define the types 
- Compiled at runtime
- JS was create to make webpages more dynamic
- JS is executed via JS engine 
  - V8 (Chrome)
  - SpiderMonkey (Firefox)
  - the JS engine
    1. Parse Code
    2. Compile to Machine code
    3. execute Machine code
- All on an Single Thread on your operating system
- JS runs on a Host Environments
  - Browser-side
    - can't access local file system
    - Runs in a sandbox
  - Server-side
    - Extracted the Chrome's V8 (JS Engine)
    - You can run it on any machine
    - Called Node.js
    - You can run on the server
    - You can run on any computer (Mac/Linux/Windows)
    - Can't manipulate the DOM 
- JS for web development
  - In web development `HTML` is the markup, `CSS` is the styling, & `JS` is the interactions
  - There are some security measures that prevent certain things you cannot do with JS in the browser
  - [Great JS Reference MDN guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
  - Each browser have their own `Developer Console` 
  - For web development you can add your JS code inside of a `<script></script>` tag inside of your HTML file
    - It's best to have the `script` tag at the bottom of the file so that all the elements are loaded before the JS gets executed
    ```html
    <!DOCTYPE HTML>
    <html>
    <body>
      <p>Before the script...</p>
      <script>
        alert( 'Hello, world!' );
      </script>
      <p>...After the script.</p>
    </body>
    </html>
    ```
  - You can also provide an external script files with 
    ```html
    <script type="text/javascript" src="<RELATIVE_PATH>"></script>
    ```
# Brief History
- 1995 Netscape release "LiveScript", then renamed to JavaScript
- 1996 Microsoft release it's own version for IE
- 1996 ECMA to start standardization (European Computer Manufacturers Association)
- In 2015 JS had a huge upgrade and we now use transpiling to convert to the older JS so that it can be used in older browsers
- 6th Edition – ECMAScript 2015
- 7th Edition – ECMAScript 2016
- 8th Edition – ECMAScript 2017
- 9th Edition – ECMAScript 2018
- 10th Edition – ECMAScript 2019
- 11th Edition – ECMAScript 2020
- Each browser comes with its own JS engine that also defines which features are actually supported
- [caniuse](https://caniuse.com/) is a great resource to see if a feature is supported or not
- ECMA-Script is in active development

==============================






# var, let, Const
# Primitive vs Reference types

# Data Types
- There are 6 Built in JS `primitive` data structures (how to remember them `BUNS BS`)
  4. `String`
  3. `Number`
  2. `Boolean`
  1. `undefined`
  5. `BigInt`
  6. `Symbol`
- Structural Root Primitive
  1. `null` ()
- Structural types
  1. `Object` (almost everything made with the `new` keyword)
    - `new Object`
    - `new Array`
    - `new Map`
    - `new Set`
    - `new WeakMap`
    - `new WeakSet`
    - `new Date`
  2. `Function` (non-data structure, every `Function` constructor is derived from the `Object` constructor)


## `String` (Primitive type)
## `Number` (Primitive type)

### Numeric Separators
- `Number separators` is syntactic sugar that make working with numeric constants alot easier
- TL;DR you can add a `_` to a numeric value to make it more readable similar to what a `,` does when viewing large numbers
  ```js
  // Price
  const price = 6666666;
  const priceWithNumberSeparators = 6_666_666;
  console.log(price)
  console.log(priceWithNumberSeparators)
  ````

## `Boolean` (Primitive type)
## `undefined` (Primitive type)
## `BigInt` (Primitive type)
## `Symbol` (Primitive type)

## `Null` type 

## `Object` data type
## `Array` data type
## `Map` data type
## `Set` data type
## `WeakMap` data type
## `WeakSet` data type
## `Date` data type


===============================




# Interaction: alert, prompt, confirm
# Type conversions
# Array & Array methods
# Object & Object Method
# Basic operators
# Comparisons
- `Comparison` and `Logical` operators are used to test for true or false.
- Comparison Operator:
  ```js
  // Equal to
  x == 8
  // Equal to value & type
  x === 8


  // Not equal
  x != 8
  // Not equal to value & type
  x !== 8

  // Greater than
  x > 8
  // Greater than or equal to
  x >= 8

  // Less than
  x < 8
  // Less than or equal to
  x <= 8
  ```
- Logical Operators
  ```js
  // And
  x === 8 && x === 9
  // Or
  x === 8 || x === 9
  // Not
  !(x === 8)
  ```
- Conditional (Ternary) Operators
  - `variableName = (condition) ? value1:value2`
  ```js
  const volatile = (x > 100) ? 'Is Volatile' : 'Is NOT Volatile'
  ```

# Conditionals
# Logical operations
# Advanced working with functions
# Prototype
# Prototypes, inheritance
# Classes
# Error handling
# Promises, async/await
# Generators, advanced iteration
# Modules
# Arrow Functions
# Destructuring
# Template literals
# How the web works
# npm scripts & package.json
# husky & nvm versions
# sessions, cookies, & jwt

# HTTP caching
- Web caches reduce latency and network traffic and thus lessen the time needed to display a representation of a resource
- It is important to cache a resource only until it changes, not longer.
- There are different types of caching: browser, proxy, gateway caches, CDN, reverse proxy caches
- Private caches are dedicated to a single user while publish caches are meant to be shared
- You can control the caching with `cache-control` headers and max-age
- ETAG (It lets caches be more efficient and save bandwidth, as a web server does not need to resend a full response if the content has not changed.)
# OAuth
# Security
  ## CSRF attack
  ## SQL injection
  ## CORS
# Testing
  ## mocks
  ## stubs
  ## spies
# Closures
# Hoisting
# Immutability
# Data types
# DOM
# Global & Local Scope
# Operators
# Undefined, null, & NaN
# logical operations
# Try/Catch block
# How to throw errors
# Error handling
# strict mode
# parameter vs arguments
# Functions vs Methods
# anonymous functions
# "this"
# bind
# Class
# Class inheritance
# recursion
# closures
# pure function
# side effects
# traverse the DOM
# sets
# symbols
# spread operator
# object.assign
# virtual DOM (how does react work with it)
# Package managers

# Web APIs Specifications & Interfaces

- There are a large number of [Web APIs available.](https://developer.mozilla.org/en-US/docs/Web/API#interfaces)
  ## Background Fetch API
  ## Clipboard API
  ## Console API
  ## Geolocation API
  ## HTML Drag and Drop API
  ## History API
  ## IndexedDB 
  ## Service Workers API
  ## Storage
  ## URL API
  ## Web Crypto API
  ## Web Storage API
  ## Websockets API
  ## XMLHttpRequest
  ## AbortController
  ## AbortController
  - [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
# How does React's Virtual DOM work
# How does Redux work
# When to use a stateful or stateless component in react
# When to use React's internal state versus Redux
# Variable hoisting
# What are promises (3 states of a promise fullified/rejected/pending)
# Promises & async/await 
# HTTP methods
# Http status code
# CORS
# JSONP
# HTTP caching
# debounce 
# closure (What is the difference between lexical scoping and closures)
# web sockets
# Server Sent Events
# What is the benefits of using async/await to promises (cleaner, try/catch blocks catch exception, callback is cleaner, debugging)
# Testing frameworks
# Folder structure for server/client/package



# Loop over a number of times 
- Sometimes you need to loop over an array a number of time to make some data
  ```js
  const opt = [...Array(4)].map((_, num) => ({ value: num, label: num }))
  console.log(JSON.stringify(opt)) // [{"value":0,"label":0},{"value":1,"label":1},{"value":2,"label":2},{"value":3,"label":3}]
  ```

# Ternary & shorthand for setting a value if true `let o = variable && 3;`
- [stackoverflow](https://stackoverflow.com/questions/39488458/javascript-one-line-if-only-state-true)
- In default 'if' one line statement are two block, for true, and false:
  ```js
  variable ? true block : false block;
  ```
- How declare 'if' with one block? I expect something like this: `variable ? true-block;`

- You can do:
  ```
  variable && js-block
  ```
- For example:
  ```js
  let variable = true;
  let o = variable && 3;
  ```
  

# Recursive function
- Recursive function is a function that calls itself until there is a break
- *Always use caution* when using recursive functions cause you don't want to create an infinite loop. This is especially bad when an infinite loop happens on a server, it might cause you alot of $$$
- The general outline looks like this:
  ```js
  function recurse() {
      if(condition) {
          // stop calling itself
      } else {
          recurse();
      }
  }
  ```
- Here is an example of calling a http resource can looping thru the pages with a recursive function:
  ```js
  import axios from 'axios'

  const baseUrl: string = 'https://api.worldbank.org/v2/country/'

  const getIndicatorByCountry = async (country, indicator, page=1) => {  
    const query = `${baseUrl}/${country}/indicator/${indicator}?page=${page}&format=json`
    const response = await axios.get(query)  
    const data = response.data

    if (data[0].pages > page) {
      return data.concat(await getIndicatorByCountry(country, indicator, page+1)) 
    } else {
      return data
    }
  }
  ```
  

# `use strict`
- For a long time, JavaScript evolved without compatibility issues. New features were added to the language while old functionality didn’t change.
- Up until 2009 (ES5) when the `use strict` was added so that new features to the language and modifications to existing one could happen
- JavaScript's strict mode, introduced in ECMAScript 5, is a way to opt in to a restricted variant of JavaScript
- `use strict` is a `opt in` feature to restrict variant of JS
- All you have to do is to add `"use strict";` at the top of the JS file
  ```js
  "use strict";

  // this code works the modern way
  ...
  ```
- It works in most browsers, namely Firefox and Chrome.
- If it doesn’t, e.g. in an old browser, there’s an ugly, but reliable way to ensure use strict. Put it inside this kind of wrapper:
  ```js
  (function() {
    'use strict';

    // ...your code here...
  })()
  ```
- You kinda don't have to worry about this if you are using a transpiler like babel used to write newer JS which gets converted to ES5 for builds


===============================


# Web application bundlers
## Webpack
- [Webpack](https://webpack.js.org/) homepage
  ```shell
  ```


## Snowpack
- [Snowpack](https://www.snowpack.dev/) homepage
- Snowpack is a faster frontend build tool 
- what is the learning curve? "Once you try it, it's impossible to go back to anything else."
- Snowpack doesn't rebundle the entire application, it only 
- If you are familiar with `webpack`, you would know that while developing you would use the `webpack-dev-server`, everytime you save a file it rebuilds the entire application, rebundles, and serves it to the browser
- With `Snowpack` the massive benefit is that it bundles and caches all your dependencies and only rebuild/serve the changes that you make to your source code and only the files that you've changed instead of rebundling the entire application
- It's an insanely fast build tool

- Let get it setup:

1. Install `snowpack` as a dev dependency
  ```shell
  $ npm init -y
  $ npm install --save-dev snowpack
  ```
2. Update your `package.json` file
  ```json
  {
    "scripts": {
      "start": "snowpack dev",
      "build": "snowpack build"
    },
  }
  ```
3. Create a `./public/index.html`
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Snowpack</title>
  </head>
  <body>
    <h1>Hello snowpack!!</h1>
  </body>
  </html>
  ```
4. Create a `snowpack.config.js` file
  ```js
  // Snowpack Configuration File
  // See all supported options: https://www.snowpack.dev/reference/configuration

  /** @type {import("snowpack").SnowpackUserConfig } */
  module.exports = {
    mount: {
      public: { url: "/", static: true },
      src: "/src",
    }
  };
  ```
5. Run snowpack for the first time
  - Run:
    ```shell
    $ npm start
    ```
  - When you run this for the first time it will just reload the changes to the html file cause you haven't referenced a js script yet
6. Let's add React
  - **Snowpack will deal with all the babel stuff for you!** so no need to deal with babelrc files

  - Create a `./src/index.js` file
    ```js
    console.log('Hello Snowpack')
    ```
 
  - Update the `./public/index.html`
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hello Snowpack & React</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="../src/index.js"></script>
    </body>
    </html>
    ```

7. Convert your `js` to `ts`
  - Change all your `jsx|js` files inside of the `./src/*` folder
  - Install some dependencies:
    ```shell
    $ npm i -D typescript @types/react @types/react-dom @snowpack/plugin-typescript
    ```
  - Add a `./tsconfig.json` file with:
    ```json
    {
      "compilerOptions": {
        "module": "ESNext",
        "target": "ESNext",
        "strict": true,
        "moduleResolution": "node",
        "esModuleInterop": true,
        "jsx": "preserve",
        "noEmit": true,
        "skipLibCheck": true,
        "typeRoots": [
          "node_modules/@types",
          "types"
        ]
      },
      "include": [
        "src",
        "types"
      ]
    }
    ```
  - Add some type for images
    ```js
    // `./types/images.d.ts`
    declare module '*.png';
    declare module '*.jpg';
    declare module '*.svg';
    ```

  - Add some file alias to your `./snowpack.config.js` files
    ```js
    module.exports = {
      alias: {
        "@/components": "./src/components",
      }
    };
    ```

  - Add alias to your `./tsconfig.json` file 
    ```json
    {
      "compilerOptions": {
        "baseUrl": "./src",
        "paths": {
          "@/components/*": ["components/*"]
        }
      }
    }
    ```
  - Rerun `$ npm start`




## Parcel
- [Parcel](https://parceljs.org/) homepage
  ```shell
  $ npm init -y
  $ npm i parcel-bundler
  ```
- Update the `package.json` file
  ```json
  {
    "scripts": {
      "start": "parcel -p 8080 watch public/index.html",
      "build": "parcel build public/index.html"
    }
  }
  ```
- Create a `public/index.html` file
  ```html
  <html>
  <body>
    <script src="../src/index.js"></script>
  </body>
  </html>
  ```
- Create a `src/index.html` file
  ```html
  console.log("hello Parcel")
  ```
- Add Typescript, create a `tsconfig.json`
  ```json
  {
    "compilerOptions": {
      "jsx": "react"
    }
  }
  ```
- Update a `public/index.html` file
  ```html
  <html>
  <body>
    <div id="root"></div>
    <script src="../src/index.tsx"></script>
  </body>
  </html>
  ```
- Create a `src/index.tsx`
  ```js
  console.log('Hello from tsx!')
  ```





## Vite
- [Vite](https://vitejs.dev/) homepage
  ```shell
  $ npm init vite@latest <YOUR_APP_NAME> -- --template react-ts
  ```
- Template options:
  ```shell
  vanilla
  vanilla-ts
  vue
  vue-ts
  react
  react-ts
  preact
  preact-ts
  lit-element
  lit-element-ts
  svelte
  svelte-ts
  ```








# JSDoc
- [`JSDoc`](https://jsdoc.app/) is a documentation layer you can add to your source code to make it easier for others to use
- Why does it rock?
  - Documentation right next to the source code you are writing
  - VSCode will use it to show you intellisence whenever you are using the functions/classes
  - Easy to keep synced as functions/classes get updates
- [Getting started](https://jsdoc.app/about-getting-started.html)
- Default types:
  - `null`
  - `undefined`
  - `boolean`
  - `number`
  - `string`
  - `Array` or `[]`
  - `Object` or `{}`
  - You can have a typed array: `any[]`, `number[]`, `string[]`. 
  - You could also have an array of object types: `Employee[]`.
- How to add JSDoc comments:
  - Simplest documentation:
    ```js
    /** This is a description of the foo function. */
    function hello() {
    }
    ```
  - Defining a string parameter
    ```js
    /**
     * Prints a string to the console.
     * @param {string} someString - Some string to print to the console.
     */
    function printString(someString) {
      console.log(someString);
    }
    ```

  - Defining the return value
    ```js
    /**
     * Example of defining a return value.
     * @return void
     */
    function printString(someString) {
      console.log(someString);
    }
    ```
    ```js
    /**
     * Example of defining a return value.
     * @return string
     */
    function printString(someString) {
      return someString;
    }
    ```


  - Defining a parameter's default value
    ```js
        /**
         * Param with a default value
         * @param {number} [year=2021]
         */
        function printYear(year) {
          console.log(year);
        }
    ```


  - Defining optional parameters with a `=` after the type without a space
    ```js
    // Define generic object.
    // This can have any number of properties of type any.
    /**
    * @typedef {Object<string, any>} Member
    * @property {string} name The member's name.
    * @property {number=} age The member's age (this is optional).
    * @property {string=} job The member's job (this is optional).
    */
    /**
    * @type {Member} Jack
    */
    const Jack = {
     age: 28
    }
    ```


  - Define an Union type
    ```js
    /**
     * @type {number | string} value The value of the product.
     */
    const price = 12 // or '12'
    ```

  - Define a Intersection type
    ```js
    /**
     * @type {{name: string}, {age: number}}
     */
    const person = {
      name: 'Joe', 
      age: 32
    }
    ```
## Auto generate documentation for the JSDoc comments
- Now when you use this function/class in your code we should have VSCode intellisense with the description/params/return value
- JavaScript With [JSDoc](https://www.npmjs.com/package/jsdoc): generating the docs
  ```shell
  $ npm i jsdoc --save-dev
  $ ./node_modules/.bin/jsdoc src/somefile.js 
  ```


## Add Types to JSDoc
- Setup VSCode add to your `.vscode/settings.json`
  ```json
  {
    "javascript.implicitProjectConfig.checkJs": true
  }
  ```
- With plain JavaScript this will give you some basic IntelliSense and flag type errors with red squiggles underneath
- You can have VSCode check a single file on/off by adding `// @ts-check` at the top of the file or `// @ts-nocheck`
  ```js
  // @ts-check
  // The TypeScript engine will check all JavaScript in this file.
  ```

  ```js
  // @ts-nocheck
  // The TypeScript engine will not check this file.
  ```
- You can also disable a line or block of code by adding `// @ts-ignore`



# Babel
## Babel 6
- Add some dependencies
  ```shell
  $ npm init -y
  $ npm i -D babel-cli@6 babel-preset-env @babel/core@6
  $ npm i express
  ```
- Create a `.babelrc`
  ```json
  {
    "presets": ["env"]
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
  app.listen(PORT, () => console.log(`...The magic happens at http://localhost:${PORT}`));
  ```


## Babel 7
- Add some dependencies
  ```shell
  $ npm init -y
  $ npm i -D @babel/node@7 @babel/preset-env@7 @babel/cli@7 @babel/core@7
  $ npm i express
  ```
- Create a `.babelrc`
  ```json
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "esmodules": true
          }
        }
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
  app.listen(PORT, () => console.log(`...The magic happens at http://localhost:${PORT}`));
  ```

# Babel 7 for React App
1. Setup
  ```shell
  $ mkdir -p src
  $ npm init -y
  $ npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader file-loader css-loader style-loader webpack webpack-cli html-webpack-plugin webpack-dev-server
  ```


2. Add Babel
  - Add a `.babelrc` file in the root of your site
    ```json
    {
      "presets": ["@babel/preset-env", "@babel/preset-react"]
    }
    ```


3. Add Webpack 
  - Update your package.json
    ````json
    "scripts": {
      "serve": "webpack serve --mode development",
      "build": "webpack --mode production"
    }
    ````
  - Add a `./webpack.config.js` files
    ```js
    const path = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");

    module.exports = {
      // Where files should be sent once they are bundled
      output: {
        path: path.join(__dirname, "/dist"),
        filename: "index.bundle.js",
      },
      // webpack 5 comes with devServer which loads in development mode
      devServer: {
        port: 3000,
        watchContentBase: true,
      },
      // Rules of how webpack will take our files, complie & bundle them for the browser
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /nodeModules/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
      plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
    };

    ```


4. Ready to make your react site!
  ```
  $ npm i react react-dom
  $ touch src/index.html && touch src/index.js
  ```

  - `./src/index.html`
    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Webpack App</title>
    </head>

    <body>
        <div id="app"></div>
        <script src="index.bundle.js"></script>
    </body>

    </html>
    ```

  - `./src/index.js`
    ```js
    import React from "react"
    import ReactDom from "react-dom"
    import App from "./App"
    import "./App.css"

    ReactDom.render(<App />, document.getElementById('app'))
    ```

  - `./src/App.js`
    ```js
    import React from "react";

    export default function App() {
      return (
        <div>
          <h2>Welcome to React App</h2>
          <h3>Date : {new Date().toDateString()}</h3>
        </div>
      );
    }
    ```
  - `./src/App.css`
    ```css
    h2{
      color: teal;
    }
    ```







