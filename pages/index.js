import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Clock from '../components/clock.js';
import Sidebar from '../components/sidebar.js';
import HelpMessage from '../components/help.js';

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
                <div id="notes">
                </div>
                <div id="export-notes-modal" class="modal">
                    <div class="modal-content-header">
                        Press <span class="command">Ctrl + c</span> to select/copy all notes!
                        <button type="button" id="copy-to-clipboard" class="copy-icon">
                        </button>
                        {/* an "x" */}
                        <span class="modal-close">×</span>
                    </div>
                    <div id="modal-content" class="modal-content">
                        <div id="export-decisions"></div>
                        <div id="export-follow-up"></div>
                        <div id="export-meeting-minutes"></div>
                    </div>
                </div>
                <div id="help-modal" class="modal">
                    <div class="help-content">
                        <p><b>Keyboard Shortcuts</b></p>
                        <p>
                        Clear all modals: <span class="help-kb-shortcut command">Esc</span>
                        </p>
                        <p>
                        Toggle this help screen: <span class="help-kb-shortcut command">Ctrl + /</span>
                        </p>
                        <p>
                        Start an ad hoc meeting: <span class="help-kb-shortcut command">Ctrl + a</span>
                        </p>
                        <p>
                        Copy notes to clipboard (When exporting notes): <span class="help-kb-shortcut command">Ctrl + c</span>
                        </p>
                        <p>
                        Export notes: <span class="help-kb-shortcut command">Ctrl + e</span>
                        </p>
                        <p>
                        List all meetings: <span class="help-kb-shortcut command">Ctrl + m</span>
                        </p>
                        <p>
                        Create a new note (time is "now"): <span class="help-kb-shortcut command">Ctrl + n</span>
                        </p>
                    </div>
                </div>
                <div id="all-meetings-modal" class="modal">
                    <div class="modal-content-header">
                        <span id="all-meetings-modal-close" class="modal-close">×</span>
                        <a href="#" title="Clear Meetings">
                            <span id="clear-meetings" class="material-icons float-right">delete</span>
                        </a>
                    </div>
                    <div id="all-meetings-content" class="modal-content">
                    </div>
                </div>
            {/* end "content" */}
            </div>
        {/* end main-container" */}
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
