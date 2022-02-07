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
- boilerplates (Create-react-app, NEXT, Snowpack, Vite, Parcel)


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
















## Snowpack
- [Snowpack](https://www.snowpack.dev/) homepage
- Snowpack is a faster frontend build tool 
- what is the learning curve? "Once you try it, it's impossible to go back to anything else."
- Snowpack doesn't rebundle the entire application, it only 
- If you are familiar with `webpack`, you would know that while developing you would use the `webpack-dev-server`, everytime you save a file it rebuilds the entire application, rebundles, and serves it to the browser
- With `Snowpack` the massive benefit is that it bundles and caches all your dependencies and only rebuild/serve the changes that you make to your source code and only the files that you've changed instead of rebundling the entire application
- It's an insanely fast build tool

- Starting for a official boilerplate:
  ```shell
  $ npx create-snowpack-app <PROJECT_NAME> --template @snowpack/app-template-<NAME_NAME>
  $ npx create-snowpack-app <PROJECT_NAME> --template @snowpack/app-template-react-typescript
  ```

  ```html
  @snowpack/app-template-blank
  @snowpack/app-template-blank-typescript
  @snowpack/app-template-11ty
  @snowpack/app-template-lit-element
  @snowpack/app-template-lit-element-typescript
  @snowpack/app-template-preact
  @snowpack/app-template-preact-typescript
  @snowpack/app-template-react
  @snowpack/app-template-react-typescript
  @snowpack/app-template-svelte
  @snowpack/app-template-svelte-typescript
  @snowpack/app-template-vue
  @snowpack/app-template-vue-typescript
  ```

- Let get it setup manually:

1. Install `snowpack` as a dev dependency
  ```shell
  $ npm init -y
  $ npm install --save-dev snowpack
  ```
2. Update your `package.json` file
  ```json
  {
    "scripts": {
      "start": "snowpack dev",
      "build": "snowpack build"
    },
  }
  ```
3. Create a `./public/index.html`
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Snowpack</title>
  </head>
  <body>
    <h1>Hello snowpack!!</h1>
  </body>
  </html>
  ```
4. Create a `snowpack.config.js` file
  ```js
  // Snowpack Configuration File
  // See all supported options: https://www.snowpack.dev/reference/configuration

  /** @type {import("snowpack").SnowpackUserConfig } */
  module.exports = {
    mount: {
      public: { url: "/", static: true },
      src: "/src",
    }
  };
  ```
5. Run snowpack for the first time
  - Run:
    ```shell
    $ npm start
    ```
  - When you run this for the first time it will just reload the changes to the html file cause you haven't referenced a js script yet
6. Let's add React
  - **Snowpack will deal with all the babel stuff for you!** so no need to deal with babelrc files
  - **Note** If you are working with a `React` app you make your entry file `./src/index.jsx` and reference the files as `./src/index.js` in your `./public/index.html` file. Snowpack will deal with the rest. When it compiles from a `jsx` to a `js` file we will have that  `./src/index.js`
  - Run:
    ```shell
    $ npm i react react-dom
    ``` 
  - Create a `./src/index.jsx` file
    ```js
    import React from "react";
    import ReactDOM from "react-dom";

    import App from './App.jsx'

    ReactDOM.render(<App />, document.getElementById('root'));
    ```
  - Create a `./src/App.jsx` file
    ```js
    import React from 'react'

    export default function App(){
      return <div>Hello React with snowpack</div>
    }
    ```
  - Update the `./public/index.html`
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hello Snowpack & React</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="../src/index.js"></script>
    </body>
    </html>
    ```
7. Add `CSS Modules` at not cost!
  - Create a `./src/styles.module.css` file and add:
    ```css
    .main{
      color: red;
    }
    ```
  - You can add this to your `./src/App.jsx` file 
    ```js
    import React from 'react'
    import styles from './styles.module.css'

    export default function App() {
      return <div className={styles.main}>Hello React with snowpack</div>
    }
    ```


8. Convert your `js` to `ts`
  - Change all your `jsx|js` files inside of the `./src/*` folder
  - Install some dependencies:
    ```shell
    $ npm i -D typescript @types/react @types/react-dom @snowpack/plugin-typescript
    ```
  - Add a `./tsconfig.json` file with:
    ```json
    {
      "compilerOptions": {
        "module": "ESNext",
        "target": "ESNext",
        "strict": true,
        "moduleResolution": "node",
        "esModuleInterop": true,
        "jsx": "preserve",
        "noEmit": true,
        "skipLibCheck": true,
        "typeRoots": [
          "node_modules/@types",
          "types"
        ]
      },
      "include": [
        "src",
        "types"
      ]
    }
    ```
  - Add some type for images and css-modules
    ```js
    // `./types/css.d.ts`
    declare module '*.css' {
      const classNames: { [className: string]: string };
      export default classNames;
    }
    ```
    ```js
    // `./types/images.d.ts`
    declare module '*.png';
    declare module '*.jpg';
    declare module '*.svg';
    ```

  - Add some file alias to your `./snowpack.config.js` files
    ```js
    module.exports = {
      alias: {
        "@/components": "./src/components",
      }
    };
    ```

  - Add alias to your `./tsconfig.json` file 
    ```json
    {
      "compilerOptions": {
        "baseUrl": "./src",
        "paths": {
          "@/components/*": ["components/*"]
        }
      }
    }
    ```
  - Rerun `$ npm start`

### Adding Testing with (@web/test-runner & chai)
  - Snowpack supports all of the popular JavaScript testing frameworks that you’re already familiar with. Mocha, Jest, Jasmine, AVA and Cypress are all supported in Snowpack applications, if integrated correctly.
  - Snowpack ships pre-built Jest configuration files for several popular frameworks. If you need to use Jest for any reason,consider extending one of these packages: `@snowpack/app-scripts-react`, `@snowpack/app-scripts-preact`, `@snowpack/app-scripts-svelte`
  - The people at snowpack strongly recommend `@web/test-runner` (WTR) for testing in Snowpack projects.
    ```shell
    $ npm install --save-dev @web/test-runner @snowpack/web-test-runner-plugin chai @testing-library/react
    ```

  - Install packages
    ```shell
    $ npm i -D jest @snowpack/app-scripts-react @testing-library/react @testing-library/jest-dom
    ```
  - Create `jest.config.js` to extend the pre-built Jest configuration file
    ```js
    module.exports = {
      ...require('@snowpack/app-scripts-preact/jest.config.js')(),
    };
    ```

  - `@testing-library/react` =>  It provides light utility functions on top of react-dom and react-dom/test-utils
  - `@testing-library/jest-dom` => Checking for an element's attributes, its text content, its css classes, you name it (used jest to write tests that assert various things about the state of a DOM)
  - `react-test-render` => grab a snapshot of the "DOM tree" rendered by a React DOM or React Native component without using a browser or jsdom.

### Adding testing with (Jest & RTL)

- Install some dependencies
  ```shell
  $ npm i -D @snowpack/app-scripts-react @testing-library/jest-dom @testing-library/react identity-obj-proxy jest ts-jest
  ```

- Update your `package.json` scripts
  ```json
  {
    "scripts": {
      "start": "snowpack dev",
      "build": "snowpack build",
      "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\"",
      "lint": "prettier --check \"src/**/*.{js,jsx,ts,tsx}\"",
      "test": "jest --colors --watch",
      "test:once": "jest --colors",
      "pretest:coverage": "jest --colors --collectCoverage=true",
      "test:coverage": "npx http-server coverage/lcov-report"
    }
  }
  ```

- Update the `tsconfig.json` file
  ```json
  {
    "include": ["src", "types"],
    "compilerOptions": {
      "module": "esnext",
      "target": "esnext",
      "moduleResolution": "node",
      "baseUrl": "./",
      "paths": {
        // If you configured any Snowpack aliases, add them here.
      },
      "noEmit": true,
      "strict": true,
      "types": [ "snowpack-env"],
      "forceConsistentCasingInFileNames": true,
      "resolveJsonModule": true,
      "allowSyntheticDefaultImports": true,
      "importsNotUsedAsValues": "error",
      "jsx": "react-jsx"
    }
  }
  ```

- Create a `jest.config.js`
  ```js
  module.exports = {
    ...require('@snowpack/app-scripts-react/jest.config.js')(),
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.tsx$': 'ts-jest',
      '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    collectCoverageFrom: [
      '<rootDir>/src/**/*.{ts,tsx}',
    ],
    testPathIgnorePatterns : [
      "<rootDir>/ignore/this/path/" 
    ],
    coverageDirectory: '<rootDir>/coverage/',
    coveragePathIgnorePatterns: [
      '<rootDir>/src/index.ts',
      '(tests/.*.mock).(jsx?|tsx?)$', 
      '(.*).d.ts$'
  ],
    moduleNameMapper: {
      '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'identity-obj-proxy',
    },
    verbose: true,
    testTimeout: 30000,
    setupFilesAfterEnv: ['./jest.setup.js'],
  }
  ```
- Create a `jest.setup.js`
  ```js
  import '@testing-library/jest-dom/extend-expect'
  ```
### Using MSW with Snowpack?
- You need to update the `packageOptions`
- I believe this is because `msw` module depends on Node built-ins
  ```js
  /** @type {import("snowpack").SnowpackUserConfig } */
  module.exports = {

    packageOptions: {
      polyfillNode: true,
      external: [
        'crypto',
        'events',
        'fs',
        'http',
        'https',
        'net',
        'os',
        'path',
        'stream',
        'tls',
        'url',
        'zlib',
      ],
    }

  }
  ```
### Other snowpack configs tweaks






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


