---
title: 'react'
excerpt: ''
coverImage: '/assets/covers/react.jpg'
ogImage:
  url: '/assets/covers/react.jpg'
---

<!--
# Overview of react

# Topics
- CRA
- Component types (Stateful & Stateless)
- Props & state
- "Children" prop
- Form & Form validation
- Styles
  - inline
  - css & classNames
  - css modules
  - style-components
  - stylus
  - stylus & css modules
- List & keys
- Debug
- Component lifecycle
- Hooks
- fragment
- HOC (Higher Order Component)
- Refs
- Context
- prop validations
- http request
- msw
- SPA routing
  - react-router
  - react-hook-router
  - raviger
- route
  - route parameters
  - query strings
- state management
  - redux & redux middleware
  - redux toolkit
  - zustand
  - hook useReducer
- testing 
  - RTL
  - Cypress
- Craco
  - file alias
  - css modules
- local & session storage -->



# Setting up a React application
- boilerplates (Create-react-app, Vite, Parcel, Next)



## Vite
- [Vite](https://vitejs.dev/) homepage
  ```shell
  $ npm init vite@latest <YOUR_APP_NAME> -- --template react-ts
  ```
- Template options:
  ```shell
  vanilla
  vanilla-ts
  vue
  vue-ts
  react
  react-ts
  preact
  preact-ts
  lit-element
  lit-element-ts
  svelte
  svelte-ts
  ```

- Add file alias
  - Update your `vite.config.ts` file
    ```ts
    import react from '@vitejs/plugin-react'
    import path from 'path'
    import { defineConfig } from 'vite'

    export default defineConfig({
      plugins: [react()],

      // ===== Add this ====
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      // ===== Add this ====

      build: { outDir: 'build' },
    })
    ```
  - Update the `tsconfig.json` file so that vscode knows about the alias
    ```ts
    {
      "compilerOptions": {
        "baseUrl": ".",
        "paths": {
          "@/*": ["src/*"]
        }
      }
    }
    ```

### Vite with Vitest
- Vitest has basically the same API as Jest however it leverages the same `vite.config.ts` file that you code uses for development and build
- Benefits are amazing: leverage the same config dev/build/test, it's fast, don't have to worry about babel and all the transpiling files


- Update the `vite.config.ts` file
  ```ts
  /// <reference types="vite/client" />
  /// <reference types="vitest" />
  import react from '@vitejs/plugin-react'
  import path from 'path'
  import { defineConfig } from 'vite'

  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: './src/utils/test-setup.ts',
      include: ['src/{components,hooks,utils}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  })
  ```

- Add some packages:
  ```shell
  $ yarn add -D vitest @vitest/ui c8 happy-dom vi-fetch
  $ yarn add -D @testing-library/react @testing-library/react-hooks @testing-library/user-event @testing-library/jest-dom
  ```
- Update your `package.json` npm scripts
  ```json
  {
    "scripts":{
      "test": "vitest",
      "test:ui": "vitest --ui",
      "test:coverage": "vitest run --coverage",
    }
  }
  ```
- Create a `src/utils/test-setup.ts` file
  ```ts
  import '@testing-library/jest-dom'
  import 'vi-fetch/setup'

  // @ts-ignore
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  ```
- Create a `src/utils/test-utils.tsx` file
  ```ts
  ```



### Vite with Jest
- Add some packages:
  ```shell
  $ npm i -D jest ts-jest @testing-library/react @testing-library/jest-dom 
  $ npm i -D identity-obj-proxy
  ```
    - `ts-jest` lets to use typescript tests
    - `@testing-library/react` provides APIs to work with React Components in our test
    - `@testing-library/jest-dom` is a library that provides a set of custom jest matchers that you can use with jest
    - Optional `@testing-library/user-event`, `@testing-library/react` library already provides a *fireEvent* function to simulate events, but @testing-library/user-event provides a more advanced simulation.
    - The `identity-obj-proxy` tells Jest to mock object as imported, like css or svg

- Create `jest.config.js`
  - This allows you to define where all the files are
  - You can add this to your `package.json` file if you want
    ```js
    module.exports = {
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
      roots: ["<rootDir>/src"],
      transform: {
        "^.+\\.tsx$": "ts-jest",
        "^.+\\.ts$": "ts-jest",
      },
      testRegex: "(/src/.*.(test|spec)).(jsx?|tsx?)$",
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
      collectCoverage: true,
      collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],
      coverageDirectory: "<rootDir>/coverage/",
      coveragePathIgnorePatterns: ["(tests/.*.mock).(jsx?|tsx?)$", "(.*).d.ts$"],
      moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$": "identity-obj-proxy",
      },
      verbose: true,
    };
    ```
- Create a `jest.setup.ts` 
  - This library will extend Jest with a whole bunch of features to make it easier to test the react components in your application
  - Make sure that it's a `.ts` file
    ```js
    import '@testing-library/jest-dom';
    // import 'whatwg-fetch' // If you are using browser's native `fetch` API
    ```
- Now add a new npm script in your `package.json` file
  ```json
  {
    "scripts": {
      "dev": "vite --port 3003",
      "build": "tsc && vite build",
      "serve": "vite preview",
      "test": "jest --watchAll --collectCoverage=false",
      "test:once": "jest --colors",
      "pretest:coverage": "jest --colors --collectCoverage=true",
      "test:coverage": "npx http-server coverage/lcov-report"
    }
  }
  ```
- Make sure you r `tsconfig.json` has the proper `"jsx": "react-jsx"` config
  ```json
  {
    "compilerOptions": {
      "target": "es5",
      "module": "esnext",
      "jsx": "react-jsx"  # https://www.typescriptlang.org/docs/handbook/jsx.html#basic-usage
    }
  }
  ```
- Now create a test file `src/App.test.tsx`
  ```ts
  import React from 'react'
  import { render, screen } from '@testing-library/react'
  import App from './App'

  describe('App', ()=>{
    test('should have welcome message', ()=>{
      render(<App />)
      const welcomeElement = screen.getByText(/Hello Vite/)
      expect(welcomeElement).toBeInTheDocument()
    })
  })
  ```
- If you wanted to use `babel` instead of `ts-jest`
  1. Install some babel packages
    ```shell
    $ yarn add -D @babel/preset-react @babel/preset-typescript babel-jest @babel/core @babel/preset-env @types/jest
    $ yarn add -D jest-transform-stub
    ```

  2. Create a `.babelrc` file
    ```json
    {
      "presets": [
        ["@babel/preset-env", { "targets": { "node": "current" } }], 
        "@babel/preset-react", 
        "@babel/preset-typescript"
      ]
    }
    ```

  3. Update the  `jest.config.js` 
    - This allows you to define where all the files are
    - You can add this to your `package.json` file if you wantp
      ```js
      module.exports = {
        testEnvironment: "jsdom",
        setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
        roots: ["<rootDir>/src"],
        testRegex: "(/src/.*.(test|spec)).(jsx?|tsx?)$",
        moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
        collectCoverage: true,
        collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],
        coverageDirectory: "<rootDir>/coverage/",
        coveragePathIgnorePatterns: ["(tests/.*.mock).(jsx?|tsx?)$", "(.*).d.ts$"],
        verbose: true,
        transform: {
          "\\.[jt]sx?$": "babel-jest",
          ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$": "jest-transform-stub",
        },
      };
      ```


## Create-React-App
- Not really a bundler but it does abstract all the webpack stuff for you and it focused on React web applications
  ```shell
  $ npx create-react-app <PROJECT_NAME>
  $ npx create-react-app <PROJECT_NAME> --template typescript
  ```




## Parcel
- [Parcel](https://parceljs.org/) homepage
  ```shell
  $ npm init -y
  $ npm i parcel-bundler
  ```
- Update the `package.json` file
  ```json
  {
    "scripts": {
      "start": "parcel -p 8080 watch public/index.html",
      "build": "parcel build public/index.html"
    }
  }
  ```
- Create a `public/index.html` file
  ```html
  <html>
  <body>
    <script src="../src/index.js"></script>
  </body>
  </html>
  ```
- Create a `src/index.html` file
  ```html
  console.log("hello Parcel")
  ```
- Add Typescript & react
  ```shell
  $ npm i react react-dom
  ```
- Update a `public/index.html` file
  ```html
  <html>
  <body>
    <div id="root"></div>
    <script src="../src/index.tsx"></script>
  </body>
  </html>
  ```
- Create a `src/index.tsx`
  ```js
  import React from 'react'
  import ReactDOM from 'react-dom'

  console.log('Hello from tsx!')

  ReactDOM.render(
    <p>Hello</p>,
    document.getElementById('root'),
  )
  ```
- Create a `tsconfig.json`
  ```json
  {
    "compilerOptions": {
      "jsx": "react"
    }
  }
  ```



















---

# Hooks
- Changes the way you write your components
- Functional and Class-based components, Hooks allow us to 
- Hooks replace class-only functionality
- Hooks can only be used in Functional Components (not class-based components)
- Hooks are named with the prefix `use`, just a rule that the React team came up with
- Highly reusable and independent for each components
- Hooks allows you to `add state` to functional components & `share logic` across components 
- Hooks have `nothing` to do with Lifecycles Methods `Lifecycle Hooks`
- They are called `hooks` because they hook into certain functionality into your component
- Hooks were introduced in `16.8` 
- You can create your own custom hooks

- Simple Hooks rules:
  1. Used only with *Functional components*
  2. Only call them at the *top level* of a Functional component, *cannot nest hooks*. They **don't work inside** of regular JS functions, nested functions, or loops
  3. Exceptions to the rule is when building your own custom hooks



## Before Hooks
- Functional Component
  - props in, JSX out
  - Great for presentation
  - Focused on one/few purposes
  - no lifecycle react methods

- Class-Based components
  - uses props & state
  - Business logic goes here
  - Orchestrates components

- Before Hooks statefull components were tied to a Class based component
- Class based components:
  ```js
  import React, { Component } from "react";

  export default class ClassBase extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }

    render() {
      return (
        <button onClick={() => this.setState({ count: this.count + 1 })}>
          {this.state.count}
        </button>
      );
    }
  }

  ```
- Now with Hooks:
  ```js
  import React, { useState } from "react";

  export default function FuncBase() {
    const [count, setCount] = useState(0);
    return <button onClick={()=> setCount(count + 1)}>{count}</button>;
  }
  ```


## useState
- Probably the most used hook
- To deal with reactive data
- Allows you to do state management within a Functional component
- Best to use one useState hook per state value 
- desctructure the useState value 
- format => `const [theStateValue, setterFunction ] = useState(initialValue)`
- Example:
  ```js
  import React, { useState } from "react";

  export default function FuncBase() {
    const [count, setCount] = useState(0);
    return (
      <button onClick={()=> setCount(count + 1)}>{count}</button>
    );
  }
  ```

## useEffect
- Class based lifecycle methods (componentWillMount, componentDidMount, componentWillUnMount)
  ```js
  import React, { Component } from "react";

  export default class ClassBase extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }

    componentWillMount() {
      console.log("will initialized");
    }
    componentDidMount() {
      console.log("initialized, added to the UI, only happens once");
    }
    componentDidUpdate() {
      console.log("state updated");
    }
    componentWillUnMount() {
      console.log("destroyed, component removed from UI");
    }

    render() {
      return (
        <button onClick={() => this.setState({ count: this.count + 1 })}>
          {this.state.count}
        </button>
      );
    }
  }
  ```

- Example:
  ```js
  import React, { useEffect } from "react";

  export default function App() {
    const [count, setCount] = React.useState(0);

    useEffect(() => {
      console.log("[RUN] when mounted & when state changes");
    });

    useEffect(
      () => {
        console.log("[RUN] once when first initialized");
      },
      [] // Empty Array of dependencies, means run once
    );

    useEffect(
      () => {
        console.log("[RUN] whenever the `count` changes");
      },
      [count] // Array of dependencies
    );

    useEffect(
      () => {
        // Cleanup
        return () => console.log("goodbye component");
      },
      [] // Array of dependencies
    );

    return (
      <button onClick={() => setCount(count + 1)}>{count}</button>
    );
  }

  ```


## useContext
- This hook allows you to work with React's context API, which is a mechanism to share data without passing props down the entire component tree
- Any component can read it, no matter how deep it is.
- Steps
  1. Create a context with `createContext()`
  2. Wrap the highest most parent you want with a `.Provider`
  3. Access the context with `useContext()`

- Example
  ```js
  import React, { createContext, useContext } from "react";

  // Create a context with default value
  const ThemeContext = createContext();

  export default function App() {
    // Wrap your application with a `Provider` set a value for your context
    // Any component can read it, no matter how deep it is.
    return (
      <ThemeContext.Provider value="dark">
        <SomeComponent />
        <OldWay />
      </ThemeContext.Provider>
    );
  }

  function SomeComponent() {
    const theme = useContext(ThemeContext);
    return <div>{theme}</div>;
  }

  function OldWay() {
    return (
      <ThemeContext.Consumer>
        {(theme) => <div>...{theme}</div>}
      </ThemeContext.Consumer>
    );
  }

  ```
- Before hooks you had to use the `Consumer` component


## useReducer
- different way of managing state, the redux pattern can help with large apps
- Very similar to redux, instead or changing the state, you dispatch actions that then hits a reducer function that updates the store
- action -> reducer -> store -> UI
- Action is just an object that has the shape of `{type:'', payload:''}`
- `useReducer(<reducer_switch_statement>, <initial_state>);`
- example:
  ```js
  import React, { useReducer } from "react";

  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return state + 1;
      default:
        throw new Error();
    }
  }

  const initialState = 0
  export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleClick = () => dispatch({ type: "increment" });
    return (
      <>
        <p>Count: {state}</p>
        <button onClick={handleClick}>update</button>
      </>
    );
  }
  ```


## useMemo
- Help you optimize computation cost for improved performance
- Use this hook as an *opt-in* tool for expensive calculations you don't want to happen on every render
- Opt-in when you have expensive computations
- Think of Memo`iz`ation  as Memo`riz`ation... If you had a calculation that happens frequently like `666666*123` instead of having to compute it in your brain you can just `memorize` the output. Kinda similar with computers when using React, there is no need to re-compute something that hasn't changed. Because React will re-render when props change we can avoid unnecessary re-rendering of a component.
- memoization *cache results* of function call
- `useMemo` for memoizing return values
- `useMemo(<Expensive_Computation_Function>, <Array_of_Dependencies>);`
- Example:
  ```js
  import React, { useMemo, useState } from "react";

  export default function App() {
    const [count] = useState(99);

    const expensiveCount = useMemo(() => count ** 2, [count]);

    return (
      <>
        <p>count: {count}</p>
        <p>expensiveCount: {expensiveCount}</p>
      </>
    );
  }
  ```


## useCallback
- This hook is useful when you have a component with a child frequently re-rendering, and you pass a callback to it
- The `useCallback()` hook returns (aka memoizes) the function instance between renderings
- `useCallback()` solves the problem of *functions equality check*
- A function definition share the same code source but when used they are different function objects. 
- Comparing them one implementation to the second evaluates to false.
- When you have a function inside of component every rendering of the component will result in a different *function object*. 
- A few inline functions per component are acceptable, cause it's cheap to re-create small functions
- But in some cases you need to maintain one function instance between renderings
- A few inline functions per component are acceptable. The optimization costs more than not having the optimization. As well as increase the code complexity
- When to use `useCallback()`
  - If your component renders big list of items, you don't want to have to re create all the items everytime the parent changes and the list remains the same. `useCallback()` returns the same function object.

- Example:
```js
import React, { useCallback } from 'react';

export default function MyParent({ items }) {
  const onItemClick = useCallback(event => {
    console.log('You clicked ', event.currentTarget);
  }, [items]);

  return (
    <>
      <SomeLargeList items={items} onItemClick={onItemClick} />
    </>
  );
}
```




## useRef
- `useRef` hook allows you to create persisted mutable values (also known as references or refs), as well as access DOM elements.
- Useful is you want to grab HTML values from the JSX
- Allows you to create a mutable object that will keep the same reference between renders
- **mutable value does not re-render the UI**
- can grab native HTML elements from JSX
- One important note is that changing the ref value will *not re-render the component*
- `useRef(initialValue)` is a built-in React hook that accepts one argument as the initial value and returns a reference (aka ref).
- A reference is an object having a special property current.
  ```js
  import React, { useRef } from "react";

  export default function App() {
    const countRef = useRef(0);

    const handle = () => {
      countRef.current++;
      console.log(`Clicked ${countRef.current} times, BUT DIDN'T RE-RENDER like useState would`);
    };

    console.log("I rendered once!");

    return (
      <>
        <button onClick={handle}>Click me</button>
      </>
    );
  }
  ```
- More common way to use `useRef` is to grab HTML elements from the JSX
- There are 2 rules to remember about references:
  1. The value of the reference is persisted (stays the same) between component re-renderings;
  2. Updating a reference doesn’t trigger a component re-rendering.
- Referencing a DOM element
  ```js
  import React, { useRef, useEffect } from 'react';

  function AccessingElement() {
    const elementRef = useRef();

    useEffect(() => {
      const divElement = elementRef.current;
    }, []);

    return (
      <div ref={elementRef}>
        I'm an element
      </div>
    );
  }
  ```


## useImperativeHandle
- ...


## useLayoutEffect
- It works just like the `useEffect` hook, with one small difference, you callback will run after render but before painting to screen
- React will way for you code to finish running before it updates the UI (*Caution* this will block visual updates until your callback is finished)



## useDebugValue
- Makes it possible to define you own custom hooks
- This will show the value in the `react-dev-tools`

## Custom Hook
- Building your own custom Hook is essentially extracting code that uses one or more built in hooks to make it reuseable
- For example let's say you use `useState` & `useEffect` together for a functionality, you could bundle this logic up into a custom hook
- Before bundling logic into a hook:
  ```js
  import React, {useEffect, useState} from 'react';

  function App(){
    const [displayName, setDisplayName] = useState();

    useEffect(()=>{
      const data = fetchFromDatabase(props.userId);
      setDisplayName(data.displayName);
    }, []);

    return <button>{displayName}</button>
  }
  ```

- Bundle up the display name logic into a hook
  ```js
  import React, {useEffect, useState} from 'react';

  function useDisplayNAme(){
    const [displayName, setDisplayName] = useState();

    useEffect(()=>{
      const data = fetchFromDatabase(props.userId);
      setDisplayName(data.displayName);
    }, []);

    useDebugValue(displayName ?? 'loading...'); // show the value in `react-dev-tools`
    return displayName;
  }

  function App(){
    const displayName = useDisplayName();
    return <button>{displayName}</button>
  }
  ```

## Custom REST Fetch Hook
  ```js
  import { useState, useEffect } from 'react'
  import axios from 'axios'

  export default function useFetchData(url: string) {
    const [isLoading, setIsLoading] = useState(false)
    const [apiData, setApiData] = useState(null)
    const [serverError, setServerError] = useState(null)

    useEffect(() => {
      setIsLoading(true)
      const fetchData = async () => {
        try {
          const resp = await axios.get(url)
          const data = await resp?.data

          setApiData(data)
          setIsLoading(false)
        } catch (error) {
          setServerError(error)
          setIsLoading(false)
        }
      }

      fetchData()
    }, [url])

    return { isLoading, apiData, serverError }
  }
  ```

  ```js
  import useFetchData from '../hooks/use-fetch-data'
  import config from '../config'

  export default function RocketMan() {
    const { isLoading, serverError, apiData } = useFetchData(config.dataUrl)

    console.log(isLoading, serverError, apiData)

    return <div>{apiData && <pre>{JSON.stringify(apiData, null, 1)} </pre>}</div>
  }
  ```




# Creating a component library

1. Scafold the component library
  ```shell
  $ yarn create vite
  $ npm init vite

  # Cleanup (delete the web application)
  $ rm -rf index.html 
  $ rm -rf src
  ```

2. Add some linting
  ```shell
  $ mkdir .vscode
  $ touch .vscode/settings.json .prettierrc .eslintrc

  $ yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier eslint-config-prettier eslint-plugin-prettier @trivago/prettier-plugin-sort-imports
  ```
  - `./eslintrc`
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
  - `./prettierrc`
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
  - package.json 
    ```json
    {
      "scripts":{
        "lint": "prettier --write src/**/*.{j,t}s{,x}"
      }
    }
  - Type definitions (create a file called `src/types/static.d.ts`)
    ```ts
    /* Use this file to declare any custom file extensions for importing */
    /* Use this folder to also add/extend a package d.ts file, if needed. */

    /* CSS MODULES */
    declare module '*.module.css' {
      const classes: { [key: string]: string }
      export default classes
    }
    declare module '*.module.scss' {
      const classes: { [key: string]: string }
      export default classes
    }
    declare module '*.module.sass' {
      const classes: { [key: string]: string }
      export default classes
    }
    declare module '*.module.less' {
      const classes: { [key: string]: string }
      export default classes
    }
    declare module '*.module.styl' {
      const classes: { [key: string]: string }
      export default classes
    }

    /* CSS */
    declare module '*.css'
    declare module '*.scss'
    declare module '*.sass'
    declare module '*.less'
    declare module '*.styl'

    /* IMAGES */
    declare module '*.svg' {
      const ref: string
      export default ref
    }
    declare module '*.bmp' {
      const ref: string
      export default ref
    }
    declare module '*.gif' {
      const ref: string
      export default ref
    }
    declare module '*.jpg' {
      const ref: string
      export default ref
    }
    declare module '*.jpeg' {
      const ref: string
      export default ref
    }
    declare module '*.png' {
      const ref: string
      export default ref
    }

    ```
