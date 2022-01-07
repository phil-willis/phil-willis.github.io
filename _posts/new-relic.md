---
title: 'new relic'
excerpt: ''
coverImage: '/assets/covers/new-relic.jpg'
ogImage:
  url: '/assets/covers/new-relic.jpg'
---



# Browser Application
- You can create a New Relic `Browser Application` in the online GUI or you can do so via REST service


## Manually add New Relic Browser Monitoring
- View the documentation [here](https://docs.newrelic.com/docs/browser/browser-monitoring/installation/install-browser-monitoring-agent/)
- Steps:
  1. Go to one.newrelic.com, select Browser, and then select `Add more data` button.
  2. Under the `Browser metrics` section click the `New Relic Browser` button.
  3. Select the account & continue
  4. Make sure you select the `Copy/Paste Javascript code` radio button
  5. For step #3 select `No. (Name your standalone app)` and give you application a name
  6. Generate some traffic for your app, then wait a few minutes for data to appear in New Relic.
  7. Optional: After installation is complete and you are seeing data, go to the App settings page for additional agent configuration, or to change the browser agent type.

## Browser Application - via REST service
- **When you add a browser app via API (v2), you can only instrument basic page load timing. To use instrumentation supporting all SPA features, [set up single page app monitoring via another method.](https://docs.newrelic.com/docs/browser/single-page-app-monitoring/get-started/install-single-page-app-monitoring/)**
- So basically DON'T create a new New Relic Browser Monitoring app via the REST service
- View the documentation [here](https://docs.newrelic.com/docs/apis/rest-api-v2/browser-examples-v2/add-or-list-browser-apps-api-v2/)
- Create an API key by clicking on your avatar in the navbar > `API Keys` > `Create a Key`
- Create a new  `Browser Application`
  ```shell
  $ curl -X POST 'https://api.newrelic.com/v2/browser_applications.json' \
       -H "X-Api-Key:${APIKEY}" -i \
       -H 'Content-Type: application/json' \
       -d \
  '{
    "browser_application": {
      "name": ${STRING}
    }
  }'
  ```
- List all current browser applications
  ```shell
  $ curl -X GET 'https://api.newrelic.com/v2/browser_applications.json' \
       -H "X-Api-Key:${APIKEY}" -i
  ```
- View a specific browser app
  ```shell
  $ curl -X GET 'https://api.newrelic.com/v2/browser_applications.json' \
       -H "X-Api-Key:${APIKEY}" -i \
       -d "filter[name]=${NAME}"
  ```
- The REST service list each application's `id`, `name`, `browser_monitoring_key`, & `loader_script`
- The `loader_script` is the script tag you need to add to your project










