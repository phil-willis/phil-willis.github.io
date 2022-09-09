---
title: 'Nextjs'
excerpt: ''
coverImage: '/assets/covers/nextjs.jpg'
ogImage:
  url: '/assets/covers/nextjs.jpg'
---


# Nextjs
- Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.
- A traditional React app is rendered clienside, where the browser starts with a shell of an HTML file lacking any rendered content. From there the browser fetches the JS files containing the react code to render content to the page and make it interactive
- A drawback of this is that your website is note reliably indexed by search engines or read by social media link bots
- Another drawback is that it can take longer to reach the first contentful paint when the user first lands on the site
- **Nextjs** is a framework that allows you to build a react app but render the content in advance during build phase to the first thing your user/search bot sees is the fully render HTML. After receiving this initial page the client-side rendering takes over and it works just like a traditional react app
- So Nextjs is a little opinionated on the folder structure
- The file structure in the `pages` folder mirrors the actual urls in the application
- Next can preform multiple server rendering strategies from a single project (SSG, SSR, ISR)
- Nextjs will make *static generation* (or pre-rendering) renders all pages at build time
- The site can be build and served by a CDN 
- Getting data for a REST API you can use `getStaticProps`
- You can also implement server-sde rendering ehivh build the HTML each time it's requested `getServerSideProps`
- Nextjs supports css modules out of the box with `<Name>.module.css` for a specific page or component and in the `styles/global.css` you can write styles for the entire application


## Get started
- Initialize your app
  ```shell
  # jsx version
  $ npx create-next-app <PROJECT_NAME>

  # OR with typescript
  $ npx create-next-app@latest --typescript <PROJECT_NAME>
  ```
  ```shell
  $ npm i -D serve
  ```
- Update the *npm scripts*
  ```json
  {
    "scripts": {
      "dev": "next dev -p 3000",
      "build": "next build && next export",
      "serve": "npm run build && serve out",
    }
  }
  ```
- Adding **file alias** all you need to do is provide a `jsconfig.json` | `tsconfig.json` with:
  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/components/*": ["components/*"],
        "@/libs/*": ["libs/*"],
        "@/pages/*": ["pages/*"],
        "@/models/*": ["models/*"]
      }
    }
  }
  ```


# Add Linting

```shell
$ npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-jest prettier eslint-config-prettier eslint-plugin-prettier
$ mkdir .vscode
$ touch .prettierrc .eslintrc .vscode/settings.json
$ mkdir components hooks utils
```

- `.eslintrc`
  ```json
  {
    "extends": [
      "next/core-web-vitals",
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
- `.prettierrc`
  ```json
  {
    "semi": false,
    "trailingComma": "all",
    "singleQuote": true,
    "printWidth": 100
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
- `./package.json`
  ```json
  {
    "scripts": {
      "lint": "prettier --write {components,hooks,pages}/**/*.tsx {components,hooks,pages}/*.tsx utils/**/*.ts"
    }
  }
  ```


# Adding Jest & React-Testing-Library
- Add testing
  - Add some packages:
    ```shell
    $ npm i -D jest ts-jest @testing-library/react @testing-library/jest-dom @testing-library/react-hooks
    $ npm i -D identity-obj-proxy
    $ touch jest.config.js jest.setup.ts tsconfig.jest.json
    ```
  - Create a `jest.config.js` file
    ```js
    module.exports = {
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      roots: [
        '<rootDir>/components',
        '<rootDir>/hooks',
        '<rootDir>/utils',
        '<rootDir>/pages',
      ],
      transform: {
        '^.+\\.tsx$': 'ts-jest',
        '^.+\\.ts$': 'ts-jest',
      },
      testRegex:
        '(/(components?|hooks?|utils?|pages?)/.*.(test|spec)).(jsx?|tsx?)$',
      moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
      collectCoverage: true,
      collectCoverageFrom: [
        '<rootDir>/{components,hooks,utils,pages}/**/*.{ts,tsx}',
      ],
      coverageDirectory: '<rootDir>/coverage/',
      coveragePathIgnorePatterns: [
        '(tests/.*.mock).(jsx?|tsx?)$',
        '(.*).d.ts$',
      ],
      moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$':
          'identity-obj-proxy',
      },
      verbose: true,
      globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.jest.json',
        },
      },
    }
    ```
  - Create a `jest.setup.ts` file
    ```ts
    import '@testing-library/jest-dom'
    // import 'whatwg-fetch' // If you are using browser's native `fetch` API
    ```
  - Update your npm scripts:
    ```json
    {
      "scripts": {
        "test": "jest --watchAll --collectCoverage=false",
        "test:once": "jest --colors",
        "pretest:coverage": "jest --colors --collectCoverage=true",
        "test:coverage": "npx http-server coverage/lcov-report"
      }
    }
    ```

  - Make a tsconfig just for Jest. Next.js needs `"jsx": "preserve"` but we want `"jsx": "react-jsx"` for jest [docs] (https://www.typescriptlang.org/docs/handbook/jsx.html#basic-usage)
    ```json
    {
      "extends": "./tsconfig.json",
      "compilerOptions": {
        "jsx": "react-jsx"
      }
    }
    ```
  - Make a test file
    ```tsx
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
- *Optional* If you are having ESLint issues with the build add this to your `next.config.js` file
  ```js
  module.exports = {
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
  }
  ```