3. Configure for component library
  - Update the `vite.config.ts` file
    ```ts
    import react from '@vitejs/plugin-react'
    import path from 'node:path'
    import { defineConfig } from 'vite'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      build: {
        sourcemap: true,
        lib: {
          entry: path.resolve(__dirname, 'src/main'),
          name: 'AWESOME',
          formats: ['esm', 'umd', 'cjs'],
          fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
            assetFileNames: (assetInfo) => {
              if (assetInfo.name == 'style.css') return 'styles.css'
              return assetInfo.name
            },
          },
        },
      },
    })
    ```
4. Add some files
- Create a Button component
  ```shell
  $ mkdir src
  $ touch src/main.ts
  $ mkdir src/components
  $ mkdir src/components/Button
  $ touch src/components/Button/Button.tsx src/components/Button/index.ts
  ```

- `./src/components/Button/index.ts`
  ```ts
  export { default } from './Button'
  ```
- `./src/components/Button/Button.module.css`
  ```css
  .wrapper{
    border: solid 1px black;
    border-radius: 4px;
    background-color: white;
  }
  ```

- `./src/components/Button/Button.tsx`
  ```ts
  import styles from './Button.module.css'

  type Props = {
    title: string
  }
  export default function Button({ title }: Props) {
    return <button className={styles.wrapper}>{title}</button>
  }
  ```
