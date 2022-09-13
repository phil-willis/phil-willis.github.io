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
- The `.env` file is used to pass in environment variables to a script
- Environment variables allow us to manage the configuration of our applications separately from our codebase. 
- Separating configurations makes it easier for our application to be deployed in different environments.
- Environment variables are variables external to our application which reside in the OS or the container where the production application is running. 
- Because development is mostly done on local machines, environment variables are put either to local environment variables with commands such as set or export, or stored in the local .env file.
- General rules with `.env` file
  1. List environment variables on single line with `<KEY>=<VALUE>` format
  2. Comments `#` needs to be the first character on the line **NOT** after a key/value definition  *NOT THIS* -> `HOST="localhost" # for local development (do not add comments after the key/value definition)`
  3. Empty lines are skipped
  4. inner quotes are maintainted
- `.env` example:
  ```shell
  HOST = localhost
  DATABASE = ydb
  PORT = 5432
  ```
  
  ```shell
  HOST="localhost"
  DATABASE="ydb"
  PORT=5432
  ```
  
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
- Allow for comment lines
  ```shell
  if [ -f .env ]; then export $(cat .env | egrep -v "(^#.*|^$)" | xargs); fi
  ```
- Loading `.env` in an JavaScript file with the `dotenv` package
  ```js
  require('dotenv').config()

  const hostname = process.env.HOST;
  const database = process.env.DATABASE;
  const port = process.env.PORT;

  console.log(hostname);
  console.log(database);
  console.log(port);
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


# Terminal Colors
- Set/Reset
  ```basic
  0: Reset/remove all modifier, foreground and background attributes: echo -e "\e[0mNormal Text"
  1: Bold/Bright: echo -e "Normal \e[1mBold"
  2: Dim: echo -e "Normal \e[2mDim"
  4: Underlined: echo -e "Normal \e[4mUnderlined"
  5: Blink (doesn't work in most terminals except XTerm): echo -e "Normal \e[5mBlink"
  7: Reverse/Invert: echo -e "Normal \e[7minverted"
  8: Hidden (useful for sensitive info): echo -e "Normal \e[8mHidden Input"
  21: Reset/Remove bold/bright: echo -e "Normal \e[1mBold \e[21mNormal"
  22: Reset/Remove dim: echo -e "Normal \e[2mDim \e[22mNormal"
  24: Reset/Remove underline: echo -e "Normal \e[4mUnderlined \e[24mNormal"
  25: Reset/Remove blink: echo -e "Normal \e[5mBlink \e[25mNormal"
  27: Reset/Remove reverse/invert: echo -e "Normal \e[7minverted \e[27mNormal"
  28: Reset/Remove hidden: echo -e "Normal \e[8mHidden \e[28mNormal"
  ```
- Foreground
  ```basic
  39: Default (usually green, white or light gray): echo -e "Default \e[39mDefault"
  30: Black: echo -e "Default \e[30mBlack" (best combined with a background colour: echo -e "Default \e[30;107mBlack on white")
  31: Red (don't use with green background)
  32: Green
  33: Yellow
  34: Blue
  35: Magenta/Purple
  36: Cyan
  37: Light Gray
  90: Dark Gray
  91: Light Red
  92: Light Green
  93: Light Yellow
  94: Light Blue
  95: Light Magenta/Pink
  96: Light Cyan
  97: White
  ```
- Background
  ```basic
  49: Default background color (usually black or blue)
  40: Black
  41: Red
  42: Green
  43: Yellow
  44: Blue
  45: Magenta/Purple
  46: Cyan
  47: Light Gray (don't use with white foreground)
  100: Dark Gray (don't use with black foreground)
  101: Light Red
  102: Light Green (don't use with white foreground)
  103: Light Yellow (don't use with white foreground)
  104: Light Blue (don't use with light yellow foreground)
  105: Light Magenta/Pink (don't use with light foreground)
  106: Light Cyan (don't use with white foreground)
  107: White (don't use with light foreground)
  ```
- Example
  ```shell
  # Colors
  Red=$'\e[1;41m'
  Green=$'\e[1;42m'
  Blue=$'\e[1;34m'
  clear_color=$'\e[1;49m'

  echo " $Blue[this should be blue] $clear_color this should be default color"
  echo " $Red[this should be red] $clear_color this should be default color"
  ```




# Rename file extensions
```shell
# replace all the `.txt` to `text`
$ for file in *.txt; do mv "$file" "${file%.txt}.text"; done

# Want to rename all nested folders
$ for file in **/*.jsx; do mv "$file" "${file%.jsx}.tsx"; done
```



# Replace a String With Another String In All Files Using sed and Perl -pie Options
<!-- https://www.cyberciti.biz/faq/unix-linux-replace-string-words-in-many-files/ -->

```shell
find='/nfsroot'
replace='/efsroot'
sed -i'.backup' "s+${find}+${replace}+g" input.txt
rm -rf input.txt.backup
 
## or test it on string ##
string='AWS config for shared storage location: /nfsroot'
sed "s+${find}+${replace}+g" <<<"$string"
```


# Passing in argument to a file
- Create a file
  ```shell
  $ echo 'echo $1 $2 $3' > filename.sh
  $ chmod +x filename.sh
  $ ./filename.sh argument1 argument2 argument3
  ```
- Arguments passed into a bash file start with `$` and the non-zero base list of arguments e.g. `$1` or `$2`







# Functions
- Create a file
  ```shell
  $ touch filename.sh
  $ sudo chmod +x filename.sh
  $ ./filename.sh argument1 argument2 argument
  ```

- Add some stuff in the file
  ```shell
  function_name () {
    commands
  }
  ```

- Local and globa variables
  ```shell
  var1='A'
  var2='B'

  my_function () {
    local var1='C'
    var2='D'
    echo "Inside function: var1: $var1, var2: $var2"
  }

  echo "Before executing function: var1: $var1, var2: $var2"

  my_function

  echo "After executing function: var1: $var1, var2: $var2"
  ```

- If statements

```shell
if <test_expression>; then
  <command-to-execute>
elif <test_expression>; then
  <command-to-execute>
else
  <command-to-execute>
fi
```

































===============
# MacOS 


## Disk Utility does not show APFS format? 
- Try switching "View" in the top left corner of Disk Utility to "Show All Devices" and try again.

## iPhone backup onto external drive
- When you backup your iOS device by default it will store the files at `cd ~/Library/Application\ Support/MobileSync/Backup/`. What we can do is create a `symlink` this folder to an external drive so that when you press the `Backup Up Now` button it will back your device to an external drive

- Steps:
  1. Symlink the `Backup` folder
    ```shell
    $ ln -s /Volumes/<NAME_OF_YOUR_EXTERNAL_DEVICE>/Backups/ios-backup/ ~/Library/Application\ Support/MobileSync/Backup
    ```
  2. Plug your iOS device in and click the `Back Up Now` button 
    ![macos-backup-ios](/assets/blog/macos/macos-backup-ios.jpg)
  3. Your `~/Library/Application\ Support/MobileSync/` Folder should look like the image below:
    ![macos-symlink-ios-backup](/assets/blog/macos/macos-symlink-ios-backup.jpg)



===============
# CURL
- CURL allows you to make http request from the terminal
  ```shell
  $ curl https://reqbin.com/echo/get/json
    -H "Accept: application/json"
    -H "Authorization: Bearer {token}"
  ```












===============
# JQ
## `jq` for parsing JSON data 
- `jq`is a lightweight and flexible command-line JSON processor.
- [js](https://stedolan.github.io/jq/)
- jq is like sed for JSON data - you can use it to slice and filter and map and transform structured data with the same ease that sed, awk, grep and friends let you play with text.
- It allows you to run a command in the terminal and that the JSON result and parse in inline
- It's designed of the terminal but you can also use it in nodejs `$ npm i node-jq`
- [playground](https://jqplay.org/)

## How to filter
```shell
# read a file
$ jq '.' package.json

# Get the value of a string
$ jq '.name' package.json

# Get an object
$ jq '.scripts' client/input.json
$ jq '.scripts + {"hello": "jq"}' client/input.json               # add a new key/value to an object
$ jq '.scripts | del(.scripts.test)' client/input.json            # remove a new key/value to an object
$ jq '.scripts.start = "webpack-dev-server"' client/input.json    # Update
$ jq 'del(.scripts.test)' client/input.json                       # Delete a key/value
$ jq '.scripts.start = "webpack-dev-server" | del(.scripts.test)' client/input.json   # Update & Delete 

# Get an array
$ jq '.browserslist.production' client/input.json       # prints an array
$ jq '.browserslist.production[]' client/input.json     # returns each element in the array
$ jq '.browserslist.production[0]' client/input.json    # get first item in the array
$ jq '.browserslist.production[1:2]' client/input.json  # slice

$ jq '.browserslist.production[] + "SOMETHING NEW"' client/input.json   # add something to each item in array
$ jq '["SOMETHING NEW"] + .browserslist.production ' client/input.json  # Add to beginging
$ jq '.browserslist.production + ["SOMETHING NEW"]' client/input.json   # Add to end
$ jq '.browserslist.production[0] = "yessss"' client/input.json         # Update
$ jq 'del(.browserslist.production[0])' client/input.json               # Delete
$ jq '.browserslist.production[] | ' client/input.json  

# Update
$ echo "`jq '.scripts.dev="tsc -w && nodemon dist"' package.json`" > package.json
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


























===============
# ZX
## npm's `ZX` to create JS script
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



























===============
# Create a bash script to init an nodejs application
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
    "printWidth": 100
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





