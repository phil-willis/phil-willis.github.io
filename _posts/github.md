---
title: 'Github'
excerpt: ''
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
  - It's sometimes good to prefix a branch with `feat/`, `fix/`
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
$ git checkout master
$ git merge --squash bugfix
$ git commit
```
==============


















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




- Controlling branches
  - settings > Branches > "Protect matching branches"
    - you can define how many approvers you need 
  - 



















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
## If git keeps asking for your pass-phase
- Just edit your `~/.ssh/config` and enable the `UseKeychain` option:
  ```shell
  Host *
      UseKeychain yes
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
- Terms: `Events`, `Jobs`, `Runners`, `Steps`, `Actions`
- Workflow files use YAML syntax, and must have either a .yml or .yaml file extension.
- You must store workflow files in the `.github/workflows` directory of your repository.
- `Github Actions` works off of [triggers](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)
- Common webhook events: push, release, pull_request, create, delete, issues
- There is also `schedule`, `workflow_dispatch`, & `repository_dispatch`
- There are 3 main pieces to the actions yaml file:
  1. `name` (whatever name you want to call this workflow, this will show up in the GUI)
  2. `on` (The trigger, it can be a string or an array of strings)
  3. `jobs`

- Defining the trigger `on`
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

### Working with env variables
- You can set environment variables for each job 
- You define the variables under the job with an `env`
- They cannot be a composite of other `env` defined that the same level, you cannot do

  ```yml
  name: CANNOT DO THIS
  jobs:
    build:
      runs-on: self-hosted
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
      runs-on: self-hosted
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
  ```

### Default working-directory option
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

### Have a step run multiple shell commands
- Having one step in a job preform multiple command is easy just start with a `|` and all new lines before new commands:
  ```yml
  name: Deploy

  on:
    push:
      branches:
        - 'main'

  jobs:
    build:
      runs-on: self-hosted
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
### Saving temp files for other jobs
  ```yml
  name: Deploy

  on:
    push:
      branches:
        - 'main'

  jobs:
    build:
      runs-on: self-hosted
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
      runs-on: self-hosted
      steps:
        - uses: actions/checkout@v1   # should have access to all the files uploaded with `actions/upload-artifact@v2`
  ```

### Job dependencie
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
      runs-on: self-hosted
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
      runs-on: self-hosted
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

### Allow to manually run an Action in the Github web GUI
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


### Github action to run a Conjob 
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
        runs-on: self-hosted
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


### Configuring AWS credentials
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
      runs-on: self-hosted
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
      runs-on: self-hosted
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


### GithubAction leveraging Terraform
- Set up Terraform CLI in your GitHub Actions with [hashicorp/setup-terraform](https://github.com/hashicorp/setup-terraform) 
  ```yml
  name: Deploy

  on:
    push:
      branches:
        - 'main'

  jobs:
    build:
      runs-on: self-hosted
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
      runs-on: self-hosted
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
      runs-on: self-hosted
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



## Create a custom Github Action Composite Run Steps
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
      runs-on: self-hosted
      steps:
        - uses: actions/checkout@v1
        - id: Terraform
          uses: actions/philopian/my-awesome-actions@v1
          with:
            WORKSPACE: dev
            VAR_FILE: './env_configs/dev.tfvars'
            terraform_state_bucket: '<MY_TERRAFORM_S3_BUCKET>'
  ```

## Github Action lint on push
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



## Self-hosted Github Actions runner
- [Blog post on self-hosted runners](https://github.blog/2019-11-05-self-hosted-runners-for-github-actions-is-now-in-beta/)
- If you don't make a self-hosted runner you are using a shared infrastructure on Github
- Advantages of a self-hosted runner:
  - Your environment, your tools
  - Any size machine or configuration
  - Secure access & networking
  - Large workload support




## Github resusable workflow repo












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
















