import Link from 'next/link'

const styles = {
  wrapper: {
    position: 'fixed',
    backgroundColor: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(10px)',
    width: '100%',
    left: '0px',
    zIndex: 1000
  },
  fixedStyles: {
    padding: 0,
    paddingLeft: '10px',
    marginBottom: '20px',
  },

  phantomSpace: {
    height: '100px',
  },
}

export default function Header() {
  return (
    <div style={styles.wrapper}>
      <h2
        className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8"
        style={styles.fixedStyles}
      >
        <Link href="/">
          <a className="hover:underline">Learn</a>
        </Link>
        .
      </h2>
    </div>
  )
}

export function HeaderPhantomSpace() {
  return <div style={styles.phantomSpace}></div>
}
