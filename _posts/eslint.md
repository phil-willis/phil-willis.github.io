---
title: 'ESLint'
excerpt: 'How to configure ESLint.'
coverImage: '/assets/blog/hello-world/cover.jpg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: Tim Neutkens
  picture: '/assets/blog/authors/tim.jpeg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---


# Setup
- ESLint => code smell warnings
- Prettier => opinionated code formatting

- ESLint defines the code conventions
- Prettier performs the auto-formatting based on the ESLint rules


0. Install VSCode extensions
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

1. Create a react app
  ```sh
  $ npx create-react-app <APP_NAME>
  ```

2. Install additional packages
  ```sh
  $ npm i -D @types/react @types/react-dom
  $ npm i -D prettier eslint eslint-config-prettier eslint-plugin-prettier
  ```
  - `eslint-config-prettier` => turns off all ESLint rules that could conflict with Prettier
  - `eslint-plugin-prettier` => integrates the Prettier rules into ESLint rules.


3. Add `.eslintrc` file
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






# Links
- https://www.robinwieruch.de/prettier-eslint
- https://khalilstemmler.com/blogs/tooling/prettier/