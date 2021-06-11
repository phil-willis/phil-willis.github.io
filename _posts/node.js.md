---
title: 'node.js'
excerpt: ''
coverImage: '/assets/covers/nodejs.jpg'
ogImage:
  url: '/assets/covers/nodejs.jpg'
---


# What is Nodejs




# Installation
- There are a few ways to install Nodejs on your machine
- There are 2 main versions to consider `LTS` and `Current`
- `LTS` is for Long Term Support which is the stable version as for the `Current` is the more cutting edge
- Nodejs even versions are stable and odd versions for the lastest versions
- More about release dates and versions [go here](https://nodejs.org/en/about/releases/)

1. Install from the [nodejs](https://nodejs.org/en/) homepage
2. HomeBrew on your mac
3. [NVM](https://github.com/nvm-sh/nvm) (My prefered way cause you can switch node versions easily)



## Installing nodejs via Homepage

## Installing nodejs via HomeBrew

## Install nodejs with nvm
- Install via homebrew
    - [tut](http://dev.topheman.com/install-nvm-with-homebrew-to-use-multiple-versions-of-node-and-iojs-easily/)
    ```shell
    $ brew install nvm
    ```

    ```shell
    # NVM installed via homebrew
    [[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh
    export NVM_DIR="/.nvm"
    source $(brew --prefix nvm)/nvm.sh
    ```
- Install via the [ruby way](https://github.com/nvm-sh/nvm)
    - Add this to your bash/zshrc:
        ```shell
        # NVM
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
        PATH="/usr/local/opt/grep/libexec/gnubin:$PATH"
    ```
- *note :* every time you switch node versions you'll have to install all your globals again as well as you will have to delete your projects `node_modules` because these dependencies are specfic to the exact node version & OS installed

- If your npm global packages point to a different nodejs version run this
    ```shell
    $ npm list -g --depth=0
    $ npm config rm prefix
    ```

- NVM commands
  ```shell
  # Check nodejs version
  $ node -v || node --version

  # List installed versions of node (via nvm)
  $ nvm ls

  # Install specific version of node
  $ nvm install 12.20.1

  # Set default version of node
  $ nvm alias default 12.20.1

  # Switch version of node
  $ nvm use 14.15.4

  # List latest available versions
  $ nvm ls-remote | grep -i 'latest'
  ```



# Node tools 

  ```shell
  # Find out-of-day packages
  $ npx npm-upgrade

  $ npx depcheck
  
  # Find and delete `node_modules` on your machine
  $ npx npkill
  ```
  
# Killing your local server that is going rogue

```shell
# Find:
$ sudo lsof -i :3000

# Kill:
$ kill -9 <PID>
```

  
  
  
# Git hooks
- Automation is always good, especially when it reduces congnitive load and optimization
- We can automate things before we create commits or push changes to a repo
- The `.git` ditectory allows you to do native hooks if you want to or you can use something like husky to do all the heavy lifting for you and you can stay in JS land :)
- Check out the [Husky docs here](https://typicode.github.io/husky/#/)
- Husky works with all [githooks](https://git-scm.com/docs/githooks)
- Intall husky with:
  ```shell
  $ npx husky-init && npm install 
  ```
- This will automatically wireup all the git hooks and add a script `.husky/pre-commit` where you can add whatever command run before a commit
  ```bash
  #!/bin/sh
  . "$(dirname "$0")/_/husky.sh"

  npm run lint
  ```
- It will setup husky, modify `package.json` and create a sample `pre-commit` hook that you can edit. - By default, it will run npm test when you commit.
- To add another hook use husky add.
  ```shell
  $ npx husky add .husky/pre-push 'npm run lint && npm run test:ci'
  ```
- This will create `.husky/pre-push`
  ```bash
  #!/bin/sh
  . "$(dirname "$0")/_/husky.sh"

  npm run lint && npm run test:ci
  ```





  

# Creating a npm package
https://dev.to/joshaguilar/fully-automating-npm-package-releases-3k7ez

- sematic versioning
  <BREAKING>.<FEATURE>.<FIX>
  <MAJOR>.<MINOR>.<PATCH>
## For Every release
1. Run tests (if there are any)
2. Update version in package.json according to Semver
3. Create a git tag according to Semver
  MAJOR.MINOR.PATCH
  `$ git tag -a v#.#.# -m #.#.#`
4. Push the package to Github
5. Push the package to npm
6. Create release notes for every update


# import/export files
- If you have a folder structure of and your `MyComponent` has a `default export`
  ├── MyComponent.stories.jsx
  ├── MyComponent.jsx
  ├── MyComponent.module.css
  └── index.js
- Your `index.js` content
  ```js
  // import MyComponent from './MyComponent'
  // export default MyComponent

  export { default } from './MyComponent'
  ```
- If you have a folder structure of and your `MyComponent` has a `named export` 
  ```js
  // export { default as ComponentOne } from './MyComponent'
  // export { default as ComponentTwo } from './MyComponent'
  // export { default as ComponentThree } from './MyComponent'
  ```



# Expressjs app
- Express is a very light weight and popular nodejs server frameworks
- Express provides a minimal interface to build our REST applications 
- [Expressjs docs](https://expressjs.com/en/4x/api.html)
- Installation
  ```shell
  $ npm init -y
  $ npm install --save express
  $ npm i -D nodemon
  ```
- The minimum amount of code you need to get a `hello-world` server 
  - Create a new file called index.js and type the following in it.
    ```js
    const express = require('express');
    const app = express();

    app.get('/', function(req, res){
      res.send("Hello world!");
    });

    app.listen(3000);
    ```
  - Run the application in watch mode
  ```shell
  $ npx nodemon index.js
  ```
- Great so we got that out of the way, now let's talk about folder structure
  - Unlike most programming languages, Nodejs + Express seems to have so many different conventions with no "right way"
  - You should aim at separating our logic by layers, a project structure will naturally emerge.
  - Whether you are doing tranditional MVC, MVC-ish or components, as long as you are sticking to a structure you should be all good
- Let's talk about the layers in an Express application
  - `HTTP layer` --> `service layer` -->  `database access layer` --> `database`
- There are 2 main categories when it comes to the REST API logic:
  1. HTTP Logic (Routes & Controllers)
  2. Business logic (Services & DataAccess)

Routes
Controller
Services
Data Access


- We want to focus on separation of concerns when designing our applications & we want our applications to modular so that if we need to update a database or framework the rest of the application is still functional and not indepedent.
- You shouldn't pass things downstream that might contain an interdemendancy 

```
Routes -> Routers -> Controllers -> Service -> DataAccess
```


## Routes (http context)
- Create a `./src/routes.js` file.
- The routes should just map all the routes with the responding routers
- Generally one file should do the trick
  ```js
  const markers = require("./markers/controller.js");
  const user = require("./user/controller.js");

  function routes(api) {
    api.use("/markers", markers);
    api.use("/user", user);
  }

  module.exports = routes;
  ```
- As your application grows it's really easy to add more routes
## Routers (http context)
- Since we're gonna be using the `component` based approach we're gonna make folders for each of the categories
- No logic should go in your `routes` or `routers`, They should only chain together all the `controllers` functions
- It's best to have one controller per route
- for example the `./src/user/controller.js`
  ```js
  const express = require("express");
  const router = express.Router();

  router.get("/", function (req, res) {
    res.send("GET route on users.");y
  });
  router.get("/:id", function (req, res) {
    console.log(req.params);
    res.send(`GET ${req.params.id} route on user.`);
  });
  router.post("/", function (req, res) {
    res.send("POST route on user.");
  });
  router.put("/", function (req, res) {
    res.send("PUT route on user.");
  });
  router.delete("/", function (req, res) {
    res.send("DELETE route on user.");
  });

  module.exports = router;
  ```
## Controller (http context)
- The `Controllers` are the "orchestrators", they call the `services` and they don't really contain any logic other than handling the request and calling the `service`
- `Services` do all the work and can be see as containing the "business logic"
- `Controllers` take in the HTTP request forwarded from the route and either returns a response or keeps the chain of calls going
- `Controllers` also handles the `HTTP status code` and the `response`
- You should avoid passing http context to the next layer (service layer), because you don't want the rest of the application to depend on the request object. We want to make it easy to test or swap out frameworks and having instances of `req` object downstream makes it more difficult to test or update frameworks
- This is the end of the `http context`


## Services (Business logic context)
- `Services` should contain the majority of the business logic








- The route methods follow the HTTP verbs (GET, SET, PUT, DELETE, etc)
- You write your endpoints with 
  ```js
  app.<METHOD>(<PATH_STARTING_WITH_SLASH>, <HANDLER_CODE>)
  ```
- You can provide a `catch all`
  ```js
  app.all('/test', function(req, res){
    res.send("HTTP method doesn't have any effect on this route!");
  });
  ```
- **NOTE** the order of the route matter, express will take the first matching `METHOD/PATH` it finds, so you want to add the `app.all()` to the bottom of the routes
- Starting `./src/index.js` file
  ```js
  const express = require("express");

  const app = express();
  app.use(express.json());

  // Catch all route
  app.all("*", function (req, res) {
    res.send("HTTP method doesn't have any effect on this route!");
  });

  // Start server
  app.listen(process.env.PORT || 3003, () => {
    console.log(`The magic happens at localhost:${process.env.PORT || 3003}`);
  });
  ```

- Adding a Router
  - Defining routes above can get tedious, so `Express` allows for a Router
  - Create a  `./users/routes.js` 
    ```js
    const express = require("express");
    const router = express.Router();

    router.get("/", function (req, res) {
      res.send("GET route on users.");
    });
    router.get("/:id", function (req, res) {
      res.send(`GET ${req.params.id} route on users.`);
    });
    router.post("/", function (req, res) {
      res.send("POST route on users.");
    });
    router.put("/", function (req, res) {
      res.send("PUT route on users.");
    });
    router.delete("/", function (req, res) {
      res.send("DELETE route on users.");
    });

    //export this router to use in our index.js
    module.exports = router;
  ```
  - You can pass in route parameters with the `:<SOME_PARAMS_NAME>` and you can access that route params with the `req.params.<SOME_PARAMS_NAME>`
  - You can add as many route params as you like
    ```js
    app.get('/users/:name/:id', function(req, res) {
      res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
    });
    ```
  - Pattern Matched Routes
    ```js
    app.get('/things/:id([0-9]{5})', function(req, res){
      res.send('id: ' + req.params.id);
    });
    ```
  - Now your `./src/index.js` file might look a little more like this:
    ```js
    const express = require("express");

    const users = require("./users/routes.js");

    const app = express();
    app.use(express.json());

    // Define the `/api/*` routes
    const api = new express.Router();
    app.use("/api/", api);

    // Routes
    api.use("/users", users);

    // Catch all route
    app.all("*", function (req, res) {
      res.send("HTTP method doesn't have any effect on this route!");
    });

    // Start server
    app.listen(process.env.PORT || 3003, () => {
      console.log(`The magic happens at localhost:${process.env.PORT || 3003}`);
    });
    ```
  - You can now hit your REST API with
    ```shell
    $ nodemon src/index.js

    # In a new terminal
    $ curl -X GET "http://localhost:3003/api/users"
    $ curl -X POST "http://localhost:3003/api/users"
    $ curl -X PUT "http://localhost:3003/api/users"
    $ curl -X DELETE "http://localhost:3003/api/users"
    ```
- Middleware
  - Middleware allows you to preform something before the route `req` for a specific route or on all routes
  - They look very similar to a `req/res` except they have `req/res/next` the `next` is very important because it tells Express that you are done with the middleware functionality and then go on to the next thing in the list (can be another middleware or a route)
  - It's important to note that middleware gets added to the routes
  - Create a `./src/middleware/time-loger.js`
    ```js
    //Simple request time logger
    function timeLogger(req, res, next) {
      console.log("A new request received at " + Date.now());
      next(); // This `next()` allows  the applications to go on to the the next middleware/route
    }
    module.exports = timeLogger;
    ```
  - Now in the `./src/index.js` could look more like 
    ```js
    const express = require("express");

    const timeLogger = require("./middleware/time-logger");
    const users = require("./users/routes.js");

    const app = express();
    app.use(express.json());

    // Define the `/api/*` routes
    const api = new express.Router();
    app.use("/api/", api);


    // =========APPLY TO ALL `/api/*` routes =======
    api.use(timeLogger);
    // =========APPLY TO ALL `/api/*` routes =======


    // =========APPLY ONLY TO `/api/users` route =======
    // NOTICE WE ADDED `timeLoger` before the `users`
    api.use("/users", timeLogger, users); /
    // =========APPLY ONLY TO `/api/users` route =======



    // Catch all route
    app.all("*", function (req, res) {
      res.send("HTTP method doesn't have any effect on this route!");
    });

    // Start server
    app.listen(process.env.PORT || 3003, () => {
      console.log(`The magic happens at localhost:${process.env.PORT || 3003}`);
    });
    ```
  - Add an error middleware, create a file `./src/middleware/error-handler.js`
    ```js
    const errorBadJson = (err, req, res, next) => {
      if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        console.error(err);
        return res.status(400).send({ status: 404, message: err.message }); // Bad request
      }
      next();
    };

    module.exports = {
      errorBadJson,
    };
    ```
  - Now in the `./src/index.js` could look more like 
    ```js
    const express = require("express");
    const { errorBadJson } = require("./middleware/error-handler");

    // Middleware
    const { errorBadJson } = require("./middleware/error-handler");
    const users = require("./users/routes.js");

    const app = express();
    app.use(express.json());
    app.use(errorBadJson);

    // Add error handling to all routes
    app.use(timeLogger); 

    // Define the `/api/*` routes
    const api = new express.Router();
    app.use("/api/", api);

    // Catch all route
    app.all("*", function (req, res) {
      res.send("HTTP method doesn't have any effect on this route!");
    });

    // Start server
    app.listen(process.env.PORT || 3003, () => {
      console.log(`The magic happens at localhost:${process.env.PORT || 3003}`);
    });
    ```


# Securing your Nodejs Application
1. Use HTTPS
  - [LetsEncrypt](https://letsencrypt.org/getting-started/) is free and allows you to generate the SSL certificates for all of your domain/subdomain.

2. Data Validation
  - **Never trust the client**, you should **always** validate or sanitize the data coming in
  - Great packages are `joi` & `validator`
    ```js
    const Joi = require("joi");
    // Define the object
    const validateUser = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      repeat_password: Joi.ref("password"),
    });

    // Validate the object
    const value = await validateRegister.validateAsync({
      name:"someone", 
      email:"some@one.com", 
      password:"123456789", 
      repeat_password:"123456789", 
    });
    ```
    
    ```js
    const validator = require('validator');
    validator.isEmail("some@one.com"); 
    ```

3. SQL Injection
  - This kinda ties into the first item, don't trust the data coming in, except here you neve want to use the values coming in without being sanilized/validate as well as never concatenate a string for a SQL query
  - The below example someone could pass in `Ron", lastname="Burgundy"; --` and add something into your DB
    ```sql
    -- THIS IS BAD
    UPDATE users SET firstname="' + req.body.firstname +  '" WHERE id='00001';

    -- Malicious
    UPDATE users SET firstname="Ron", lastname="Burgundy"; --" WHERE id=00001;
    ```
  - You can prevent SQL injection by first validating/sanitizing the data coming in, and use escaping methods provided my npm modules
    ```js
    query("INSERT INTO users(name, email, password) VALUES ($1, $2, $3)", [name, email, password])
    ```
  - You can also used an ORM

4. Password hashing
  - You should **NEVER** store passwords in plain text in a database
  - Use a one-way hashing algorithm
  - The output from the hashing function cannot be decrypted hence it's "one-way" in nature.
  - Hackers could create a `lookup table` where they hash a huge amount of possible values and try to find one that matches
  - You can prevent these kind of attacks by adding `salt` which is attached to the password hash to make it unique irrespective of the input.
  - Salt has to be generated securely and randomly so that it is not predictable. 
  - BCrypt is a great solution for this
    ```js
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const myPlaintextPassword = 's0/\/\P4$$w0rD';
    const someOtherPlaintextPassword = 'not_bacon';


    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

    // Load hash from your password DB.
    bcrypt.compareSync(myPlaintextPassword, hash); // true
    bcrypt.compareSync(someOtherPlaintextPassword, hash); // false
    ```
  - If you are using bcrypt then you can use varchar(60) field because bcrypt will generate fixed size 60 character hashes.

5. HTTP Security Headers
  -  If you are using the Express framework then you can use a module called helmet to enable all security headers with a single line of code.
    ```js
    const express = require("express"); 
    const helmet = require("helmet");  
    const app = express(); 
    app.use(helmet());  
    ```
  - This enables the following HTTP headers:
    - Strict-Transport-Security
    - X-frame-Options
    - X-XSS-Protection
    - X-Content-Type-Protection
    - Content-Security-Policy
    - Cache-Control
    - Expect-CT
    - Disable X-Powered-By

6. Prevent Bruteforce Attack 
  - Bruteforce is when a hacker uses software to try different passwords repetitively until they find credentials that match
  - To prevent a Bruteforce attack, one of the simplest ways is to wait it out approach. 
  - When someone is trying to login into your system and tried an invalid password more than 3 times, make them wait for 60 seconds or so before trying again. 
  - Another approach to preventing it is to ban the IP that is generating invalid login requests. Your system allows 3 wrong attempts per IP in 24 hours. 
  - If you are using `express` you can use `express-brute` middleware
    ```js
    const ExpressBrute = require('express-brute');
    
    const store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
    const bruteforce = new ExpressBrute(store);
    
    app.post('/auth',
        bruteforce.prevent, // error 429 if we hit this route too often
        function (req, res, next) {
            res.send('Success!');
        }
    );
    ```

7. Implement User Roles
  - You should create proper roles and permissions to prevent users from doing things they shouldn't
  - `acl2` is a great npm packages, NODE ACL - Access Control Lists for Node
    ```js
    const ACL = require("acl2");
    const acl = new ACL(new ACL.memoryBackend());
    // guest is allowed to view blogs
    acl.allow("guest", "blogs", "view");
    // check if the permission is granted
    acl.isAllowed("Ron", "blogs", "view", (err, res) => {
      if (err) console.log(err);
      console.log("User Ron is allowed to view blogs");
    });
    ```

# Logging
- Logs can help us to figure out what happen and when
- You can write the logging project yourself but the logging problem has already been solved
- 4 great modules to deal with logging are:
  - Morgan (HTTP logging middleware)
  - Bunyan
  - Winston (Log anything)
  - Node-Loggly
- Example with `Morgan`
  ```js
  const express = require("express");
  const fs = require("fs");
  const morgan = require("morgan");
  const path = require("path");

  const app = express();

  // create a write stream (in append mode)
  const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
    flags: "a"
  });

  // setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));

  app.get("/", function(req, res) {
    res.send("hello, world!");
  });

  app.listen(2000);
  ```
- Winston
  - Logging to the console
    ```js
    const winston = require("winston");

    // Configure the logger
    const logConfig = {
      transports: [
        new winston.transports.Console()
      ],
    };

    // Create the logger
    const logger = winston.createLogger(logConfig);

    // Log an event
    logger.log({
      message: "Hello Winston!",
      level: "info",
    });

    // Log another event
    logger.info("Hello Winston! This is an info");
    ```
  - Logging to a multiple files
    ```js
    const winston = require("winston");

    // Configure the logger
    const logConfig = {
      transports: [
        // prints to the terminal
        new winston.transports.Console({
          level: "verbose",
        }),
        // writes to errors.js (errors)
        new winston.transports.File({
          level: "error",
          filename: "./logs/errors.log",
        }),
        // writes to warn.js (errors|warns)
        new winston.transports.File({
          level: "warn",
          filename: "./logs/warn.log",
        }),
        // writes to debug.js (debug|verbose|info|warns|error)
        new winston.transports.File({
          level: "debug",
          filename: "./logs/debug.log",
        }),
      ],
    };

    // Create the logger
    const logger = winston.createLogger(logConfig);

    logger.debug("..debug");
    logger.verbose("..verbose");
    logger.info("..info");
    logger.warn("..warn");
    logger.error("..error");
    ```
  - If you are using express you can add the logger to the req.logger via a middleware
    ```js
    // File: ./middleware/logger.js
    const fs = require("fs");
    const path = require("path");
    const winston = require("winston");

    // Create the log directory if it doesn't exist
    const logDir = path.join(__dirname, "../../logs");
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

    const filePaths = {
      errors: path.join(__dirname, "../../logs/errors.log"),
      debug: path.join(__dirname, "../../logs/debug.log"),
    };

    const logConfig = {
      transports: [
        // writes to errors.js (errors)
        new winston.transports.File({
          level: "error",
          filename: filePaths.errors,
        }),
        // writes to debug.js (debug|verbose|info|warns|error)
        new winston.transports.File({
          level: "debug",
          filename: filePaths.debug,
          format: winston.format.combine(
            winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
            winston.format.simple(),
            winston.format.printf(
              ({ level, timestamp, message }) =>
                `{ "level":"${level}", "timestamp":"${[timestamp]}", "message":${JSON.stringify(message)} },`
            )
          ),
        }),
      ],
    };

    // req.logger.debug("..debug");
    // req.logger.verbose("..verbose");
    // req.logger.info("..info");
    // req.logger.warn("..warn");
    // req.logger.error("..error");
    module.exports = function (req, res, next) {
      // Create the logger
      const logger = winston.createLogger(logConfig);

      // For development
      if (process.env.NODE_ENV !== "production") {
        logger.add(
          // prints to the terminal
          new winston.transports.Console({
            level: "verbose",
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
              winston.format.simple(),
              winston.format.printf(
                ({ level, timestamp, message }) => `${level}: ${[timestamp]}: ${JSON.stringify(message)}:`
              )
            ),
          })
        );
      }

      req.logger = logger;
      next();
    };

    ```

    ```js
    // file: index.js
    const express = require("express");
    const fs = require("fs");
    const path = require("path");

    const logger = require("./middleware/logger.js)
    const app = express();

    // 
    // setup the logger
    app.use(logger);

    app.get("/", function(req, res) {
      req.logger.info("hello world was hit!")
      res.send("hello, world!");
    });

    app.listen(2000);
    ```





- What should you log??
  - There is no general standard, however some common logging levels used in JS
    - `error` & `warn`
    - `info` & `log`
    - `verbose` & `debug`







# JWT (JSON Web Tokens)
https://auth0.com/docs/tokens/json-web-tokens/json-web-token-claims#reserved-claims



6. Create release notes for every update



# JS Doc
- There are alot of ways to document your code; README, tutorials, documentation file, etc
- The problem with the one above is they get out of date quickly, it's best to put your documentaion as close to the code so that you can update it as you up update the functionality.
- JSDoc is perfect for this kinda documentation layer, plus if you are using vscode it will give you intellesence!

1. Start with a code block
  ```js
  /**
   * Takes in to numbers and will add them
   */
  function addItems(item1, item2) {
    return item1 + item2
  }
  export default addItems
  ```
2. Add a description of what it does 
  - The function name should give it away but it gives you a chance to descript it with words)
    ```js
    /**
     * Takes in to numbers and will add them
     */
    function addItems(item1, item2) {
      return item1 + item2
    }
    export default addItems
    ```
  - ![jsdoc-description-only](plublic/assets/blog/jsdoc-description-only.jpg)

2. Now describe the params and the return
  - Here is what the format looks like
    ```js
    /**
    *
    * @param {param type} param name - description
    *
    */
    ```
  - Now let's add those
    ```js
    /**
     * Takes in to numbers and will add them
     *
     * @param {number} item1 - First number
     * @param {number} item2 - Second number
     * @returns {number} Sum of the 2 numbers
     */
    function addItems(item1, item2) {
      return item1 + item2
    }
    export default addItems
    ```
  - ![jsdoc-complete](plublic/assets/blog/jsdoc-complete.jpg)

3. Use the function
  - As you start to type in the parameter it will tell you the data type
  - ![jsdoc-using](plublic/assets/blog/jsdoc-using.jpg)

- Example of JSDoc
  ```js
  /**
   * Raises a number to exponent
   * @param {number} value - The base to raise
   * @param {number} exponent - The exponent
   * @return {number} - The exponent power
   */

   /**
   * A silly logger function
   * @param {string} message
   * @return {void} Nothing
   */


   /**
   * Generates a table head
   * @author Valentino Gagliardi <valentinoDOTvalentinog.com>
   * @param {HTMLTableElement} table - The target HTML table
   * @param {Array} data - The array of cell header names
   */
  ```
- Generate docs
  - You can use the `jsdoc` to generate documentation for all your functions
  - *Note* if you use `export default function yourFunctionName()` it won't create it you have to define it with just `function yourFunctionName()` then export it on another line `export default yourFunctionName`
  - Add the `jsdoc` package to your repo
    ```shell
    $ mkdir docs
    $ npm i -D jsdoc
    ```
  - update your `package.json` file
    ```js
     "scripts": {
      "make:docs":"jsdoc -d documentation src/*.js "
    },
    ```
  - now run the doc generator
    ```shell
    $ npm run make:docs
    $ cd documentation
    $ npx live-server
    ```



