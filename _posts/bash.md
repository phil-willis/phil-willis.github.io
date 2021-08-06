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






# `jq` for parsing JSON data 
- `jq`is a lightweight and flexible command-line JSON processor.
- [js](https://stedolan.github.io/jq/)
- jq is like sed for JSON data - you can use it to slice and filter and map and transform structured data with the same ease that sed, awk, grep and friends let you play with text.
- It allows you to run a command in the terminal and that the JSON result and parse in inline
- It's designed of the terminal but you can also use it in nodejs `$ npm i node-jq`
- [playground](https://jqplay.org/)

## How to filter
```sh
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
## Loop thru array
```bash
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
  ```bash
  jq -c . input
  ```

## Raw Output
- This allows you to not have wrapped quotes around the result
  ```bash
  jq -r . input
  ```

## AWS-CLI and JQ
```bash
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
