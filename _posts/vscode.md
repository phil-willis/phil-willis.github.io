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
        "fileName.ts": "angular"
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


# Extensions

## Create a script that will install a bunch of extensions

```shell
# Set the vscode extension dir
code --extensions-dir ~/.vscode/extensions

# Install vscode extensions
code --install-extension henrynguyen5-vsc.vsc-nvm
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
```


## Good Extensions

- Monokai Operator
  - [extension link](https://marketplace.visualstudio.com/items?itemName=markfknight.monokai-operator-theme)

- Debugger for Chrome
  - This is now baked in VSCode

- AWS Toolkit 
  - [extension link](https://marketplace.visualstudio.com/items?itemName=AmazonWebServices.aws-toolkit-vscode)
  - This will connect to whatever account in your `~/.aws/credentials`
  - If your credentials rotate, just run `gimme-aws-creds` and reopen this extension
  - Really quick way to see your `S3 buckets`, `API Gateway`, `Lambda`

- Serverless Console
  - [extension link](https://marketplace.visualstudio.com/items?itemName=devAdvice.serverlessconsole)

- SQLTools
  - [extension](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools)
  - You can connect to SQL Databases
  - Can connect to MySQL, Postgres, SQLite, AWS Redshift, MariaDB, SQL Server
  - You need to add the additional extensions
    - [sqltools-driver-sqlite](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools-driver-sqlite)
    - [sqltools sqlite connection docs](https://vscode-sqltools.mteixeira.dev/driver/sqlite)    
    - [sqlite tutorial](https://www.sqlitetutorial.net/)
    - [sqltools Postgres connection docs](https://vscode-sqltools.mteixeira.dev/driver/postgresql)

- Thunder Client
  - [extension link](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
  - Basically a simpler version of Postman inside of VSCode
  - You can create `Collections` & `ENV`
  
- REST Client  
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
    ```hml
    @token = xxx

    GET https://api.awesomeness.com HTTP/1.1
    Authorization: Bearer {{token}}
    Content-Type: application/json
    ```

- Prettier
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

- ESLint
  - [extension link](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- Git Graph
  - [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)

- Document This
  - [Document This](https://marketplace.visualstudio.com/items?itemName=oouo-diogo-perdigao.docthis)

- Styled-Components Syntax
  - [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
  
- Viewing PDF `vscode-pdf`
  - [extension link](https://marketplace.visualstudio.com/items?itemName=tomoki1207.pdf)

- Terraform syntax
  - [extension link](https://marketplace.visualstudio.com/items?itemName=4ops.terraform)
  - Syntax highlighting, Basic syntax validation, & Snippets


- MDX
  - MDX support
  - [extension link](https://marketplace.visualstudio.com/items?itemName=silvenon.mdx)
  - Update your `.vscode/settings.json`
    ```json
    "files.associations": {
      "*.md": "mdx"
    },
    ```

- Material Icon Theme
  - [extension link](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

- Docker
  - [extension link](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

- DotENV
  - [extension link](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)

- JavaScript and TypeScript Nightly
  - [extension link](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)

- Swagger Viewer
  - [Swagger Viewer](https://marketplace.visualstudio.com/items?itemName=Arjun.swagger-viewer)
  - Do a `[cmd][shift][p] > swagger`

# Stop Github from asking for your rsa keyphrase
- Add your key to ssh-agent (storing the passphrase in MacOS Keychain!)
  ```
  $ ssh-add -K ~/.ssh/id_rsa
  ```
- If you are using a different rsa key 
  ```
  $ ssh-add -K ~/.ssh/id_rsa_other_key
  ```


# Snippets
- [Create your own snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets)
  ```json
  {

    "component": {
      "scope": "javascript,typescript",
      "prefix": "next-page",
      "body": [
        "export default function Page({ }) {",
        "  return (",
        "    <div>",
        "    </div>",
        "  )",  
        "}",
      ],
      "description": "React component"
    }
  }
  ```
