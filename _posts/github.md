---
title: 'Github'
excerpt: 'Github'
coverImage: '/assets/covers/github.jpg'
ogImage:
  url: '/assets/covers/github.jpg'
---

# Git

## Git Commands
- Create
  ```shell
  # Clone a repo
  $ git clone git@github.com:mapbox/mapbox-gl-js.git
  
  # Create a new repo
  $ git init
  
  # Create remote repo
  $ gh repo create cli/my-project
  ```

- Local changes
  ```shell
  $ git status
  $ git diff
  $ git add .
  $ git add -p <file>
  $ git commit -m 'some message'
  
  # Change the last commit (don't amend published commits)
  $ git commit -amend -m 'replace last commit message'
  
  # Change the last commit with stage items
  $ git commit -amend -m 'staged files will be added to the last commit'
  ```

- Commit history
  ```shell
  $ git log
  $ git log -p <file>
  # *use `:q` to close the log*
  ```
- Branches
  ```shell
  # List all existing branches
  $ git branch -av
  
  $ git checkout <branch_name>
  $ git checkout -b <new_branch_name>
  $ git checkout --track <remote/branch>
  
  # Delete branch
  $ git branch -d <branch_to_delete>
  ```
- Tags
  ```shell
  $ git tag <tag_name>
  $ git push --tags
  ```
- Update & publish
  ```shell
  $ git remote show origin
  $ git fetch origin
  $ git pull origin <remote_branch_name>
  $ git push origin <branch_name>
  $ git checkout --track origin/this-rocks
  
  # Delete remote branch
  $ git branch -dr <remote/branch>
  ```
- Merge & Rebase
  ```shell
  # Merge <branch> into your current HEAD
  $ git merge <branch>
  
  # Rebase (don't rebase published commits
  $ git rebase <branch>
  
  
  $ git rebase --abort
  $ git rebase --continue
  $ git merge
  ```
- Undo
  ```shell

  ```
- Stash
  ```shell
  $ git stash list
  $ git stash save <message>

  $ git stash -u <message>

  $ git stash list
  $ git stash apply stash@{1}
  $ git stash drop stash@{1}
  ```
- Unstage 
  ```shell
  $ git reset HEAD
  $ git reset -- <SOME_FILENAME>
  ```
  - This will unstage your code but not delete your changes
- Revert to last commit
  ```shell
  # reset to last commit
  $ git checkout .

  # clean allows you to remove all the new untracked files
  # Clean check what gets removed first
  $ git clean -nfd
  $ git clean -fd
  ```

- Merging vs. Rebase
  - For integrating changes from another branch
  - Both `Merging` & `Rebase` is a process of integrating changes from one branch to another
  - `Merging` preserves the branch history, it is used to combine public branches
  - `Rebase` does *not* preserve the branch history, and is used for combining private branches

  - Merging example
    ```shell
    $ git checkout main
    $ git merge branch
    ```
  - Rebase example
    ```shell
    $ git checkout branch
    $ git rebase main
    $ git checkout main
    ```
- fast-forward merge


## Updating a git commit message after it's been pushed
- When you commit somthing to git it's accompanied with a commit message that explains what changes were made
- If you need to update a message after it's been commited you can fix it with an `--amend` flag
  ```shell
  # Changing the latest git commit message
  $ git commit --amend -m "New message"

  # Update the remote
  $ git push --force <repository-name> <branch-name>
  
  # 
  $ git push --force-with-lease <repository-name> <branch-name>
  ```
- *Note that the `--force` is not recommended unless you are absolutely sure that no one else has cloned your repository after the latest commit. It's probably best to use `--force-with-lease` flag because it will abort if there was an upstream change to the repository.*

- If you want to update a commit in a past commit you need the sha value

```shell
# list the last three 
```


## Squash and merge

```shell
$ git checkout master
$ git merge --squash bugfix
$ git commit
```



















# Github 
- Github is basically Git in the cloud, it allows you to share with others
- You can make private and public repos
- In your source code you can add some github config files in the `.github` folder
- Some common files are:
  ```
  ├── CODEOWNERS
  ├── pull_request_template.md
  └── workflows
      ├── build.yaml
      └── deploy.yaml
  ```
- `.github/workflows/` is where you put your Github actions yaml files



