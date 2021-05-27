---
title: 'react'
excerpt: 'react'
coverImage: '/assets/blog/hello-world/cover.jpg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---


# Overview of react

# Topics
- CRA
- Component types (Stateful & Stateless)
- Props & state
- "Children" prop
- Form & Form validation
- Styles
  - inline
  - css & classNames
  - css modules
  - style-components
  - stylus
  - stylus & css modules
- List & keys
- debug
- component lifecycle
- hooks
- fragment
- HOC (Higher Order Component)
- Refs
- Context
- prop validations
- http request
- msw
- SPA routing
  - react-router
  - react-hook-router
  - raviger
- route
  - route parameters
  - query strings
- state management
  - redux & redux middleware
  - redux toolkit
  - zustand
  - hook useReducer
- testing 
  - RTL
  - Cypress
- Craco
  - file alias
  - css modules
- local & session storage



# Hooks
- Changes the way you write your components
- Functional and Class-based components, Hooks allow us to 
- Hooks replace class-only functionality
- Hooks can only be used in Functional Components (not class-based components)
- Hooks are named with the prefix `use`, just a rule that the React team came up with
- Highly reusable and independent for each components
- Hooks allows you to `add state` to functional components & `share logic` across components 
- Hooks have `nothing` to do with Lifecycles Methods `Lifecycle Hooks`
- They are called `hooks` because they hook into certain functionality into your component
- Hooks were introduced in `16.8` 
- You can create your own custom hooks

- Simple Hooks rules:
  1. Used only with Functional components
  2. Only call them at the top level of a Functional component, cannot nest hooks. They don't work inside of regular JS functions, nested functions, or loops
  3. Exceptions to the rule is when building your own custom hooks



## Before Hooks
- Functional Component
  - props in, JSX out
  - Great for presentation
  - Focused on one/few purposes
  - no lifecycle react methods

- Class-Based components
  - uses props & state
  - Business logic goes here
  - Orchestrates components

- Before Hooks statefull components were tied to a Class based component
- Class based components:
  ```js
  import React, { Component } from "react";

  export default class ClassBase extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }

    render() {
      return (
        <button onClick={() => this.setState({ count: this.count + 1 })}>
          {this.state.count}
        </button>
      );
    }
  }

  ```
- Now with Hooks:
  ```js
  import React, { useState } from "react";

  export default function FuncBase() {
    const [count, setCount] = useState(0);
    return <button onClick={()=> setCount(count + 1)}>{count}</button>;
  }
  ```


## useState
- Probably the most used hook
- To deal with reactive data
- Allows you to do state management within a Functional component
- Best to use one useState hook per state value 
- desctructure the useState value 
- format => `const [theStateValue, setterFunction ] = useState(initialValue)`
- Example:
  ```js
  import React, { useState } from "react";

  export default function FuncBase() {
    const [count, setCount] = useState(0);
    return (
      <button onClick={()=> setCount(count + 1)}>{count}</button>
    );
  }
  ```

## useEffect

- Class based lifecycle methods (componentWillMount, componentDidMount, componentWillUnMount)
  ```js
  import React, { Component } from "react";

  export default class ClassBase extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }

    componentWillMount() {
      console.log("will initialized");
    }
    componentDidMount() {
      console.log("initialized, added to the UI, only happens once");
    }
    componentDidUpdate() {
      console.log("state updated");
    }
    componentWillUnMount() {
      console.log("destroyed, component removed from UI");
    }

    render() {
      return (
        <button onClick={() => this.setState({ count: this.count + 1 })}>
          {this.state.count}
        </button>
      );
    }
  }
  ```

- Example:
  ```js
  import React, { useEffect } from "react";

  export default function App() {
    const [count, setCount] = React.useState(0);

    useEffect(() => {
      console.log("[RUN] when mounted & when state changes");
    });

    useEffect(
      () => {
        console.log("[RUN] once when first initialized");
      },
      [] // Empty Array of dependencies, means run once
    );

    useEffect(
      () => {
        console.log("[RUN] whenever the `count` changes");
      },
      [count] // Array of dependencies
    );

    useEffect(
      () => {
        // Cleanup
        return () => console.log("goodbye component");
      },
      [] // Array of dependencies
    );

    return (
      <button onClick={() => setCount(count + 1)}>{count}</button>
    );
  }

  ```


