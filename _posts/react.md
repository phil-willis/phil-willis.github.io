---
title: 'react'
excerpt: ''
coverImage: '/assets/covers/react.jpg'
ogImage:
  url: '/assets/covers/react.jpg'
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
- Debug
- Component lifecycle
- Hooks
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



# Setting up a React application
- boilerplates (CRA, NEXT, Snowpack, Vite, Parcel)



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
  1. Used only with *Functional components*
  2. Only call them at the *top level* of a Functional component, *cannot nest hooks*. They **don't work inside** of regular JS functions, nested functions, or loops
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

  const initialState = 0
  export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

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
- Use this hook as an *opt-in* tool for expensive calculations you don't want to happen on every render
- Opt-in when you have expensive computations
- Think of Memo`iz`ation  as Memo`riz`ation... If you had a calculation that happens frequently like `666666*123` instead of having to compute it in your brain you can just `memorize` the output. Kinda similar with computers when using React, there is no need to re-compute something that hasn't changed. Because React will re-render when props change we can avoid unnecessary re-rendering of a component.
- memoization *cache results* of function call
- `useMemo` for memoizing return values
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
- This hook is useful when you have a component with a child frequently re-rendering, and you pass a callback to it
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
- It works just like the `useEffect` hook, with one small difference, you callback will run after render but before painting to screen
- React will way for you code to finish running before it updates the UI (*Caution* this will block visual updates until your callback is finished)



## useDebugValue
- Makes it possible to define you own custom hooks
- This will show the value in the `react-dev-tools`

## Custom Hook
- Building your own custom Hook is essentially extracting code that uses one or more built in hooks to make it reuseable
- For example let's say you use `useState` & `useEffect` together for a functionality, you could bundle this logic up into a custom hook
- Before bundling logic into a hook:
  ```js
  import React, {useEffect, useState} from 'react';

  function App(){
    const [displayName, setDisplayName] = useState();

    useEffect(()=>{
      const data = fetchFromDatabase(props.userId);
      setDisplayName(data.displayName);
    }, []);

    return <button>{displayName}</button>
  }
  ```

- Bundle up the display name logic into a hook
  ```js
  import React, {useEffect, useState} from 'react';

  function useDisplayNAme(){
    const [displayName, setDisplayName] = useState();

    useEffect(()=>{
      const data = fetchFromDatabase(props.userId);
      setDisplayName(data.displayName);
    }, []);

    useDebugValue(displayName ?? 'loading...'); // show the value in `react-dev-tools`
    return displayName;
  }

  function App(){
    const displayName = useDisplayName();
    return <button>{displayName}</button>
  }
  ```






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









































# Testing React Applications

- Unit testing (@testing/library)
- Integrations/End-to-end (cypress)















# Testing with React with @testing-library/react)
- A light-weight solution for testing React components
- It provides light utility functions on top of react-dom and react-dom/test-utils in a way that encourages better testing practices
- rendering the component with props (developer user)
- querying and interacting with the rendered results (end user)
- DON'T TEST Implementation details
  - State
  - Component names
  - CSS classes/selectors
  - anything that the user doesn't see
- Should deal with DOM nodes rather than component instances

- Allows you ways query the DOM:
  - getByLabelText
  - getByPlaceholderText
  - getByText
  - getByAltText
  - getByTitle
  - getByDisplayValue
  - getByRole
  - getByTestId
  - container.querySelector() 
  - container.querySelectorAll()
  - debug()
