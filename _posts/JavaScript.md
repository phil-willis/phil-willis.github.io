---
title: 'JavaScript'
excerpt: ''
coverImage: '/assets/covers/js.jpg'
ogImage:
  url: '/assets/covers/js.jpg'
---


# Overview of JavaScript
- Dynamic programming languages
  - Not pre-compiled
  - Code evaluated and executed at runtime
  - Code can change at runtime (variable types can change)
- Weakly types programming languages
  - Data types are assumed automatically
  - Strong types you have to define the types 
- Compiled at runtime
- JS was create to make webpages more dynamic
- JS is executed via JS engine 
  - V8 (Chrome)
  - SpiderMonkey (Firefox)
  - the JS engine
    1. Parse Code
    2. Compile to Machine code
    3. execute Machine code
  - All on an Single Thread on your operating system
- JS runs on a Host Environments
  - Browserside
    - can't acces local file system
    - Runs in a sandbox
  - Serverside
    - Extracted the Chrome's V8 (JS Engine)
    - You can run it on any machine
    - Called Node.js
    - You can run on the server
    - You can run on any computer (Mac/Linux/Windows)
    - Can't manipulate the DOM 



# Brief History
- 1995 Netscape release "LiveScript", then renamed to JavaScript
- 1996 Microsoft release it's own version for IE
- 1996 ECMA to start standardization









# Loop over a number of times 
```js
const opt = [...Array(4)].map((_, num) => ({ value: num, label: num }))
console.log(JSON.stringify(opt)) // [{"value":0,"label":0},{"value":1,"label":1},{"value":2,"label":2},{"value":3,"label":3}]
```



# Shorthand of if
- [stackoverflow](https://stackoverflow.com/questions/39488458/javascript-one-line-if-only-state-true)
- In default 'if' one line statement are two block, for true, and false:
  ```js
  variable ? true block : false block;
  ```
- How declare 'if' with one block? I expect something like this: `variable ? true-block;`

- You can do:
  ```
  variable && js-block
  ```
- For example:
  ```js
  let variable = true;
  let o = variable && 3;
  ```