# Add tailwindcss
- Install some packages:
  ```shell
  $ npm install -D tailwindcss postcss autoprefixer
  $ npx tailwindcss init -p
  $ touch tailwind.config.js
  ```
- Update the `tailwind.config.js`
  ```js
  module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  ```
- Update the `styles/globals.css`
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- Using CSS Modules with your components, Nextjs is prewired to use css-modules all you have to do is add `.modules.css` to your css files
  ```tsx
  import styles from './hello.module.css'
  type Props = {
    message: string
  }

  export default function Hello({ message }: Props) {
    return <div className={styles.wrapper}>{message}</div>
  }
  ```
  ```css
  .wrapper {
    @apply bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-md dark:bg-gray-900 text-sm text-cyan-200 p-4;
  }
  ```
- You can start using the **Tailwindcss** classes
  ```tsx
  type Props = {
    message: string
  }

  const styles = {
    wrapper:
      'bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-md dark:bg-gray-900 text-sm text-red-600 p-4',
  }
  export default function Hello({ message }: Props) {
    return <div className={styles.wrapper}>{message}</div>
  }
  ```
- Using CSS Modules with your components, Nextjs is prewired to use css-modules all you have to do is add `.modules.css` to your css files
  ```tsx
  import styles from './hello.module.css'
  type Props = {
    message: string
  }

  const 
  export default function Hello({ message }: Props) {
    return <div className={styles.wrapper}>{message}</div>
  }
  ```

  ```css
  .wrapper {
    @apply bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-md dark:bg-gray-900 text-sm text-cyan-200 p-4;
  }
  ```

# Adding Storybook
- Add some packages:
  ```shell
  $ npx -y sb init --builder webpack5
  $ yarn add -D @storybook/addon-postcss
  ```
- Update your `package.json`
  ```json
    {
      "resolutions": {
          "webpack": "^5"
      }
    }
    ```
- Update the `.storybook/main.js` file
  ```js
  const path = require('path')

  module.exports = {
    stories: [
      '../stories/**/*.stories.mdx',
      '../stories/**/*.stories.@(js|jsx|ts|tsx)',
      '../components/**/*.stories.mdx',
      '../components/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    staticDirs: ['../public'],
    addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      {
        /**
        * NOTE: fix Storybook issue with PostCSS@8
        * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
        */
        name: '@storybook/addon-postcss',
        options: {
          postcssLoaderOptions: {
            implementation: require('postcss'),
          },
        },
      },
    ],
    core: {
      builder: 'webpack5',
    },
    webpackFinal: (config) => {
      /**
      * Add support for alias-imports
      * @see https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391
      */
      config.resolve.alias = {
        ...config.resolve?.alias,
        '@': [
          path.resolve(__dirname, '../stories/'),
          path.resolve(__dirname, '../'),
        ],
        '@/components': path.resolve(__dirname, '../components/'),
        '@/pages': path.resolve(__dirname, '../pages/'),
      }

      /**
      * Fixes font import with /
      * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
      */
      config.resolve.roots = [
        path.resolve(__dirname, '../public'),
        'node_modules',
      ]

      return config
    },
  }
  ```
- Update the `.storybook/preview.js` file
  ```js
  import '../styles/globals.css'
  import * as NextImage from 'next/image'

  const OriginalNextImage = NextImage.default

  Object.defineProperty(NextImage, 'default', {
    configurable: true,
    value: (props) => <OriginalNextImage {...props} unoptimized />,
  })

  export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    previewTabs: {
      'storybook/docs/panel': { index: -1 },
    },
  }
  ```
- Create a React component
  ```tsx
  import styles from './hello.module.css'
  type Props = {
    message: string
    textColor?: string
  }

  export default function Hello({ message, textColor = 'red' }: Props) {
    return (
      <div className={styles.wrapper}>
        <span style={{ color: textColor }}>{message} </span>
      </div>
    )
  }
  ```
- Create a Storybook file in your `./components/` directory
  ```tsx
  import React from 'react'
  import { ComponentStory, ComponentMeta } from '@storybook/react'

  import Hello from './hello'

  export default {
    title: 'Components/Hello',
    component: Hello,
    argTypes: {
      textColor: { control: 'color' },
    },
  } as ComponentMeta<typeof Hello>

  const Template: ComponentStory<typeof Hello> = (args) => (
    <Hello {...args} />
  )

  export const Primary = Template.bind({})
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  Primary.args = {
    message: 'hello hello hello',
  }
  ```
