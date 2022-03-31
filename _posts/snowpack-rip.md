
## Snowpack
- [Snowpack](https://www.snowpack.dev/) homepage
- Snowpack is a FAST frontend build tool 
- If you are familiar with `webpack`, you would know that while developing you would use the `webpack-dev-server`, everytime you save a file it rebuilds the entire application, rebundles, and serves it to the browser
- With `Snowpack` the massive benefit is that it bundles and caches all your dependencies and only rebuild/serve the changes that you make to your source code and only the files that you've changed instead of rebundling the entire application
- It's an insanely fast build tool
- Snowpack is focused on ESM

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
      "start": "snowpack dev --port 8080",
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

