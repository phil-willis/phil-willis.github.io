---
title: 'ESLint'
excerpt: ''
coverImage: '/assets/covers/eslint.jpg'
ogImage:
  url: '/assets/covers/eslint.jpg'
---

# Install ESLint
- The quickest way to add eslint to a project
  ```shell
  $ npx eslint --init
  ```


# Setup JavaScript React
- ESLint => code smell warnings
- Prettier => opinionated code formatting

- ESLint defines the code conventions
- Prettier performs the auto-formatting based on the ESLint rules


0. Install VSCode extensions
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

1. Create a react app
  ```sh
  $ npx create-react-app APP_NAME
  ```

2. Install additional packages
  ```sh
  $ npm i -D @types/react @types/react-dom
  $ npm i -D prettier eslint eslint-config-prettier eslint-plugin-prettier
  ```
  - `eslint-config-prettier` => turns off all ESLint rules that could conflict with Prettier
  - `eslint-plugin-prettier` => integrates the Prettier rules into ESLint rules.


3. Add `.eslintrc` file
  - [eslint rules](https://eslint.org/docs/rules/)
  ```json
  {
    "extends": [ "react-app", "prettier"],
    "plugins": ["prettier"],
    "rules": {
      "prettier/prettier": ["error"]
    },
  }
  ```

4. Add `.prettierrc` file
  - [Prettier Options](https://prettier.io/docs/en/options.html)
  ```json
  {
    "semi": false,
    "trailingComma": "all",
    "singleQuote": true,
    "printWidth": 70
  }
  ```

5. Add vscode settings file
  - Create `.vscode/settings.json`
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
      "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
      },
      
    }
    ```

6. Update the package.json file
  - Add a scripts entry to your package.json
  ```json
  "scripts": {
    "lint": "prettier --config .prettierrc 'src/**/*.js' --write"
  },
  ```

7. Run the linter
  ```sh
  $ npm run lint
  ```

8. (optional) Extend prettier with import sort order
  - A prettier plugin to sort import declarations by provided RegEx order.
    ```
    $ npm i -D @trivago/prettier-plugin-sort-imports
    ```
  - Add this to your `.prettierrc` file
    ```json
    {
      "importOrder": ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
      "importOrderSeparation": true,
    }
    ```


# Setup TypeScript React

0. Install VSCode extensions
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

1. Create a react app
  ```sh
  $ npx create-react-app <APP_NAME> --template typescript
  ```

2. Install additional packages
  ```sh
  # ESLint
  $ npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-jest

  # Prettier
  $ prettier eslint-config-prettier eslint-plugin-prettier
  ```
  - `eslint-config-prettier` => turns off all ESLint rules that could conflict with Prettier
  - `eslint-plugin-prettier` => integrates the Prettier rules into ESLint rules.

3. Add `.eslintrc` file
  - [eslint rules](https://eslint.org/docs/rules/)
  ```json
  {
    "extends": [
      "plugin:@typescript-eslint/recommended",
      "plugin:jest/recommended",
      "plugin:prettier/recommended"
    ],
    "plugins": ["react", "@typescript-eslint", "jest"],
    "env": {
      "browser": true,
      "es6": true,
      "jest": true
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

4. Add `.prettierrc` file
  - [Prettier Options](https://prettier.io/docs/en/options.html)
  ```json
  {
    "semi": false,
    "trailingComma": "all",
    "singleQuote": true,
    "printWidth": 70
  }
  ```

5. Add vscode settings file
  - Create `.vscode/settings.json`
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

6. Update the package.json file
  - Add a scripts entry to your package.json
  ```json
  {
     "scripts": {
      "lint": "prettier --write src/**/*.ts{,x}"
    }
  }
  ```

7. Run the linter
  ```sh
  $ npm run lint
  ```

9. Github Action 
  - `ci.yml`
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

9. Notes
  - typescript
    - You will want to define the export of your component with `function App(): JSX.Element{}`
      ```ts
      import React from 'react'

      export default function App(): JSX.Element {
        return <div>Hello</div>
      }
      ```
