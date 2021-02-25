import '../styles/index.css'

import 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-jsx.min'
import 'prismjs/components/prism-hcl.min'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'

import '../styles/code-highlight.css'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
