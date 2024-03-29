---
title: 'node.js'
excerpt: ''
coverImage: '/assets/covers/nodejs.jpg'
ogImage:
  url: '/assets/covers/nodejs.jpg'
---

# What is Nodejs
- Node.js is an open-source and cross-platform JavaScript runtime environment. 
- Node.js runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser. This allows Node.js to be very performant.
- Both the browser and Node.js use JavaScript as their programming language.
- Node.js you don't have the `document`, `window` and all the other objects that are provided by the browser.
- The Browser we don't have all the nice APIs that allow for filesystem access functionality
- An additional feature that Nodejs provides is control over teh environment

## Common npm commands
  ```shell
  $ npm init
  $ npm init -y
  $ npm install <PACKAGE_NAME> |  npm i <PACKAGE_NAME>

  $ npm view <PACKAGE_NAME>
  $ npm view <PACKAGE_NAME> versions

  $ npm install -g <SOME_GLOBAL_PACKAGE>
  $ npm uninstall <PACKAGE_NAME> | npm un <PACKAGE_NAME>

  $ npm update <PACKAGE_NAME> | npm up <PACKAGE_NAME>
  $ npm update
  $ npm audit

  $ npm version
  $ npm publish

  
  # Run a npm script
  $ npm run <NPM_SCRIPT_NAME>
  
  # list globally installed packages
  $ npm list -g --depth=0
  
  # Update npm
  $ npm install -g npm@latest
  
  # list installed packages and versions
  $ npm list | npm ls
  
  # Install clean slate of the packages
  $ npm ci
  
  # Symlink a package folder, to used it locally without publishing it 
  $ npm link

  # Updates all dependencies in project.
  npm update
  ```


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
- Install the latest binaries [here](https://nodejs.org/en/download/)

## Installing nodejs via HomeBrew
  ```shell
  $ brew update
  $ brew upgrade node
  ```
  
## Install nodejs with nvm
- Install via homebrew
    - [tut](http://dev.topheman.com/install-nvm-with-homebrew-to-use-multiple-versions-of-node-and-iojs-easily/)
    ```shell
    $ brew update
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
- Upgrade `NVM` 
  ```shell
  $ nvm install stable --reinstall-packages-from=current
  ```
    
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



## Using Docker to local development
- Initialize a nodejs 
  ```shell
  $ npm init -y
  $ npm i express
  $ npm i -D nodemon
  $ mkdir src
  ```
- Update the `package.json`
  ```json
  {
    "name": "docker",
    "version": "1.0.0",
    "description": "Example of working with Docker and Expressjs",
    "main": "index.js",
    "scripts": {
      "start": "node ./src",
      "dev": "nodemon ./src"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "express": "^4.17.1"
    },
    "devDependencies": {
      "nodemon": "^2.0.7"
    },
    "engines": {
      "node": ">= 14.0.0",
      "npm": ">= 7.0.0"
    }
  }
  ```

- Create the `src/index.js` file
  ```js
  const express = require('express');

  // Constants
  const PORT = process.env.PORT || 8080;
  const HOST = process.env.HOST || '0.0.0.0';

  // App
  const app = express();
  app.get('/', (req, res) => {
    res.send('Hello World!!!');
  });

  app.listen(PORT, HOST);
  console.log(`The magic is running on http://${HOST}:${PORT}`);
  ```
- Create a `.gitignore`
  ```html
  node_modules
  ```

- Create a `Dockerfile`
  ```docker
  FROM node:14
  WORKDIR /usr/src/app
  COPY package*.json ./
  RUN npm install

  COPY . .

  EXPOSE 8080

  CMD [ "npm", "start" ]
  ```
- Create a `.dockerignore`
  ```html
  node_modules
  npm-debug.log
  ```
- Create a docker image for your application to develop with
  ```shell
  $ docker build . -t <DOCKER_USERNAME>/node-web-app
  $ docker run -it -p 8080:8080 -v $(pwd):/usr/src/app --name my_awesome_app -d <DOCKER_USERNAME>/node-web-app  sh -c 'npm run dev' 
  ```
- The above allows you to develop inside the docker container via a volume
- When you are ready to publish you can create an image with a version 
  ```shell
  $ docker build . -t <DOCKER_USERNAME>/node-web-app:v0.1
  $ docker run -p 8080:8080 --name my_awesome_app_prod -d <DOCKER_USERNAME>/node-web-app:v0.1
  ```
- Add TypeScript
  - Install typescript
    ```shell
    $ npm install -D typescript ts-node @types/node @types/express
    ```
  - Update your `package.json` file
  ```json
  {
    "scripts": {
      "start": "node ./dist/src",
      "dev": "nodemon ./src/index.ts",
      "build": "tsc"
    }
  }
  ```
  - Create a `tsconfig.json` file
    ```json
    {
      "compilerOptions": {
        "module": "commonjs",
        "target": "es6",
        "rootDir": "./",
        "outDir": "dist",
        "esModuleInterop": true
      }
    }
    ```
  - Rename `src/index.js` to `src/index.ts`
  - Now you can use `import` instead of commonjs `require(<package_name>)`
    ```ts
    import express, { Request, Response, NextFunction } from 'express';

    // Constants
    const PORT = process.env.PORT || 3000;

    // Types
    type RootMessage = {
      message: string
    }

    // App
    const app = express();
    app.get('/', (req:Request, res: Response) => {
      const message: RootMessage = {message:'Hello World!!'}
      res.status(200).send(message);
    });

    app.listen(PORT);
    console.log(`The magic is running on PORT:${PORT}`);
    ```







# Node package managers (npm & yarn)
- When you install `Node.js` `npm` (Node Package Manager) gets installed along with it
- NPM does 2 things:
  - It serves as an online platform registry where anyone can create/update/publish node packages
  - It's a command-line tool, where you can download packages from the npm registry
- Updating **npm**
  ```shell
  $ npm i -g npm
  ```
- Yarn (Yet Another Resource Negotiator) is a JavaScript package manager created by Facebook. It provides similar functionalities as NPM. It is an alternative to NPM when installing, uninstalling, and managing package dependencies from the NPM registry or GitHub repositories.
- *It is recommended to install Yarn through the npm package manager, which comes bundled with Node.js when you install it on your system.*
- Updating **yarn**
  ```shell
  $ npm i -g yarn
  ```
- Reasons for using yarn:
  - Enhanced security
  - Better stability
  - Faster
  - Has offline mode, can install packages from local cache
  - Resolved issues around `versioning` using `lock` files
  - Reuses NPM json files and doesn't change its structure
  - Imposes string guarantees around package installations
  - Active user community
- Not all roses
  - new package manager, sometimes more skepticism
  - Smaller community than NPM
  - Problems installing "Native Modules"
  - Doesn't work with Nodejs version < 5

![similar-npm-vs-yarn-commands](https://user-images.githubusercontent.com/79557260/138965939-58b9a4d5-2e38-4210-a471-b7f3d8d3ff5c.jpg)

- Yarn "berry"
  - Yarn berry is the codename for the latest major version of the Yarn package manager, which introduced significant changes to its internal architecture and user-facing features. Here's a brief overview of how to use Yarn berry:

  - Installation: You can install Yarn berry by running `$ npm install -g yarn@berry` or `$ yarn set version berry`. This will install the latest version of Yarn berry globally on your system.

  - Project initialization: To create a new project using Yarn berry, you can run yarn init. This will create a new package.json file in your current directory and initialize a Yarn berry project.

  - Package management: Yarn berry works much like the previous version of Yarn in terms of package management. You can use the yarn add command to add a new package to your project, and Yarn berry will automatically manage the dependencies and generate a new yarn.lock file.

  - Plugin management: Yarn berry introduces a new plugin system, which allows you to extend Yarn's functionality with custom plugins. You can install a new plugin by running yarn plugin import <plugin-name>. Some popular plugins include @yarnpkg/plugin-typescript, which adds TypeScript support to Yarn, and @yarnpkg/plugin-pnp, which enables Yarn's Plug'n'Play feature.

  - Workspace support: Yarn berry introduces a new feature called workspaces, which allows you to manage multiple packages in a single repository. To enable workspace support, you can add a workspaces field to your package.json file and list the directories containing your packages. You can then use the yarn workspace command to run commands on a specific package or on all packages in your workspace.










# The `package.json` file
- The package.json file is a manifest for your project.
- It also defines alot of other things like, list all the dependencies you application needs & versions
- The easiest way to create one is `$ npm init -y`
- The file structure might have these properties inside
  - `version` indicates the current version
  - `name` sets the application/package name
  - `description` is a brief description of the app/package
  - `main` set the entry point for the application
  - `private` if set to true prevents the app/package to be accidentally published on npm
  - `scripts` defines a set of node scripts you can run
  - `dependencies` sets a list of npm packages installed as dependencies
  - `devDependencies` sets a list of npm packages installed as development dependencies
  - `engines` sets which versions of Node.js this package/app works on
  - `browserslist` is used to tell which browsers (and their versions) you want to support
- npm scripts, you can add whatever kinda of script in the `"scripts"` object.
- Each script name has a `pre` & `post` hook that runs before or after that script. For example if you have a npm script that is called `build`, you can also have a `prebuild` and a `postbuild` script that you can define and when you run `$ npm run build | $ yarn build` it will preform: `prebuild`, then `build`, then `postbuild`
-  In package.json you can set which versions you want to upgrade to (patch or minor), using the semver notation, for example:
  ```html
  exact package version               1.13.0 => 1.13.0
  update patch and minor releases     ~1.13.0 => 1.13.*
  exact version                       ^1.13.0 => 1.*.*
  ```
- Don't commit your `node_modules` files because the `package.json` is used to fetch and manage the packaged used for the nodejs project

## The `package-lock.json` or `yarn.lock` file 
- In `version 5`, npm introduced the` package-lock.json` file.
- The goal of package-lock.json file is to keep track of the exact version of every package that is installed so that a product is 100% reproducible in the same way even if packages are updated by their maintainers.
- The package-lock.json sets your currently installed version of each package in stone, and npm will use those exact versions when running npm install.
- The `package-lock.json` file needs to be committed to your Git repository, so it can be fetched by other people, if the project is public or you have collaborators, or if you use Git as a source for deployments.
- The `yarn.lock` is the main source of information about the current versions of dependencies in a project if you are using yarn in your project instead of `npm`. 


# Version Ranges
- In you `package.json` file you might see a range of version symbols: `~`, `^`, `>`, `<`, `||`, `file:./something`



## Controlling Nodejs version and npm or yarn version
- You can force which version of Nodejs & npm/yarn version in the `package.json` file however you need to also use a `.npmrc` file with `engine-strict = true` set
1. Create/update the `.npmrc` file
  ```text
  engine-strict = true
  ```
2. Update your package.json to have the node & npm/yarn versions
  - Force to use npm
    ```json
    {
      "engines": {
        "node": "v14.19.1",
        "npm": "8.5.5",
        "yarn": "please-use-npm"
      }
    }
    ```
  - Force yarn
    ```json
    {
      "engines": {
        "node": "v14.18.1",
        "npm": "please-use-yarn",
        "yarn": ">=1.22 <=2"
      }
    }
    ```
3. (optional) you can also add a `.nvmrc` file to allow you to switch to the right Nodejs version
  - If you don't have nvm installed go [here](https://github.com/nvm-sh/nvm) to install it.
  - Create the `.nvmrc` file
    ```text
    v16
    ```
  - Now you can switch to that Nodejs version with
    ```shell
    $ nvm use
    ```
4. (optional) If you are using vscode you can add an extension
  - If you want to automatically switch the version of node when you open up a terminal inside vscode there's an extension for that...
  - Got to your extensions in vscode and add `vsc-nvm`
  - id => `henrynguyen5-vsc.vsc-nvm`



## Sematic versioning
- Node.js packages follow the [Sematic Versioning](https://semver.org/) pattern
  ```shell
  <BREAKING>.<FEATURE>.<FIX>
  <MAJOR>.<MINOR>.<PATCH>
  ```





## For Every release
1. Run tests (if there are any)
2. Update version in package.json according to Semver
3. Create a git tag according to Semver
  MAJOR.MINOR.PATCH
  `$ git tag -a v#.#.# -m #.#.#`
4. Push the package to Github
5. Push the package to npm
6. Create release notes for every update

## **Conventional commits**
<!-- https://dev.to/joshaguilar/fully-automating-npm-package-releases-3k7e -->
- A specification for adding human and machine readable meaning to commit messages.
- It provides a set of rules for creating a commit history that can be easily used by automated tools such as a CI/CD pipeline.
  ```text
  <type>(optional scope): <description>
  [optional body]
  [optional footer(s)]
  ```
- There are multiple tools available to enforcing **convential commits**, like [husky](), [commitlint](https://github.com/conventional-changelog/commitlint)

## Automating with semantic-release
- `semantic-release` automates the whole package release workflow including: 
  - Determining the next version number
  - Generating the release notes
  - Publishing the package


1. Convential commits
2. Add rules to enforce convential commits (husky or commitlint)
3. Automate with sematic-release

- branch names:
  **feat**: A new feature
  **fix**: A bug fix
  **docs**: Documentation only changes
  **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  **refactor**: A code change that neither fixes a bug nor adds a feature
  **perf**: A code change that improves performance
  **test**: Adding missing or correcting existing tests
  **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation



## "resolutions" key
- `resolutions` is simply a map of package names and the exact versions of those packages that should be kept in the dependency tree, i.e. the below configuration will remove all versions of webpack that are not 5.6.0. As long you install webpack@5.6.0 version as a dependency of the project you are working with, this will guarantee that all packages load the same version of webpack.
  ```json
  {
    "dependencies": {
      "webpack": "5.6.0"
    },
    "resolutions": {
      "webpack": "5.6.0"
    }
  }
  ```





<details>
<summary>Publishing a JS library</summary>

- CommonJS (cjs) (a.k.a the require('xxx') and module.exports syntax) used to be the standard in which client-side libraries have be build. 
- ECMAScript modules then shows up on the scenes where the community starts to migrate slowly to native ESM gradually. ESM as better named exports, better static analysis, tree-shaking, browser native support, the future of JavaScript

  ```js
  // CJS
  const someLib = require('./some-lib.js')
  someLib.doSomething()
  ```

  ```js
  // ESM
  import { doSomething } from './some-lib.mjs'
  doSomething()
  ```

- **Compatibility**, you can’t use ESM packages in CJS. You cannot use the `require` syntax in an ESM file:
  ```js
  // ESM file
  const someLib = require('./some-lib.js') // CANNOT DO THIS
  ```
- Though you can just ship pure ESM packages, you may not want to do so right now because the majority of the ecosystem are still on CJS and the migration is not easy. Therefore, ship BOTH!
</details>















# Monorepo - yarn
 - [Yarn Workspaces](https://www.smashingmagazine.com/2019/07/yarn-workspaces-organize-project-codebase-pro/#react-project-add-workspace-list )

1. Create some files
- Create some stuff
  ```shell
  $ yarn init -y
  $ mkdir packages
  $ yarn create vite packages/client
  $ mkdir server
  $ touch server/package.json
  ```
2. Add some package.json files
  - `./package.json`
    ```json
    {
      "private": true,
      "name": "example-monorepo",
      "workspaces": ["packages/*"],
      "scripts": {}
    }
    ```

  - `./packages/server/package.json`
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
        "express": "^4.18.1",
        "ts-node": "^10.8.1",
        "ts-node-dev": "^2.0.0",
        "typescript": "^4.7.4"
      },
      "devDependencies": {
        "@types/express": "^4.17.13",
        "eslint": "^8.18.0",
        "eslint-config-prettier": "^8.5.0",
        "eslint-plugin-prettier": "^4.0.0",
        "prettier": "^2.7.1"
      }
    }
    ```
3. Add npm scripts to the root package.json to run the nested packages

- `./package.json`
  ```json
  {
    "private": true,
    "name": "example-monorepo",
    "workspaces": ["packages/*"],
    "scripts": {
      "start:client": "yarn workspace client dev",
      "start:server": "yarn workspace server dev"
    }
  }
  ```
- Now install the `concurrently` at the root level
  ```shell
  $ yarn add -W concurrently
  ```

- `./package.json`
  ```json
  {
    "private": true,
    "name": "example-monorepo",
    "workspaces": ["packages/*"],
    "scripts": {
      "start:client": "yarn workspace client dev",
      "start:server": "yarn workspace server dev",
      "start": "concurrently --kill-others-on-fail 'yarn start:server' 'yarn start:client' "
    }
  }
  ```


# Monorepo with Nx
```shell
# $ npx create-nx-workspace@latest <PROJECT_NAME> --preset=npm
$ npx create-nx-workspace@latest package-base --preset=npm
```


















# Short overview of CJS, AMD, UMD, and ESM in Javascript
- In the beginging JavaScript didn't have a way to import/export modules you had to write all of our JS in a single file or load multiple files with `<script />` tag in the browser.
- People started to add modularity to JS with CJS, AMD, UMD, and ESM
- Wanna use ESM modules for your nodejs project?
  - Update your `package.json` file and add the field `"type": "module"` & start using `import`
## CJS 
- CJS stands for CommonJS
- Nodejs uses this module format
- Importing of the modules is done synchronously
- When CJS imports, it will give you a copy of the imported object.
- CJS will *not* work in the browser. It will have to be transpiled and bundled.
  ```js
  //importing 
  const doSomething = require('./doSomething.js'); 

  //exporting
  module.exports = function doSomething(n) {
    // do something
  }
  ```
## ESM
- ESM stands for ES Modules
- ESM enables named exports, better static analysis, tree-shaking, browsers native support, and most importantly, as a standard, it’s basically the future of JavaScript.
  ```js
  export default function() {
    // your Function
  }; // default export
  export const function1() {...}; // named export
  export const function2() {...}; // named export
  ```
  ```js
  import {function1, function2} from './doSomething';
  ```

## AMD
- AMD stands for Asynchronous Module Definition
- This module API supported by RequireJS.
  ```js
  define(['doSomething', 'dep1', 'dep2'], function (doSomething, dep1, dep2) {
      // Define the module value by returning a value.
      return function () {};
  });
  ```

## UMD
- UMD stands for Universal Module Definition
  ```js
  (function (root, factory) {
      if (typeof define === "function" && define.amd) {
          define(["jquery", "underscore"], factory);
      } else if (typeof exports === "object") {
          module.exports = factory(require("jquery"), require("underscore"));
      } else {
          root.Requester = factory(root.$, root._);
      }
  }(this, function ($, _) {
      // this is where I defined my module implementation
      var Requester = { // ... };
      return Requester;
  }));
  ```


    
# CJS & ESM
<!-- https://antfu.me/posts/publish-esm-and-cjs -->
- In May, 2020, Node.js `v12.17.0` made ESM support available to all Node.js applications (**without experimental flags**).
- Common.js can't run in the browser directly it needs a bundler, ES Modules can run in newer browsers and the bundler is optional
- You are most likely using ESM when working with web development
    
- Commonjs is becomming the old way we work with JavaScript
  ```js
  const funcOne = ()=> console.log("commonjs func one")
  module.exports = funcOne
  ```
- Commonjs exporting multiple functions in one file
  ```js
  const funcOne = ()=> console.log("commonjs func 1") 
  const funcTown = ()=> console.log("commonjs funcky town!")
  module.exports = { funcOne, funcTown }
  ```
- Commonjs using those files
  ```js
  const something = require('./filename');    
  const { funcOne, funcTown } = require('./filename2');
  ```
- ESM 
  ```js
  const funcOne = ()=> console.log("commonjs func 1") 
  export default funcOne
  ```
  ```js
  export const funcOne = ()=> console.log("commonjs func 1") 
  export const funcTown = ()=> console.log("commonjs funcky town!")
  ```
  ```js
  import something from './filename'; // Default export
  import { funcOne, funcTown } from './filename2'; // Named exports
  ```


<!-- ## ESM in the browser
- So with [modern browsers](https://caniuse.com/?search=esm) all you have to do in have an attribute on your `<script>` tag called `type="module"` and you should now be able to use `import` & `export` in that script file/online without needing a bundler!
- What a package only exports to CommonJS?? well this is where `esinstall` comes in.
- `esinstall` is a development tool that converts any JavaScript package into a single ES6-module-friendly file that you can check into your codebase and import. 
- You can run this conversion just once on install, so there’s no need to set up file watching or other unnecessary tooling.
- To set it up, update our package.json like so:
  ```json
  {
    "name": "some-awesome-project",
    "scripts": {
      "postinstall": "node convert-to-esm.mjs"
    },
    "dependencies": {
      "some-commonjs-package": "^1.2.3"
    },
    "devDependencies": {
      "esinstall": "^1.1.7"
    },
    "esinstall": {
      "install": [
        "some-commonjs-package"
      ]
    }
  }
  ```
- This package.json update does a couple of things:
    - Declares `esinstall` as a dev dependency
    - Add a `esinstall` block for listing all packages we want convert from CommonJS to ESM
    - Defines a `postinstall` script that will run after we install anything with `$ npm install | $ yarn`
- Now the code for the `postinstall` npm script:
    ```js
    import { install } from 'esinstall';
    import { readFile } from 'fs/promises';

    const json = JSON.parse(
      await readFile(
        new URL('./package.json', import.meta.url)
      )
    );
    const moduleList = json.esinstall.install;
    const installOptions = json.esinstall.installOptions;

    await install(moduleList, installOptions);
    ```
- Now all you have to do is run `$ npm install || $ yarn ` -->
    
    
    
    
    
    
    




# ESM import/export files
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






# Peer Dependencies
- When you are developing a custom module you can use `peerDependencies` to ask the user to install a dependency your module needs to work with. For instance if you are making a React component library, you shouldn't bundle as specific version of React in your `depedencies` list you should define it in your `peerDependencies`.
- Not only will this reduce your bundle size, it will allow the user to use whatever version of React they are currently working on

- The problem with `peerDependencies` is npm and yarn don't install them at all. 
- This is the right behavior for production purpose but when you are developing you might need to test your module in a host app. 
- npm and yarn provide a command to achieve it called link that basically creates a symlink into the host app node_modules to your module source folder. 
- It works fine but you also need to execute tasks in your module that needs these dependencies. For example, you might want to execute tests. Since they aren't present in your module's node_modules you will experience errors.





# Read from termial prompt
- This is a very simple script that will take the info the user provides in the terminal and prints the results
  ```js
  import readline from "readline"

  const question = (rl, question) => {
    return new Promise((resolve) =>
      rl.question(question, (answer) => resolve(answer))
    )
  }

  const Ask = function (questions) {
    return new Promise(async (resolve) => {
      let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })

      let results = []
      for (let i = 0; i < questions.length; i++) {
        const result = await question(rl, questions[i])
        results.push(result)
      }
      rl.close()
      resolve(results)
    })
  }

  // ==================================
  const questions = [
    "Question 1?",
    "Question 2?",
    "Question 3?"
  ]
  Ask(questions).then((answers) => {
    console.log(answers)
  })
  ```














# Creating a CLI
- There are 2 types of packages you can create: `global` & `local`
- The `global` package can be installed an run like a bash command
- Start by creating a new package
  ```shell
  $ npm init -y
  ```
- Create a `bin/index.js` file 
  ```js
  #!/usr/bin/env node

  console.log('hello')
  ```
- In your `package.json` file add
  ```json
  {
    "name": "your-module-name",
    "bin": {
      "your-module-name": "./bin/index.js"
    }
  }
  ```
- Link this application on your machine so you can test it out
  ```shell
  $ npm link
  ```
- Now you can run your CLI 
  ```shell
  $ your-module-name
  ```
- You can publish it too


# Spawn
- Node.js runs in a single-thread mode, but it uses an event-driven paradigm to handle concurrency.
- It also facilitates creation of child processes to leverage parallel processing on multi-core CPU based systems.
- Node provides child_process module which has the following three major ways to create a child process.
  - *exec* − `child_process.exec` method runs a command in a shell/console and buffers the output.
  - *spawn* − `child_process.spawn` launches a new process with a given command.
  - *fork* − The `child_process.fork` method is a special case of the spawn() to create child processes. 
    
    
    
    

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

    
    
    
    
    


# JWT (JSON Web Tokens)
https://auth0.com/docs/tokens/json-web-tokens/json-web-token-claims#reserved-claims


    
    
    
    
    
    
    
    
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


# Download images from the web
- Downloading an image is different then download data, you gotta use streams
  ```js
  const fs = require("fs");
  const path = require("path");
  const Axios = require("axios");

  async function downloadImage(url, filepath) {
    const response = await Axios({
      url,
      method: "GET",
      responseType: "stream",
    });
    return new Promise((resolve, reject) => {
      response.data
        .pipe(fs.createWriteStream(filepath))
        .on("error", reject)
        .once("close", () => resolve(filepath));
    });
  }

  const BASE_URL = "https://some-place.com";

  [...Array(1)].map((_, pictureNum) => {
    const fileName = `${pictureNum + 1}.jpg`;

    const webUrl = `${BASE_URL}/${fileName}`;
    const downloadFilename = path.join(__dirname, `../art/${fileName}____`);
    downloadImage(webUrl, downloadFilename).then(console.log).catch(console.error);
  });
  ```

    
    
    
    
    
    
    
    
    

    
    
    
    