- It's a replacement for Enzyme
- You want to test the result
- Assertion options
  ```js
  expect.toBe(value)
        .not
        .resolves
        .rejects
        .toBe(value)
        .toHaveBeenCalled()
        .toHaveBeenCalledTimes(number)
        .toHaveBeenCalledWith(arg1, arg2, ...)
        .toHaveBeenLastCalledWith(arg1, arg2, ...)
        .toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)
        .toHaveReturned()
        .toHaveReturnedTimes(number)
        .toHaveReturnedWith(value)
        .toHaveLastReturnedWith(value)
        .toHaveNthReturnedWith(nthCall, value)
        .toHaveLength(number)
        .toHaveProperty(keyPath, value?)
        .toBeCloseTo(number, numDigits?)
        .toBeDefined()
        .toBeFalsy()
        .toBeGreaterThan(number)
        .toBeGreaterThanOrEqual(number)
        .toBeLessThan(number)
        .toBeLessThanOrEqual(number)
        .toBeInstanceOf(Class)
        .toBeNull()
        .toBeTruthy()
        .toBeUndefined()
        .toBeNaN()
        .toContain(item)
        .toContainEqual(item)
        .toEqual(value)
        .toMatch(regexpOrString)
        .toMatchObject(object)
        .toMatchSnapshot(propertyMatchers?, hint?)
        .toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)
        .toStrictEqual(value)
        .toThrow(error?)
        .toThrowErrorMatchingSnapshot(hint?)
        .toThrowErrorMatchingInlineSnapshot(inlineSnapshot)
  ```


# General Testing
- Common things to test
  ```js
  const { 
    debug,
    container,
    getByText,
    queryByText,
    getByTestId 
  } = render(<MyComponent {...props} />)

  // container
  expect(container.querySelector('.title').textContent).toBe('some title')
  expect(container.querySelectorAll('.title').length).toBe(1)
  expect(container.innerHTML).toContain('password123')
  expect(container.querySelector('h1').innerHTML).toBe('radness')

  // getBy<*>
  expect(getByText('some title').textContent).toBe("some title")
  expect(getByText('Copy').outerHTML).toContain('copy-selected-items')
  expect(getByTestId('custom').innerHTML).toBe('radness')
  expect(queryByText('awesome')).toBeNull()


  // fire a click
  fireEvent.click(container.querySelector('button'))

  // input change val
  fireEvent.change(container.querySelector('input'), {target: { value: 'ahhhh' }})
  ```

- Testing code that request data from `msw`
  ```js
  
  function responseHandler(request) {
    return request
      .then(async (response) => {
        const data = await response.json().catch((error) => {
          return { data: false, error }
        })
        return response.ok ? { data, error: false } : { data: false, error: errorHandler(data) }
      })
      .catch((error) => {
        console.log('[ERROR]', error)
        let errorMessage = error.message || ''

        if (error.name === 'AbortError') {
          errorMessage = 'The Request has Timed Out'
        }

        return { data: false, error: errorMessage }
      })
  }  
  
  
  import { rest } from 'msw'
  import server from '@/src/mocks/server'

  const URL = `${config.apiUrl}/sample`

  function requestData(method) {
    const headers = { 'Content-Type': 'application/json' }
    const controller = new AbortController()
    const signal = controller.signal
    const token = '123456789'
    headers.authorization = token ? `Bearer ${token}` : null

    return { headers, signal, method }
  }
  describe('responseHandler', () => {
    it('should return data', async () => {
      server.use(
        rest.get(URLS, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ hell: 'o' }))
        })
      )

      const response = await responseHandler(fetch(URL, requestData('GET')))
      expect(response.error).toBeFalsy()
      const expectedData = { "hell": "o" } /* prettier-ignore */
      expect(response.data).toMatchObject(expectedData)
    })
  })
  ```

- 
  - The Page Component (Connected to Redux)
    ```js
    import React from 'react'
    import { useDispatch, useSelector } from 'react-redux'

    import { selectSampleData, getSampleData } from '__state/slices/sample'

    export default function LandingPage() {
      const dispatch = useDispatch()
      React.useEffect(() => {
        dispatch(getSampleData())
      }, [dispatch])

      const sampleData = useSelector(selectSampleData)

      return (
        <div>
          <ul>
            {sampleData?.map(({ id, items }) => (
              <li key={id}>{items}</li>
            ))}
          </ul>
        </div>
      )
    }
    ```
  - The test code
    ```js
    import { waitFor } from '@testing-library/react'
    import { rest } from 'msw'
    import React from 'react'

    import sampleData from '@/src/mocks/data/sampleData.js'
    import { URLS } from '@/src/mocks/handlers/sample'
    import server from '@/src/mocks/server'
    import { renderWithStore } from '@/src/mocks/testing/MockApp'

    import LandingPage from './LandingPage'

    const { useDispatch } = require('react-redux')
    const { getSampleData } = require('@/src/state/slices/sample')

    export const MockPage = () => {
      const dispatch = useDispatch()
      dispatch(getSampleData())
      return <LandingPage />
    }

    describe('LandingPage', () => {
      it('should render the page component', async () => {
        server.use(
          rest.get(URLS, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(sampleData))
          })
        )

        const { asFragment, getByText } = await renderWithStore(<MockPage />)

        await waitFor(() => {
          const rowCount = getByText(/Something Rad/i)
          expect(rowCount).toBeTruthy()
        })

        expect(asFragment()).toMatchSnapshot()
      })
    })
    ```












