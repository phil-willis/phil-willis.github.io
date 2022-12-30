---
title: 'JavaScript'
excerpt: ''
coverImage: '/assets/covers/js.jpg'
ogImage:
  url: '/assets/covers/js.jpg'
---


<details>
<summary>What is JavaScript</summary>

- Dynamic programming languages
  - Not pre-compiled
  - Code evaluated and executed at runtime
  - Code can change at runtime (variable types can change)
- JS uses dynamic types, variables defines are flexible in that they can be re-asigned to different value types
- Weakly types programming languages
  - Data types are assumed automatically
  - Strong types you have to define the types 
- Compiled at runtime (Just In Time, JIT)
- JS was created to make webpages more dynamic, however Ryan Dahl in 2009 ripped out the JS engine so it can be run on a computer directed and called it NodeJS. Now we can use JS for local web development as well as run node on servers!
- JS is executed via JS engine 
  - V8 (Chrome)
  - SpiderMonkey (Firefox)
  - the JS engine
    1. Parse Code
    2. Compile to Machine code
    3. execute Machine code
- All on an Single Thread on your operating system
- JS runs on a Host Environments
  - Browser-side
    - can't access local file system
    - Runs in a sandbox
  - Server-side
    - Extracted the Chrome's V8 (JS Engine)
    - You can run it on any machine
    - Called Node.js
    - You can run on the server
    - You can run on any computer (Mac/Linux/Windows)
    - Can't manipulate the DOM 
