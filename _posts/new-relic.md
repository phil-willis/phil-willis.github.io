---
title: 'new relic'
excerpt: ''
coverImage: '/assets/covers/new-relic.jpg'
ogImage:
  url: '/assets/covers/new-relic.jpg'
---



# Browser Application
- You can create a New Relic `Browser Application` in the online GUI or you can do so via REST service



## Browser Application - via REST service
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










