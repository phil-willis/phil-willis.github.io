---
title: 'Preview Mode for Static Generation'
excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.'
coverImage: '/assets/blog/preview/cover.jpg'
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---

# Code snippets

```html
<h1>Hello React</h1>
<div id="app"></div>
```

```js
// React Component
function Card(props){
  const {name} = props
  return (
    <div className="card">
      hello {name}
    </div>
  )
}

const app = () => (
  <div>
    <Card name="Phil"/>
    <Card name="Dan"/>
  </div>
)

// Add it to the DOM
ReactDOM.render(app, document.querySelector('#app'));
```




```html
<pre><code class="nohighlight">...</code></pre>
```


```javascript
$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
```




```hcl
resource "aws_s3_bucket" "b" {
  bucket = "my-tf-test-bucket"
  acl    = "private"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}
```
