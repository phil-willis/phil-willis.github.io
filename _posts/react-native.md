---
title: 'react'
excerpt: ''
coverImage: '/assets/covers/react.jpg'
ogImage:
  url: '/assets/covers/react.jpg'
---


# Overview of react-native
- [React Native official site](https://reactnative.dev/)
- There are 2 ways to get started with React-Native
  1. 
  2. 
- You write React with `Primitive component` types e.g. `<div> => <View>` & `<p> => <Text>`, and React Native will convert that into native elements on the multiple platforms



# Platform specific 2 ways:
1. Using the `Platform`
  ```js
  import { Platform } from 'react-native';

  if (Platform.OS === 'web') {
  
  } 
  ```
2. Renaming the file as `*.web.tsx`, `*.ios.tsx`, `*.android.tsx`



# Get Started
1. Initialize a RN application from a template
  ```shell
  $ npm install --global expo-cli
  $ expo init <MY_PROJECT_NAME>
  ```

2. Add Linting
  - Install some dependencies:
    ```shell
    $ npm i -D  @trivago/prettier-plugin-sort-imports @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-jest eslint-plugin-prettier prettier
    ```
  - Update your package.json scripts
    ```json
    {
      "scripts": {
        "test": "jest --watchAll",
        "lint": "prettier --write {components,constants,navigation,screens}/**/*.ts{,x}"
      }
    }
    ```
  - `.prettierrc` file
    ```json
    {
      "semi": false,
      "trailingComma": "all",
      "singleQuote": true,
      "printWidth": 100
    }
    ```

  - `.eslintrc` file
    ```json
    {
      "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:jest/recommended",
        "plugin:prettier/recommended"
      ],
      "plugins": ["react", "@typescript-eslint", "jest"],
      "env": {
        "browser": true,
        "es6": true,
        "jest": true
      },
      "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
      },
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "ecmaFeatures": {
          "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
        "project": "./tsconfig.json"
      }
    }
    ```

  - `.vscode/settings.json` file
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
3. Update the `tsconfig.json` & `babel.config.js` to allow for file alias

  - Update the `babel.config.js`
    ```js
    module.exports = function (api) {
      api.cache(true)
      return {
        presets: ['babel-preset-expo'],
        plugins: [
          'react-native-reanimated/plugin',
          [
            'module-resolver',
            {
              root: ['./'],
              alias: {
                '@/assets': './assets',
                '@/components': './components',
                '@/constants': './constants',
                '@/hooks': './hooks',
                '@/libs': './libs',
                '@/navigation': './navigation',
                '@/screens': './screens',
                '@/styles': './styles',
                '@screens': './screens',
                '@types': './types',
              },
              extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
          ],
        ],
      }
    }
    ```

  - Update the `tsconfig.json`
    ```json
    {
      "$schema": "https://json.schemastore.org/tsconfig",
      "display": "Expo",
      "compilerOptions": {
        "allowJs": true,
        "esModuleInterop": true,
        "jsx": "react-native",
        "lib": [
          "DOM",
          "ESNext"
        ],
        "moduleResolution": "node",
        "noEmit": true,
        "resolveJsonModule": true,
        "skipLibCheck": true,
        "target": "ESNext",
        "allowSyntheticDefaultImports": true,
        "baseUrl": "./",
        "paths": {
          "@/assets/*": ["./assets/*"],
          "@/components/*": ["./components/*"],
          "@/constants/*": ["./constants/*"],
          "@/hooks/*": ["./hooks/*"],
          "@/libs/*": ["./libs/*"],
          "@/navigation/*": ["./navigation/*"],
          "@/screens/*": ["./screens/*"],
          "@/styles/*": ["./styles/*"],
          "@/types": ["./types/*"]
        }
      },
      "exclude": [
        "node_modules",
        "babel.config.js",
        "metro.config.js",
        "jest.config.js"
      ],
      "extends": "expo/tsconfig.base"
    }

    ```


# Screens
- ReactNative works with `Screens` instead of `Pages` 
- When it comes to application navigation native mobile app do not have the luxury of a browser URL
- One of the best options out there is `@react-navigation/native`
- Usually you'd do this in your entry file, such as `index.js` or `App.js`:
  ```js
  import * as React from 'react';
  import { NavigationContainer } from '@react-navigation/native';

  export default function App() {
    return (
      <NavigationContainer>
        {/* Rest of your app code */}
      </NavigationContainer>
    );
  }
  ```


```js
<BottomTab.Screen
      name="Collections"
      component={CollectionsScreen}
      options={{
        title: 'Collectionssss', // Title on the header
        tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
      }}
    />
```
