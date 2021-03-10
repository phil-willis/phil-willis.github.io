---
title: 'Github'
excerpt: 'Github'
coverImage: '/assets/blog/hello-world/cover.jpg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---

# Github
- ... add notes on what it is



## Setting up multiple SSH keys
- If you have 2+ Github accounts you will have to create a new SSH key for each account
1. Create an SSH Key
  ```shell
  # Create an rsa key
  $ ssh-keygen -t rsa -C "your@email.com"
  # id_rsa_*

  # Add your SSH private key to the ssh-agent and store your passphrase in the keychain. 
  $ ssh-add ~/.ssh/id_rsa
  $ ssh-add ~/.ssh/id_rsa_second-gh

  # List all the registers keys
  $ ssh-add -l
  ```

2. Update your `~/.ssh/config` file

  ```shell
  #first-gh account
  Host github.com
    HostName github.com
    IdentityFile ~/.ssh/id_rsa

  #second-gh account
  Host github.com-2
    HostName github.com
    IdentityFile ~/.ssh/id_rsa_second-gh
  ```

2. Add your public SSH key to github
  - Click on your avatar in the top right of the page then click on "SSH keys & GPG keys" in the sidebar
  - or click the [SSH keys & GPG keys link](https://github.com/settings/keys)
  - click the "New" button under the SSH Keys section
  - copy your *.pub key and paste it

3. Test your connections
  ```shell
  # test your connection
  $ ssh -T git@github.com
  # Hi first-gh! You've successfully authenticated, but GitHub does not provide shell access.

  $ ssh -T git@github.com-2
  # Hi second-gh! You've successfully authenticated, but GitHub does not provide shell access.
  ```

3. Clone a repo
  ```shell
  # Cloning from 1st account
  $ git@github.com:first-gh/<REPO_NAME>.git
  
  # Cloning for 2nd account 
  $ git@github.com-2:second-gh/<REPO_NAME>.git

  # Update username/email
  $ git config user.name "username"
  $ git config user.email "your@email.com" 

  # update the second remote origin
  $ git remote set-url origin git@github.com-2:username/<REPO_NAME>.git
  ```

  

## Github Pages
- You can build a static site and have it hosted on GitHub Pages with a few configurations to the codebase and the github repository’s settings. 
- This example expects that you are using npm for your development/deployment

1. Create a new repo in Github
  - Make sure that it's a `Public` repo

2. Install the [gh-pages](https://www.npmjs.com/package/gh-pages) npm package
  - Install gh-pages:
    ```sh
    $ npm install gh-pages --save-dev
    ```
  - Add a build/deploy script to your `package.json`
    ```js
    "scripts": {
      "build": "some-build-script",
      "predeploy": "rm -rf ./public",
      "deploy": "npm run build && gh-pages -d public"
    }
    ```
  - The `-d public` you're telling `gh-pages` where the build source code lives
  - When you run npm run deploy all contents of the `public` folder will be moved to your repository’s gh-pages branch. 
  - **note**: *With npm scripts if you prefix the scripts key name with `pre` it will run before the command and `post` it will run after*

3. Update setting for GithubPages 
  - You must select which branch will be deployed from your repository settings in GitHub for GitHub Pages to function. 
  - The nice thing about the `gh-pages` npm package is that it will create a `gh-pages` branch and wire it up for you
  - Navigate to your repo then click [`Settings` > Scroll down to the `GitHub Pages` Section]
  ![](/assets/blog/gh-pages-screenshot.png)
  - It's ok to keep the path as `/ (root)` because the when you run `gh-pages -d public` it take the contents of the `public` folder and saves it to the root of the `gh-pages` branch


## Publishing to GitHub Pages
- All you need to do to publish to githubpages is to run the npm `deploy` script
  ```sh
  $ npm run deploy
  ```
- Your static page should live: https://`<GITHUB_USERNAME>`.github.io/`<REPO_NAME>`/.
- *You might have to clear your cache to see the new changes*




## Publish with Github Actions
1. create a personal access token
  - click the avatar > profile > `Developer setttings` > `Personal access token` or https://github.com/settings/tokens
  - note: `<repo_name> for github actions`
  - check the `repo` section
  - **DON'T FORGET TO COPY THE TOKEN**
2. In your repo settings paste the `ACCESS_TOKEN`
  - 



## PR Templates

- All you have to do is create a file `.github/pull_request_template.md`
  ```
  # <SOME TITLE>

  ## Summary


  ## Notes


  ## Figma Design
  [Figma Design](<FIGMA_URL>)


  ## Screenshot


  ## Jira Issue
  [CX-###](<JIRA-TICKET-URL>)


  ## Tested


  ```
- Push it up to github











