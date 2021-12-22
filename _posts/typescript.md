---
title: 'typescript'
excerpt: ''
coverImage: '/assets/covers/typescript.jpg'
ogImage:
  url: '/assets/covers/typescript.jpg'
---


# Nodejs project + TypeScript

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
      "start": "node dist/index.js",
      "dev": "ts-node-dev --respawn -- src/index.ts",
      "build": "tsc"
    }
   }
  ```
- Start developing
  ```shell
  $ npm run dev
  $ npm run build
  ```














# React + TypeScript
- [Typescript handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [react typescript cheatsheets](https://github.com/typescript-cheatsheets/react)



## Create a new React + typeScript application
- You can add TS to an existing react application (by creating a `tsconfig.json` & webpack) or you can use a build tool like: create-react-app, vite, parcel, snowpack, next etc
- boilerplates:
  ```shell
  // CRA
  $ npx create-react-app <APP_NAME> --typescript
  
  // Vite
  $ npm init vite@latest <APP_NAME> -- --template react-ts
  
  // Nextjs
  $ npx create-next-app <APP_NAME> --typescript
  ```


## React + TypeScript Add Linting
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






## Javascript Basic Types
- Javascript has a 7 primitive types
  ```
  string
  number
  boolean
  bigint
  symbol
  undefined
  null
  ```
- ...and `Object` (which consists of key-value structure as well as array lists)
- It also has `functions` that are fundamental elements in JS but not actually type
  - *note* `Array types` are regular objects for which has integer-keyed properties
- Javascript doesn't have static type safety, meaning when you define a variable and assign it a value you can change the type by changing that value's type
- For example
  ```js
  var something = 99;
  something = 'is now a string!!!'
  ```
- What TS does (along with additional things) is provide type safety by defining your types so they can't change dynamically
- You work with the basic JS type, however you can make your own types that you can reuse or inherit from


## Defining Basic values
- Basic example
  ```ts
  type DataTypes = {
    _string: string
    _number: number
    _boolean: boolean
    _bigint: bigint
    _symbol: symbol
    _undefined: undefined
    _null: null
    _object: {
      name: string
    }
    _array: string[] // array literal notation
  }
  ```
  
  ```ts
  type AppProps = {
    message: string;
    count: number;
    disabled: boolean;
    /** array of a type! */
    names: string[];
    /** string literals to specify exact string values, with a union type to join them together */
    status: "waiting" | "success";
    /** any object as long as you dont use its properties (NOT COMMON but useful as placeholder) */
    obj: object;
    obj2: {}; // almost the same as `object`, exactly the same as `Object`
    /** an object with any number of properties (PREFERRED) */
    obj3: {
      id: string;
      title: string;
    };
    /** array of objects! (common) */
    objArr: {
      id: string;
      title: string;
    }[];
    /** a dict object with any number of properties of the same type */
    dict1: {
      [key: string]: MyTypeHere;
    };
    dict2: Record<string, MyTypeHere>; // equivalent to dict1
    /** any function as long as you don't invoke it (not recommended) */
    onSomething: Function;
    /** function that doesn't take or return anything (VERY COMMON) */
    onClick: () => void;
    /** function with named prop (VERY COMMON) */
    onChange: (id: number) => void;
    /** alternative function type syntax that takes an event (VERY COMMON) */
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
    /** an optional prop (VERY COMMON!) */
    optional?: OptionalType;
  };
  ```
- You can make `Union` type with a `|`
  ```ts
  type UnionType = {
    _string: string | number
  }
  ```
- Defining a array 
  ```ts
  type Props = {
    user: {
      username: string,
      age: number,
      isMember: boolean
    }[] // right here
  }
  ```
## When to use `type` over `interface`
- [TL;DR](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example#more-advice)
- **Always use `interface` for public API's definition when authoring a library or 3rd party ambient type definitions**, as this allows a consumer to extend them via declaration merging if some definitions are missing.
- **Use `type` for your React Component Props and State**, for consistency and because it is more constrained.

- Both type and interface from TypeScript can be used to define React props, components, and hooks.
- `Type` CANNOT be re-opened to add new properties, as for `interface` is always extendable
- Extending an interface
  ```ts
  interface HtmlAttributes {
    disabled: boolean
  }
  
  interface ButtonHtmlAttributes extends HtmlAttributes {
    type: 'Submit' | 'Button' | null
  }
  ```
- Extending a type alias, use the (`&`) intersection symbol
  ```ts
  type HtmlAttributes = {
    disabled: boolean
  }
  
  type ButtonHtmlAttributes = HtmlAttributes & {
    type: 'Submit' | 'Button' | null
  }
  ```
- Also, an `interface` declaration is always an object, while a `type` declaration can be of primitive values
  ```ts
  type isLoading = boolean
  type Theme = "dark" | "light"
  type Lang = "en" | "fr"
  ```
- **When to use one over the other??**, when you’re not sure which one to use, always go with interface until you see a reason to use type .











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

## React Props
- Add a colon and the object literal notation `(: {})`
  ```ts
  const App = ({ username, score }: { username: string, score: number }) => (
    <p>{username}'s score -> {score}</p>
  )
  ```

## Type Alias
- React convention is generally one component per file, you can declase `type alias` for the component as `Props`
- This allows you to keep your code cleaner and avoid inliniing the type decloration
  ```ts
  type Props = {
    username: string,
    score: number
  }
  
  const App = ({ name, score }: Props) => (
    <p>{name}'s score -> {score}</p>
  )
  ```

## Optional props
- Add a `?` after the prop name makes it optional
- The component can render without a specific prop
  ```ts
  type Props = {
    username?: string,
    score: number
  }
  ```

## Type React function props
- Below example of defining functions
  ```ts
  type Props = {
    // function that returns nothing
    onClick: () => void,

    // function accepts a parameter and has return type
    onChange: (target: string) => boolean,

    // function that takes an event
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  }
  ```
- Dealing with `onChange` function in the component's body 
  ```ts
  const App = () => {
    const [message, setMessage] = useState("")

    const onChange = (e: React.FormEvent<HTMLInputElement>): void => 
      {
        setMessage(e.currentTarget.value);
      }

    // code omitted for clarity..
  }
  ```

## Type React children props
- React has a default prop call children which is of type `React.ReactNode`
  ```ts
  type Props = {
    children: React.ReactNode
  }
  const App = ({ children }: Props) => (
    <div>{children}</div>
  )
  ```

## Type React function components
- React provides the function component type `React.FunctionComponent` or `React.FC` for short
- You can combine your `type` Props & the `React.FC` type to create a safe function component with `React.FC<Props>`
  ```ts
  type Props = {
    title: string
  }
  const App: React.FC<Props> = ({title}) => {
    return (
        <h1>{title}</h1>
    )
  }
  ```
- It's prefered to let Typescript infer the `React.FC` and not defining it
  ```ts
  type Props = {
    title: string
  }
  const App = ({ title }: Props) => <div>{title}</div>
  // App type will be inferred
  ```

## Type React hooks
- React Hooks are supported by `@type/react` library from version 16.8
- Generally Typescript should be able to infer the type unless you have a specific cases where you must declare explicitly

## Type React hooks `useState`
- The `useState` value can be inferred from the initial value you set when you call the function.
  ```ts
  const App = () => {
    const [title, setTitle] = useState("") // type is string
    
    const changeTitle = () => {
      setTitle(9) // error: number not assignable to string!
    }
  }
  ```
- But when you need to initialize your state with values like null or undefined , then you need to add a generic when you initialize the state.
  ```ts
  // title is string or null
  const [title, setTitle] = useState<string | null>(null)
  
  // score is number or undefined
  const [score, setScore] = useState<number | undefined>(undefined)
  ```
- When you have a complex object as a state value, you can create an `interface` or a `type alias` for that object
  ```ts
  interface Member {
    username: string,
    age?: number
  }
  const [member, setMember] = useState<Member | null>(null)
  ```

## Type React hooks `useEffect` & `useLayoutEffect`
- You don’t need to type the useEffect and useLayoutEffect hooks because they don’t deal with returning values. 
- The cleanup function for the useEffect hook is not considered a value that can be changed either.

## Type React hooks `useContext`
- The `useContext` hook type is usually inferred from the initial value you passed into the `createContext()` function
  ```ts
  const AppContext = createContext({ 
    authenticated: true,
    lang: 'en',
    theme: 'dark'
  })
  const MyComponent = () => {
    const appContext = useContext(AppContext) //inferred as an object
    return <h1>The current app language is {appContext.lang}</h1>
  }
  ```
- The context value above will be inferred as the following object:
  ```ts
  {
    authenticated: boolean,
    lang: string,
    theme: string
  }
  ```
- You could create a `type` that will serve as the generic for the theme context of 2 values
  ```ts
  type Theme = 'light' | 'dark'
  const ThemeContext = createContext<Theme>('dark')
  ```

## Type React hooks `useRef`
- `useRef` hook is commonly used to reference an HTML input element
- You can use the `<HTMLInputElement>` generic for that element
  ```ts
  function SomethingRad(){
    // const inputRef = React.useRef
    const inputRef = useRef<HTMLInputElement>(null)
    return (
      <>
        <input type="text" name="username" ref={inputRef} />
      </>
    )
  }
  ```

## Type React hooks `useMemo`
- The useMemo hook returns a memoized value, so the type will be inferred from the returned value
  ```ts
  const num = 10
  // inferred as a number from the returned value below
  const result = useMemo(() => Math.pow(10, num), [num])
  ```

## Type React hooks `useCallback`
- The useCallback hook returns a memoized callback function, so the type will be inferred from the value returned by the callback function
  ```ts
  const num = 9
  const callbackFn = useCallback(
    (num: number) => {
      return num * 2   // **type inferred as a number**
    }, 
  [num])
  ```

## Type React hooks `Custom Hook`
- Since custom hooks are functions, you can add explicit types for its parameters while inferring its type from the returned value
```ts
function useFriendStatus(friendID: number) {
  const [isOnline, setIsOnline] = useState(false);
  // code for changing the isOnline state omitted..
  return isOnline;
}

const status = useFriendStatus(9)   // **inferred type boolean**
```

## Type HTML events and forms
- Most HTML events types can be inferred correctly by TypeScript, so you don’t need to explicitly set the type.
- For example, a button element `onClick` event will be inferred as `React.MouseEvent` by TypeScript
  ```ts
  const App = () => (
    <button onClick={ (e) => console.log("Clicked")}>button</button>
    // ^^^ e inferred as React.MouseEvent<HTMLButtonElement, MouseEvent>
  )
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








# Start a React app with TS


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