## Github CLI Commands
- Install Github CLI `$ brew install gh`
- [Github CLI Docs](https://cli.github.com/manual/)
  ```shell
  $ gh auth login

  # Gist
  $ gh gist create --public hello.js

  # Repo
  $ git init my-project
  $ cd my-project
  $ gh repo create

  # Create a repository with a specific name
  $ gh repo create my-project

  # Create a repository in an organization
  $ gh repo create cli/my-project
  ```


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

  
## PR Templates
- All you have to do is create a file `.github/pull_request_template.md`
  ```md
  <!--- Provide Ticket issue as [<number>] and a general summary of your changes in the Title above -->

  # Description
  <!--- Why is this change required? What problem does it solve? -->

  ## This pull request includes

  - [ ] Feature
  - [ ] Bug Fix
  - [ ] Documentation Update
  - [ ] Maintenance
  - [ ] Metrics
  - [ ] Tests

  ## The following changes were made
  <!--- List your changes in detail -->

  ## Expected behavior
  <!--- List expected behavior -->

  ## Steps to reproduce expected behavior
  <!--- List steps to reproduce expected behavior -->
  ```
- Push it up to github



## Github code owners
- GitHub codeowners is implemented as a single file `.github/CODEOWNERS` in your repository
- Whenever a pull request is opened, GitHub will automatically check all changed files and check each codeowners rule, the owners are added as reviewers.



## Github Actions
- On PR

- On 


- Conjob 
  - [docs Scheduled events](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#scheduled-events)





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


4. Publishing to GitHub Pages
- All you need to do to publish to githubpages is to run the npm `deploy` script
  ```sh
  $ npm run deploy
  ```
- Your static page should live: https://`<GITHUB_USERNAME>`.github.io/`<REPO_NAME>`/.
- *You might have to clear your cache to see the new changes*



### Publish with Github Actions
1. create a personal access token
  - click the avatar > profile > `Developer settings` > `Personal access token` or https://github.com/settings/tokens
  - note: `<repo_name> for github actions`
  - check the `repo` section
  - **DON'T FORGET TO COPY THE TOKEN**
2. In your repo settings paste the `ACCESS_TOKEN`
  - 










# Github REST API
- [REST API Reference](https://docs.github.com/en/rest/reference)


1. Create a `New personal access token`
  - Go to [Github Developer settings](https://github.com/settings/tokens/new?scopes=repo)
2. Create a dotenv file in your repo root
  ```shell
  # file name: `.env`
  GH_PERSONAL_ACCESS_TOKEN='<YOUR_ACCESS_TOKEN>'
  ```
3. Install `@octokit/rest`
  ```shell
  $ npm init -y
  $ npm i @octokit/rest dotenv
  ```
4. Write your code
  ```js
  require('dotenv').config()
  const { Octokit } = require('@octokit/core')

  // ===== SETUP =============
  // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
  const octokit = new Octokit({
    auth: process.env.GH_PERSONAL_ACCESS_TOKEN,
  })
  // ===== SETUP =============

  // One way of getting 
  async function getRepos(org) {
    const repos = await octokit.rest.repos.listForOrg({
      org,
      sort: 'full_name',
      per_page: 100,
      type: 'internal',
    })
    return repos.data.map((repo) => repo.name)
  }

  // Another way to get list of repos
  async function listRepos(org) {
    const response = await octokit.request('GET /orgs/{org}/repos', {
      org,
      per_page: 100,
      page: 1,
    })
    const repos = response.data.map((item) => item.name)
    console.log(repos)

    // TODO: if the `response.data.length >= 100` make a call for the next page
    console.log(response.data.length)
    return repos
  }

  // Access files
  async function getFile(owner, repo, path) {
    return octokit.rest.repos
      .getContent({ owner, repo, path })
      .then((file) => Buffer.from(file.data.content, 'base64').toString('ascii'))
  }

  async function dependencies(org) {
    const repos = await getRepos(org)
    console.log('repos', repos)

    repos.forEach(repo =>{
      try {
        const package = JSON.parse(await getFile(org, repo, 'package.json'))
        if (package.dependencies) console.log(package.dependencies)
        if (package.devDependencies) console.log(package.devDependencies)
      } catch (err) {}
    })
  }

  const orgName = '...'
  dependencies(orgName)
  ```


# Github GRAPH QL
- [docs](https://github.com/octokit/graphql.js)
- Playing with the GraphQL Explorer
  1. Got to the online [Graph QL explorer](https://docs.github.com/en/graphql/overview/explorer)
  2. Click the `Sign in with Github` button (Authorize GraphQL API Explorer) if it's your first time
  3. In the GraphiQL click the `Explorer` button to see your options 
- example:
  ```
  query { 
    viewer { 
      login
    }
  }
  ```
















