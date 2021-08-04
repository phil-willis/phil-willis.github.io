---
title: 'JavaScript'
excerpt: ''
coverImage: '/assets/covers/js.jpg'
ogImage:
  url: '/assets/covers/js.jpg'
---


# Overview of JavaScript
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
  - Browserside
    - can't acces local file system
    - Runs in a sandbox
  - Serverside
    - Extracted the Chrome's V8 (JS Engine)
    - You can run it on any machine
    - Called Node.js
    - You can run on the server
    - You can run on any computer (Mac/Linux/Windows)
    - Can't manipulate the DOM 



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
- Each browser comes with its own JS engine that also defines wich features are actually supported
- [caniuse](https://caniuse.com/) is a great resource to see if a feature is supported or not
- ECMA-Script is in active development


# Topics
- var, let, Const
- Prototype
- Arrow Functions
- Primitive vs Reference types
- Array & Array methods
- Object & Object Method
- Aync & Promises
- Destructuring
- Template literals
- How the web works
- npm scripts & package.json
- husky & nvm versions
- sessions, cookies, & jwt
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
- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)


- How does React's Virtual DOM work
- How does Redux work
- When to use a stateful or stateless component in react
- When to use React's internal state versus Redux
- Variable hoisting
- What are promises (3 states of a promise fullified/rejected/pending)
- async/await
- HTTP methods
- Http status code
- CORS
- JSONP
- HTTP caching
  - Web caches reduce latency and network traffic and thus lessen the time needed to display a representation of a resource
  - It is important to cache a resource only until it changes, not longer.
  - There are different types of caching: browser, proxy, gateway caches, CDN, reverse proxy caches
  - Private caches are dedicated to a single user while publish caches are meant to be shared
  - You can controll the caching with `cache-control` headers and max-age
  - ETAG (It lets caches be more efficient and save bandwidth, as a web server does not need to resend a full response if the content has not changed.)
- debounch 
- closure (What is the difference between lexical scoping and closures)
- web sockets
- Server Sent Events
- What is the benefits of using async/await to promises (cleaner, try/catch blocks catch exception, callback is cleaner, debugging)
- testing frameworks
- recursive functions
  - A function that calls itself.
    ```js
    function recurse() {
        if(condition) {
            // stop calling itself
            //...
        } else {
            recurse();
        }
    }
    ```


- folder structure for server/client/package



==============================




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
    * @property {string} name The members's name.
    * @property {number=} age The members's age (this is optional).
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














# JS Neat stuff


## Loop over a number of times 
- Sometimes you need to loop over an array a number of time to make some data
  ```js
  const opt = [...Array(4)].map((_, num) => ({ value: num, label: num }))
  console.log(JSON.stringify(opt)) // [{"value":0,"label":0},{"value":1,"label":1},{"value":2,"label":2},{"value":3,"label":3}]
  ```

## Shorthand of if
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
  
  
  ## Recursive function
  - 
  
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
  
  
