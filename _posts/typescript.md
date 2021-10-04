---
title: 'typescript'
excerpt: ''
coverImage: '/assets/covers/typescript.jpg'
ogImage:
  url: '/assets/covers/typescript.jpg'
---


# Overview of typescript



# TypeScript nodejs project

- Initialize an app
  ```shell
  $ npm init -y
  $ npm i --save-dev ts-node ts-node-dev typescript
  ```
- You clean this `tsconfig.json` file to something like this
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
- Create a ts file
  ```shell
   $ mkdir src
   $ echo "console.log('Hello typescript !')" > src/index.ts
  ```
- Update your `package.json` file
  ```json
  {
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "scripts": {
      "start": "node dis/index.js",
      "dev": "ts-node-dev --respawn -- src/index.ts",
      "build": "tsc"
    }
   }
  ```
- Start developing
  ```shell
  $ npm run dev
  ```

# React + typeScript
- First thing to do is to setup a project that can handle & compile a Typescript
- You can do it from scratch (by creating a `tsconfig.json` & webpack) or you can use `create-react-app` or `create-next-app` both allows a `--typescript`
- boilerplates:
  ```shell
  $ npx create-next-app some-ts --typescript
  $ npx create-react-app cra-ts --typescript
  ```



# React -> React TypeScript Setup
- Since React was not written in TypeScript, the community provides types with the @types/react package. 
  ```shell
  $ npm i -D @types/react
  ```

1. install boilerplate 
2. Add eslint/prettier
  ```shell
  $ npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier prettier

  ```
3. Create config files
- `.prettierignore`
  ```
  # ignore npm modules
  node_modules

  # Ignore artifacts:
  build
  coverage

  # Ignore all HTML files:
  *.html
  ```

- `.prettierrc`
  ```
  {
    "semi": false,
    "trailingComma": "all",
    "singleQuote": true,
    "printWidth": 70
  }
  ```

- `.eslintrc`
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

- `.vscode/settings.json`
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
- update the 