<!-- https://theodorusclarence.com/blog/nextjs-storybook-tailwind -->


# Add Playwright
- Install the packages
  ```shell
  npm i -D @playwright/test
  # install supported browsers
  npx playwright install
  ```
- Update your `package.json` file
  ```json
  {
    "scripts": {
      "test:e2e": "playwright test",
      "test:e2e:debug": "PWDEBUG=1 playwright test --project=chromium",
      "test:e2e:headed": "playwright test --headed"
      }
  }
  ```
- Create a `playwright.config.ts` file
  ```ts
  import { PlaywrightTestConfig, devices } from '@playwright/test';

  const config: PlaywrightTestConfig = {
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    use: {
      trace: 'on-first-retry',
    },
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
      {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      },
      {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
      },
    ],
  };
  export default config;
  ```
 - Add some test `./e2e/index.spec.ts`
  ```ts
  import { test, expect } from '@playwright/test'

  test('basic test', async ({ page }) => {
    await page.goto('https://playwright.dev/')
    const title = page.locator('.navbar__inner .navbar__title')
    await expect(title).toHaveText('Playwright')
  })
  ```







# Start Developing
- Run the app local
  ```shell
  $ npm run dev
  ```
- The `./api` 
  - This directory is a special par of Nextjs for setting up routes that will only apply to the server
  - This could be userful cause the code you write here won't increase the client-side JS bundle that will be sent over the network
  - It's a useful feature if you have some work that needs to be done on the backend OR if you want to expose an API for your end users
- The `./pages/`
  - Routing for a Nextjs app is based of the files in the `./pages/` directory 
- The `./pages/_app.js` 
  - This is a is a wrapper around your entire applications, this is a good place to add navbars, headers, footers, and expecially authentification for your app
