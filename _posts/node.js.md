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

  
  
  
  
  
  