## useContext
- This hook allows you to work with React's context API, which is a mechanism to share data without passing props down the entire component tree
- Any component can read it, no matter how deep it is.
- Steps
  1. Create a context with `createContext()`
  2. Wrap the highest most parent you want with a `.Provider`
  3. Access the context with `useContext()`

- Example
  ```js
  import React, { createContext, useContext } from "react";

  // Create a context with default value
  const ThemeContext = createContext();

  export default function App() {
    // Wrap your application with a `Provider` set a value for your context
    // Any component can read it, no matter how deep it is.
    return (
      <ThemeContext.Provider value="dark">
        <SomeComponent />
        <OldWay />
      </ThemeContext.Provider>
    );
  }

  function SomeComponent() {
    const theme = useContext(ThemeContext);
    return <div>{theme}</div>;
  }

  function OldWay() {
    return (
      <ThemeContext.Consumer>
        {(theme) => <div>...{theme}</div>}
      </ThemeContext.Consumer>
    );
  }

  ```
- Before hooks you had to use the `Consumer` component


## useReducer
- different way of managing state, the redux pattern can help with large apps
- Very similar to redux, instead or changing the state, you dispatch actions that then hits a reducer function that updates the store
- action -> reducer -> store -> UI
- Action is just an object that has the shape of `{type:'', payload:''}`
- `useReducer(<reducer_switch_statement>, <initial_state>);`
- example:
  ```js
  import React, { useReducer } from "react";

  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return state + 1;
      default:
        throw new Error();
    }
  }

  export default function App() {
    const [state, dispatch] = useReducer(reducer, 0);

    const handleClick = () => dispatch({ type: "increment" });
    return (
      <>
        <p>Count: {state}</p>
        <button onClick={handleClick}>update</button>
      </>
    );
  }
  ```







## useMemo
- Help you optimize computation cost for improved performance
- memoization *cache results* of function call
- `useMemo` for memoizing return values
- Use this hook as an *opt-in* tool for expensive calculations you don't want to happen on every render
- `useMemo(<Expensive_Computation_Function>, <Array_of_Dependencies>);`
- Example:
  ```js
  import React, { useMemo, useState } from "react";

  export default function App() {
    const [count] = useState(99);

    const expensiveCount = useMemo(() => count ** 2, [count]);

    return (
      <>
        <p>count: {count}</p>
        <p>expensiveCount: {expensiveCount}</p>
      </>
    );
  }
  ```




## useCallback
- The `useCallback()` hook returns (aka memoizes) the function instance between renderings
- `useCallback()` solves the problem of *functions equality check*
- A function definition share the same code source but when used they are different function objects. 
- Comparing them one implementation to the second evaluates to false.
- When you have a function inside of component every rendering of the component will result in a different *function object*. 
- A few inline functions per component are acceptable, cause it's cheap to re-create small functions
- But in some cases you need to maintain one function instance between renderings
- A few inline functions per component are acceptable. The optimization costs more than not having the optimization. As well as increase the code complexity
- When to use `useCallback()`
  - If your component renders big list of items, you don't want to have to re create all the items everytime the parent changes and the list remains the same. `useCallback()` returns the same function object.

- Example:
```js
import React, { useCallback } from 'react';

export default function MyParent({ items }) {
  const onItemClick = useCallback(event => {
    console.log('You clicked ', event.currentTarget);
  }, [items]);

  return (
    <>
      <SomeLargeList items={items} onItemClick={onItemClick} />
    </>
  );
}
```