# Cypress.io




# Setup and installation
1. Create an application with CRA
  - Install Cypress with one command
  - It will install a binary in your `node_modules/bin` folder
  - You will now have a Desktop App & CLI tool
  ```shell
  $ npx create-react-app cypress-unit-test
  $ npm i -D cypress @cypress/react
  ```

2. Add Some cypress scripts to your package.json file
  ```json
  {
    "scripts": {
      "cypress:open": "cypress open",
      "cypress:run": "cypress run"
    }
  }
  ```

3. Run cypress once and it will scafold some test
  - The first time that you run the `$ npm run cypress:open` cypress will add in all the default files
  - 

4. Create a `./cypress.json`
  - Create a `./cypress.json`
    ```json
    {
      "experimentalComponentTesting": true,
      "componentFolder": "cypress/components",
      "integrationFolder": "cypress/integration",
      "supportFile": "cypress/support/index.js",
      "pluginFile": "cypress/plugin/index.js",
      "fixtureFolder": false
    }
    ```

5. update the `cypress/support/index.js`
  ```js
  require('@cypress/react/support')
  ```

6. Update the `cypress/plugins/index.js` file
- Tell Cypress how your React application is transpiled or bundled (using Webpack), so Cypress can load your components. 
- For example, if you use react-scripts (even after ejecting) do:
  ```js
  // cypress/plugins/index.js
  module.exports = (on, config) => {
    require('@cypress/react/plugins/react-scripts')(on, config)
    // IMPORTANT to return the config object
    // with the any changed environment variables
    return config
  }
  ```

7. Create a hello world test
- `cypress/components/hello-world.spec.js` 
  ```js
  import React from "react";
  import { mount } from "@cypress/react";

  function HelloWorld() {
    return <div>Hello World!</div>;
  }

  describe("HelloWorld component", () => {
    it("works", () => {
      mount(<HelloWorld />);
      // now use standard Cypress commands
      cy.contains("Hello World!").should("be.visible");
    });
  });
  ```

8. Run cypress again
  ```shell
  `$ npm run cypress:open` 
  ```
  ![cypress-unit-test](/assets/blog/cypress/cypress-unit-test-helloworld.png)



# Overview
- You test visually unlike `@testing-library/react` you test with the DOM output only
- You can time travel all your test and pause
- Cypress is a chaining API
- Cypress will automatically wait for assertions (4 seconds by default)

- e.g. Complete test
  ```js
  it('send email with contact form', ()=>{
    cy.visit('http://localhost:3003/signup')
    
    cy.get('#name-input').type('Phil')    
    cy.get('#email-input').type('phil@user.com')
    cy.get('form').submit()
    cy.get('#success-message').should('be.visible')
  })
  ```

- e.g. Checking if a element has a class name
  ```js
  // cy.<command>
  cy.get('button')
    .click()
    .should('have.class', 'active')
  ```

- e.g. Testing the reques API
  ```js
  cy.request('/user/1')
    its('body')
    .should('deep.eql', {name:'phil'})
  ```

# You can also do Unit Testing!
- Start by adding a simple test to test the `./src/App.js` file
- Create `cypress/components/hello-world.spec.js` 
  ```js
  import React from "react";
  import { mount } from "@cypress/react";

  import App from "../../src/App.js"

  describe("HelloWorld component", () => {
    it("works", () => {
      mount(<App />);
      cy.contains("Learn React").should("be.visible");
    });
  });
  ```























