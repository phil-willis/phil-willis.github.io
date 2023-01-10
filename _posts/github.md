---
title: 'Github'
excerpt: ''
coverImage: '/assets/covers/github.jpg'
ogImage:
  url: '/assets/covers/github.jpg'
---

# Git
- Git is a open source Version Control System (VCS). It's the de facto standard. Developed in 2005 by Linus Torvalds, the guy who created the Linux operating system kernel
- Branches are lightweight and cheap, so it's OK to have many of them
- Git stores chages in SHA hashes, which work by compressing text files. This makes it a great candidate for working with text-files like software code but not as ideal when it comes to binary
- You can connect your repository you have locally to a remove shared repository (great example is Github, but there's other ones like Bitbucket). This way you can `push` & `pull` from the remote repository and collaborate with others
- Think of git or VCS as taking snapshots of your code at a specific place in time. Because you made that snapshot you can return to it at a later date or view how an application has progressed in time
- Think of it as this, you can always roll back to something you have commited but if you didn't commit it that history is gone
- Git basically works at a base folder and it tracks all of the files nested within that folder. 


<details>
<summary>Git overview</summary>

## Installation
- Git is installed by default on all macOS, however it's quite recomended to use [Homebrew](https://formulae.brew.sh/formula/git#default) if you want to install a different version
- Windows, navigate to the latest [Git for Windows](https://gitforwindows.org/) installer and download the latest version.
- Git was originally developed to version the Linux operating system! So, it only makes sense that it is easy to configure to run on Linux. You can install Git on Linux through the package management tool that comes with your distribution. Example using Debian/Ubuntu distro: `$ sudo apt-get update && apt-get install git-all`
- Now open your terminal and run:
  ```shell
  $ git version 
  ```

## Getting started
- After you have Git installed you can start using it!
- Let's setup your profile. Your config can be [system, global, local]
  - `System`, these are available for every user in the system. Stored in `/etc/gitconfig`
  - `Global`, available for the current user for all the git projects. Store in `~/.gitconfig` or` ~/.config/git/config`
  - `Local`, available for the current repository only. Stored in `[gitrepo]/.git/config`
- Priority: `Local` > `Global` > `System`
- Example:
  ```shell
  Create a local config
  $ git config --local user.name "Local User"

  # Create a global config
  $ git config --global user.name "Global User"

  # Create a system config
  $ sudo git config --system user.name "System User"
  ```
- You can always see how you settings are configured
  ```shell
  $ cat ~/.gitconfig 
  ```
- You might get something like this:
  ```
  [init]
    defaultBranch = main
  [user]
    name = Phil Willis
    email = p******@gmail.com
  ```
- Let's initialize it in a folder:
  ```shell
  # Make a new folder
  $ mkdir ~/Documents/hello-git && $_

  # Initialize git
  $ git init
  ```
- You should now have a `.git` folder. (on macOS files that start with a dot are called dotfiles and are hidden by default)
- When you start you're either going to `$ git init` or `$ git clone git@github.com:<NAME_SPACE>/<PROJECT_NAME>.git`

## Basic commands:
  ```shell
  $ git init
  $ git clone

  $ git fetch
  $ git fetch origin main:main
  $ git pull
  $ git push

  $ git status
  $ git add
  $ git commit

  $ git stash list
  $ git stash save <NOTE>
  $ git stash save -u <NOTE>
  $ git stash save --include-untracked <NOTE>

  $ git merge <BRANCH_NAME>
  $ git rebase <BRANCH_NAME>

  $ git checkout -b <NEW_BRANCH_NAME>
  $ git checkout <EXISTING_BRANCH_NAME>
  $ git branch -d <BRANCH_NAME_TO_DELETE>


  $ git tag <TAG_NAME>
  $ git push --tags

  $ git reset HEAD
  $ git reset -- <SOME_FILENAME>
  $ git checkout .
  $ git clean -fd

  $ git merge --squash <BRANCH_NAME>

  $ git log

  $ git diff --staged
  $ git diff <BRANCH_1> <BRANCH_2>
  ```




## Git Commands
- Create
  ```shell
  # Clone a repo
  $ git clone git@github.com:mapbox/mapbox-gl-js.git
  
  # Create a new repo
  $ git init
  
  # Create remote repo (with the Github CLI)
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
  - It's sometimes good to prefix a branch with `feat/`, `fix/`

- Fetch code from a different branch without checking it out and pulling
  ```shell
  $ git fetch origin main:main
  $ git rebase main
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

  # Pull branch that isn't checked out
  $ git fetch origin main:main

  # Delete remote branch
  $ git branch -dr <remote/branch>
  ```
- Rebase & Merge
  ```shell
  # Rebase
  $ git rebase <branch>
  $ git rebase --abort
  $ git rebase --continue
  
  # Merge <branch> into your current HEAD
  $ git merge <branch>
  ```
- Undo
  ```shell
  # Reset all change files to last commit
  $ git checkout .
  
  # Delete all newly added files (untracked) (think of `f` for files and `d` for directories) 
  $ git clean -fd
  ```
- Stash
  ```shell
  $ git stash list
  $ git stash save <message>
  $ git stash save <message> <-u|--include-untracked> 

  $ git stash list
  $ git stash apply stash@{1}
  $ git stash drop stash@{1}
  
  $ git stash clear
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
- Deleting # of commits
  ```shell
  $ git checkout <BRANCH_WITH_COMMITS_TO_REMOVE>
  $ git reset --soft HEAD~<NUMBER_OF_COMMITS_TO_DELETE>. # example: git reset --soft HEAD~2

  # Now if you update github
  $ git push origin +<BRANCH_NAME> --force # make sure that you have `+` in front of the branch name
  ```
- Deleting remote commit & tags
  ```shell
  # Move the head back 2 commits
  $ git reset --hard HEAD~2
  # This will wipe out the last 2 commit (THIS IS VERY DESTRUCTIVE, use with caution)
  $ git push origin -f

  # Delete the local tags
  $ git tag -d <>
  # Delete the tags 
  $ git push --delete origin v0.1
  ```

## Merging vs. Rebase
- For integrating changes from another branch
- TL;DR, use `rebase` when the `main` branch is ahead of your feature branch. Use `merge` to merge PRs into the `main` branch
- `Rebase` will add all of your branch commits infront of the rebased branch, most of the time the `main` branch
- `Merge` can override your changes on your feature branch
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
- Tags
  - On Git, tags are often used in order to tag specific commits that may be more important than others.
  - Tags may be used in order to bookmark certain events : releases, bug-fixes or just to add an informative and descriptive note to a commit.
  - On GitHub, tags are often associated with actual product releases for example.
    ```shell
    # Create a tag
    $ git tag -a -m "Added terraform action" <TAG_NAME>
    $ git tag -a -m "Added terraform action" v0.1

    # Push a tag to the remote repo
    $ git push --follow-tags

    # List tags
    $ git tag -l

    # Delete a local tag
    $ git tag -d <TAG_NAME>
    $ git tag -d v0.1

    # Delete a remote tag
    $ git push --delete origin <TAG_NAME>
    $ git push --delete origin v0.1
    ```
- How To Set Upstream Branch on Git
  - Upstream branches define the branch tracked on the remote repository by your local remote branch (also called the remote tracking branch)



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
$ git checkout main
$ git merge --squash <FEATURE_BRANCH>
$ git commit
```
</details>



































# Github 
- Github is basically Git in the cloud, it allows you to collaborate with others
- You can make private and public repos in Github
- In your source code you can add some github config files in the `./.github` folder
- Some common files are:
  ```
  ├── CODEOWNERS
  ├── pull_request_template.md
  └── workflows
      ├── build.yaml
      └── deploy.yaml
  ```
- `.github/workflows/` is where you put your Github actions yaml files
- Simple branch workflow
- lightweight, branch flow that support collaboration
  1. Branch off of `main` and make your changes in parallel
    - If the `main` branch has updates you want to `rebase` with main so that your changes remain in front
  2. When you `feature`/`bug-fix`/`enhancement` is done, make a `PR` (Pull Request) against the remote `main` branch
  3. Other collaborators can add their review and comments. More commit can happen as a result of conversation
  4. Once approved the PR can be merged (always `squash & merge`)
  5. You can delete your `feature`/`bug-fix`/`enhancement` branch
- Where one can improve?
  - Add branch protection to `main` to prevent commits directly to the `main` branch
  - Can add Continuous Integration 
  - We can add Continuous Deployment (on push or ) to a staging or production environment such as AWS/GCP/Azure
  - We can customize our Github flow with Github Actions
    - on push -> lint, unit-test, integration test, e2e
    - you can listen to event that happen to a repo, a schedule time, or event that happen outside of Github




## Github Topics
<details>
<summary>Github CLI Commands</summary>

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
</details>



<details>
<summary>Setting up multiple SSH keys</summary>

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

3. Add your public SSH key to github
  - Click on your avatar in the top right of the page then click on "SSH keys & GPG keys" in the sidebar
  - or click the [SSH keys & GPG keys link](https://github.com/settings/keys)
  - click the "New" button under the SSH Keys section
  - copy your *.pub key and paste it

4. Test your connections
  ```shell
  # test your connection
  $ ssh -T git@github.com
  # Hi first-gh! You've successfully authenticated, but GitHub does not provide shell access.

  $ ssh -T git@github.com-2
  # Hi second-gh! You've successfully authenticated, but GitHub does not provide shell access.
  ```

5. Clone a repo
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
</details>




<details>
<summary>Git nagging about pass-phase</summary>

- Just edit your `~/.ssh/config` and enable the `UseKeychain` option:
  ```shell
  Host *
      UseKeychain yes
  ``` 
</details>




<details>
<summary>The `./.github/` folder</summary>

<!-- https://www.freecodecamp.org/news/how-to-use-the-dot-github-repository/ -->
- GitHub has many special repositories. For instance, you can create a repository that matches your username, add a README file to it, and all the information in that file will be visible on your GitHub profile.
- You might already be familiar with the `.github` directory you'll find in many repositories. The `.github` directory houses:
  - `FUNDING.yml` -> Supporting a project
  - `ISSUE_TEMPLATE` -> Folder that contains a templates of possible issues user can use to open issue (such as if issue is related to documentation, if it's a bug, if user wants new feature etc) P.S. Take a look at tensorflow [ISSUE_TEMPLATE](https://github.com/tensorflow/tensorflow/tree/f3fd82f65724cdba600fdd23d251c2b01152ed3c/.github/ISSUE_TEMPLATE)
  - `PULL_REQUEST_TEMPLATE.md` -> How to make a pull request to project
  - `stale.yml` -> Probot configuration to close stale issues. There are many other apps on Github Marketplace that place their configurations inside `.github` folder because they are related to GitHub specifically.
  - `SECURITY.md` -> How to responsibly report a security vulnerability in project
  - `./workflows/` -> Configuration folder containing yaml files for GitHub Actions
  - `CODEOWNERS` -> Pull request reviewer rules.
  - `dependabot.yml` -> Configuration options for dependency updates. More info [here](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates).
- But another special repository you can create is the `.github` repository. It acts as a fallback for all of your repositories that don't have an actual .`github` directory with issue templates and other community health files.
- For example, say I have a repository named `.github` with generic bug report and feature request issue templates. And say I create another repository called `new-project`, **but I don't add a .github directory** with issue templates to it.
</details>







<details>
<summary>Code Owners</summary>

- [docs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- People with admin or owner permissions can set up a CODEOWNERS file in a repository.
- Team must be visible and it must have write permissions regardless if the individuals in that team has admin access
- GitHub codeowners is implemented as a single file `.github/CODEOWNERS` in your repository
- Whenever a pull request is opened, GitHub will automatically check all changed files and check each codeowners rule, the owners are added as reviewers.
- Adding `@user & @teams` should be added on the same line
- Someone from each line needs to approve the PR to make it valid
- Order is important, the last matching pattern takes the most precedence.
  ```shell:.github/CODEOWNERS
  # Lines starting with '#' are comments.
  # Each line is a file pattern followed by one or more owners.

  # These owners will be the default owners for everything in the repo.
  *       @philopian

  # Order is important. The last matching pattern has the most precedence.
  # So if a pull request only touches javascript files, only these owners
  # will be requested to review.
  *.js    @octocat @github/js

  # You can also use email addresses if you prefer.
  docs/*  docs@example.com
  ```
- Syntax exceptions
  - There are some syntax rules for gitignore files that do not work in CODEOWNERS files:
  - Escaping a pattern starting with `#` using `\` so it is treated as a pattern and not a comment
  - Using `!` to negate a pattern
  - Using `[ ]` to define a character range
- Add extra layer of code security
  ![](/assets/blog/github/github-security-1.jpg)
- With protected branches enabled, a code owner for each owned file has to leave a review before anyone can merge a pull request to that branch.
  ![](/assets/blog/github/github-security-2.jpg)
</details>




<details>
<summary>Dependabot</summary>

- [Dependabot docs](https://docs.github.com/en/code-security/dependabot/)
- Dependabot alerts you to keep all your dependencies updated
- Dependabot can now inform you of version updates
- To enable version updates, check a `.github/dependabot.yml` configuration file into your repository.
- Your configuration file tells Dependabot the kind of dependency you want to update (like Go modules or npm packages), where the dependency manifest is located, and how often you want Dependabot to look for updates
- On the schedule you specify, Dependabot will check if new versions are available. 
- If updates are available, Dependabot sends pull requests to update your dependency manifest with the new versions.
- Simple example for nodejs
  ```yml
  # Basic dependabot.yml file with
  # minimum configuration for two package managers

  version: 2
  updates:
    # Enable version updates for npm
    - package-ecosystem: "npm"
      # Look for `package.json` and `lock` files in the `root` directory
      directory: "/"
      # Check the npm registry for updates every day (weekdays)
      schedule:
        interval: "daily"
  ```
</details>








<details>
<summary>Fork & create a PR to a public repo</summary>

- If you want to contribute to a repo but your are not a contributor you need to `fork` the repo
  ![](/assets/blog/github/fork_01.jpg)
- Your new repo should be:<your-github-namespace>/<forked-repo-name>
- Clone it and work on it like you would normally ($ git checkout -b some-edits, $ git add, $ git commit, ...)
- Finally, when you `$ git push`, `git push --set-upstream origin <branch-name>`,  those changes back up to **your fork** of your colleague’s repository.
- Now the changes are in your forked repo, but you want to add then to your colleagues's repo. All you have to do is submit a pull request with the changes. This happens in the UI
  ![](/assets/blog/github/fork-git-push-pr.png)
</details>



<details>
<summary>PR Templates</summary>

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

</details>




<details>
<summary>Github Pages</summary>

- You can build a static site and have it hosted on GitHub Pages with a few configurations to the codebase and the github repository’s settings. 
- This example expects that you are using npm for your development/deployment

## Setup Github Pages
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
- If you are using [Vitejs](https://vitejs.dev/guide/static-deploy.html#github-pages) you're gonna wanna update the vite config
  ```js
  export default defineConfig({
    plugins: [react()],
    base: "/YOUR_REPO_NAME/",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: { outDir: "build" },
    server: { port: 3030 },
    preview: { port: 8080 },
  });
  ```
- If you want the Github Pages to the `https://<GITHUB_USERNAME>.github.io/` you just need to name the repo `<GITHUB_USERNAME>.github.io`. If you don't name your repo `<GITHUB_USERNAME>.github.io`, you can access your Github Page at  `https://<GITHUB_USERNAME>.github.io/`<REPO_NAME>`/.

- Your static page should live: https://`<GITHUB_USERNAME>`.github.io/`<REPO_NAME>`/.
- *You might have to clear your cache to see the new changes*

## Publish with Github Actions
- GitHub automatically creates a `GITHUB_TOKEN` secret to use in your workflow. You can use the `GITHUB_TOKEN` to authenticate in a workflow run.
- OR you can create a [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

1. Create a personal access token
  - click the avatar > profile > `Developer settings` > `Personal access token` or https://github.com/settings/tokens
  - note: `<repo_name> for github actions`
  - `Repository access` -> `Only select repositories` -> select your specific repo
  - `Permissions` -> `Actions` -> `Read and Write`
  - `Permissions` -> `Deployments` -> `Read and Write`
  - `Permissions` -> `Pages` -> `Read and Write`
  - `Permissions` -> `Secrets` -> `Read`


  - **Make sure to copy your personal access token now as you will not be able to see this again.**
2. In your repo settings -> Secrets -> Actions
  - Add a `New repository secret` as whatever you define the name as in your Github Action file. e.g. `GH_REPO_TOKEN`
  - e.g. in the Actions file `${{ secrets.GH_REPO_TOKEN }}`
</details>






<details>
<summary>branch protection</summary>

- settings > Branches > "Protect matching branches"
  - you can define how many approvers you need 
</details>





<details>
<summary>Release</summary>

- [About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
</details>






<details>
<summary>Auto release notes</summary>

- [Read more here](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes)
</details>






<details>
<summary>tags</summary>

- [More on tags](https://docs.github.com/en/repositories/releasing-projects-on-github/viewing-your-repositorys-releases-and-tags)
</details>




<details>
<summary>issues</summary>

- Issues let you track your work on GitHub, where development happens.
- [read more here](https://docs.github.com/en/issues)
</details>




<details>
<summary>Pull Request</summary>

- Pull Request Filters

  ```shell
  is:pr is:closed 
  is:open is:pr author:@me 
  is:closed is:pr author:@me 
  ```
</details>




<details>
<summary>Webhooks</summary>

- Webhooks allow external services to be notified when certain events happen. When the specified events happen, we’ll send a POST request to each of the URLs you provide. Learn more in our [Webhooks Guide](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks).
</details>




<details>
<summary>Environments</summary>

- You can configure environments with protection rules and secrets. [Learn more.](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
</details>




<details>
<summary>Secrets</summary>

- There are 2 level of adding Secrets to you Github account:
  1. Org or Account level
  2. Project level
- Adding Secrets go to your repo -> Settings -> Under General go to `Secrets`

![github-secrets](/assets/blog/github/github-secrets.jpg)

- You can add secrets to `Github Actions`, `Codespaces`, `Dependabot`

</details>






<details>
<summary>Github REST API</summary>

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
</details>





<details>
<summary>Github GRAPH QL</summary>

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
</details>


































## Github Actions
- Github Actions allows you to automate workflows that happen in your github repository base on event triggers you define in a YAML file
- You must store workflow files in the `.github/workflows` directory of your repository, currently you cannot have nested folder under `workflows`.
- Workflow files use YAML syntax, and must have either a .yml or .yaml file extension.
- `Github Actions` works off of [event triggers](https://docs.github.com/en/actions/reference/events-that-trigger-workflows) & defined with the `on: ` block in your YAML file
- Available `events trigger` workflows:
  - branch_protection_rule
  - check_run
  - check_suite
  - create
  - delete
  - deployment
  - deployment_status
  - discussion
  - discussion_comment
  - fork
  - gollum
  - issue_comment
  - issues
  - label
  - milestone
  - page_build
  - project
  - project_card
  - project_column
  - public
  - pull_request
  - pull_request_comment (use issue_comment)
  - pull_request_review
  - pull_request_review_comment
  - pull_request_target
  - push
  - registry_package
  - release
  - repository_dispatch
  - schedule
- Common webhook events: `push`, `release`, `pull_request`
- There is also `schedule`, `workflow_dispatch`, & `repository_dispatch`
- Terms: `Events`, `Jobs`, `Runners`, `Steps`, `Actions`






## Github Actions Examples


<details>
<summary>Testing Github Actions on your local machine</summary>

  - Install `Act` with homebrew
    ```shell
    $ brew install act
    ```
    - [nektos/act](https://github.com/nektos/act) and docker
    - This tool requires that you use a `runs-on: ubuntu-latest` and not a `runs-on: self-hosted`
    ` ~/.actrc`
  - Make sure you have a `./.github/workflows/*.yml` file(s)
  - Run Github Actions locally
    ```shell
    # Make sure that Docker Desktop is opened
    $ act --container-architecture linux/amd64
    ```
</details>




<details>
<summary>Github Actions runners</summary>

- GitHub offers hosted virtual machines to run workflows or you can provide your own 
- GitHub offers runners with Linux, Windows, and macOS operating systems.
- When you use a GitHub-hosted runner, machine maintenance and upgrades are taken care of for you. You can run workflows directly on the virtual machine or in a Docker container.
- **Github hosted runner**:
  ```yaml
  # ...
  jobs:
    some_job:
      runs-on: ubuntu-latest
  ```
- [docs](https://docs.github.com/en/actions/using-github-hosted-runners/)

- **Self-hosted runners**
- You can also host your own `self-hosted runners`, more [here](https://docs.github.com/en/actions/hosting-your-own-runners/)
- Self-hosted runners using the `runs-on`
- You can host your own runners and customize the environment used to run jobs in your GitHub Actions workflows.
  ```yaml
  # ...
  jobs:
    some_job:
      runs-on: self-hosted
  ```

- [Blog post on self-hosted runners](https://github.blog/2019-11-05-self-hosted-runners-for-github-actions-is-now-in-beta/)
- If you don't make a self-hosted runner you are using a shared infrastructure on Github
- Advantages of a self-hosted runner:
  - Your environment, your tools
  - Any size machine or configuration
  - Secure access & networking
  - Large workload support
</details>






<details>
<summary>Github Action - Event triggers</summary>

- Github Actions have a few events that trigger a workflow. Learn more [here](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)
- Here are a list of current events:
  - `branch_protection_rule`
  - `check_run`
  - `check_suite`
  - `create`
  - `delete`
  - `deployment`
  - `deployment_status`
  - `discussion`
  - `discussion_comment`
  - `fork`
  - `gollum`
  - `issue_comment`
  - `issues`
  - `label`
  - `merge_group`
  - `milestone`
  - `page_build`
  - `project`
  - `project_card`
  - `project_column`
  - `public`
  - `pull_request`
  - `pull_request_comment (use issue_comment)`
  - `pull_request_review`
  - `pull_request_review_comment`
  - `pull_request_target`
  - `push`
  - `registry_package`
  - `release`
  - `repository_dispatch`
  - `schedule`
  - `status`
  - `watch`
  - `workflow_call`
  - `workflow_dispatch`
  - `workflow_run`
- Here is where you write it in yor YAML file
  ```yml
  name: Github Actions Event triggers
  on:
    push|pull|etc...
  ```
</details>


<details>
<summary>Hello world of Github Action</summary>

- There are 3 main pieces to the actions yaml file:
  1. `name` (whatever name you want to call this workflow, this will show up in the GUI)
  2. `on` (The trigger, it can be a string or an array of strings)
  3. `jobs`

- Create a file in your repo called `.github/workflows/hello.yml`
  ```yml
  name: Hello world
  on:
    push:
  jobs:
    hello_world:
      runs-on: ubuntu-latest
      steps:
        - run: echo "hello world"
  ```

- Different ways to define your `event triggers`. Use the `on: `
  ```yaml
  # Triggered when code is pushed to any branch in a repository
  on: push
  
  # Triggers the workflow on push or pull request events
  on: [push, pull_request]
  
  # Ignore a branch
  on:
    push:
      branches-ignore:
        - main
  ```
</details>




<details>
<summary>Working with env variables</summary>

- You can set environment variables for each job 
- You define the variables under the job with an `env`
- They cannot be a composite of other `env` defined that the same level, you cannot do

  ```yml
  name: CANNOT DO THIS
  jobs:
    build:
      runs-on: ubuntu-latest
      env:
        WORKSPACE: dev
        PROJECT_NAME: '....CANNOT-DO-THIS......${{ env.WORKSPACE}}'
  ```
- Due to a security vulnerability `set-env` is being deprecated and should no longer be used.
- Proper way to define define/use env is by setting it under the `env` block and using them with `${{ env.SOME_ENV_KEY }}`
  ```yml
  name: Deploy

  on:
    push:
      branches:
        - 'main'
  jobs:
    build:
      runs-on: ubuntu-latest
      env:
        WORKSPACE: dev
        PROJECT_NAME: 'this-rocks'
      steps:
        - uses: actions/checkout@v1
        - name: Run multiple commands
          run: |
            echo "Running on ${{ env.WORKSPACE }}"
            echo "project namet: ${{ env.PROJECT_NAME }}"
            terraform init -backend-config bucket="${{ env.PROJECT_NAME }}"
        - if: ${{ (env.PROJECT_NAME == 'this-rocks') }} 
          name: Conditionally run this step
          run: echo "yeah baby!!"
  ```
</details>




<details>
<summary>Default working-directory option</summary>

- By default the working directory is the root of the checkout repo
- You can actually set all the jobs to a specific working directory or just a specific job
- The Github actions have a working-directory option to declare on workflow. It specifies the working directory for all run steps.
  ```yml
  name: Configured for all jobs
  defaults:
    run:
      working-directory: web
  ```
- Configured for specific jobs
  ```yml
  name: Configured for specific jobs
  jobs:
    job1:
      runs-on: ubuntu-latest
      defaults:
        run:
          working-directory: scripts
  ```
</details>




<details>
<summary>Have a step run multiple shell commands</summary>

- Having one step in a job preform multiple command is easy just start with a `|` and all new lines before new commands:
  ```yml
  name: Deploy

  on:
    push:
      branches:
        - 'main'

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v1
        - name: Run multiple commands
          run: |
            npm run ci
            npm run lint
            npm rum build
        - name: Save Build
          uses: actions/upload-artifact@v2
          with:
            name: build
            path: |
              build
              pipeline
              package.json
              scripts
  ```
</details>




<details>
<summary>Saving temp files for other jobs</summary>

```yml
name: Deploy

on:
  push:
    branches:
      - 'main'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Run multiple commands
        run: |
          npm run ci
          npm run lint
          npm rum build
      - name: Save Build
        uses: actions/upload-artifact@v2
        with:
          name: build
          path: |
            build
            pipeline
            package.json
            scripts
            
  using-artifacts:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1   # should have access to all the files uploaded with `actions/upload-artifact@v2`
```
</details>




<details>
<summary>Job dependencie</summary>

- (Job Example) One Job depending on the outcome of the other use the `needs` keyword
  ```yml
  name: <Title>

  # Trigger (webhook, scheduled event, manual event)
  # Common webhook events: push, release, pull_request, create, delete, issues (https://docs.github.com/en/actions/reference/events-that-trigger-workflows)
  on: 
    push: 
      branches: [ main ]  # what branch you want to watch 
      branches-ignore:
        - main

  jobs:
    first-job-name:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v1
        - name: Install Dependencies
          run: npm ci
        - name: Run npm Script
          run: npm run build
        - name: Save Build
          uses: actions/upload-artifact@v2
          with:
            name: build
            path: |
              build
              pipeline
              package.json
              scripts

    second-job-name:
      runs-on: ubuntu-latest
      needs: first-job-name
      env:
        TEST_USER_USR: ${{ secrets.TEST_USER_USR }}
        TEST_USER_PSW: ${{ secrets.TEST_USER_PSW }}
      steps:
        - name: Fetch `first-job-name`'s build
          uses: actions/download-artifact@v2
          with:
            name: build
        - name: Run npm Script
          run: npm run hello
  ```


- (Job example) One workflow to build once and deploy in parallel
  ```yml
  name: Build one and deploy in parallel

  on: 
    push: 
      branches: main

  jobs:
    build:

    publish-npm:
      needs: build

    publish-gpr:
      needs: build
  ```
</details>




<details>
<summary>Allow to manually run an Action in the Github web GUI</summary>

- Manually run Actions with `workflow_dispatch`
  - You can manually trigger workflow runs. To trigger specific workflows in a repository, use the workflow_dispatch event. 
  - To trigger more than one workflow in a repository and create custom events and event types, use the repository_dispatch event.
  ```yml
  name: Manually triggered workflow
  on:
    workflow_dispatch:
      inputs:
        name:
          description: 'Person to greet'
          required: true
          default: 'Mona the Octocat'
        home:
          description: 'location'
          required: false
          default: 'The Octoverse'

  jobs:
    say_hello:
      runs-on: ubuntu-latest
      steps:
        - run: |
            echo "Hello ${{ github.event.inputs.name }}!"
            echo "- in ${{ github.event.inputs.home }}!"
  ```
</details>




<details>
<summary>Run a Conjob </summary>

- [docs Scheduled events](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#scheduled-events)
- If you are running a shell script you have to add change the owner of the script 
  ```shell
  $ git add --chmod=+x -- ./scripts/moveFile.sh
  ```
- GitHub automatically creates a `GITHUB_TOKEN` secret to use in your workflow, so you don’t have to worry about creating this. The `GITHUB_TOKEN` secret allows us to authenticate ourselves (in this example is needed to push the changes).
  ```yml
  name: Run a scheduler

  on:
    schedule:
      - cron:  '0 0 * * 0'  # At 00:00 on Sunday. (https://crontab.guru/)
    workflow_dispatch:

  jobs:
    scheduler:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v1
        - name: Install Dependencies
          run: npm ci
        - name: Run the npm Script
          run: npm run generate:report
        - name: Commit generated report
          run: |
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add -A
            git commit -m "Auto-generated report" -a
        - name: Push changes
          uses: ad-m/github-push-action@v0.6.0
          with:
            github_token: ${{ secrets.GITHUB_TOKEN }}.  # Github automatically takes care of this you don't have to create one
            branch: main  
  ```
</details>




<details>
<summary>Configuring AWS credentials</summary>

- ["Configure AWS Credentials" Action For GitHub Actions](https://github.com/aws-actions/configure-aws-credentials)
- You will have to add `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` to your github secrets for the repo
  ```yml
  name: Using AWS Creds

  on:
    push:
      branches:
        - 'main'

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v1
        - name: Install Dependencies
          run: npm ci
        - name: Run linter
          run: npm run lint
        - name: Run Tests
          run: npm run test:ci
        - name: Build Library
          run: npm run build
        - name: Save Build
          uses: actions/upload-artifact@v2
          with:
            name: build
            path: |
              build
              pipeline
              package.json
              scripts
    deploy:
      runs-on: ubuntu-latest
      needs: build
      env:
        MY_S3_WEBSITE_BUCKET_NAME: "some-awesome-website"
      steps:
        - name: Fetch Build
          uses: actions/download-artifact@v2
          with:
            name: build
        - name: Configure AWS Credentials
          uses: aws-actions/configure-aws-credentials@v1
          with:
            aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
            aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
            # aws-session-token: ${{ secrets.AWS_SESSION_TOKEN }} # if you have/need it
            aws-region: us-east-2
        - name: Copy files to the production website with the AWS CLI
          run: |
            aws s3 sync . s3://${{ env.MY_S3_WEBSITE_BUCKET_NAME}}
  ```
</details>




<details>
<summary>With Terraform</summary>

- Set up Terraform CLI in your GitHub Actions with [hashicorp/setup-terraform](https://github.com/hashicorp/setup-terraform) 
  ```yml
  name: Deploy

  on:
    push:
      branches:
        - 'main'

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v1
        - name: Install Dependencies
          run: npm ci
        - name: Run linter
          run: npm run lint
        - name: Run Tests
          run: npm run test:ci
        - name: Build Library
          run: npm run build
        - name: Save Build
          uses: actions/upload-artifact@v2
          with:
            name: build
            path: |
              build
              pipeline
              package.json
              scripts

    dev_infrastructure:
      runs-on: ubuntu-latest
      env:
        WORKSPACE: dev
        VAR_FILE: './env_configs/dev.tfvars'
        terraform_state_bucket: '<YOUR_TF_STATE_BUCKET>'
      defaults:
        run:
          working-directory: pipeline/terraform
      steps:
        - uses: actions/checkout@v1
        - uses: hashicorp/setup-terraform@v1
          with:
            terraform_version: 0.13.5
        - name: Configure AWS Credentials
          uses: aws-actions/configure-aws-credentials@v1
          with:
            aws-region: us-west-2
            role-duration-seconds: 3600
            role-to-assume: ${{ secrets.<CI_ROLE> }}
        - name: Terraform init
          run: |
            echo "Running tf-deploy on ${{ env.WORKSPACE }}"
            echo "Using Terraform state bucket: ${{ env.terraform_state_bucket }}"
            rm -rf .terraform/
            terraform init -backend-config bucket="${{ env.terraform_state_bucket }}"
            if ! terraform workspace select ${{ env.WORKSPACE }}; then terraform workspace new ${{ env.WORKSPACE }}; fi
            terraform apply -auto-approve -var-file=${{ env.VAR_FILE }}

    deploy_dev:
      runs-on: ubuntu-latest
      needs: [ dev_infrastructure, build ]
      steps:
        - name: Fetch Build
          uses: actions/download-artifact@v2
          with:
            name: build
        - name: Configure AWS Credentials
          uses: aws-actions/configure-aws-credentials@v1
          with:
            aws-region: us-west-2
            role-duration-seconds: 3600
            role-to-assume: ${{ secrets.<CI_ROLE> }}
        - name: Deploy
          run: ./pipeline/client-deploy.sh dev
  ```
</details>




<details>
<summary>Slack Notifications</summary>

- Create a Slack App & Slack channel to post to:
  1. Create a slack app https://api.slack.com/apps
  2. `Create New App` > `From scratch`
  3. Add features and functionality > Incoming Webhooks > Click the `on` toggle
    ```shell
    $ curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' <YOUR_WEBHOOK_URL_HERE>
    ```
  4. Copy down the credentials
  5. Update the `Display Information`
  6. Create a Slack channel
  7. Install your app
    - click the `Request to Install` button
    - Select the slack channel 
  8. Go back to the `Add features and functionality` and click the `Incoming Webhook`
    - After you have connected a slack channel to your app it will give you a curl example 
- Posting to your channel with a webhook
  1. Via curl
  2. Github Action 
    - Make sure to add an ENV secrets to your github repo's secrets
    - Basic notify
      ```yml
      name: Notify Slack
      jobs:
        say_hello_to_slack:
          runs-on: ubuntu-latest
          steps:
            - run: |
                echo "Hello ${{ github.event.inputs.name }}!"
                echo "- in ${{ github.event.inputs.home }}!"
            - name: Notify Build
              run: |
                curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"Hello Slack from '${{github.repository}}'' ${{ secrets.SLACK_HOOK}}
      ```
    - Notify on PR
      ```yml
      name: Notify Slack
      on:
        pull_request:
          types: [ opened, reopened ]
      jobs:
        open_pr:
          runs-on: ubuntu-latest
          env:
            GITHUB_USERNAME: ${{ github.event.pull_request.user.login }}
            PR_HTML_URL: ${{ github.event.pull_request.html_url }}
            REPO_NAME: ${{ github.event.repository.full_name }}
            PR_TITLE: ${{ github.event.pull_request.title }}
          steps:
            - name: Notify Slack
              run: |
                curl -X POST -H 'Content-type: application/json' \
                --data '{"text":"<!here> *${{ env.GITHUB_USERNAME }}* started a new Pull Request for <${{ env.PR_HTML_URL }} | ${{ env.REPO_NAME }}>: ${{ env.PR_TITLE }}"}' \
                ${{ secrets.SLACK_HOOK }}
        ```
</details>




<details>
<summary>Composite Actions & Reusable Workflows</summary>

- There are ALOT of overlap between Composite Actions & Reusable Workflows
- `Composite Action` is presented as a `one-step` (even if it contains multiple steps) when invoked in a workflow
- `Reusable workflows` can use `secrets`, whereas a composite action can’t. 
- Both can only take string, number or boolean as a param. Arrays are not allowed.
- `Reusable workflows` can’t be used with a `matrix` but `composite actions` can


#### Github resusable workflow repo
- You can have reusable workflows in the current repo or in another repo
  - If in the same repo you have to have them in the `.github/workflows/` directory and not in a nested folder
  - If in another repo, that repo has to be public or enabled available in your enterprise level and also in a `.github/workflows/` in that other repository
- All reusable workflows that use `secrets` need to be supplied those values and all `env` values should be pass thru via `inputs`

- Creating a reusable workflow:
  ```yaml:reuse-me.yml
  name: Setup
  on:
    workflow_call:
      secrets:
        SOME_SECRET:
          required: true
      inputs:
        hello_message:
          required: true
          description: "A message to be passed in"
          type: string
  jobs:
    setup:
      env:
        hello_message_as_env: ${{ inputs.hello_message }}
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v2.4.0
        - run: echo "input value passed in => ( ${{ inputs.hello_message }})"
        - run: echo "input as environment variable  $hello_message_as_env"
        - run: echo "secret value passed in => ( ${{ secrets.SOME_SECRET }}), this should actually mask the actual secrete"
  ```
- Using that reusable workflow
  ```yaml:using-workflows.yml
  name: Uses reusable workflows
  on:
    push:
      branches:
        - main
  jobs:
    do_something:
      secrets:
        SOME_SECRET: ${{ secrets.SECRET_IN_YOU_REPO_SETTINGS }}
      with:
        hello_message: this rocks!!
      uses: ./.github/workflows/reuse-me.yml
  ```
</details>




<details>
<summary>Create a custom Github Action Composite Run Steps</summary>

- `Composite Run Steps` allows you to reuse parts of your workflows inside other workflows
- It's a type of actions that allows you to bundle multiple run steps in one single actions and re-use that bundle as a single step in another action
- You might have seen it in your for from 
- TL;DR `Composite Run Steps` allows you to nest actions steps within an action step
- Why? 
  - So you can create a template and reuse multiple places
  - Keep things DRY (Don't Repeat Yourself)
  - Use `env` variables 
  - You just need to modify one place to get the effect everywhere it gets uses that composite run steps
- Supported properties:
  ```yml
  name  
  id  
  run  
  env  
  shell  
  working-directory  
  ```
- Example of publicly available `Composite run steps` are: `aws-actions/configure-aws-credentials@v1`, `hashicorp/setup-terraform@v1`

1. Create a new repo just for this custom composiste run step e.g. `philopian/my-awesome-actions`
2.  Create a `metadata file` and call it `actions.yml`
  - do not add trigger blocks in this file
3. Add your content:
  ```yml
  name: 'Build infrastructure'
  description: 'Builds out our AWS infrastructure with Terraform'
  inputs:
    WORKSPACE:
      description: 'Workspace for which terraform is to build the infrastructure in'
      required: true
    VAR_FILE:
      description: 'Location to the `env_configs/*.tfvars` file'
      required: true
    terraform_state_bucket:
      description: 'The terraform bucket for which terraform can write to the tf-state file in'
      required: true
  runs:
    using: "composite"
    defaults:
      run:
        working-directory: pipeline/terraform
    steps:
      - uses: hashicorp/setup-terraform@v1
        with:
          terraform_version: 0.13.5
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-region: us-west-2
          role-duration-seconds: 3600
          role-to-assume: ${{ secrets.<CI_ROLE> }}
      - name: Terraform init
        run: |
          echo "Running tf-deploy on ${{ inputs.WORKSPACE }}"
          echo "Using Terraform state bucket: ${{ inputs.terraform_state_bucket }}"
          rm -rf .terraform/
          terraform init -backend-config bucket="${{ inputs.terraform_state_bucket }}"
          if ! terraform workspace select ${{ inputs.WORKSPACE }}; then terraform workspace new ${{ inputs.WORKSPACE }}; fi
          terraform apply -auto-approve -var-file=${{ inputs.VAR_FILE }}
  ```
4. From your terminal, check in your `actions.yml` file.
  - Before we can use this "snippet" into our actions, we need to create a Tag and a Release for our repo.
    ```shell
    $ git add action.yml
    $ git commit -m "Add action"
    $ git push
    ```
5. From your terminal, add a tag. This example uses a tag called v1. For more information, see "About actions."
  ```shell
  $ git tag -a -m "Description of this release" v1
  $ git push --follow-tags
  ```
6. Use this composite action, **in a different repo**
  ```yml
  name: Deploy
  on:
    push:
      branches:
        - 'main'
  jobs:
    infrastructure:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v1
        - id: Terraform
          uses: actions/philopian/my-awesome-actions@v1
          with:
            WORKSPACE: dev
            VAR_FILE: './env_configs/dev.tfvars'
            terraform_state_bucket: '<MY_TERRAFORM_S3_BUCKET>'
  ```
</details>




<details>
<summary>Github Action lint on push
</summary>

```yml
name: CI

on: [push]

jobs:
  build:
    name: Build
    runs-on: ubuntu-18.04
    strategy:
      matrix:
        node_version: [14]

    steps:
      - uses: actions/checkout@v1
      - name: Use Node.js ${{ matrix.node_version }}
        uses: actions/setup-node@v1
        with:
          node_version: ${{ matrix.node_version }}

      - name: run CI
        run: |
          npm install
          npm run lint
          npm run test
          npm run build
```

</details>


