- Nextjs used hybrid rendering
  - If you have a site that is completely static (doesn't rely on any external REST API), all you have to do to build the application is run `$ next build` or `$ next build && next export`
  - If you have pages that relay on external data there are 4 way you can accomplish this
    1. Server-Side Rendering (SSR) with `getServerSideProps()` run-time you app will get fresh data every time
    2. Static Site Generation (SSG) using `getStaticProps()` at build-time it will make those fetch and hard code them in the application (drawback is the data is hard-code at build-time and you app will be stale if the REST service updates)
    3. **Incremental Static Regeneration** (ISR) allows you to statically generate a page and then regenerate it when new data comes in on an interval you decide
    4. You could just fetch the data inside your react components with `fetch`



## Fetching data from REST Service
- Use `getStaticProps` if you want to make the request at build time & `getServerSideProps` if you want to make the request each time at runtime
- The nice thing about Nextjs is that we can use both of these paradims throughout the application we are not limited to one or the other
- If you know in advance how many *dynamic* routes you have you want to use the `getStaticProps`. The `getStaticPaths` function tell next which dynamic pages to render
  ```js
  export async function getStaticProps() {
    const req = await fetch("https://api.spacexdata.com/v4/launches/latest");
    const launches = await req.json();

    return {
      props: { launches },
    };
  }

  export async function getStaticPaths() {
    return {
      paths: [],
      fallback: true,
    };
  }

  export default function app({ launches }) {
    return (
      <div>
        SpaceX next launch details: <span>{launches.details}</span>
      </div>
    );
  }
  ```


- If you want the data to be fetch every time the page loads you want to use `getServerSideProps` the code you have in the `getStaticProps` is the exact same thing **HOWEVER** does it on every request instead of at build time
  ```js
  export async function getServerSideProps() {
    const req = await fetch("https://api.spacexdata.com/v4/launches/latest");
    const launches = await req.json();

    return {
      props: { launches },
    };
  }

  export default function app({ launches }) {
    return (
      <div>
        SpaceX next launch details: <span>{launches.details}</span>
      </div>
    );
  }
  ```


## Routing
- The file structure in the `pages` folder mirrors the actual urls in the application
- The *pages* folder structure is also the routing for you applications
  ```shell
  pages
  ├── _app.js
  ├── api
  │   └── hello.js
  └── index.js
  ```
- The *pages* folder structure is also the routing for you applications
  ```shell
  pages
  ├── _app.js
  ├── api
  │   └── hello.js
  ├── search.js
  ├── profile.js
  └── user
    └── [id].js
  └── index.js
  ```
  - These would map to *http://localhost:3000*, *http://localhost:3000/search*, *http://localhost:3000/profile*, etc
- If you want a dynamic route make a file with the `[]` for the name for example: `./user/[param].js` and the route would be *http://localhost:3000/user/:id*
- Getting the dynamic route parameter

```js
// http://localhost:3000/user/:username
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function profile() {
  const router = useRouter();
  const { username } = router.query;

  // TODO: make a call the the DB for user profile

  return (
    <div>
      username: {username}
    </div>
  );
}
```
- Static routes have priority over dynamic ones
- If you are using the `<a href="">...</a>` you should use the `import Link from 'next/link'`
  ```js 
  import Link from 'next/link'

  function App(){
    return (
    <Link href="/thisrocks">
      <a>Awesome page</a>
    </Link>
    )
  }
  ```





## Server Rendering
- *Static-Side Generation* (SSG) or *Server-Side Rendering* (SSR)
- *SSG* or Static generation is pre-rendering, you generate all the html pages at build time. You can easily upload all the generated HTML files to storage bucket or static host and they can be delivered with very high performance over a CDN
- If you site has a large scale of pages that changes this might not be the best case
- *SSR*


## Data Fetching
- Next can preform multiple server rendering strategies from a single project
- SSG ()
- SSR 
- ISR 

## Nextjs - why?
1. Lambda (serverless) functions
  - These are functions that reside under the /api route of a Next.js app
  - server-side rendered React applications
  - These are routes that require fetching initial props from somewhere (using `getInitialProps` or `getServerSideProps`)
2. Static HTML
  - no dynamic content and the data is always the same
3. Static Site Generation (SSG)
  - Allow static site generation as one of the build options
  - These pages use the `getStaticProps` method to fetch the data that will be used to generate static HTML files, as well as `getStaticPaths` to get a list of all the subroutes that need to be generated as HTML files 
4. Incremental Static Regeneration (ISR)
  - It combines the benefits of server-side rendered pages and SSG by generating static HTML files on runtime. 


## Nextjs Tips
- Change the port dev works by updating the `dev` script in your package.json
  ```json
  "scripts": {
    "dev": "next dev -p 8080",
    "build": "next build",
    "start": "next start"
  },
  ```


# Creating and Deploying a Static Site to GitHub Pages
1. Create a static build
  - Add the build script to your package.json file
    ```json
    "scripts": {
      "build": "next build && next export"
    }
    ```
  - Build the static site:
    ```shell
    $ npm run build
    ```
  - This will create a directory called out which contains a fully static version of your website.

2. Create a new repo and push your code up
  - **Create a Github repo that contains your Github username and .github.io.**
  - For example my GitHub username is `phil-willis` and my repo name is `phil-willis.github.io`

3. Create a personal access token
  - Click the avatar > profile > `Developer setttings` > `Personal access token` or [click here](https://github.com/settings/tokens)
  ![gh-profile-settings](/assets/blog/github/gh-profile-settings.png)
  ![gh-personal-access-token](/assets/blog/github/gh-personal-access-token.png)
  ![gh-personal-access-token-scopes](/assets/blog/github/gh-personal-access-token-scopes.png)
  - note: `<repo_name> for github actions`
  - check the `repo` section
  - **DON'T FORGET TO COPY THE TOKEN**

4. In your repo's settings paste the `ACCESS_TOKEN`
   ![gh-secrets](/assets/blog/github/gh-secrets.png)

5. Create a Github workflow file
  - Create a directory called .github/workflows and inside that directory, create a YAML file with the following contents:

  ```yaml
  name: Build and Deploy
  on: 
    push:
      branches:
        - main
  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest

      steps:
        - name: Checkout 🛎️
          uses: actions/checkout@v2.3.1
          with:
            persist-credentials: false

        - name: Cache 💾
          uses: actions/cache@v2
          with:
            path: ${{ github.workspace }}/.next/cache
            key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}

        - name: Install and Build
          uses: actions/setup-node@v1
        - run: npm ci
        - run: npm run build
        - run: npm run export
          env:
              CI: true
        - run: touch out/.nojekyll

        - name: Deploy 🚀
          uses: JamesIves/github-pages-deploy-action@3.7.1
          with:
            ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
            BRANCH: gh-pages 
            FOLDER: out
            CLEAN: true
  ```
  - Now every push to the `main` branch will build a static version of our site using the `$ npm run build` script.
  - Using an action called Deploy to GitHub Actions, it will use your token to create and push a clean commit to the `gh-pages` repo from the `./out` directory that got generated. If the branch doesn't exist, it will create it.
  - GitHub Pages uses Jekyll under the hood to host and render static sites. However, Jekyll ignores every directory that starts with an underscore character. 
  - This will be a problem because Next.js generates the static assets (CSS and JavaScript) inside of a directory called _next and there's no way to changes
  - To get around this issue, you need to create an empty file called `.nojekyll` inside of your `gh-pages` branch. 
  
6. Make a commit and push to github!








