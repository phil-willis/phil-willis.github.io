---
title: 'node.js'
excerpt: ''
coverImage: '/assets/covers/nodejs.jpg'
ogImage:
  url: '/assets/covers/nodejs.jpg'
---


# What is Nodejs




# Installation
- There are a few ways to install Nodejs on your machine
- There are 2 main versions to consider `LTS` and `Current`
- `LTS` is for Long Term Support which is the stable version as for the `Current` is the more cutting edge
- Nodejs even versions are stable and odd versions for the lastest versions
- More about release dates and versions [go here](https://nodejs.org/en/about/releases/)

1. Install from the [nodejs](https://nodejs.org/en/) homepage
2. HomeBrew on your mac
3. [NVM](https://github.com/nvm-sh/nvm) (My prefered way cause you can switch node versions easily)



## Installing nodejs via Homepage

## Installing nodejs via HomeBrew

## Install nodejs with nvm
- Install via homebrew
    - [tut](http://dev.topheman.com/install-nvm-with-homebrew-to-use-multiple-versions-of-node-and-iojs-easily/)
    ```shell
    $ brew install nvm
    ```

    ```shell
    # NVM installed via homebrew
    [[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh
    export NVM_DIR="/.nvm"
    source $(brew --prefix nvm)/nvm.sh
    ```
- Install via the [ruby way](https://github.com/nvm-sh/nvm)
    - Add this to your bash/zshrc:
        ```shell
        # NVM
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
        PATH="/usr/local/opt/grep/libexec/gnubin:$PATH"
    ```
- *note :* every time you switch node versions you'll have to install all your globals again as well as you will have to delete your projects `node_modules` because these dependencies are specfic to the exact node version & OS installed

- If your npm global packages point to a different nodejs version run this
    ```shell
    $ npm list -g --depth=0
    $ npm config rm prefix
    ```

- NVM commands
  ```shell
  # Check nodejs version
  $ node -v || node --version

  # List installed versions of node (via nvm)
  $ nvm ls

  # Install specific version of node
  $ nvm install 12.20.1

  # Set default version of node
  $ nvm alias default 12.20.1

  # Switch version of node
  $ nvm use 14.15.4

  # List latest available versions
  $ nvm ls-remote | grep -i 'latest'
  ```



# Node tools 

  ```shell
  # Find out-of-day packages
  $ npx npm-upgrade

  $ npx depcheck
  
  # Find and delete `node_modules` on your machine
  $ npx npkill
  ```
  
# Killing your local server that is going rogue

```shell
# Find:
$ sudo lsof -i :3000

# Kill:
$ kill -9 <PID>
```

  
  
  
# Git hooks
- Automation is always good, especially when it reduces congnitive load and optimization
- We can automate things before we create commits or push changes to a repo
- The `.git` ditectory allows you to do native hooks if you want to or you can use something like husky to do all the heavy lifting for you and you can stay in JS land :)
- Check out the [Husky docs here](https://typicode.github.io/husky/#/)
- Intall husky with:
  ```shell
  $ npx husky-init && npm install 
  ```
- This will automatically wireup all the git hooks and add a script `.husky/pre-commit` where you can add whatever command run before a commit
  ```bash
  #!/bin/sh
  . "$(dirname "$0")/_/husky.sh"

  npm run lint
  ```
- It will setup husky, modify `package.json` and create a sample `pre-commit` hook that you can edit. - By default, it will run npm test when you commit.
- To add another hook use husky add.
  ```shell
  $ npx husky add .husky/pre-push 'npm run lint && npm run test:ci'
  ```
- This will create `.husky/pre-push`
  ```bash
  #!/bin/sh
  . "$(dirname "$0")/_/husky.sh"

  npm run lint && npm run test:ci
  ```
  
  

# Creating a npm package
https://dev.to/joshaguilar/fully-automating-npm-package-releases-3k7ez

- sematic versioning
  <BREAKING>.<FEATURE>.<FIX>
  <MAJOR>.<MINOR>.<PATCH>
## For Every release
1. Run tests (if there are any)
2. Update version in package.json according to Semver
3. Create a git tag according to Semver
  MAJOR.MINOR.PATCH
  `$ git tag -a v#.#.# -m #.#.#`
4. Push the package to Github
5. Push the package to npm
6. Create release notes for every update



# JS Doc
- There are alot of ways to document your code; README, tutorials, documentation file, etc
- The problem with the one above is they get out of date quickly, it's best to put your documentaion as close to the code so that you can update it as you up update the functionality.
- JSDoc is perfect for this kinda documentation layer, plus if you are using vscode it will give you intellesence!

1. Start with a code block
  ```js
  /**
   * Takes in to numbers and will add them
   */
  function addItems(item1, item2) {
    return item1 + item2
  }
  export default addItems
  ```
2. Add a description of what it does 
  - The function name should give it away but it gives you a chance to descript it with words)
    ```js
    /**
     * Takes in to numbers and will add them
     */
    function addItems(item1, item2) {
      return item1 + item2
    }
    export default addItems
    ```
  - ![jsdoc-description-only](plublic/assets/blog/jsdoc-description-only.jpg)

2. Now describe the params and the return
  - Here is what the format looks like
    ```js
    /**
    *
    * @param {param type} param name - description
    *
    */
    ```
  - Now let's add those
    ```js
    /**
     * Takes in to numbers and will add them
     *
     * @param {number} item1 - First number
     * @param {number} item2 - Second number
     * @returns {number} Sum of the 2 numbers
     */
    function addItems(item1, item2) {
      return item1 + item2
    }
    export default addItems
    ```
  - ![jsdoc-complete](plublic/assets/blog/jsdoc-complete.jpg)

3. Use the function
  - As you start to type in the parameter it will tell you the data type
  - ![jsdoc-using](plublic/assets/blog/jsdoc-using.jpg)

- Example of JSDoc
  ```js
  /**
   * Raises a number to exponent
   * @param {number} value - The base to raise
   * @param {number} exponent - The exponent
   * @return {number} - The exponent power
   */

   /**
   * A silly logger function
   * @param {string} message
   * @return {void} Nothing
   */


   /**
   * Generates a table head
   * @author Valentino Gagliardi <valentinoDOTvalentinog.com>
   * @param {HTMLTableElement} table - The target HTML table
   * @param {Array} data - The array of cell header names
   */
  ```
- Generate docs
  - You can use the `jsdoc` to generate documentation for all your functions
  - *Note* if you use `export default function yourFunctionName()` it won't create it you have to define it with just `function yourFunctionName()` then export it on another line `export default yourFunctionName`
  - Add the `jsdoc` package to your repo
    ```shell
    $ mkdir docs
    $ npm i -D jsdoc
    ```
  - update your `package.json` file
    ```js
     "scripts": {
      "make:docs":"jsdoc -d documentation src/*.js "
    },
    ```
  - now run the doc generator
    ```shell
    $ npm run make:docs
    $ cd documentation
    $ npx live-server
    ```



