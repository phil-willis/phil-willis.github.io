import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'
import { SHOW_ALERT, ALERT_MESSAGE } from '../lib/constants'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {SHOW_ALERT ? (
          <Alert preview={preview} message={ALERT_MESSAGE} />
        ) : null}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
