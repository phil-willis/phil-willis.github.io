---
title: 'chrome-devtools'
excerpt: ''
coverImage: '/assets/covers/chrome-devtools.jpg'
ogImage:
  url: '/assets/covers/chrome-devtools.jpg'
---





# Service Workers
- 

## How to unregister all serviceworkers
1. Go to [Chrome's service-worker config](chrome://serviceworker-internals/?devtools)
2. Open up Chrome's console
3. Run 
    ```js
    $$('.unregister').forEach(b => b.click())
    ```

