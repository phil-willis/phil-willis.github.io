---
title: 'CSS'
excerpt: ''
coverImage: '/assets/covers/css.jpg'
ogImage:
  url: '/assets/covers/css.jpg'
---


# CSS



# Classnames
- The order of classes in the `attribute` is irrelevant. All the classes in the class attribute are applied equally to the element.
- What order do the style rules appear in your `.css` file. Whatever classes that come later in the file wins





# CSS Animations
- `Animation` is the change from one CSS style to another over time
- Every animation has at least 2 states, `start` and `finish`
- When the animation moves from start to finish state CSS will calculate the values in between, inbetweening or `tween` in computer science
- Example of an animation is having an element fade in from 0-1 over a duration of 60 seconds. When the animation happens CSS will calculate the opacity value for every frame rendered over 60 seconds. It will do it in a linear fashion opacity/time
- CSS also provides some timing functions `ease-in`, `ease-out` or you can define your own with bezier curves 
- The easiest way to animate something is to use the `transition` property. Below example will animate to a solid green when hovered:
  ```css
  .box {
    width: 200px;
    height: 200px;
    background-color: green;
  }
  #rad-box {
    opacity: 0.4;
    transition: opacity 200ms;
  }

  #rad-box:hover {
    opacity: 1;
  }
  ```
- `@keyframes` allows you to animate independent steps along the way

  ```css
  /* Define your animation*/
  @keyframes someAwesomeAnimation {
    from {
      transform: rotate(0deg);
    }

    25% {
      transform: rotate(-45deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
  .rotate-box{
    animation: someAwesomeAnimation 5s; /* Use the animation you've defined above */
    animation-iteration-count: infinite; /* Will animate forever */
  }
  ```





<details>
<summary>React + TypeScript</summary>

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
</details>
