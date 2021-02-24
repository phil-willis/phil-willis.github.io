import "../styles/index.css";

import "prismjs";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-hcl.min.js";
import "prismjs/themes/prism-okaidia.css";

import "../styles/code-highlight.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