- `./src/main.ts`
  ```ts
  export { default as Button } from './components/Button'
  ```

5. Add `file` config block to the `package.json`
  - If you publish this component library it will only include the package.json & dist folder
  ```json
  {
    "files": [
      "dist/"
    ]
  }
6. Add Storybook
  - init storybook
    ```shell
    $ npx sb init --builder @storybook/builder-vite
    ```
  - Update the package.json
    ```json
    {
      "scripts": {
        "start": "start-storybook -p 6006",
        "build": "tsc && vite build",
        "lint": "prettier --write src/**/*.{j,t}s{,x}",
        "build-storybook": "build-storybook"
      }
    }
    ```
7. Add your first story `,.src/components/Button/Button.stories.tsx`

  ```tsx
  import { ComponentStory, ComponentMeta } from '@storybook/react'

  import { Button } from '../../main'

  export default {
    title: 'Core/Button',
    component: Button,
    argTypes: {
      backgroundColor: { control: 'color' },
    },
  } as ComponentMeta<typeof Button>

  const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

  export const Primary = Template.bind({})
  Primary.args = {
    title: 'hello',
  }
  ```














---


# Advanced React Stuff

## Fetching data
- Simple data fetching with the native `fetch` api
  ```js
  export const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)

    if (!url) {
      console.error('No endpoint provided; could not fetch')
      setIsLoading(true)
      setData(null)
      return
    }

    async function fetchData() {
      const response = await fetch(url, headers,body,credentials, method, signal)
      const json = await response.json()
      setData(json)
      setIsLoading(false)
    }

    useEffect(() => {
      fetchData()
    }, [url])
    return { data, isLoading }
  }
  ```
- Aborting a API request with `AbortController`

```js

