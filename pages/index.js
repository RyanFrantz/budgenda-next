import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Clock from '../components/clock.js';
import Sidebar from '../components/sidebar.js';
import HelpMessage from '../components/help.js';
import Notes from '../components/notes.js';
import ExportNotesModal from '../components/export-notes-modal.js';
import HelpModal from '../components/help-modal.js';
import AllMeetingsModal from '../components/all-meetings-modal.js';

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

      <main>
        <div class="main-container">
          <Sidebar />
            <div class="content">
                <Clock/>
                <HelpMessage />
                <Notes />
                <ExportNotesModal />
                <HelpModal />
                <AllMeetingsModal />
            </div>
        </div>
      </main>
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
