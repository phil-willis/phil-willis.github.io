---
title: 'bash'
excerpt: ''
coverImage: '/assets/blog/hello-world/cover.jpg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---


# Overview of bash

## Bash tips
- Create a new directory or folder
  ```shell
  $ mkdir <directory_name> && cd $_

  # For oh-my-zsh users:
  $ take <directory_name>
  ```
 
 

# Kill process running on a port number

```shell
# Find:
$ lsof -i :3000

# Kill:
$ kill -9 <PID>
```









 
# ZX to create JS script
- The `ZX` package provides useful wrappers around `child_process`, escapes arguments and gives sensible defaults.
- What this nodejs package actually do is it allows you to right scripts in JS and use bash sprinkled into it


## Get started
0. Install
  $ npm i -g zx

1. Add the following shebang to the beginning of your zx scripts:
  ```js
  #!/usr/bin/env zx
  ```
2. How to run the script
  - Run it like a regular bash script
    ```shell
    $ chmod +x ./script.mjs
    $ ./script.mjs
    ```
  - Or 
    ```shell
    $ zx ./script.mjs
    ```

3. How to write commands
- All functions ($, cd, fetch, question, sleep, etc) are available straight away without any imports.
- Also includes (chalk, fs, os) without any imports.
  ```js
  $`command`
  ```


## Working with ZX
### Run bash command
  ```js
  await $`pwd`
  await $`cat package.json | grep name`
  ```

### You can use chalk 
  ```js
  console.log(chalk.blue('homedir'), os.homedir() )
  ```

### JS promises
  ```js
  await Promise.all([
    $`sleep 1; echo 1`,
    $`sleep 2; echo 2`,
    $`sleep 3; echo 3`,
  ])
  ```

### fetch from a URL
  ```js
  let spaceXUrl = 'https://api.spacexdata.com/v4/launches/latest'
  let resp = await fetch(spaceXUrl)
  if (resp.ok) {
    console.log(await resp.text())
  }
  ```


### Ask questions
  ```js
  let shoes = await question('Whats your favorite Nike shoe? ')
  let token = await question('Choose env variable: ', {
    choices: Object.keys(process.env)
  })
  console.log(shoes)
  ```



# node init script
- it get a little tedious to scafold out a quick node application
- Create a file in `~/.zsh/nodejs.zsh`
  ```shell
  # NVM
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

  # Node Environment
  export NODE_ENV=development

  alias npmlsg='npm list -g --depth=0'
  alias npmlsl='npm list -g --depth=0 --link=true'
  alias npmis="npm i && npm start"

  alias cra="npx create-react-app "
  # Open Brave browser with term
  
  # Scaffold a nodejs esm module
  function initnodejs() { 
    # Git
    git init
    git branch -m main default

    # Node configuration & packages
    npm init -y
    npm i -D @babel/node@7 @babel/preset-env@7 @babel/cli@7 @babel/core@7
    npm i -D prettier eslint eslint-config-prettier eslint-plugin-prettier

    # Create RC Files
    makeRCFiles

    makeNodeFile

    # Update the `packages.json` file
    newVal="npx nodemon --exec babel-node src/index.js"; echo "`jq --arg newVal "$newVal"  '.scripts.start=$newVal' package.json`" > package.json
    newVal="babel src --out-dir dist"; echo "`jq --arg newVal "$newVal"  '.scripts.build=$newVal' package.json`" > package.json
    newVal="node dist/index.js"; echo "`jq --arg newVal "$newVal"  '.scripts.serve=$newVal' package.json`" > package.json
  }



  function makeRCFiles(){
    # Create `.gitignore` files
    cat << 'EOT' > .gitignore
  node_modules
  dist
  .env
  EOT


    # Create `.prettierrc` files
    cat << 'EOT' > .prettierrc
  {
    "semi": false,
    "trailingComma": "all",
    "singleQuote": true,
    "printWidth": 70
  }
  EOT

    # Create `.babelrc` files
    cat << 'EOT' > .babelrc
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "esmodules": true
          }
        }
      ]
    ]
  }
  EOT

    # Create `.eslintrc` files
    cat << 'EOT' > .eslintrc
  {
    "env": {
      "commonjs": true,
      "es6": true,
      "node": true
    },
    "extends": [ "prettier", "plugin:node/recommended"],
    "parserOptions": {
      "ecmaVersion": 2018
    },
    "plugins": ["prettier"],
    "rules": {
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
      "no-console": "off",
      "func-names": "off",
      "no-process-exit": "off",
      "class-methods-use-this": "off"
    }
  }
  EOT

    # Create `.vscode/settings.json` files
    mkdir .vscode
    cat << 'EOT' > .vscode/settings.json
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
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    }

  }
  EOT
  }


  function makeNodeFile(){
    mkdir src
    cat << 'EOT' > src/index.js
  import crypto from 'crypto'

  const password = '123456789'
  const key = crypto.scryptSync(password, 'GfG', 24)
  console.log(key)
  EOT
  }
```




