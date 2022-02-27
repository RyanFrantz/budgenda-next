import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Main from '../components/main.js';

export default function Home() {
  return (
    <div>
      {/* FIXME: Do we move head into pages/_document.js ? */}
      <Head>
        <title>Budgenda</title>
        <meta name="description" content="Budget your time with smart agenda" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>

      <Main />
      <Script src="js/d3.v6.min.js" />
      <Script src="js/budgenda.js" />
      <Script src="js/handlers.js" />
      <Script src="js/export.js" />
      <Script src="js/clipboard.js" />
      <Script src="js/keyboard-shortcuts.js" />
      <Script src="js/all-meetings.js" />
      <Script src="js/util.js" />
    </div>
  )
}
