---
title: 'bash'
excerpt: ''
coverImage: '/assets/covers/bash.jpg'
ogImage:
  url: '/assets/covers/bash.jpg'
---


# Overview of bash
- Bash is the shell, or command language interpreter, for the GNU operating system. 
- The name is an acronym for the ‘Bourne-Again SHell’, a pun on Stephen Bourne, the author of the direct ancestor of the current Unix shell sh, which appeared in the Seventh Edition Bell Labs Research version of Unix.

## Bash tips
- Create a new directory or folder
  ```shell
  $ mkdir <directory_name> && cd $_

  # For oh-my-zsh users:
  $ take <directory_name>
  ```

# Set Environment Variables in Your Bash Shell From a `.env` File
- You can load all the environment variables from a file
  ```shell
  # Show env vars
  grep -v '^#' .env

  # Export env vars
  export $(grep -v '^#' .env | xargs)
  ```
- Only load them if the file exist
  ```shell
  if [ -f .env ]; then export $(cat .env | xargs); fi
  ```

# Kill process running on a port number
  ```shell
  # Find:
  $ lsof -i :3000

  # Kill:
  $ kill -9 <PID>
  ```


# Change the extension of all files in a directory
- Change all `*.jsx` to `*.tsx`
  ```shell
  $ for f in *.jsx; do mv -- "$f" "${f%.jsx}.tsx"; done
  ```



# `jq` for parsing JSON data 
- `jq`is a lightweight and flexible command-line JSON processor.
- [js](https://stedolan.github.io/jq/)
- jq is like sed for JSON data - you can use it to slice and filter and map and transform structured data with the same ease that sed, awk, grep and friends let you play with text.
- It allows you to run a command in the terminal and that the JSON result and parse in inline
- It's designed of the terminal but you can also use it in nodejs `$ npm i node-jq`
- [playground](https://jqplay.org/)

## How to filter
```shell
# read a file
jq '.' package.json

# Get the value of a string
jq '.name' package.json

# Get an object
jq '.scripts' client/input.json
jq '.scripts + {"hello": "jq"}' client/input.json               # add a new key/value to an object
jq '.scripts | del(.scripts.test)' client/input.json            # remove a new key/value to an object
jq '.scripts.start = "webpack-dev-server"' client/input.json    # Update
jq 'del(.scripts.test)' client/input.json                       # Delete a key/value
jq '.scripts.start = "webpack-dev-server" | del(.scripts.test)' client/input.json   # Update & Delete 

# Get an array
jq '.browserslist.production' client/input.json       # prints an array
jq '.browserslist.production[]' client/input.json     # returns each element in the array
jq '.browserslist.production[0]' client/input.json    # get first item in the array
jq '.browserslist.production[1:2]' client/input.json  # slice

jq '.browserslist.production[] + "SOMETHING NEW"' client/input.json   # add something to each item in array
jq '["SOMETHING NEW"] + .browserslist.production ' client/input.json  # Add to beginging
jq '.browserslist.production + ["SOMETHING NEW"]' client/input.json   # Add to end
jq '.browserslist.production[0] = "yessss"' client/input.json         # Update
jq 'del(.browserslist.production[0])' client/input.json               # Delete
jq '.browserslist.production[] | ' client/input.json  
```

## Update a JSON file
```shell
$ echo "`jq '.scripts.serve="node dist/index.js"' package.json`" > package.json
$ newVal="node dist/index.js"; echo "`jq --arg newVal "$newVal"  '.scripts.serve=$newVal' package.json`" > package.json
```

## Loop thru array
```shell
sample='[{"name":"foo"},{"name":"bar"}]'
echo "${sample}" | jq '.'
```

## Regular expressions (PCRE)
test(val)
match(val)
capture(val)
scan(val)
scan(regex)
split(regex; flags)
sub(regex; tostring)
sub("<LOOKING_FOR>", "<REPLACE_WITH>")

## Output in a single line
- To get outputs from jq on a single line use the `-c` flag
  ```shell
  jq -c . input
  ```

## Raw Output
- This allows you to not have wrapped quotes around the result
  ```shell
  jq -r . input
  ```

## AWS-CLI and JQ
```shell
$ aws route53 list-hosted-zones | jq '.[]'
$ aws route53 list-hosted-zones | jq '.HostedZones[]'
$ aws route53 list-hosted-zones | jq '.HostedZones[].Name'
$ aws route53 list-hosted-zones | jq '.HostedZones[] | select(.Name == "someawesomesite.com.") | .Id ' 
$ aws route53 list-hosted-zones | jq '.HostedZones[] | select(.Name == "someawesomesite.com.") | .Id | sub("/hostedzone/";"") '

$ hz=$(aws route53 list-hosted-zones | jq -r '.HostedZones[] | select(.Name == "someawesomesite.com.") | .Id | sub("/hostedzone/";"") ')
$ echo "Getting info on $hz"
$ aws route53 get-hosted-zone --id $hz
```










 
# npm's `ZX` to create JS script
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



# Create a global `node init` bash script
- It get a little tedious to scafold out a quick node application
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
  
  # Scaffold a nodejs module with esm format
  function init-nodejs() { 
    # Git
    git init
    git branch -m main default

    # Node configuration & packages
    npm init -y
    npm i -D @babel/node@7 @babel/preset-env@7 @babel/cli@7 @babel/core@7
    npm i -D prettier eslint eslint-config-prettier eslint-plugin-prettier

    # Create files and folders
    makeNodejsRCFiles
    makeSampleNodeFile

    # Update the `packages.json` file
    newVal="npx nodemon --exec babel-node src/index.js"; echo "`jq --arg newVal "$newVal"  '.scripts.start=$newVal' package.json`" > package.json
    newVal="babel src --out-dir dist"; echo "`jq --arg newVal "$newVal"  '.scripts.build=$newVal' package.json`" > package.json
    newVal="node dist/index.js"; echo "`jq --arg newVal "$newVal"  '.scripts.serve=$newVal' package.json`" > package.json
  }

  function makeNodejsRCFiles(){
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

  function makeSampleNodeFile(){
    mkdir src
    cat << 'EOT' > src/index.js
  import crypto from 'crypto'

  const password = '123456789'
  const key = crypto.scryptSync(password, 'GfG', 24)
  console.log(key)
  EOT
  }
  ```
- Now you can create a new npm node
  ```shell
  $ cd mkdir some-new-dir && $_
  $ init-nodejs
  ```

# MacOS 



## Disk Utility does not show APFS format? 
- Try switching "View" in the top left corner of Disk Utility to "Show All Devices" and try again.