## useRef
- `useRef` hook allows you to create persisted mutable values (also known as references or refs), as well as access DOM elements.
- Useful is you want to grab HTML values from the JSX
- Allows you to create a mutable object that will keep the same reference between renders
- **mutable value does not re-render the UI**
- can grab native HTML elements from JSX
- One important note is that changing the ref value will *not re-render the component*
- `useRef(initialValue)` is a built-in React hook that accepts one argument as the initial value and returns a reference (aka ref).
- A reference is an object having a special property current.
  ```js
  import React, { useRef } from "react";

  export default function App() {
    const countRef = useRef(0);

    const handle = () => {
      countRef.current++;
      console.log(`Clicked ${countRef.current} times, BUT DIDN'T RE-RENDER like useState would`);
    };

    console.log("I rendered once!");

    return (
      <>
        <button onClick={handle}>Click me</button>
      </>
    );
  }
  ```
- More common way to use `useRef` is to grab HTML elements from the JSX
- There are 2 rules to remember about references:
  1. The value of the reference is persisted (stays the same) between component re-renderings;
  2. Updating a reference doesn’t trigger a component re-rendering.
- Referencing a DOM element
  ```js
  import React, { useRef, useEffect } from 'react';

  function AccessingElement() {
    const elementRef = useRef();

    useEffect(() => {
      const divElement = elementRef.current;
    }, []);

    return (
      <div ref={elementRef}>
        I'm an element
      </div>
    );
  }
  ```






## useImperativeHandle



## useLayoutEffect



## useDebugValue



## Custom Hook
- Building your own custom Hook is essentially extracting code that uses one or more built in hooks to make it reuseable
- 





# State Management
- State management creates a concrete & predictable data structure for sharing data across components
- In JS, data from the interactions form state
- State can also be seen as data over time of a item
- You can also view `state` as current `status` of something (app, component, element)
- Theres several was to manage state for an application let's check out a few of them


## `useState` & `useReduer`
- The `useState` hook is perfect for small amounts of local component state. 
- Each `useState` call should hold a single value, and while you can make that one value an object that contains a bunch of other values, it’s a better idea to split them up.
- In larger applications there will be alot of `useState` hooks and could start to get a little more difficult to manange
- Once you get ~5 `useState` calls in a single component you might want to think of a better stategy like `useReducer` which is basically the redux pattern but baked into the React library (dispatch an action -> reducer -> store -> UI)

  ```js
  import React, { useReducer } from "react";

  function reducer(state, action) {
    switch (action.type) {
      case "incrementValue1":
        return { ...state, value1: state.value1 + 1 };
      case "incrementValue2":
        return { ...state, value2: state.value2 + 1 };
      default:
        throw new Error();
    }
  }

  const ComponentA = ({ value, dispatch }) => {
    const handleClick = () => dispatch({ type: "incrementValue1" });
    return (
      <>
        <h1>The value is: {value}</h1>
        <button onClick={handleClick}>Increment value 1</button>
      </>
    );
  };

  const ComponentB = ({ value, dispatch }) => {
    const handleClick = () => dispatch({ type: "incrementValue2" });
    return (
      <>
        <h1>The value is: {value}</h1>
        <button onClick={handleClick}>Increment value 2</button>
      </>
    );
  };

  const initialState = { value1: 0, value2: 0 };
  export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <>
        <ComponentA value={state.value1} dispatch={dispatch} />
        <ComponentB value={state.value2} dispatch={dispatch} />
      </>
    );
  }

  ```


## React Context API as State Management
- A step above `useState` & `useReducer` is `useContext`
- You probably want to use this hook if you find yourself `prop drilling`, aka passing props down several child levels manually
- Context provides a way to pass data through the component tree without having to pass props down manually at every level.
- Despite its simplicity, Context has one important downside though, and that’s performance, unless you’re very careful about how you use it.
- The reason is that every component that calls useContext will re-render when the Provider’s value prop changes. 
- The downside of the Context API is that every time one of those values changes, every component that uses any of them would re-render.
- To avoid that pitfall, store small chunks of related data in each Context, and split up data across multiple Contexts (you can have as many as you want). 
  ```js
  import { createContext, useContext, useState } from "react";

  const MyContext = createContext();

  const MyProvider = (props) => {
    const [value1, setValue1] = useState(0);
    const [value2, setValue2] = useState(0);
    const store = { value1: [value1, setValue1], value2: [value2, setValue2] };
    return (
      <MyContext.Provider value={store}>{props.children}</MyContext.Provider>
    );
  };

  const ComponentA = () => {
    const { value1 } = useContext(MyContext);
    const [stateValue1, setStateValue1] = value1;

    const handleSetValue1 = () => setStateValue1(stateValue1 + 1);

    return (
      <>
        <h1>The value is: {stateValue1}</h1>
        <button onClick={handleSetValue1}>Increment value 1</button>
      </>
    );
  };

  const ComponentB = () => {
    const { value2 } = useContext(MyContext);
    const [stateValue2, setStateValue2] = value2;

    const handleSetValue2 = () => setStateValue2(stateValue2 + 1);

    return (
      <>
        <h1>The value2 is: {stateValue2}</h1>
        <button onClick={handleSetValue2}>Increment value 2</button>
      </>
    );
  };

  export default function App() {
    return (
      <MyProvider>
        <ComponentA />
        <ComponentB />
      </MyProvider>
    );
  }

  ```




## Third-Party State Management Library - Redux


## Third-Party State Management Library -  @reduxjs/toolkit





## Third-Party State Management Library -  Zustand
- [Zustand](https://zustand.surge.sh/) A small, fast and scaleable bearbones state-management solution.
  ```js
  import create from "zustand";

  const useStore = create((set) => ({
    value1: 0,
    value2: 0,
    setValue1: () => set((state) => ({ value1: state.value1 + 1 })),
    setValue2: () => set((state) => ({ value2: state.value2 + 1 })),
    removeAllBears: () => set({ bears: 0 })
  }));

  const ComponentA = ({ value, setValue }) => {
    const handleClick = () => setValue(value + 1);
    return (
      <>
        <h1>The value is: {value}</h1>
        <button onClick={handleClick}>Increment value 1</button>
      </>
    );
  };

  const ComponentB = ({ value, setValue }) => {
    const handleClick = () => setValue(value + 1);
    return (
      <>
        <h1>The value is: {value}</h1>
        <button onClick={handleClick}>Increment value 2</button>
      </>
    );
  };

  export default function App() {
    const { value1, value2, setValue1, setValue2 } = useStore((state) => state);

    return (
      <>
        <ComponentA value={value1} setValue={setValue1} />
        <ComponentB value={value2} setValue={setValue2} />
      </>
    );
  }
  ```
- Fetching data
  ```js
  const useStore = create(set => ({
    fishies: {},
    fetch: async pond => {
      const response = await fetch(pond)
      set({ fishies: await response.json() })
    }
  }))
  ```
- Read from state in actions
  ```js
  const useStore = create((set, get) => ({
    sound: "grunt",
    action: () => {
      const sound = get().sound
      // ...
    }
  })
  ```
- Redux Devtools
  ```js
  import { devtools } from 'zustand/middleware'

  // Usage with a plain action store, it will log actions as "setState"
  const useStore = create(devtools(store))
  // Usage with a redux store, it will log full action types
  const useStore = create(devtools(redux(reducer, initialState)))
  ```
- Zustand with `simple-zustand-devtools`
  ```js
  import createStore from 'zustand';
  import { mountStoreDevtool } from 'simple-zustand-devtools';

  export const [useStore, store] = createStore(set => {
    // create your zustand store here
  });

  if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('Store', store);
  }
  ```
- Zustand with `simple-zustand-devtools`
  ```js
  import createStore from "zustand"; // `createStore` instead of `create`
  import { mountStoreDevtool } from "simple-zustand-devtools";

  export const [useStore, store] = createStore((set) => ({
    value1: 0,
    value2: 0,
    setValue1: () => set((state) => ({ value1: state.value1 + 1 })),
    setValue2: () => set((state) => ({ value2: state.value2 + 1 })),
    removeAllBears: () => set({ bears: 0 })
  }));
  mountStoreDevtool("Store", store);

  const ComponentA = ({ value, setValue }) => {
    const handleClick = () => setValue(value + 1);
    return (
      <>
        <h1>The value is: {value}</h1>
        <button onClick={handleClick}>Increment value 1</button>
      </>
    );
  };

  const ComponentB = ({ value, setValue }) => {
    const handleClick = () => setValue(value + 1);
    return (
      <>
        <h1>The value is: {value}</h1>
        <button onClick={handleClick}>Increment value 2</button>
      </>
    );
  };

  export default function App() {
    const { value1, value2, setValue1, setValue2 } = useStore((state) => state);

    return (
      <>
        <ComponentA value={value1} setValue={setValue1} />
        <ComponentB value={value2} setValue={setValue2} />
      </>
    );
  }
  ```
  - Open the `Components` Chrome dev tools panel and you should see a `devtool` tree item on the left 






















