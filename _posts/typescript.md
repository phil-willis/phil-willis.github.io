---
title: 'typescript'
excerpt: ''
coverImage: '/assets/blog/hello-world/cover.jpg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---


# Overview of typescript





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

