const controller = new AbortController()
const signal = controller.signal
const abort = controller.abort()






```










## Error Boundaries

## How to use ReactDOM.createPortal()
- [stackoverflow](https://stackoverflow.com/questions/46393642/how-to-use-reactdom-createportal-in-react-16)
- [understanding-react-portals](https://blog.bitsrc.io/understanding-react-portals-ab79827732c7)















# State Management
- State management creates a concrete & predictable data structure for sharing data across components
- In JS, data from the interactions form state
- State can also be seen as data over time of a item
- You can also view `state` as current `status` of something (app, component, element)
- Theres several was to manage state for an application let's check out a few of them


## `useState` & `useReduer`
- The `useState` hook is perfect for small amounts of local component state. 
- Each `useState` call should hold a single value, and while you can make that one value an object that contains a bunch of other values, it’s a better idea to split them up.
- In larger applications there will be alot of `useState` hooks and could start to get a little more difficult to manange
- Once you get ~5 `useState` calls in a single component you might want to think of a better stategy like `useReducer` which is basically the redux pattern but baked into the React library (dispatch an action -> reducer -> store -> UI)

  ```js
  import React, { useReducer } from "react";

  function reducer(state, action) {
    switch (action.type) {
      case "incrementValue1":
        return { ...state, value1: state.value1 + 1 };
      case "incrementValue2":
        return { ...state, value2: state.value2 + 1 };
      default:
        throw new Error();
    }
  }

  const ComponentA = ({ value, dispatch }) => {
    const handleClick = () => dispatch({ type: "incrementValue1" });
    return (
      <>
        <h1>The value is: {value}</h1>
        <button onClick={handleClick}>Increment value 1</button>
      </>
    );
  };

  const ComponentB = ({ value, dispatch }) => {
    const handleClick = () => dispatch({ type: "incrementValue2" });
    return (
      <>
        <h1>The value is: {value}</h1>
        <button onClick={handleClick}>Increment value 2</button>
      </>
    );
  };

  const initialState = { value1: 0, value2: 0 };
  export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <>
        <ComponentA value={state.value1} dispatch={dispatch} />
        <ComponentB value={state.value2} dispatch={dispatch} />
      </>
    );
  }

  ```


## React Context API as State Management
- A step above `useState` & `useReducer` is `useContext`
- You probably want to use this hook if you find yourself `prop drilling`, aka passing props down several child levels manually
- Context provides a way to pass data through the component tree without having to pass props down manually at every level.
- Despite its simplicity, Context has one important downside though, and that’s performance, unless you’re very careful about how you use it.
- The reason is that every component that calls useContext will re-render when the Provider’s value prop changes. 
- The downside of the Context API is that every time one of those values changes, every component that uses any of them would re-render.
- To avoid that pitfall, store small chunks of related data in each Context, and split up data across multiple Contexts (you can have as many as you want). 
  ```js
  import { createContext, useContext, useState } from "react";

  const MyContext = createContext();

  const MyProvider = (props) => {
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const store = { value1: [value1, setValue1], value2: [value2, setValue2] };
    return (
      <MyContext.Provider value={store}>{props.children}</MyContext.Provider>
    );
  };

  const ComponentA = () => {
    const { value1 } = useContext(MyContext);
    const [stateValue1, setStateValue1] = value1;

    const handleSetValue1 = () => setStateValue1(stateValue1 + 1);

    return (
      <>
        <h1>The value is: {stateValue1}</h1>
        <button onClick={handleSetValue1}>Increment value 1</button>
      </>
    );
  };

  const ComponentB = () => {
    const { value2 } = useContext(MyContext);
    const [stateValue2, setStateValue2] = value2;

    const handleSetValue2 = () => setStateValue2(stateValue2 + 1);

    return (
      <>
        <h1>The value2 is: {stateValue2}</h1>
        <button onClick={handleSetValue2}>Increment value 2</button>
      </>
    );
  };

  export default function App() {
    return (
      <MyProvider>
        <ComponentA />
        <ComponentB />
      </MyProvider>
    );
  }

  ```




## Third-Party State Management Library - Redux


## Third-Party State Management Library -  @reduxjs/toolkit





## Third-Party State Management Library -  Zustand
- [Zustand](https://zustand.surge.sh/) A small, fast and scaleable bearbones state-management solution.
  ```js
  import create from "zustand";

  const useStore = create((set) => ({
    value1: 0,
    value2: 0,
    setValue1: () => set((state) => ({ value1: state.value1 + 1 })),
    setValue2: () => set((state) => ({ value2: state.value2 + 1 })),
    removeAllBears: () => set({ bears: 0 })
  }));

  const ComponentA = ({ value, setValue }) => {
    const handleClick = () => setValue(value + 1);
    return (
      <>
        <h1>The value is: {value}</h1>
        <button onClick={handleClick}>Increment value 1</button>
      </>
    );
  };

  const ComponentB = ({ value, setValue }) => {
    const handleClick = () => setValue(value + 1);
    return (
      <>
        <h1>The value is: {value}</h1>
        <button onClick={handleClick}>Increment value 2</button>
      </>
    );
  };

  export default function App() {
    const { value1, value2, setValue1, setValue2 } = useStore((state) => state);

    return (
      <>
        <ComponentA value={value1} setValue={setValue1} />
        <ComponentB value={value2} setValue={setValue2} />
      </>
    );
  }
  ```
- Fetching data
  ```js
  const useStore = create(set => ({
    fishies: {},
    fetch: async pond => {
      const response = await fetch(pond)
      set({ fishies: await response.json() })
    }
  }))
  ```
- Read from state in actions
  ```js
  const useStore = create((set, get) => ({
    sound: "grunt",
    action: () => {
      const sound = get().sound
      // ...
    }
  })
  ```
- Redux Devtools
  ```js
  import { devtools } from 'zustand/middleware'

  // Usage with a plain action store, it will log actions as "setState"
  const useStore = create(devtools(store))
  // Usage with a redux store, it will log full action types
  const useStore = create(devtools(redux(reducer, initialState)))
  ```
- Zustand with `simple-zustand-devtools`
  ```js
  import createStore from 'zustand';
  import { mountStoreDevtool } from 'simple-zustand-devtools';

  export const [useStore, store] = createStore(set => {
    // create your zustand store here
  });

  if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store', store);
  }
  ```
- Zustand with `simple-zustand-devtools`
  ```js
  import createStore from "zustand"; // `createStore` instead of `create`
  import { mountStoreDevtool } from "simple-zustand-devtools";

  export const [useStore, store] = createStore((set) => ({
    value1: 0,
    value2: 0,
    setValue1: () => set((state) => ({ value1: state.value1 + 1 })),
    setValue2: () => set((state) => ({ value2: state.value2 + 1 })),
    removeAllBears: () => set({ bears: 0 })
  }));
  mountStoreDevtool("Store", store);

  const ComponentA = ({ value, setValue }) => {
    const handleClick = () => setValue(value + 1);
    return (
      <>
        <h1>The value is: {value}</h1>
        <button onClick={handleClick}>Increment value 1</button>
      </>
    );
  };

  const ComponentB = ({ value, setValue }) => {
    const handleClick = () => setValue(value + 1);
    return (
      <>
        <h1>The value is: {value}</h1>
        <button onClick={handleClick}>Increment value 2</button>
      </>
    );
  };

  export default function App() {
    const { value1, value2, setValue1, setValue2 } = useStore((state) => state);

    return (
      <>
        <ComponentA value={value1} setValue={setValue1} />
        <ComponentB value={value2} setValue={setValue2} />
      </>
    );
  }
  ```
  - Open the `Components` Chrome dev tools panel and you should see a `devtool` tree item on the left 



## Using React-Query to deal with data from servers
- React-Query is for fetching data in an React Application
- Since React is a UI library, there isn't a specific defined pattern for data fetching
- What we typically do is use `useEffect` & `useState` hooks to maintain component state like loading,error,data
- When data i used throughout the app we tend to use state management libraries like redux,zustand, or even context for `client state`
- `State management` libraries are not great at working with asynchromous or server state
- `Client State` persist in your app memory and accessing it or updating it is synchronous
- `Server State` persiste remotely and requires asynchonous APIS for fetching or updating the data. What is most challeging with `server state` is caching, deduping multiple request for the same data, updating stale data in the background, performance optimizations... this is where `react-query` comes in



1. Wrapper your app with the ReactQuery provider
  ```ts
  import { QueryClient, QueryClientProvider } from 'react-query'
  import { ReactQueryDevtools } from 'react-query/devtools'

  import './App.css'
  import Films from './components/Films'

  const queryClient = new QueryClient()

  export default function App() {
    return (
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <Films />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    )
  }
  ```
2. Use the `useQuery` hook to fetch data
  ```ts
  import { useQuery } from 'react-query'

  import { api } from '../services/api'
  import fetch from '../util/fetch'

  type Films = {
    filmId: number
    episode_id: string
    title: string
    release_date: string
  }

  export default function Films() {
    const { data, status, error } = useQuery('films', () => fetch(api.films.get))

    if (status === 'loading') {
      return <p>Loading...</p>
    }
    if (status === 'error' || error) {
      return <p>Error :(</p>
    }

    return (
      <div>
        <h1>Dashboard</h1>
        {data.results.map((film: Films) => {
          return (
            <article key={film.episode_id}>
              <h6>
                {film.episode_id}. {film.title}{' '}
                <em>({new Date(Date.parse(film.release_date)).getFullYear()})</em>
              </h6>
            </article>
          )
        })}
      </div>
    )
  }
  ```









# Mocking 


# MSW (Mock Service Workers)


1. Create files & directories
  ```shell
  $ yarn add msw --dev
  $ mkdir src/mocks src/mocks/handlers src/mocks/data
  $ touch src/mocks/index.ts src/mocks/handlers/films.ts src/mocks/data/films.json
  ```
2. Create your first mock REST API route
  - `./src/mocks/index.ts`
    ```ts
    import filmHandlers from './handlers/films'
    export const handlers = [...filmHandlers]
    ```

  - `./src/mocks/handlers/films.ts`
    ```ts
    import { rest } from 'msw'

    import config from '../../config'
    import filmsData from '../data/films.json'

    export const URLS = `${config.apiUrl}/films`

    const filmHandlers = [
      rest.get(URLS, (req, res, ctx) => {
         return res(ctx.delay(1000), ctx.status(200), ctx.json(filmsData))
      }),
      // rest.get(`${URLS}/:id`, (req, res, ctx) => {
      //   return res(ctx.status(200), ctx.json(filmsData))
      // }),
      // rest.post(URLS, (req, res, ctx) => {
      //   return res(ctx.status(200), ctx.json(filmsData))
      // }),
      // rest.put(`${URLS}/:id`, (req, res, ctx) => {
      //   const { body } = req
      //   return res(ctx.status(200), ctx.json(body))
      // }),
      // rest.delete(`${URLS}/:id`, (req, res, ctx) => {
      //   return res(ctx.status(200), ctx.json(filmsData))
      // }),
    ]
    export default filmHandlers
    ```

  - `./src/mocks/data/films.json`
    ```json
    {
      "count": 6,
      "next": null,
      "previous": null,
      "results": [
        {
          "filmId": 1,
          "episode_id": 4,
          "title": "A New Hope",
          "release_date": "1977-05-25"
        },
        {
          "filmId": 2,
          "episode_id": 5,
          "title": "The Empire Strikes Back",
          "release_date": "1980-05-17"
        },
        {
          "filmId": 3,
          "episode_id": 6,
          "title": "Return of the Jedi",
          "release_date": "1983-05-25"
        },
        {
          "filmId": 4,
          "episode_id": 1,
          "title": "The Phantom Menace",
          "release_date": "1999-05-19"
        },
        {
          "filmId": 5,
          "episode_id": 2,
          "title": "Attack of the Clones",
          "release_date": "2002-05-16"
        },
        {
          "filmId": 6,
          "episode_id": 3,
          "title": "Revenge of the Sith",
          "release_date": "2005-05-19"
        }
      ]
    }
    ```
3. Enable the MSW
  - Create the service worker 
    ```shell
    $ npx msw init public --save
    ```
  - Init the service worker in the app
    ```shell
    $ touch src/mocks/browser.ts
    ```
  - Add content to `./src/mocks/browser.ts`
    ```ts
    import { setupWorker } from 'msw'

    import { handlers } from './index'

    export const worker = setupWorker(...handlers)

    export function startMockServiceWorkers() {
      worker.start()
    }
    ```
  - Run the `startMockServiceWorkers()` function in your `./src/main.tsx`
    ```ts
    import { startMockServiceWorkers } from './mocks/browser'

    if (window.location.origin.includes('localhost')) startMockServiceWorkers()
    ```
4. Restart the local server
























































# Storybook
- Nextjs + typescript + storybook
  ```
  $ npx create-next-app -e with-typescript
  $ npx sb init
  ```

- CRA + typescript + storybook
  ```
  $ npx create-react-app my-app --template typescript
  $ npx sb init
  ```


