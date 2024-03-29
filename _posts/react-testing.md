---
title: 'react testing'
excerpt: ''
coverImage: '/assets/covers/react-testing.jpg'
ogImage:
  url: '/assets/covers/react-testing.jpg'
---



# Types of testing
- unit test (test signal piece of logic)
- integreation test (test mult-components)
- end-to-end test (like a user your navigate your app)
- Regression testing
- Smoke test
- Sanity testing
- exploratory testing
- adhoc testnig
- visual regression test


- unit-test: test business logic, should be fast and while you develop (Test Driven Development). Use Jest/Vitest + RTL
- Integration test: 
end-to-end test should be 100% like a user navigating thru our application. For special cases when the service user doesn’t have access/permission we should document it in the test and note that it will be tested in the integration test.
integration test (combining multiple components… or at a page level) that can be done with Jest and RTL can/should use mock data. MSW is a great option for this for you can mock out the HTTP requests.


# Setup a site with testing
- [Vite](https://vitejs.dev/) homepage
  ```shell
  $ npm init vite@latest <YOUR_APP_NAME> -- --template react-ts
  ```
- Template options:
  ```shell
  react
  react-ts
  ```
  

- Add some packages:
  ```shell
  $ npm i -D jest ts-jest @testing-library/react @testing-library/jest-dom 
  $ npm i -D identity-obj-proxy
  ```
    - `ts-jest` lets to use typescript tests
    - `@testing-library/react` provides APIs to work with React Components in our test
    - `@testing-library/jest-dom` is a library that provides a set of custom jest matchers that you can use with jest
    - Optional `@testing-library/user-event`, `@testing-library/react` library already provides a *fireEvent* function to simulate events, but @testing-library/user-event provides a more advanced simulation.
    - The `identity-obj-proxy` tells Jest to mock object as imported, like css or svg

- Create `jest.config.js`
  - This allows you to define where all the files are
  - You can add this to your `package.json` file if you want
    ```js
    module.exports = {
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
      roots: ["<rootDir>/src"],
      transform: {
        "^.+\\.tsx$": "ts-jest",
        "^.+\\.ts$": "ts-jest",
      },
      testRegex: "(/src/.*.(test|spec)).(jsx?|tsx?)$",
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
      collectCoverage: true,
      collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],
      coverageDirectory: "<rootDir>/coverage/",
      coveragePathIgnorePatterns: ["(tests/.*.mock).(jsx?|tsx?)$", "(.*).d.ts$"],
      moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$": "identity-obj-proxy",
      },
      verbose: true,
    };
    ```
- Create a `jest.setup.ts` 
  - This library will extend Jest with a whole bunch of features to make it easier to test the react components in your application
  - Make sure that it's a `.ts` file
    ```js
    import '@testing-library/jest-dom';
    // import 'whatwg-fetch' // If you are using browser's native `fetch` API
    ```
- Now add a new npm script in your `package.json` file
  ```json
  {
    "scripts": {
      "dev": "vite --port 3003",
      "build": "tsc && vite build",
      "serve": "vite preview",
      "test": "jest --watchAll --collectCoverage=false",
      "test:once": "jest --colors",
      "pretest:coverage": "jest --colors --collectCoverage=true",
      "test:coverage": "npx http-server coverage/lcov-report"
    }
  }
  ```
- Make sure you r `tsconfig.json` has the proper `"jsx": "react-jsx"` config
  ```json
  {
    "compilerOptions": {
      "target": "es5",
      "module": "esnext",
      "jsx": "react-jsx"  # https://www.typescriptlang.org/docs/handbook/jsx.html#basic-usage
    }
  }
  ```
- Now create a test file `src/App.test.tsx`
  ```ts
  import React from 'react'
  import { render, screen } from '@testing-library/react'
  import App from './App'

  describe('App', ()=>{
    test('should have welcome message', ()=>{
      render(<App />)
      const welcomeElement = screen.getByText(/Hello Vite/)
      expect(welcomeElement).toBeInTheDocument()
    })
  })
  ```







# Testing React Applications
- Unit testing (@testing/library)
- Integrations/End-to-end (cypress)
- Integrations/End-to-end (Playright)















## Testing with React with @testing-library/react)
- The `@testing-library` family of packages helps you test UI components in a user-centric way. It's a **DOM testing library**
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

- With @testing-library you use Queries ([getBy*, queryBy*, getAllBy*, queryAllBy*]) the DOM to find elements
- Allows you ways query the DOM:
  - getBy**LabelText**
  - getBy**PlaceholderText**
  - getBy**Text**
  - getBy**AltText**
  - getBy**Title**
  - getBy**DisplayValue**
  - getBy**Role**
  - getBy**TestId**
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


### General Testing
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
- Test is something isn't there
  - The standard `getBy` methods throw an error when they can't find an element
  - So if you want to make an assertion that an element is not present in the DOM, you can use `queryBy` APIs instead:
    ```js
    const submitButton = screen.queryByText('submit')
    expect(submitButton).toBeNull() // it doesn't exist
    ```
  - The `queryAll` APIs version return an array of matching nodes. The length of the array can be useful for assertions after elements are added or removed from the DOM.
    ```js
    const submitButtons = screen.queryAllByText('submit')
    expect(submitButtons).toHaveLength(2) // expect 2 elements
    ```
  - The `jest-dom` utility library provides the `.toBeInTheDocument()` matcher, which can be used to assert that an element is in the body of the document, or not. This can be more meaningful than asserting a query result is `null`.
    ```js
    import '@testing-library/jest-dom/extend-expect'
    // use `queryBy` to avoid throwing an error with `getBy`
    const submitButton = screen.queryByText('submit')
    expect(submitButton).not.toBeInTheDocument()
    ```
  - You can also assert that it throws an error
    ```js
    expect(() => getByText('your text')).toThrow('Unable to find an element');
    ```

- Testing tips
```js
expect(getAllByRole('row')[3]).toContainTextContent(/45/)
fireEvent.click(within(getAllByRole('row')[2]).getByText('Delete'))
```

- Test after useEffect() happens at least once
  - Using async/await and `waitFor` you can test your component after a useEffect has ran
    ```js
    import { render, screen, waitFor } from '@testing-library/react'

    describe('MyComponent', () => {
      test('should have welcome message defined in the useEffect', async () => {
        await render(<ThemeToggler />)
        waitFor(() => {
          expect(screen.getByRole('button')).toBeDefines()
        })
      })
    })
    ``

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

- Mocking a `useSelector`
  ```js
  import { render } from '@testing-library/react'
  import * as reactRedux from 'react-redux'

  describe('TEST LIST ITEMS', () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')

    beforeEach(() => {
      useSelectorMock.mockClear()
      useDispatchMock.mockClear()
    })

    it('HAVE 0 ITEMS', () => {
      const mockStateSlice = {}
      useSelectorMock.mockReturnValue(mockStateSlice)

      const { container } = render(<MyComponent />)
      expect(container.firstChild).toBeNull()

      const { getAllByRole } = render(<MyComponent />)
      const alerts = getAllByRole('list item')
      expect(alerts).toBeNull()
    })

    it('HAVE 1 ITEMS', () => {
      const mockStateSlice = {
        0: { username: 'user1' },
      }
      useSelectorMock.mockReturnValue(mockStateSlice)

      const { getAllByRole } = render(<MyComponent />)
      const alerts = getAllByRole('list item')
      expect(alerts.length).toBe(1)
    })
  })
  ```





- Testing - if text is present
  ```ts
  // Person.tsx
  import React from 'react'

  export default function Person({name}: {name:string}){
    return (
      <div role="contentinfo">Name is {name}</div>
    )
  }
  ```
  ```ts
  // Person.test.tsx
  import React from 'react'
  import {render, screen} from '@testing-library/react'
  import Person from './Person'

  describe('Person', ()=>{
    test('getByText', ()=>{
      render(<Person name="Jack" />)
      const divElement = screen.getByText(/Jack/)
      expect(divElement).toBeInTheDocument()
    })

    test('by role ', ()=>{
      render(<Person name="Jack" />)
      const divElement = screen.getByRole('contentinfo')
      expect(divElement).toHaveTextContent('Name is Jack')
      expect(divElement).toHaveAttribute('role', 'contentinfo')
    })
  })
  ```

- Testing list
  ```ts
  import React from 'react'

  interface Props {
    items: {
      name: string
      href?: string
    }[]
  }
  export default function Sidebar({ items }: Props) {
    return (
      <ul>
        {items.map(({ name, href }, i) => (
          <li key={href}>
            <a role="navigation" href={href}>
              {name}
            </a>
          </li>
        ))}
      </ul>
    )
  }
  ```
  ```ts
  import React from 'react'
  import { render, screen } from '@testing-library/react'
  import Sidebar from './Sidebar'

  describe('Sidebar', () => {
    test('getByText', () => {
      const items = [{ name: 'mike', href: '/hello' }]
      render(<Sidebar items={items} />)
      const anchorElements = screen.getAllByRole('navigation')
      expect(anchorElements[0]).toHaveTextContent(items[0].name)
      expect(anchorElements[0]).toHaveAttribute('href', items[0].href)
    })
  })
  ```

- Testing `useState`
  ```ts
  // Counter.tsx
  import React, { useState } from 'react'

  export default function Counter() {
    const [count, setCount] = useState(0)

    return (
      <div>
        <button onClick={() => setCount(count + 1)}>Add count</button>
        <p role="contentinfo">Current Count: {count}</p>
      </div>
    )
  }
  ```
  ```ts
  // Counter.test.tsx
  import React from 'react'
  import { render, screen, fireEvent } from '@testing-library/react'
  import Counter from './Counter'

  describe('Testing State Hooks', () => {
    test('handles on click', () => {
      render(<Counter />)

      const divElement = screen.getByRole('contentinfo')
      const buttonElement = screen.getByText('Add count')
      fireEvent.click(buttonElement)
      expect(divElement).toHaveTextContent('Current Count: 1')
    })
  })
  ```
- Testing Async
  - We can use `MSW` to mock out the REST API calls
    ```shell
    $ yarn add -D msw
    ```
  - Now we can   
  ```ts
  import React, { useState, useEffect } from 'react'

  export default function APIComponent() {
    const [data, setData] = useState<{ name: String }>()

    useEffect(() => {
      let isMounted = true
      fetch('/api')
        .then((response) => response.json())
        .then((data) => {
          if (isMounted) setData(data)
        })

      return () => {
        isMounted = false
      }
    }, [])
    return <div>{data && <div role="contentinfo">Name is {data.name}</div>}</div>
  }
  ```

  ```ts
  import React from 'react'
  import { rest } from 'msw'
  import { setupServer } from 'msw/node'
  import { render, screen, waitFor } from '@testing-library/react'
  import APIComponent from './APIComponent'

  const server = setupServer(
    rest.get('/api', (req, res, ctx) => {
      return res(ctx.json({ name: 'Sam' }))
    }),
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  describe('APIComponent', () => {
    test('Gets data', async () => {
      render(<APIComponent />)

      const out = await waitFor(() => screen.getByRole('contentinfo'))
      expect(out).toHaveTextContent('Name is Sam')
    })
  })
  ```
- Testing custom hooks
  - You need to install a testing package to act on the hook
    ```shell
    $ yarn add -D @testing-library/react-hooks
    ```
  - Now:
    ```ts
    import { useState, useCallback } from 'react'

    export function useCounter() {
      const [count, setCount] = useState(0)
      const increment = useCallback(() => setCount((x) => x + 1), [])

      return { count, increment }
    }
    ```

    ```ts
    import { renderHook, act } from '@testing-library/react-hooks'
    import { useCounter } from './use-counter'

    describe('Custom Hook', () => {
      test('should increment', async () => {
        const { result } = renderHook(() => useCounter())

        act(() => {
          result.current.increment()
        })

        expect(result.current.count).toBe(1)
      })
    })
    ```
- Testing an Async Custom Hook

  ```ts
  import React, { useState, useEffect } from 'react'

  export default function useAPI() {
    const [data, setData] = useState<{ name: String }>()

    useEffect(() => {
      let isMounted = true

      fetch('/api')
        .then((response) => response.json())
        .then((data) => {
          if (isMounted) setData(data)
        })
        .catch(() => console.log(':('))

      return () => {
        isMounted = false
      }
    }, [])
    return data
  }
  ```

  ```ts
  import React from 'react'
  import { rest } from 'msw'
  import { setupServer } from 'msw/node'
  import useAPI from './use-api'
  import { renderHook } from '@testing-library/react-hooks'

  const server = setupServer(
    rest.get('/api', (req, res, ctx) => {
      return res(ctx.json({ name: 'Sam' }))
    }),
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  describe('useAPI', () => {
    test('Gets data', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useAPI())

      await waitForNextUpdate()

      expect(result.current).toEqual({ name: 'Sam' })
    })
  })
  ```
- Testing Redux
  ```shell
  $ yarn add -D @reduxjs/toolkit react-redux
  ```

  ```ts
  // src/state/store.ts
  import { configureStore } from '@reduxjs/toolkit'
  import counterReducer from './slices/counter'

  export const createStore = () =>
    configureStore({
      reducer: {
        counter: counterReducer,
      },
    })
  export const store = createStore()
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  export type SliceSelector<T, D> = (state: T) => D
  ```

  ```ts
  // src/state/slices/counter.ts
  import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'
  import { SliceSelector } from '../store'

  export interface CounterState {
    value: number
  }

  const initialState: CounterState = {
    value: 0,
  }

  const reducers: SliceCaseReducers<CounterState> = {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(state.value)
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  }

  export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers,
  })
  export default counterSlice.reducer

  // Actions creators
  export const { increment, decrement, incrementByAmount } = counterSlice.actions

  // Selectors
  type CounterSliceSelector<T> = SliceSelector<{ counter: CounterState }, T | undefined>
  export const selectCurrentCounterData: CounterSliceSelector<number> = (state) =>
    state.counter?.value
  ```

  ```ts
  // src/components/ReduxCounter.tsx
  import React from 'react'
  import {
    increment,
    decrement,
    incrementByAmount,
    selectCurrentCounterData,
  } from '../state/slices/counter'
  import { useDispatch, useSelector } from 'react-redux'

  export default function ReduxComponent() {
    const dispatch = useDispatch()
    const value = useSelector(selectCurrentCounterData)

    const handleIncrement = () => {
      dispatch(increment({}))
    }

    const handleDecrement = () => {
      dispatch(decrement({}))
    }

    return (
      <div>
        <button onClick={handleIncrement}>Increment me!</button>
        <button onClick={handleDecrement}>Decrement me!</button>
        <p role="contentinfo">current value: {value}</p>
      </div>
    )
  }
  ```

  ```ts
  // src/components/ReduxCounter.test.tsx
  import React from 'react'
  import { render, screen, fireEvent } from '@testing-library/react'
  import { Provider } from 'react-redux'
  import { createStore } from '../state/store'
  import ReduxCounter from './ReduxCounter'

  describe('ReduxComponent', () => {
    test('increment', () => {
      render(
        <Provider store={createStore()}>
          <ReduxCounter />
        </Provider>,
      )
      const incrementButton = screen.getByText(/increment me/i)
      fireEvent.click(incrementButton)
      const counter = screen.getByRole('contentinfo')

      expect(counter).toHaveTextContent('current value: 1')
    })
  })
  ```
- Testing Zustand
  ```shell
  $ yarn add -D zustand
  ```
  
  ```ts
  import create from 'zustand'

  export interface Store {
    count: number
    increment: () => void
    decrement: () => void
  }

  export const useStore = create<Store>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
  }))
  ```

  ```ts
  import React from 'react'
  import { useStore } from '../state/zustand-store'

  export default function ZustandCounter() {
    const { count, increment, decrement } = useStore()

    return (
      <div>
        <button onClick={() => increment()}>Increment me!</button>
        <button onClick={() => decrement()}>Decrement me!</button>
        <p role="contentinfo">current value: {count}</p>
      </div>
    )
  }
  ```

  ```ts
  import React from 'react'
  import { render, screen, fireEvent } from '@testing-library/react'
  import { useStore } from '../state/zustand-store'
  import ZustandCounter from './ZustandCounter'

  const originalState = useStore.getState()
  beforeEach(() => {
    useStore.setState(originalState)
  })

  describe('ZustandCounter', () => {
    test('increment', () => {
      render(<ZustandCounter />)
      const incrementButton = screen.getByText(/increment me/i)
      fireEvent.click(incrementButton)
      const counter = screen.getByRole('contentinfo')
      expect(counter).toHaveTextContent('current value: 1')
    })
  })
  ```


- Mocking window

  - mocking window.location
    ```js
    import { vi } from 'vitest'

    function setGlobalWindowLocation(url, params) {
      global.window = Object.create(window)
      Object.defineProperty(window, 'location', {
        value: {
          href: url + params,
          search: params,
        },
      })
    }

    describe('url util', () => {
      beforeAll(() => {
        setGlobalWindowLocation('http://localhost:0000', '')
      })
      afterEach(() => {
        setGlobalWindowLocation('http://localhost:0000', '')
        vi.restoreAllMocks()
      })

      it('`search` & `href` should work as the browser functions', async () => {
        const baseUrl = 'http://localhost:0000'
        const setParams = '?hello=yep'
        setGlobalWindowLocation(baseUrl, setParams)

        expect(window.location.search).toEqual(setParams)
        expect(window.location.href).toEqual(baseUrl + setParams)
      })
      it('`search` & `href` should work as the browser functions when not url params provided', async () => {
        const baseUrl = 'http://localhost:0000'
        const setParams = ''
        setGlobalWindowLocation(baseUrl, setParams)

        expect(window.location.search).toEqual(setParams)
        expect(window.location.href).toEqual(baseUrl + setParams)
      })
    })
    ```







- Expect element to have attribute
  - `toHaveAttribute` is part of `jest-dom` so you need to install it `$ npm install --save-dev @testing-library/jest-dom`
  - After that you can include at your jest setup file (e.g. ./jest-setup.js) like recommended:
    ```js
    // In your own jest-setup.js (or any other name)
    import '@testing-library/jest-dom'

    // In jest.config.js add (if you haven't already)
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
    ```
   - Usage:
    ```js
    import React from 'react'

    function SomeComponent() {
      return (
        <div>
          <a href="/some/location" data-testid='nav-link'>navigate somewhere</a>
        </div>
      );
    }
    ```
    ```js
    import { render } from "@testing-library/react";
    import SomeComponent from "./SomeComponent";

    describe("SomeComponent", () => {
      it("should have href", () => {
        const testId = "nav-link";
        const { getByTestId } = render(<SomeComponent />);
        expect(getByTestId(testId)).toHaveAttribute("href", "/npe/teams");
      });
    });
    ```

- Add custome functions to the Jest Test Suite
  - Let's say we want to be able to repeat something, we could make a `./test/helpers.ts` file like this:
    ```
    import { itRepeats } from "test/helpers";

    describe("my test suite", () => {
      itRepeats(10, "does something", () => {
        expect(1).toEqual(1);
      });
      // -- or --
      itRepeats(10)("does something", () => {
        expect(1).toEqual(1);
      });
    });
    ```
  - Or you can append to the existing Jest functionality by add this to the `jest.setup.ts` file
    ```ts:jest.setup.ts
    test.repeats = async (
      times: number,
      name: string,
      fn?: jest.ProvidesCallback,
      timeout?: number,
    ) => {
      await Promise.all(
        Array(times)
          .fill(undefined)
          .map((_, i) => {
            return test(name, fn, timeout);
          }),
      );
    };
    ```
  - Add `types/jest.d.ts`
    ```ts
    /// <reference types="jest" />

    declare namespace jest {
      interface It {
        repeats: (
          times: number,
          name: string,
          fn?: ProvidesCallback,
          timeout?: number,
        ) => void;
      }
    }
    ```
  - Then, add the jest.d.ts line to the include property in your tsconfig.json:
    ```json
    {
      ...
      "include": [
        "jest.d.ts",
      ]
    }
    ```



- Mock localStorage
  ```ts

  const localStorageMock = (() => {
    let store: { [keey: string]: string } = {}
    return {
      getItem: (key: string) => {
        return store[key]
      },
      setItem: (key: string, value: string) => {
        store[key] = value.toString()
      },
      clear: () => {
        store = {}
      },
      removeItem: (key: string) => {
        delete store[key]
      },
    }
  })()

  describe('localStorage', () => {
    beforeAll(() => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })

    test('set value', async () => {
      localStorage.setItem('hell', 'o')
      const storageValue = localStorage.getItem('hell')
      expect(storageValue).toBe('o')
      expect(storageValue).not.toBe('no')
    })
  })
  ```

- Nextjs theme provider switch
  ```ts
  import { render, screen, waitFor, fireEvent } from '@testing-library/react'
  import nextThemes from 'next-themes'
  import React from 'react'

  import ThemeToggler from '@/components/ThemeToggler'

  function setTheme(theme = 'dark') {
    return {
      systemTheme: '',
      theme,
      setTheme: () => jest.fn(),
    }
  }
  describe('ThemeToggler - mock next-themes', () => {
    beforeEach(() => {
      jest.restoreAllMocks()
    })

    it('shows the sun icon', async () => {
      jest.spyOn(nextThemes, 'useTheme').mockImplementation(() => setTheme('dark'))
      render(<ThemeToggler />)
      expect(screen.getByTestId('sun-icon')).toBeTruthy()
    })

    it('shows the moon icon', async () => {
      jest.spyOn(nextThemes, 'useTheme').mockImplementation(() => setTheme('light'))
      render(<ThemeToggler />)
      expect(screen.getByTestId('moon-icon')).toBeTruthy()
    })

    it('toggle theme', async () => {
      jest.spyOn(nextThemes, 'useTheme').mockImplementation(() => setTheme('light'))
      render(<ThemeToggler />)

      // initial icon is `sun`
      expect(screen.getByTestId('moon-icon')).toBeTruthy()
      const iconBtn = screen.getByRole('button')
      expect(iconBtn).toBeTruthy()
      fireEvent.click(iconBtn)
      // after clicked expect icon to be `moon`
      const moonIcon = await waitFor(() => screen.getByTestId('moon-icon'))
      expect(moonIcon).toBeTruthy()
    })
  })
  ```

# Mocking a component that uses a hook
- When writing tests it's only a matter of time before you need to create a "fake" version of an internal — or external — service. 
- This is commonly referred to as mocking. 
```ts
  // App.test.tsx
  import { render } from '@testing-library/react'

  import SomeComponentThatUsesThatCustomHook from './SomeComponentThatUsesThatCustomHook'
  import { useFetchData } from './hook'

  jest.mock('./hook', () => ({
    useFetchData: jest.fn(),
  }))

  describe('SomeComponentThatUsesThatCustomHook', () => {
    beforeEach(() => {
      useFetchData.mockReset()
    })

    it('renders with default props', () => {
      useFetchData.mockReturnValue({
        data: ['some', 'awesome', 'data'],
        loading: false,
        error: null,
      })
      const { getByText } = render(<SomeComponentThatUsesThatCustomHook />)

      expect(getByText('awesome')).toBeInTheDocument()
    })
  })
  ```



# Mocking a function that preforms a http fetch
- Below is an example of testing a function that preforms a fetch. we can mock the implementation of the http call
  ```js
  function setupFetchStub(data) {
    return function fetchStub(_url) {
      return new Promise((resolve) => {
        resolve({
          json: () =>
            Promise.resolve({
              data,
            }),
        })
      })
    }
  }

  describe('./service/api.js', () => {
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should return a list of items', async () => {
      const mockResponse = {
        items: [ 'testing.one', 'testing.two', 'testing.three' ]
      }
      jest.spyOn(global, 'fetch').mockImplementation(setupFetchStub(mockResponse))

      const data = await api.fetchItems()

      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(data).toEqual([ 'testing.one', 'testing.two', 'testing.three' ])

      global.fetch.mockClear()
    })
  })
  ```



```js
function fetchData(accessToken){
  const url = `http://example.com/api/get-stuff`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers(accessToken),
    })
    if (!response?.ok) throw new Error(response)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('[API error]', error)
    throw new Error(error)
  }
}
```

```js
import { afterEach, describe, expect, it, vi } from 'vitest'