# React -> React TypeScript
- [react typescript cheatsheets](https://github.com/typescript-cheatsheets/react)

## Import React
- Sometimes you will see `import * as React from "react";`
  ```ts
  import * as React from "react";
  import * as ReactDOM from "react-dom";
  ```
- This is the most futureproof way to import React. 
- If you set --allowSyntheticDefaultImports (or add `"allowSyntheticDefaultImports": true`) in your `tsconfig.json` you can use more familiar imports:
  ```ts
  import React from "react";
  import ReactDOM from "react-dom";
  ```


## Function Components
  ```ts
  // Declaring type of props - see "Typing Component Props" for more examples
  type AppProps = {
    message: string;
  }; /* use `interface` if exporting so that consumers can extend */

  // Easiest way to declare a Function Component; return type is inferred.
  const App = ({ message }: AppProps) => <div>{message}</div>;

  // you can choose annotate the return type so an error is raised if you accidentally return some other type
  const App = ({ message }: AppProps): JSX.Element => <div>{message}</div>;

  // you can also inline the type declaration; eliminates naming the prop types, but looks repetitive
  const App = ({ message }: { message: string }) => <div>{message}</div>;
  ```

- `React.FC<>`
  - In React you have two ways of defining components:
    1. Writing a class and extending from Component
    2. Writing a function/fat-arrow-function and returning JSX
  -  `@types/react` package there's a generic type called `FC` for Function Components
- Example of using the `FC`
  ```ts
  // Normal React
  function Greeting({ name }) {
    return <h1>Hello {name}</h1>
  }

  // TS prop types
  type GreetingProps = {
    name: string
  }

  // TS way `function base`
  const Greeting:FC<GreetingProps> = function({ name }) {
    return <h1>Hello {name}</h1>
  }

  // TS way `fat arrow`
  const Greeting:FC<GreetingProps> = ({ name }) => {
    return <h1>Hello {name}</h1>
  };
  ```
- The problem with using `FC` with a `function` is taht you have to use an anonymous function and assign it to a const/variable
  ```ts
  // TS way `function base`
  const Greeting:FC<GreetingProps> = function({ name }) {
    return <h1>Hello {name}</h1>
  }
  ```
- Unfortunatly you cannot do...
  ```ts
  // NOT VALID !!!!!!
  function Greeting({ name }): React.FC {
    return <h1>Hello {name}</h1>
  }
  ```
- You could use `React.ReactNode`
  ```ts
  function Greeting({ name }): React.ReactNode {
    return <h1>Hello {name}</h1>
  }
  ```

- If you type the properties instead of the function it's cleaner and you don't have anonymous functions all over the place (anonymous functions makes it harder to debug)
  ```ts
  // ✅
  type GreetingProps = {
    name: string
  }
  function Greeting({ name }: GreetingProps) {
    return <h1>Hello {name}</h1>
  }
  ```

## Hooks
- Type inference works very well for simple values:
  ```ts
  const [val, toggle] = React.useState(false);
  // `val` is inferred to be a boolean
  // `toggle` only takes booleans
  ```
- null-sh default values
  ```ts
  const [user, setUser] = React.useState<IUser | null>(null);
  ```

## Class Components
  ```ts
  type MyProps = {
    // using `interface` is also ok
    message: string;
  };
  type MyState = {
    count: number; // like this
  };
  class App extends React.Component<MyProps, MyState> {
    state: MyState = {
      // optional second annotation for better type inference
      count: 0,
    };
    render() {
      return (
        <div>
          {this.props.message} {this.state.count}
        </div>
      );
    }
  }
  ```


## Interface

- Type example:
  ```ts
  type GreetingProps = {
    name: string
  }

  function Greeting({ name }: GreetingProps) {
    return <h1>Hello {name}</h1>
  }
  ```
- Interfact example
  ```ts
  interface GreetingProps {
    name: string
    last?: string
  }

  function Greeting({ name }: GreetingProps) {
    return <h1>Hello {name}</h1>
  }
  ```








# Start an app with TS


## Boiler plate app
- The easiest way to scaffold a react application is using a npm tool
  ```shell
  $ npx create-react-app <APP_NAME> --template typescript
  $ npx create-next-app --typescript <APP_NAME>
  ```

## Non-Browser with TS
- Init a npm package and install TS
  ```shell
  $ npm init -y
  $ npm i --save-dev typescript
  ```
- Create a tsconfig file
  ```json
  {
    "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "moduleResolution": "node",
      "outDir": "dist",
      "removeComments": true,
      "strict": true,
      "strictPropertyInitialization": false,
      "esModuleInterop": true,
      "resolveJsonModule": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "module": "commonjs",
      "declaration": true,
      "sourceMap": true,
      "rootDir": "./src",
    },
    "include": ["**/*.ts"],
    "exclude": ["node_modules"]
  }
  ```
- Watch for changes
  - Nodemon watches for changes and `ts-node` executes your TS code
    ```shell
    $ npm i -D nodemon ts-node
    ```
  - Create a `nodemon.json` file
    ```json
    {
      "watch": "**/*",
      "ext": "ts, json",
      "exec": "ts-node src/app.ts"
    }
    ```
  - Update your `package.json` with a start script
    ```json
    "scripts": {
      "start": "nodemon",
      "build": "tsc"
    },
    ```
# Browser App (TS + Webpack)
- Allow for browser apps
- Update the `tsconfig.json`
  ```json
  {
    "compilerOptions": {
      "outDir": "./dist/",
      "noImplicitAny": true,
      "module": "es6",
      "target": "es5",
      "allowJs": false,
      "sourceMap": true
    },
    "include": ["**/*.ts"],
    "exclude": ["node_modules"]
  }
  ```
- Install webpack
  ```shell
  $ npm i -D clean-webpack-plugin css-loader html-webpack-plugin mini-css-extract-plugin nodemon ts-loader ts-node typescript webpack webpack-cli webpack-dev-server webpack-html-plugin webpack-node-externals
  ```
- Create 3 webpack files: `webpack.common.js`, `webpack.dev.js`, `webpack.prod.js`  

  - `webpack.common.js`
    ```js
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const {CleanWebpackPlugin} = require("clean-webpack-plugin");
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');

    module.exports = {
      entry: path.resolve(__dirname, './src/index.ts'),
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.css$/i,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader'
            ],
          },
        ],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
      output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist'),
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "./src/templates/index.html")
        }),
        new MiniCssExtractPlugin({filename: "styles.[hash].css"})
      ]
    };
    ```
  - `webpack.dev.js`
    ```js
    const webpackCommon = require('./webpack.common');
    const path = require('path');

    module.exports = {
      ...webpackCommon,
      devtool: "inline-source-map",
      mode: "development",
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000
      }
    };
    ```
  - `webpack.prod.js` 
    ```js
    const webpackCommon = require('./webpack.common');

    module.exports = {
      ...webpackCommon,
      mode: "production",
    };
    ```

- Create `src/templates/index.html`
  ```html
  <!doctype html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Webpack❤️TS</title>
  </head>
  <body>
    <h1>Hello TS + Webpack</h1>
  </body>
  </html>
  ```

- Create `src/index.ts`
  ```ts
  import "./styles.css";

  window.addEventListener("load", () => {
    const header = document.createElement("h1");
    header.innerText = "Webpack❤️TS"

    const body = document.querySelector("body");
    body.appendChild(header);

  })
  ```

- Create `src/styles.css`
  ```css
  h2 {
    color: #1976d2;
  }
  ```

- Update the `package.json` scripts
  ```json
  "scripts": {
    "start": "webpack-dev-server --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  }
  ```











