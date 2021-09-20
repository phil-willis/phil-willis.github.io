import '../styles/index.css'

import 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-jsx.min'
import 'prismjs/components/prism-hcl.min'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/docker'
import 'prismjs/components/jsx'
import 'prismjs/components/typescript'
import 'prismjs/components/sql'
import 'prismjs/components/stylus'

import '../styles/code-highlight.css'
import '../styles/type-styles.css'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
