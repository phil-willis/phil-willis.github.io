---
title: 'ESLint'
excerpt: ''
coverImage: '/assets/covers/eslint.jpg'
ogImage:
  url: '/assets/covers/eslint.jpg'
---


# JS Linting overview

![prettier-eslint](./assets/blog/eslint/prettier-eslint.jpg)

- `ESLint` => code smell warnings, defines the code conventions
- `Prettier` => opinionated code formatting,  performs the auto-formatting based on the ESLint rules



# Install ESLint
- The quickest way to add eslint to a project
  ```shell
  $ npx eslint --init
  ```
- But you're gonna probably want to install prettier and other things so i normally don't use ESLint by itself



# React  (NO TypeScript)
- You should really be starting from a React build tool like [Vitejs](https://vitejs.dev/), [Nextjs](https://nextjs.org/docs/getting-started) or CRA [](https://create-react-app.dev/) with TS template

1. Install linting packages
  ```shell
  # Start from one of these
  yarn create vite --template react-ts
  yarn create next-app --typescript
  yarn create react-app my-app --typescript

  # Add some linting packages
  yarn add -D eslint-config-prettier eslint-plugin-prettier prettier @trivago/prettier-plugin-sort-imports

  $ mkdir .vscode
  $ touch .vscode/settings.json .prettierrc .eslintrc 

  # Add a lint script to the package.json file  
  echo "`jq '.scripts.lint="prettier --config .prettierrc 'src/\*\*/\*.\{js,jsx\}' --write"' package.json`" > package.json
  ```
2. `./.eslintrc` file
  ```json
  {
    "extends": ["plugin:prettier/recommended"],
    "plugins": ["react"],
    "env": {
      "browser": true,
      "es6": true
    },
    "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
    }
  }

  ```
3. `./.prettierrc` file
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
4. `./.vscode/settings.json` file
  ```json
  {
    // Set prettier to be the default formatter
    "editor.defaultFormatter": "esbenp.prettier-vscode",

    // Don't format any files by default
    "editor.formatOnSave": false,
    
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },

    // JavaScript stuff
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
    "[javascriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
  }
  ```



# React + TypeScript
- You should really be starting from a React build tool like [Vitejs](https://vitejs.dev/), [Nextjs](https://nextjs.org/docs/getting-started) or CRA [](https://create-react-app.dev/) with TS template

1. Install linting packages
  ```shell
  # Start from one of these
  yarn create vite --template react-ts
  yarn create next-app --typescript
  yarn create react-app my-app --typescript

  # Add some linting packages
  yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier prettier @trivago/prettier-plugin-sort-imports

  $ mkdir .vscode
  $ touch .vscode/settings.json .prettierrc .eslintrc 

  # Add a lint script to the package.json file  
  echo "`jq '.scripts.lint="prettier --config .prettierrc 'src/\*\*/\*.\{ts,tsx,js,jsx\}' --write"' package.json`" > package.json
  ```
2. `./.eslintrc` file
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
3. `./.prettierrc` file
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
4. `./.vscode/settings.json` file
  ```json
  {
    // Set prettier to be the default formatter
    "editor.defaultFormatter": "esbenp.prettier-vscode",

    // Don't format any files by default
    "editor.formatOnSave": false,
    
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },

    // JavaScript stuff
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
    "[javascriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },

    // TypeScript stuff if you need it
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
    "[typescriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
    
  }
  ```

# React + Jest
- Take a look at [vitest](https://vitest.dev/), it's FAST and uses vitejs's config so you don't have to deal with babel and transpiling, have almost identical API to Jest. PLUS the benefit of using the same config file you use for development so you're not transpiling your code and test differently.
- BUT... is you're not convinced this is how you add it to your CRA app

1. Add the jest linter
  ```shell
  yarn add -D eslint-plugin-jest
  ```
2. update the config file
  ```json
  {
    "extends": [
      "plugin:jest/recommended",
      "plugin:prettier/recommended"
    ],
    "plugins": ["react", "jest"],
    "env": {
      "browser": true,
      "es6": true,
      "jest": true
    },
    "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
    }
  }
  ```




# Baseline nodejs linting
1. Install linting packages
  ```shell
  $ yarn add -D prettier eslint eslint-config-prettier eslint-plugin-prettier @trivago/prettier-plugin-sort-imports

  $ mkdir .vscode
  $ touch .vscode/settings.json .prettierrc .eslintrc 
  ```
2. `./.eslintrc` file
  ```json
  {
    "extends": [ "prettier"],
    "plugins": ["prettier"],
    "rules": {
      "prettier/prettier": ["error"]
    },
  }
  ```
3. `./.prettierrc` file
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
4. `./.vscode/settings.json` file
  ```json
  {
    // Set prettier to be the default formatter
    "editor.defaultFormatter": "esbenp.prettier-vscode",

    // Don't format any files by default
    "editor.formatOnSave": false,
    
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },

    // JavaScript stuff
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
    "[javascriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },

    // TypeScript stuff if you need it
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
    "[typescriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
    
  }
  ```

6. Choose between `CommonJS` or `ESM`
  - Since 2009 when Kevin Dangoor changed the world of web development, CommonJS format that came with Node.js by default. aka `require()`
  - Nodejs version >= 12.0.0 supports ESM
  - Babel & webpack allows us to write ESM style JavaScript that then gets transpiled to older version of JavaScript that the browser can consume
  - one way to work with commonjs/esm is to use `.js`/.`mjs`, (i'm not really a fan on this)
  - You need to update the `./package.json` & `.eslintrc` file to have `"type" : "module"`
  - **CommonJS**:
    ```shell
    echo "`jq '.type="commonjs"' package.json`" > package.json
    echo "`jq '.type="commonjs"' .eslintrc`" > .eslintrc
    ```
  - **ESM**:
    ```shell
    echo "`jq '.type="module"' package.json`" > package.json
    echo "`jq '.type="module"' .eslintrc`" > .eslintrc
    ```
  - Simple **CommonJS** expressjs example:
    ```js
    const express = require('express');
    const app = express();
    const port = 3000;

    app.get('/', (req, res) => res.send('Hello World!'))
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
    })
    ```
  - Simple **ESM** expressjs example:
    ```js
    import express from 'express'

    const app = express()
    const port = 3000

    app.get('/', (req, res) => res.send('Hello World!'))
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
    })
    ```

7. Create an index file if you haven't already
  ```shell
  $ mkdir src && touch src/index.js
  echo "`jq '.main="src/index.js"' package.json`" > package.json
  ```


# + TypeScript
- **note** So this example... `TS` -> `commonjs`, therefore you need to update the package.json's type to `commonjs` and **not** `module`
- Add TypeScript
  ```shell
  $ yarn add -D ts-node ts-node-dev typescript @types/node
  $ touch tsconfig.json
  $ mv src/index.js src/index.ts
  ```
- Add a `./tsconfig.json`
  - Compressed JSON config
    ```json
    {
      "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "declaration": true,
        "sourceMap": true,
        "outDir": "dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true
      }
    }
    ```
  - Or 
    ```shell
    $ npx tsc --init
    ```
- Add TS Linting
  ```shell
  yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser

  # Update the .eslintrc file
  echo "`jq '.extends=["plugin:@typescript-eslint/recommended","plugin:prettier/recommended"]' .eslintrc `" > .eslintrc 
  echo "`jq '.plugins=["prettier","@typescript-eslint"]' .eslintrc `" > .eslintrc 
  echo "`jq '.env.es6=true' .eslintrc `" > .eslintrc 
  echo "`jq '.parser= "@typescript-eslint/parser"' .eslintrc `" > .eslintrc 
  echo "`jq '.parserOptions={"ecmaVersion": 2018,"sourceType": "module","project": "./tsconfig.json"}' .eslintrc `" > .eslintrc 
  ```
- Update the package.json file
  ```shell
  # ***IMPORTANT***
  echo "`jq '.type="commonjs"' package.json`" > package.json

  # Update the package.json
  echo "`jq '.main="dist/index.js"' package.json`" > package.json
  echo "`jq '.types="dist/index.d.ts"' package.json`" > package.json

  # Update the package.json scripts
  echo "`jq '.scripts.start="node dist/index.js"' package.json`" > package.json
  echo "`jq '.scripts.dev="ts-node-dev --respawn -- src/index.ts"' package.json`" > package.json
  echo "`jq '.scripts.build="tsc"' package.json`" > package.json   
  ```
- The expressjs should look like this now
  ```shell
  yarn add express
  yarn add -D @types/express
  ```

  ```ts
  import express, { Express, Request, Response } from 'express'

  const app: Express = express()
  const PORT = process.env.PORT || 3000

  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
  })

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  })
  ```





# Add... ignore linting on files

```shell
$ touch .prettierignore .eslintignore
```




# Wanna add Github Action that runs the test in parallel

  - `./github/workflows/test.yml`
  ```yml
  name: CI

  on: [push]

  jobs:
    build:
      name: Build
      runs-on: ubuntu-18.04
      strategy:
        matrix:
          node_version: [14]

      steps:
        - uses: actions/checkout@v1
        - name: Use Node.js ${{ matrix.node_version }}
          uses: actions/setup-node@v1
          with:
            node_version: ${{ matrix.node_version }}

        - name: run CI
          run: |
            npm install
            npm run lint
            npm run test
            npm run build
  ```