# Nextjs - why?
1. Lambda (serverless) functions
  - These are functions that reside under the /api route of a Next.js app
  - server-side rendered React applications
  - These are routes that require fetching initial props from somewhere (using `getInitialProps` or `getServerSideProps`)
2. Static HTML
  - no dynamic content and the data is always the same
3. Static Site Generation (SSG)
  - Allow static site generation as one of the build options
  - These pages use the `getStaticProps` method to fetch the data that will be used to generate static HTML files, as well as `getStaticPaths` to get a list of all the subroutes that need to be generated as HTML files 
4. Incremental Static Regeneration (ISR)
  - It combines the benefits of server-side rendered pages and SSG by generating static HTML files on runtime. 


## Nextjs Tips
- Change the port dev works by updating the `dev` script in your package.json
  ```json
  "scripts": {
    "dev": "next dev -p 8080",
    "build": "next build",
    "start": "next start"
  },
  ```


## Creating and Deploying a Static Site to GitHub Pages
1. Create a static build
  - Add the build script to your package.json file
    ```json
    "scripts": {
      "build": "next build && next export"
    }
    ```
  - Build the static site:
    ```shell
    $ npm run build
    ```
  - This will create a directory called out which contains a fully static version of your website.

2. Create a new repo and push your code up
  - **Create a Github repo that contains your Github username and .github.io.**
  - For example my GitHub username is `phil-willis` and my repo name is `phil-willis.github.io`

3. Create a personal access token
  - Click the avatar > profile > `Developer setttings` > `Personal access token` or [click here](https://github.com/settings/tokens)
  ![gh-profile-settings](/assets/blog/github/gh-profile-settings.png)
  ![gh-personal-access-token](/assets/blog/github/gh-personal-access-token.png)
  ![gh-personal-access-token-scopes](/assets/blog/github/gh-personal-access-token-scopes.png)
  - note: `<repo_name> for github actions`
  - check the `repo` section
  - **DON'T FORGET TO COPY THE TOKEN**

4. In your repo's settings paste the `ACCESS_TOKEN`
   ![gh-secrets](/assets/blog/github/gh-secrets.png)

5. Create a Github workflow file
  - Create a directory called .github/workflows and inside that directory, create a YAML file with the following contents:

  ```yaml
  name: Build and Deploy
  on: 
    push:
      branches:
        - main
  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest

      steps:
        - name: Checkout 🛎️
          uses: actions/checkout@v2.3.1
          with:
            persist-credentials: false

        - name: Cache 💾
          uses: actions/cache@v2
          with:
            path: ${{ github.workspace }}/.next/cache
            key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}

        - name: Install and Build
          uses: actions/setup-node@v1
        - run: npm ci
        - run: npm run build
        - run: npm run export
          env:
              CI: true
        - run: touch out/.nojekyll

        - name: Deploy 🚀
          uses: JamesIves/github-pages-deploy-action@3.7.1
          with:
            ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
            BRANCH: gh-pages 
            FOLDER: out
            CLEAN: true
  ```
  - Now every push to the `main` branch will build a static version of our site using the `$ npm run build` script.
  - Using an action called Deploy to GitHub Actions, it will use your token to create and push a clean commit to the `gh-pages` repo from the `./out` directory that got generated. If the branch doesn't exist, it will create it.
  - GitHub Pages uses Jekyll under the hood to host and render static sites. However, Jekyll ignores every directory that starts with an underscore character. 
  - This will be a problem because Next.js generates the static assets (CSS and JavaScript) inside of a directory called _next and there's no way to changes
  - To get around this issue, you need to create an empty file called `.nojekyll` inside of your `gh-pages` branch. 
  
6. Make a commit and push to github!


























# Storybook
- Nextjs + typescript + storybook
  ```
  $ npx create-next-app -e with-typescript
  $ npx sb init
  ```

- CRA + typescript + storybook
  ```
  $ npx create-react-app my-app --template typescript
  $ npx sb init
  ```


