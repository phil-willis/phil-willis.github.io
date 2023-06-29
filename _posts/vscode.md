---
title: 'VSCode'
excerpt: ''
coverImage: '/assets/covers/vscode.jpg'
ogImage:
  url: '/assets/covers/vscode.jpg'
---



# Shortcuts
| What                   |      commands                  |
|------------------------|:------------------------------:|
| Collapse File Explorer |  [cmd/ctl]+[Shift]+[up-arrow]  |
| Split new terminal     |  [ctl]+[Shift]+[5]             |


# vscode macOS finder button
- [Download link](https://github.com/hamxiaoz/open-folder-with-vs-code)






<details>
<summary>The settings file</summary>

# The settings file
- When you create this setting files in the `.vscode` directory you are adding setting for this local repo and not global vscode settings
- Here's an example of a `.vscode/settings.json` with eslint/prettier configurations
  ```json
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
    "[javascriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
    "[typescriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
  }
  ```

</details>



<details>
<summary>The launch file</summary>

# The launch file
- The `.vscode/launch.json` file allows you to configure some things for debugging
  ```json
  {
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
      {
        "type": "pwa-chrome",
        "request": "launch",
        "name": "Launch Chrome against localhost",
        "url": "http://localhost:3003",
        "webRoot": "${workspaceFolder}"
      }
    ]
  }
  ```
</details>





<details>
<summary>Preferences</summary>

# Preferences
- There are 2 places to setup your vscode preferences
  1. Global (Base for all of vscode)
  2. Local (project specific) which you setup in a `./vscode/settings.json`
- Basically you want to put all the settings for how you want vscode to look in the `Global` settings and project specific settings in the `Local` settings
- Global Settings example:
  ```json
  {
    "aws.samcli.location": "/usr/local/bin/sam",
    "breadcrumbs.enabled": true,
    "editor.cursorBlinking": "phase",
    "editor.detectIndentation": false,
    "editor.fontFamily": "Fira Code, Menlo, Monaco, 'Courier New', monospace, FuraMono Nerd Font",
    "editor.fontLigatures": true,
    "editor.formatOnSave": false,
    "editor.renderControlCharacters": true,
    "editor.suggestSelection": "first",
    "editor.tabSize": 2,
    "explorer.openEditors.visible": 0,
    "files.associations": {
      "*.tpl": "javascript",
      "*.tf": "terraform",
      "*.tfvars": "terraform",
      "*.tfstate": "json",
      "*.geojson": "json"
    },
    "git.autofetch": true,
    "git.enableSmartCommit": true,
    "gitlens.codeLens.includeSingleLineSymbols": true,
    "indentRainbow.colors": [
        "rgba(16,48,48,0.1)",
        "rgba(32,64,32,0.1)",
        "rgba(64,32,64,0.1)",
        "rgba(64,64,16,0.1)"
    ],
    "javascript.updateImportsOnFileMove.enabled": "always",
    "material-icon-theme.files.associations": {
        "*.ts": "typescript",
        "fileName.ts": "angular",
        "*.docker-compose.yml": "docker"
    },
    "material-icon-theme.folders.associations": {
        "firebase": "aws",
        "sample": "dist"
    },
    "material-icon-theme.languages.associations": {
        "json": "json",
        "languageId": "iconName"
    },
    "prettier.printWidth": 120,
    "terminal.integrated.rendererType": "dom",
    "terminal.integrated.shell.osx": "/bin/zsh",

    // Deprecated
    "terminal.integrated.shell.osx": "/bin/zsh",

    // New way
    "terminal.integrated.profiles.osx":{
        "bash": {
          "path": "bash",
          "args": [
            "-l"
          ],
          "icon": "terminal-bash"
        },
        "zsh": {
          "path": "zsh",
          "args": [
            "-l"
          ]
        },
        "fish": {
          "path": "fish",
          "args": [
            "-l"
          ]
        },
        "tmux": {
          "path": "tmux",
          "icon": "terminal-tmux"
        },
        "pwsh": {
          "path": "pwsh",
          "icon": "terminal-powershell"
        }
      },


    "timeline.excludeSources": [],
    "workbench.colorCustomizations": {},
    "workbench.colorTheme": "Monokai Operator Mono",
    "workbench.iconTheme": "material-icon-theme",
    "workbench.startupEditor": "newUntitledFile",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    },
    "[javascriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[markdown]": {
        "editor.formatOnSave": false
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "vsicons.dontShowNewVersionMessage": true,
    "editor.accessibilitySupport": "off",
    "advancedNewFile.exclude": {
      "node_modules": true,
      "node_modules_electron": true,
      "dev": true,
      "dist": true
    },
    "advancedNewFile.showInformationMessages": true,
    "advancedNewFile.convenienceOptions": ["last", "current", "root"]
  }
  ```
- Local Settings for a React App
  ```json
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
    },
  }
  ```
</details>





<details>
<summary>Stop Github from asking for your rsa keyphrase</summary>

# Stop Github from asking for your rsa keyphrase
- Add your key to ssh-agent (storing the passphrase in MacOS Keychain!)
  ```
  $ ssh-add -K ~/.ssh/id_rsa
  ```
- If you are using a different rsa key 
  ```
  $ ssh-add -K ~/.ssh/id_rsa_other_key
  ```
</details>




<details>
<summary>Custom Snippets</summary>

# Snippets
- To create a new snippet run [cmd][shift][P] then type in `Snippets: Configure User Snippets`
- Create a new one, for global snippets they will be saved `~/Library/Application Support/Code/User/snippets/<SNIPPET_NAME>`
- [More info here](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

## First Snippet
  ```json
  {
    "Print to console": {
      "scope": "javascript,typescript",
      "prefix": "log",
      "body": [
        "console.log('$1');",
        "$2"
      ],
      "description": "Log output to console"
    }
  }
  ```
- Now you can type in `log` followed by a [tab] and it will add `console.log();` with your cursor at inside the `()`
- The pieces
  - `prefix` => what you have to type 
  - `body` => what the snippet will add
  - `description` => 
- You can also add some `Tab Stops` to have the user tab to section of the body code


## Choices
- You can also provide a TabStop with dropdown options
  ```json
  {
    "log.me": {
      "prefix": "cl",
      "body": [
        "console.${2|log,table,dir|}($1)"
      ],
      "description": "Allow for the second tab option to pick what kind of console funtion you want"
    }
  }
  ```
- Now the first TabStop will be for what you want to type in, then the second will allow you to pick between `log|table|dir`

## Variables
- You can also take it a step future by using some [variables](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_variables) to super power your snippet
- For example: `TM_SELECTED_TEXT`, `TM_CURRENT_LINE`, `TM_FILENAME`, `CLIPBOARD`, 
- `${TM_SELECTED_TEXT:default}.`

- Let add a new snippet called `better.log`
  ```json
  {
    "better.log": {
      "prefix": "ll",
      "body": [
        "console.log('🤖🤖', JSON.stringify(${TM_SELECTED_TEXT:${1}}, null, 1))"
      ],
      "description": "Custom console.log JSON snippet"
    }
  }
  ```

## Add keybinding 
- [cmd][shift][P], then type in `Preferences: Open Keyboard Shortcuts`, then [cmd][K] & [cmd][K]
  ```json
  [
    {
      "key": "ctrl+alt+l",
      "command": "commandId",
      "when": "editorTextFocus"
    }
  ]
  ```
- Now let's update the keybinding so that 
  ```json
  [
    {
      "key": "ctrl+alt+l",
      "command": "editor.action.insertSnippet",
      "when": "editorTextFocus",
      "args": {
        "name": "better.log"
      }
    }
  ]
  ```
- The above keybindings says: run this snippet `command`, with the name `better.log`, when we press [Control][Option][L]

</details>























# Extensions
<details>
<summary>Create a script that will install a bunch of extensions</summary>

```shell
# Set the vscode extension dir
code --extensions-dir ~/.vscode/extensions

# Install vscode extensions
code --install-extension henrynguyen5-vsc.vsc-nvm
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```
</details>



<details>
<summary>Monokai Operator</summary>

- [extension link](https://marketplace.visualstudio.com/items?itemName=markfknight.monokai-operator-theme)
</details>




<details>
<summary>Debugger for Chrome</summary>

- This is now baked in VSCode
</details>



<details>
<summary>AWS Toolkit </summary>

- [extension link](https://marketplace.visualstudio.com/items?itemName=AmazonWebServices.aws-toolkit-vscode)
- This will connect to whatever account in your `~/.aws/credentials`
- If your credentials rotate, just run `gimme-aws-creds` and reopen this extension
- Really quick way to see your `S3 buckets`, `API Gateway`, `Lambda`
</details>



<details>
<summary>Serverless Console</summary>

- [extension link](https://marketplace.visualstudio.com/items?itemName=devAdvice.serverlessconsole)
</details>


<details>
<summary>SQLTools</summary>

- [extension](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools)
- You can connect to SQL Databases
- Can connect to MySQL, Postgres, SQLite, AWS Redshift, MariaDB, SQL Server
- You need to add the additional extensions
  - [sqltools-driver-sqlite](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools-driver-sqlite)
  - [sqltools sqlite connection docs](https://vscode-sqltools.mteixeira.dev/driver/sqlite)    
  - [sqlite tutorial](https://www.sqlitetutorial.net/)
  - [sqltools Postgres connection docs](https://vscode-sqltools.mteixeira.dev/driver/postgresql)
</details>



<details>
<summary>Thunder Client</summary>

- [extension link](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
- Basically a simpler version of Postman inside of VSCode
- You can create `Collections` & `ENV`
</details>



<details>
<summary>REST Client  </summary>

- [extension link](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- Create a `*.http`|`*.rest` file 
- Use `###` to separate calls
  ```html
  POST https://example.com/comments HTTP/1.1
  content-type: application/json

  {
      "name": "sample",
      "time": "Wed, 21 Oct 2015 18:27:50 GMT"
  }
  ###

  GET https://api.spacexdata.com/v4/launches/latest HTTP/1.1
  Content-Type: application/json
  ```
  - Using variables
  ```html
  @token = xxx

  GET https://api.awesomeness.com HTTP/1.1
  Authorization: Bearer {{token}}
  Content-Type: application/json
  ```
- If you really want to get fancy you can create a `.env` file and add some environment variables in it

  ```shell
  # your .env file
  secrete="12345shhhhhhhh"
  ```

  ```html
  # your `.http` file
  @secrete = {{$dotenv secrete}}
  ```
</details>




<details>
<summary>Prettier</summary>

- [extension link](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- Update your `.vscode/settings.json`
  ```json
  {
    "editor.formatOnSave": false,
    "editor.detectIndentation": false,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },

    // Prettier config file
    "prettier.configPath": ".prettierrc.toml", // or .prettierrc

    // Define the file types to do the autoformatting
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.formatOnSave": true
    },
    "[stylus]": {
      "editor.formatOnSave": true
    },
  }
  ```
</details>


<details>
<summary>ESLint</summary>

- [extension link](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
</details>


<details>
<summary>Git Graph</summary>

- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
</details>


<details>
<summary>Document This</summary>

- [Document This](https://marketplace.visualstudio.com/items?itemName=oouo-diogo-perdigao.docthis)
</details>


<details>
<summary>Styled-Components Syntax</summary>

- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
</details>


<details>
<summary>Viewing PDF `vscode-pdf`</summary>

- [extension link](https://marketplace.visualstudio.com/items?itemName=tomoki1207.pdf)
</details>


<details>
<summary>Terraform syntax</summary>

- [extension link](https://marketplace.visualstudio.com/items?itemName=4ops.terraform)
- Syntax highlighting, Basic syntax validation, & Snippets

</details>


<details>
<summary>MDX</summary>

- MDX support
- [extension link](https://marketplace.visualstudio.com/items?itemName=silvenon.mdx)
- Update your `.vscode/settings.json`
  ```json
  "files.associations": {
    "*.md": "mdx"
  },
  ```
</details>


<details>
<summary>Material Icon Theme</summary>

- [extension link](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
</details>

<details>
<summary>Docker</summary>

- [extension link](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
</details>

<details>
<summary>DotENV</summary>

- [extension link](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
</details>


<details>
<summary>JavaScript and TypeScript Nightly</summary>

- [extension link](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
</details>


<details>
<summary>Swagger Viewer</summary>

- [Swagger Viewer](https://marketplace.visualstudio.com/items?itemName=Arjun.swagger-viewer)
- Do a `[cmd][shift][p] > swagger`
</details>




<details>
<summary>Turbo Logger</summary>

- quickly add a console.log [control][option][L]
- Comment all console.log [shift][option][C]
- Uncomment all console.log [shift][option][U]
- Delete all console.log [shift][option][D]

</details>

