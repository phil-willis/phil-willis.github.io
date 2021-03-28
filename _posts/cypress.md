---
title: 'Cypress'
excerpt: 'How to configure Cypress.'
coverImage: '/assets/covers/cypress.jpg'
ogImage:
  url: '/assets/covers/cypress.jpg'
---


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