- JS for web development
  - In web development `HTML` is the markup, `CSS` is the styling, & `JS` is the interactions
  - There are some security measures that prevent certain things you cannot do with JS in the browser
  - [Great JS Reference MDN guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
  - Each browser have their own `Developer Console` 
  - For web development you can add your JS code inside of a `<script></script>` tag inside of your HTML file
    - It's best to have the `script` tag at the bottom of the file so that all the elements are loaded before the JS gets executed
    ```html
    <!DOCTYPE HTML>
    <html>
    <body>
      <p>Before the script...</p>
      <script>
        alert( 'Hello, world!' );
      </script>
      <p>...After the script.</p>
    </body>
    </html>
    ```
  - You can also provide an external script files with 
    ```html
    <script type="text/javascript" src="<RELATIVE_PATH>"></script>
    ```
</details>

<details>
<summary>Brief History</summary>

- 1995 Netscape release "LiveScript", then renamed to JavaScript
- 1996 Microsoft release it's own version for IE
- 1996 ECMA to start standardization (European Computer Manufacturers Association)
- In 2015 JS had a huge upgrade and we now use transpiling to convert to the older JS so that it can be used in older browsers
- 6th Edition – ECMAScript 2015
- 7th Edition – ECMAScript 2016
- 8th Edition – ECMAScript 2017
- 9th Edition – ECMAScript 2018
- 10th Edition – ECMAScript 2019
- 11th Edition – ECMAScript 2020
- Each browser comes with its own JS engine that also defines which features are actually supported
- [caniuse](https://caniuse.com/) is a great resource to see if a feature is supported or not
- ECMA-Script is in active development
</details>




<details>
<summary>Data Types</summary>

- In JavaScript there's 2 kinds of built-in types: `primitive` & `reference` types. 
- You can use thes built-in types to make your own data structures
- All primitive types, except null, can be tested by the typeof operator. 
- All primitive data types have object wrapper classes (for getting more information on properties & methods) except for `null` & `undefined`

# Data Types
- There are 6 Built in JS `primitive` data structures (how to remember them `BUNS BS`)
  1. `String`
  2. `Number`
  3. `Boolean`
  4. `undefined`
  5. `BigInt`
  6. `Symbol`
- Structural Root Primitive
  1. `null` ()
- Structural types
  1. `Object` (almost everything made with the `new` keyword)
    - `new Object`
    - `new Array`
    - `new Map`
    - `new Set`
    - `new WeakMap`
    - `new WeakSet`
    - `new Date`
  2. `Function` (non-data structure, every `Function` constructor is derived from the `Object` constructor)


## String (primitive)
- [String built-in properties/methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

  ```js
  // Properties
  'someString'.length

  // String build-in methods
  'someString'.at()
  'someString'.charAt()
  'someString'.charCodeAt()
  'someString'.codePointAt()
  'someString'.concat()
  'someString'.endsWith()
  'someString'.includes()
  'someString'.indexOf()
  'someString'.lastIndexOf()
  'someString'.localeCompare()
  'someString'.match()
  'someString'.matchAll()
  'someString'.normalize()
  'someString'.padEnd()
  'someString'.padStart()
  'someString'.repeat()
  'someString'.replace()
  'someString'.replaceAll()
  'someString'.search()
  'someString'.slice()
  'someString'.split()
  'someString'.startsWith()
  'someString'.substring()
  'someString'.toLocaleLowerCase()
  'someString'.toLocaleUpperCase()
  'someString'.toLowerCase()
  'someString'.toString()
  'someString'.toUpperCase()
  'someString'.trim()
  'someString'.trimEnd()
  'someString'.trimStart()
  'someString'.valueOf()
  ```

## Number (primitive)
- [Number build-in methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  ```js
  const num = 5

  Number(num)

  isFinite(num)
  isInteger(num)
  isNaN(num)
  isSafeInteger(num)
  parseFloat(num)
  parseInt(num)

  num.toExponential()
  num.toFixed()
  num.toLocaleString()
  num.toPrecision()
  num.toString()
  num.valueOf()
  ```


## Boolean (primitive)
- The Boolean object represents a truth value: true or false.

## undefined (primitive)
- `undefined` is used to describe variables that do not point to a reference. 

## BigInt (primitive)
- BigInt values represent numeric values which are too large to be represented by the number primitive.

## Symbol (primitive)
- Symbol is a built-in object whose constructor returns a symbol primitive — also called a Symbol value or just a Symbol — that's guaranteed to be unique. 
- More [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

## Null (primitive)
- `null` intentional absance of a value, a variable that points to no object
- A representation of no value
- It's treated as `falsy` for boolean operations
- To use `undefined` or `null`?? Well, technically you can use either to get the job done, however there are times you want to use one over the other
- Only use null if you explicitly want to denote the value of a variable as having "no value".
- It's different to `undefined`
  ```js
  typeof null          // "object" (not "null" for legacy reasons)
  typeof undefined     // "undefined"
  null === undefined   // false
  null  == undefined   // true
  null === null        // true
  null  == null        // true
  !null                // true
  isNaN(1 + null)      // false
  isNaN(1 + undefined) // true
  ```

## `Object` data type
- The Object type represents one of JavaScript's data types. It is used to store various keyed collections and more complex entities.
- Objects can be created using the Object() constructor or the object initializer / literal syntax.

```js
Object.assign()
Object.create()
Object.defineProperties()
Object.defineProperty()
Object.entries()
Object.freeze()
Object.fromEntries()
Object.getOwnPropertyDescriptor()
Object.getOwnPropertyDescriptors()
Object.getOwnPropertyNames()
Object.getOwnPropertySymbols()
Object.getPrototypeOf()
Object.hasOwn()
Object.prototype.hasOwnProperty()
Object.is()
Object.isExtensible()
Object.isFrozen()
Object.prototype.isPrototypeOf()
Object.isSealed()
Object.keys()
Object.preventExtensions()
Object.prototype.propertyIsEnumerable()
Object.seal()
Object.setPrototypeOf()
Object.prototype.toLocaleString()
Object.prototype.toString()
Object.prototype.valueOf()
Object.values()
```









## `Array` data type
- The Array object, as with arrays in other programming languages, enables storing a collection of multiple items under a single variable name, and has members for performing common array operations.

```js
Array.prototype[@@iterator]()
Array.prototype.at()
Array.prototype.concat()
Array.prototype.copyWithin()
Array.prototype.entries()
Array.prototype.every()
Array.prototype.fill()
Array.prototype.filter()
Array.prototype.find()
Array.prototype.findIndex()
Array.prototype.findLast()
Array.prototype.findLastIndex()
Array.prototype.flat()
Array.prototype.flatMap()
Array.prototype.forEach()
Array.from()
Array.prototype.includes()
Array.prototype.indexOf()
Array.isArray()
Array.prototype.join()
Array.prototype.keys()
Array.prototype.lastIndexOf()
Array.prototype.map()
Array.of()
Array.prototype.pop()
Array.prototype.push()
Array.prototype.reduce()
Array.prototype.reduceRight()
Array.prototype.reverse()
Array.prototype.shift()
Array.prototype.slice()
Array.prototype.some()
Array.prototype.sort()
Array.prototype.splice()
Array.prototype.toLocaleString()
Array.prototype.toString()
Array.prototype.unshift()
Array.prototype.values()
```

## `Map` data type
- The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.
- More [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

## `Set` data type
- The `Set` object lets you store unique values of any type, whether primitive values or object references.
- More [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

## `WeakMap` data type
- A WeakMap is a collection of key/value pairs whose keys must be objects, with values of any arbitrary JavaScript type, and which does not create strong references to its keys. 
- That is, an object's presence as a key in a WeakMap does not prevent the object from being garbage collected.
- More [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

## `WeakSet` data type
- The WeakSet object lets you store weakly held objects in a collection.
- More [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

## `Date` data type
- JavaScript Date objects represent a single moment in time in a platform-independent format. Date objects encapsulate an integral number that represents milliseconds since the midnight at the beginning of January 1, 1970, UTC (the epoch).
- More [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
</details>




<details>
<summary>Variables</summary>

- The most fundamental elements of a programming language is it's set of data types
- Think of `variables` as a name container that you can place data into them
- You can then do things with the data inside the container and your can reference that data by interacting with the named variable you provided
- You define variable with the `var`, `let`, & `const`
- `var` is mostly being phased out because we want to use `let` & `const`
- The scope of a variable is the region of your program in which it is defined and can be used
- JS has 2 scopes: `global` & `local`
- `global` scope means it can be used every where in your code as for `local` scope is only visible inside the function it was declaried in 
</details>





<details>
<summary>Expressions & Operators</summary>

- Expressions are valid unit of code that resolves to a value
- There are 2 kinds of `expressions`: 
  - One's that have side effects (such as assigning a value). e.g. `x = 9` the `=` operator assigns the value to the variable
  - One's that purely evaluate something. e.g. `1 + 2` the `+` operator add the 2 numbers together to produce `3`

- Types of operators:
  - Assignment operators (assigns a value to its left operand based on the value of its right operand.)
  - Comparison operators (compares values, `==`, `===`, `!==`, `>` , `<`)
  - Arithmetic operators (takes numerical values and returns a single numeric value)
  - Logical operators (`&&`,`||`, `!`)
  - String operators (the concatenation operator (+) concatenates two string values together)
  - Conditional (ternary) operator (`condition ? val1 : val2`)

  - Comma operator (`for (let i = 0, j = 9; i <= j; i++, j--) { ... }`)
  - Unary operators (A unary operation is an operation with only one operand. e.g. `delete object.property;`, or `typeof someVar;`)
  
  - Relational operators
  - Bitwise operators
  - BigInt operators

- `Comparison` and `Logical` operators are used to test for true or false.
- Comparison Operator:
  ```js
  // Equal to
  x == 8
  // Equal to value & type
  x === 8


  // Not equal
  x != 8
  // Not equal to value & type
  x !== 8

  // Greater than
  x > 8
  // Greater than or equal to
  x >= 8

  // Less than
  x < 8
  // Less than or equal to
  x <= 8
  ```
- Logical Operators
  ```js
  // And
  x === 8 && x === 9
  // Or
  x === 8 || x === 9
  // Not
  !(x === 8)
  ```
- Conditional (Ternary) Operators
  - `variableName = (condition) ? value1:value2`
  ```js
  const volatile = (x > 100) ? 'Is Volatile' : 'Is NOT Volatile'
  ```

</details>




<details>
<summary>Control flow</summary>

# Conditional Statements (if, else if, else)
- Conditional statements are used to decide the flow of execution based on different conditions. If a condition is true, you can perform one action and if the condition is false, you can perform another action.
- This is preformed with `if statements`

```js
if ( condition ){
  // statement(s)
}

// all options
if ( condition ){
  // statement(s)
else if ( condition ){

} else{

}
```

# Ternary Operator (:?)
- Instead of having to do if/else statement on multiple lines you can do do in one command with a ternary operator
```js
condition ? expressionIfTrue : expressionIfFalse;
```

# switch case

```js
switch (expression) {
    case value1:
        statement1;
        break;
    case value2:
        statement2;
        break;
    case value3:
        statement3;
        break;
    default:
        statement;
}
```

# while

```js
while (expression) {
    // statement
}
```

# do while

```js
do {
  statement;
} while(expression);
```

# for

```js
for (initializer; condition; iterator) {
    // statements
}

for (let i = 1; i < 5; i++) {
  console.log(i);
}
```

# break

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
  if (i == 2) {
    break;
  }
}
```

# continue

```js
if(condition){
  continue;
}
```

# Comma Operator

```js
let result = (10, 10 + 20);
console.log(result); // 30
// In this example, the 10, 10+20 returns the value of the right expression, which is 10+20. Therefore, the result value is 30.
```
</details>





<details>
<summary>Prototype</summary>

</details>

<details>
<summary>Prototypes, inheritance</summary>

</details>

<details>
<summary>Classes</summary>

</details>

<details>
<summary>Interaction: alert, prompt, confirm</summary>

</details>






<details>
<summary></summary>


</details>

<details>
<summary></summary>


</details>


<details>
<summary></summary>


</details>


<details>
<summary></summary>


</details>


<details>
<summary></summary>


</details>








<details>
<summary>Error handling</summary>

...
</details>

<details>
<summary>Promises, async/await</summary>

...
</details>

<details>
<summary>Generators, advanced iteration</summary>

...
</details>

<details>
<summary>Modules</summary>

...
</details>

<details>
<summary>Arrow Functions</summary>

...
</details>

<details>
<summary>Destructuring</summary>

...
</details>

<details>
<summary>Template literals</summary>

...
</details>






















# JS Tips
<details>
<summary>Nullish coalescing operator '??'</summary>

- The nullish coalescing operator is written as two question marks `??`.
- The result of `a ?? b` is:
  - if a is defined, then a,
  - if a isn’t defined, then b.
</details>



<details>
<summary>AND “&&” finds the first falsy value</summary>

```js
const result = value1 && value2 && value3;
```
- The AND && operator does the following:

  - Evaluates operands from left to right.
  - For each operand, converts it to a boolean. If the result is false, stops and returns the original value of that operand.
  - If all operands have been evaluated (i.e. all were truthy), returns the last operand.
- This is often used in React to conditionally show a component if the data exists:
  ```js
  function SomeComponent() {
    const message = "show this";
    return (
      <div>
        {message && <div>{message}</div>}
      </div>
    );
  }
  ```
</details>



<details>
<summary>When to use `null` or `undefined`</summary>

- Don't define values as `undefined`, the the JS compiler automatically set it
- Use `null` if you intentionally want a variable to have a `no value`

```js
// Null value
let a = null;
console.log(a); // null

// Define undefined value
let b;
console.log(b); // undefined

// Don't do this!
let c = undefined;
console.log(c); // undefined
```
</details>


<details>
<summary>`falsy` values</summary>

There are 6 falsy values:
  - `false`
  - 0  // (zero)
  - `""` // (empty string)
  - `null`
  - `undefined`
  - `NaN` // (Not A Number)
</details>


<details>
<summary>Conditionally add properties to an object</summary>

- es6 is a better approach. But we can add a bit more sugar, by using the spread operator, and logical AND short circuit evaluation:
  ```js
  // Avoid this
  var olderWay = {};
  if (true) a.someProp = 5
  console.log(olderWay);

  // Nicer way
  const obj = {
    ...(true) && {someProp: 42},
    ...(false) && {nonProp: "foo"},
    ...({}) && {tricky: "hello"},
  }

  console.log(obj);
  ```
</details>


<details>
<summary>Number separators</summary>

- `Number separators` is syntactic sugar that make working with numeric constants alot easier
- TL;DR you can add a `_` to a numeric value to make it more readable similar to what a `,` does when viewing large numbers
  ```js
  // Price
  const price = 6666666;
  const priceWithNumberSeparators = 6_666_666;
  console.log(price)
  console.log(priceWithNumberSeparators)
  ````
</details>


<details>
<summary>Loop over a number of times</summary>

- Sometimes you need to loop over an array a number of time to make some data
  ```js
  const opt = [...Array(4)].map((_, num) => ({ value: num, label: num }))
  console.log(JSON.stringify(opt)) // [{"value":0,"label":0},{"value":1,"label":1},{"value":2,"label":2},{"value":3,"label":3}]
  ```
</details>


<details>
<summary>Ternary & shorthand for setting a value if true `let o = variable && 3;`</summary>

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
</details>


<details>
<summary>Recursive function</summary>

- Recursive function is a function that calls itself until there is a break
- *Always use caution* when using recursive functions cause you don't want to create an infinite loop. This is especially bad when an infinite loop happens on a server, it might cause you alot of $$$
- The general outline looks like this:
  ```js
  function recurse() {
      if(condition) {
          // stop calling itself
      } else {
          recurse();
      }
  }
  ```
- Here is an example of calling a http resource can looping thru the pages with a recursive function:
  ```js
  import axios from 'axios'

  const baseUrl: string = 'https://api.worldbank.org/v2/country/'

  const getIndicatorByCountry = async (country, indicator, page=1) => {  
    const query = `${baseUrl}/${country}/indicator/${indicator}?page=${page}&format=json`
    const response = await axios.get(query)  
    const data = response.data

    if (data[0].pages > page) {
      return data.concat(await getIndicatorByCountry(country, indicator, page+1)) 
    } else {
      return data
    }
  }
  ```
</details>



<details>
<summary>`use strict`</summary>

- For a long time, JavaScript evolved without compatibility issues. New features were added to the language while old functionality didn’t change.
- Up until 2009 (ES5) when the `use strict` was added so that new features to the language and modifications to existing one could happen
- JavaScript's strict mode, introduced in ECMAScript 5, is a way to opt in to a restricted variant of JavaScript
- `use strict` is a `opt in` feature to restrict variant of JS
- All you have to do is to add `"use strict";` at the top of the JS file
  ```js
  "use strict";

  // this code works the modern way
  ...
  ```
- It works in most browsers, namely Firefox and Chrome.
- If it doesn’t, e.g. in an old browser, there’s an ugly, but reliable way to ensure use strict. Put it inside this kind of wrapper:
  ```js
  (function() {
    'use strict';

    // ...your code here...
  })()
  ```
- You kinda don't have to worry about this if you are using a transpiler like babel used to write newer JS which gets converted to ES5 for builds
</details>


<details>
<summary>HTTP caching</summary>

- Web caches reduce latency and network traffic and thus lessen the time needed to display a representation of a resource
- It is important to cache a resource only until it changes, not longer.
- There are different types of caching: browser, proxy, gateway caches, CDN, reverse proxy caches
- Private caches are dedicated to a single user while publish caches are meant to be shared
- You can control the caching with `cache-control` headers and max-age
- ETAG (It lets caches be more efficient and save bandwidth, as a web server does not need to resend a full response if the content has not changed.)

</details>


















  








































# Web development (bundlers)
<details>
<summary>Webpack</summary>

- [Webpack](https://webpack.js.org/) homepage
  ```shell
  ```
</details>



<details>
<summary>Vite</summary>

- [Vite](https://vitejs.dev/) homepage
  ```shell
  $ npm init vite@latest <YOUR_APP_NAME> -- --template react-ts
  ```
- Template options:
  ```shell
  vanilla
  vanilla-ts
  vue
  vue-ts
  react
  react-ts
  preact
  preact-ts
  lit-element
  lit-element-ts
  svelte
  svelte-ts
  ```
</details>



<details>
<summary>Parcel</summary>

- [Parcel](https://parceljs.org/) homepage
  ```shell
  $ npm init -y
  $ npm i parcel-bundler
  ```
- Update the `package.json` file
  ```json
  {
    "scripts": {
      "start": "parcel -p 8080 watch public/index.html",
      "build": "parcel build public/index.html"
    }
  }
  ```
- Create a `public/index.html` file
  ```html
  <html>
  <body>
    <script src="../src/index.js"></script>
  </body>
  </html>
  ```
- Create a `src/index.html` file
  ```html
  console.log("hello Parcel")
  ```
- Add Typescript, create a `tsconfig.json`
  ```json
  {
    "compilerOptions": {
      "jsx": "react"
    }
  }
  ```
- Update a `public/index.html` file
  ```html
  <html>
  <body>
    <div id="root"></div>
    <script src="../src/index.tsx"></script>
  </body>
  </html>
  ```
- Create a `src/index.tsx`
  ```js
  console.log('Hello from tsx!')
  ```
</details>
































# Web Frameworks
<details>
<summary>Nextjs</summary>

- [docs](https://nextjs.org/)
</details>


<details>
<summary>Gatsby</summary>

- [docs](https://www.gatsbyjs.com/)
</details>


<details>
<summary>Create-React-App</summary>

- [docs](https://create-react-app.dev/)
</details>
































# Web Development (good practices)

<details>
<summary>JSDoc</summary>

- [`JSDoc`](https://jsdoc.app/) is a documentation layer you can add to your source code to make it easier for others to use
- Why does it rock?
  - Documentation right next to the source code you are writing
  - VSCode will use it to show you intellisence whenever you are using the functions/classes
  - Easy to keep synced as functions/classes get updates
- [Getting started](https://jsdoc.app/about-getting-started.html)
- Default types:
  - `null`
  - `undefined`
  - `boolean`
  - `number`
  - `string`
  - `Array` or `[]`
  - `Object` or `{}`
  - You can have a typed array: `any[]`, `number[]`, `string[]`. 
  - You could also have an array of object types: `Employee[]`.
- How to add JSDoc comments:
  - Simplest documentation:
    ```js
    /** This is a description of the foo function. */
    function hello() {
    }
    ```
  - Defining a string parameter
    ```js
    /**
     * Prints a string to the console.
     * @param {string} someString - Some string to print to the console.
     */
    function printString(someString) {
      console.log(someString);
    }
    ```

  - Defining the return value
    ```js
    /**
     * Example of defining a return value.
     * @return void
     */
    function printString(someString) {
      console.log(someString);
    }
    ```
    ```js
    /**
     * Example of defining a return value.
     * @return string
     */
    function printString(someString) {
      return someString;
    }
    ```


  - Defining a parameter's default value
    ```js
        /**
         * Param with a default value
         * @param {number} [year=2021]
         */
        function printYear(year) {
          console.log(year);
        }
    ```

  - Defining optional parameters with a `=` after the type without a space
    ```js
    // Define generic object.
    // This can have any number of properties of type any.
    /**
    * @typedef {Object<string, any>} Member
    * @property {string} name The member's name.
    * @property {number=} age The member's age (this is optional).
    * @property {string=} job The member's job (this is optional).
    */
    /**
    * @type {Member} Jack
    */
    const Jack = {
     age: 28
    }
    ```


  - Define an Union type
    ```js
    /**
     * @type {number | string} value The value of the product.
     */
    const price = 12 // or '12'
    ```

  - Define a Intersection type
    ```js
    /**
     * @type {{name: string}, {age: number}}
     */
    const person = {
      name: 'Joe', 
      age: 32
    }
    ```
## Auto generate documentation for the JSDoc comments
- Now when you use this function/class in your code we should have VSCode intellisense with the description/params/return value
- JavaScript With [JSDoc](https://www.npmjs.com/package/jsdoc): generating the docs
  ```shell
  $ npm i jsdoc --save-dev
  $ ./node_modules/.bin/jsdoc src/somefile.js 
  ```


## Add Types to JSDoc
- Setup VSCode add to your `.vscode/settings.json`
  ```json
  {
    "javascript.implicitProjectConfig.checkJs": true
  }
  ```
- With plain JavaScript this will give you some basic IntelliSense and flag type errors with red squiggles underneath
- You can have VSCode check a single file on/off by adding `// @ts-check` at the top of the file or `// @ts-nocheck`
  ```js
  // @ts-check
  // The TypeScript engine will check all JavaScript in this file.
  ```

  ```js
  // @ts-nocheck
  // The TypeScript engine will not check this file.
  ```
- You can also disable a line or block of code by adding `// @ts-ignore`
</details>





















<details>
<summary>Babel</summary>

# Babel 6
- Add some dependencies
  ```shell
  $ npm init -y
  $ npm i -D babel-cli@6 babel-preset-env @babel/core@6
  $ npm i express
  ```
- Create a `.babelrc`
  ```json
  {
    "presets": ["env"]
  }
  ```
- Add some script to your `package.json` file
  ```json
  {
    "scripts": {
      "start": "nodemon --exec babel-node src/index.js",
      "build": "babel src --out-dir dist",
      "serve": "node dist/index.js"
    }
  }
  ```
- Create `src/index.js` file
  ```js
  import express from "express";
  const app = express();

  app.get("/", (req, res) => {
    res.status(200).json({ Hello: "Express" });
  });

  app.get("*", (req, res) => {
    res.send("all other routes");
  });

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`...The magic happens at http://localhost:${PORT}`));
  ```


# Babel 7
- Add some dependencies
  ```shell
  $ npm init -y
  $ npm i -D @babel/node@7 @babel/preset-env@7 @babel/cli@7 @babel/core@7
  $ npm i express
  ```
- Create a `.babelrc`
  ```json
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

  ```
- Add some script to your `package.json` file
  ```json
  {
    "scripts": {
      "start": "nodemon --exec babel-node src/index.js",
      "build": "babel src --out-dir dist",
      "serve": "node dist/index.js"
    }
  }
  ```
- Create `src/index.js` file
  ```js
  import express from "express";
  const app = express();

  app.get("/", (req, res) => {
    res.status(200).json({ Hello: "Express" });
  });

  app.get("*", (req, res) => {
    res.send("all other routes");
  });

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`...The magic happens at http://localhost:${PORT}`));
  ```

# Babel 7 for React App
1. Setup
  ```shell
  $ mkdir -p src
  $ npm init -y
  $ npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader file-loader css-loader style-loader webpack webpack-cli html-webpack-plugin webpack-dev-server
  ```
2. Add Babel
  - Add a `.babelrc` file in the root of your site
    ```json
    {
      "presets": ["@babel/preset-env", "@babel/preset-react"]
    }
    ```
3. Add Webpack 
  - Update your package.json
    ````json
    "scripts": {
      "serve": "webpack serve --mode development",
      "build": "webpack --mode production"
    }
    ````
  - Add a `./webpack.config.js` files
    ```js
    const path = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");

    module.exports = {
      // Where files should be sent once they are bundled
      output: {
        path: path.join(__dirname, "/dist"),
        filename: "index.bundle.js",
      },
      // webpack 5 comes with devServer which loads in development mode
      devServer: {
        port: 3000,
        watchContentBase: true,
      },
      // Rules of how webpack will take our files, complie & bundle them for the browser
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /nodeModules/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
      plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
    };
    ```
4. Ready to make your react site!
  ```
  $ npm i react react-dom
  $ touch src/index.html && touch src/index.js
  ```

  - `./src/index.html`
    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Webpack App</title>
    </head>

    <body>
        <div id="app"></div>
        <script src="index.bundle.js"></script>
    </body>

    </html>
    ```

  - `./src/index.js`
    ```js
    import React from "react"
    import ReactDom from "react-dom"
    import App from "./App"
    import "./App.css"

    ReactDom.render(<App />, document.getElementById('app'))
    ```

  - `./src/App.js`
    ```js
    import React from "react";

    export default function App() {
      return (
        <div>
          <h2>Welcome to React App</h2>
          <h3>Date : {new Date().toDateString()}</h3>
        </div>
      );
    }
    ```
  - `./src/App.css`
    ```css
    h2{
      color: teal;
    }
    ```
</details>






# To complete
<details>
<summary>To do</summary>

- Interaction: alert, prompt, confirm
- Type conversions
- Array & Array methods
- Object & Object Method
- Basic operators
- Comparisons
- Conditionals
- Logical operations
- Advanced working with functions
- Prototype
- Prototypes, inheritance
- Classes
- Error handling
- Promises, async/await
- Generators, advanced iteration
- Modules
- Arrow Functions
- Destructuring
- Template literals
- How the web works
- npm scripts & package.json
- husky & nvm versions
- sessions, cookies, & jwt
- HTTP caching
- OAuth
- Security
  - CSRF attack
  - SQL injection
  - CORS
- Testing
  - mocks
  - stubs
  - spies
- Closures
- Hoisting
- Immutability
- Data types
- DOM
- Global & Local Scope
- Operators
- Undefined, null, & NaN
- logical operations
- Try/Catch block
- How to throw errors
- Error handling
- strict mode
- parameter vs arguments
- Functions vs Methods
- anonymous functions
- "this"
- bind
- Class
- Class inheritance
- recursion
- closures
- pure function
- side effects
- traverse the DOM
- sets
- symbols
- spread operator
- object.assign
- virtual DOM (how does react work with it)
- package managers
- Web APIs Specifications
  - Background Fetch API
  - Clipboard API
  - Console API
  - Geolocation API
  - HTML Drag and Drop API
  - History API
  - IndexedDB 
  - Service Workers API
  - Storage
  - URL API
  - Web Crypto API
  - Web Storage API
  - Websockets API
  - XMLHttpRequest
- Web APIs Interfaces
  - AbortController
- How does React's Virtual DOM work
- How does Redux work
- When to use a stateful or stateless component in react
- When to use React's internal state versus Redux
- Variable hoisting
- What are promises (3 states of a promise fulfilled/rejected/pending)
- Promises & async/await 
- HTTP methods
- Http status code
- CORS
- JSONP
- HTTP caching
- debounce 
- closure (What is the difference between lexical scoping and closures)
- web sockets
- Server Sent Events
- What is the benefits of using async/await to promises (cleaner, try/catch blocks catch exception, callback is 
- testing frameworks
- folder structure for server/client/package
- Loop over a number of times 
- Ternary & shorthand for setting a value if true `let o = variable && 3;`
- Recursive function
- `use strict`
- OAuth
- Security
  - CSRF attack
  - SQL injection
  - CORS
- Testing
  - mocks
  - stubs
  - spies
- Closures
- Hoisting
- Immutability
- Data types
- DOM
- Global & Local Scope
- Operators
- Undefined, null, & NaN
- logical operations
- Try/Catch block
- How to throw errors
- Error handling
- strict mode
- parameter vs arguments
- Functions vs Methods
- anonymous functions
- "this"
- bind
- Class
- Class inheritance
- recursion
- closures
- pure function
- side effects
- traverse the DOM
- sets
- symbols
- spread operator
- object.assign
- virtual DOM (how does react work with it)
- Package managers
- Web APIs Specifications & Interfaces
- There are a large number of [Web APIs available.](https://developer.mozilla.org/en-US/docs/Web/API#interfaces)
  - Background Fetch API
  - Clipboard API
  - Console API
  - Geolocation API
  - HTML Drag and Drop API
  - History API
  - IndexedDB 
  - Service Workers API
  - Storage
  - URL API
  - Web Crypto API
  - Web Storage API
  - Websockets API
  - XMLHttpRequest
  - AbortController
  - AbortController
  - [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- How does React's Virtual DOM work
- How does Redux work
- When to use a stateful or stateless component in react
- When to use React's internal state versus Redux
- Variable hoisting
- What are promises (3 states of a promise fullified/rejected/pending)
- Promises & async/await 
- HTTP methods
- Http status code
- CORS
- JSONP
- HTTP caching
- debounce 
- closure (What is the difference between lexical scoping and closures)
- web sockets
- Server Sent Events
- What is the benefits of using async/await to promises (cleaner, try/catch blocks catch exception, callback is cleaner, debugging)
- Testing frameworks
- Folder structure for server/client/package

</details>