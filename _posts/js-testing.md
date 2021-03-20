---
title: 'Testing in JavaScript'
excerpt: '...'
coverImage: '/assets/blog/hello-world/cover.jpg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---


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