import fetchData from './fetch-data'

global.fetch = vi.fn(() => {
  return Promise.resolve({ json: () => Promise.resolve({}) })
})

describe('XProduct/AdGroups/api.js', () => {
  beforeEach(() => fetch.mockClear())
  afterEach(() => fetch.mockClear())

  it('should show data from a http call', async () => {
    const mockResponse = { 
      ok: true, 
      json: vi.fn().mockResolvedValue([1,2,3]) 
    }
    global.fetch.mockResolvedValue(mockResponse)

    const accessToken = '123.4567.89'
    const data = await fetchData(accessToken)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch.calls[0][0]).toBe(url)
    expect(data).toEqual([1,2,3])
    expect(data).toHaveLength(3)
  })
})
```


































## Cypress.io




## Setup and installation
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



## Overview
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






# Playwright
- [Docs](https://playwright.dev/)















# Mocking packages directly
- 2 main ways to mock an entire package are:
  1. You can mock a package by creating a `__mocks__/<PACKAGE_NAME>`, for example `__mocks__/@elastic/elasticsearch.js`
    ```js
    const indexName = 'mocked'

    export const mockClient = {
      ping: jest.fn(),
      create: jest.fn((params) => {
        // Simulate successful response from Elasticsearch from input data
        return Promise.resolve({ _id: '123', ...params.body });
      }),
      search: jest.fn(),
      index: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    };

    export class Client {
      constructor() {
        return mockClient
      }
    }
    ```

  2. you can mock the package in the test file directly
    ```js
    jest.mock('@elastic/elasticsearch', () => {
      return {
        Client: jest.fn().mockImplementation(() => {
          return {
            ping: jest.fn(),
            search: jest.fn(),
            index: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
          };
        })
      };
    });

    describe('service: `quotes`', () => {
      test('getQuote', async () => {
       // ...
      })
    })
    ```










# SpyOn

```js
const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
useSelectorMock.mockReturnValue(mockStateSlice)
useSelectorMock.mockClear()
```

# Mock


```js
jest.mock('@elastic/elasticsearch', () => {
  return {
    Client: jest.fn().mockImplementation(() => {
      return {
        ping: jest.fn(),
        search: jest.fn(),
        index: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      };
    })
  };
});
```
