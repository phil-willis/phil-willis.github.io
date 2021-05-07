---
title: 'VSCode'
excerpt: 'Some tips for working with vscode'
coverImage: '/assets/blog/hello-world/cover.jpg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
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
- VSCode Advanced New File
  - [advanced-new-file](https://marketplace.visualstudio.com/items?itemName=patbenatar.advanced-new-file)
  - global settings
    ```json
    "advancedNewFile.exclude": {
      "node_modules": true,
      "node_modules_electron": true,
      "dev": true,
      "dist": true
    },
    "advancedNewFile.showInformationMessages": true,
    "advancedNewFile.convenienceOptions": ["last", "current", "root"]
    ```
  - Keybindings, you can add your own keybinding in your keybindings.json
    ```json
    {
      "key": "ctrl+n", // "cmd+n" on mac
      "command": "extension.advancedNewFile",
    }
    ```
    - *NOTE* You can also open the keybindings.json file from the Command Palette (Ctrl+Shift+P) with the `Preferences: Open Keyboard Shortcuts (JSON)` command.
- File Utils
  - [File Utils](https://marketplace.visualstudio.com/items?itemName=sleistner.vscode-fileutils
  - [cmd]+[shift]+[P], then >reaname
- Prettier
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- ESLint
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- SQLTools
  - [SQLTools](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools
- Git Graph
  - [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)
- Document This
  - [Document This](https://marketplace.visualstudio.com/items?itemName=oouo-diogo-perdigao.docthis)

