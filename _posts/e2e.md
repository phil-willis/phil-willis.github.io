---
title: 'e2e'
excerpt: ''
coverImage: '/assets/covers/e2e.jpg'
ogImage:
  url: '/assets/covers/e2e.jpg'
---







# Cypress




# Testcafe


- Print current DOM element
```
console.log(await Selector('element').innerText);
console.log(await Selector('element').value);
```


## Testcafe tips
- Use live mode
    ```json
    {
    "scripts": {
        "e2e": "testcafe --config-file e2e/.testcaferc.json --live"
    }
    }
    ```
- Use `test.only` to focus on 
    ```js
    test.only('Source table filter on access `Admin`', async (t) => {
    const sources = new Sources()
    await sources.selectAccess()
    })
    ```

- Loop thru all rows
```js
const rows = Selector('[data-test-id="awesome-table"] tbody tr')
const expectedValue = 'yep'
var rowsCount = await rows.count
for (let i = 0; i < rowsCount; i++) {
    const elementSelector = rows.nth(i).child(1) // column 1
    const sanity = await elementSelector() 
    await assertElementEqual(sanity.innerText, expectedValue)
}
```