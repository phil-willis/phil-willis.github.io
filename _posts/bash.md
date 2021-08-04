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
