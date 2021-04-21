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







