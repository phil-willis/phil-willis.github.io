---
title: 'Nextjs'
excerpt: 'Nextjs'
coverImage: '/assets/covers/nextjs.jpg'
ogImage:
  url: '/assets/covers/nextjs.jpg'
---

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




























## Creating and Deploying a Static Site to GitHub Pages
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


