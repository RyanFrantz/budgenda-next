import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'

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
            <div class="sidebar">
                {/* Refresh the page so that we start a new ad hoc meeting. */}
                <a href="#" title="Ad hoc">
                    <span id="new-adhoc-meeting" class="material-icons">bolt</span>
                </a>
                {/* TODO: Start a presentation-/demo-type meeting.
                <a href="#" title="Presentation">
                    <span class="material-icons">tv</span>
                </a>
                */}
                {/* TODO: Start a decision-type meeting.
                <a href="#" title="Decision">
                    <span class="material-icons">thumbs_up_down</span>
                </a>
                */}
                {/* List all stored meetings. */}
                <a href="#" title="All Meetings">
                    <span id="all-meetings-button" class="material-icons">event</span>
                </a>
            </div>

            <div class="content">
                <div class="clock">
                    <span id="the_clock"></span>
                </div>
                <div id="help-message">
                    <p>
                    Click the <span class="material-icons">bolt</span> in the sidebar, or press <code>Ctrl + a</code> to create a new ad hoc meeting.
                    </p>
                    <p>Click a tick on the timeline to create a note for that time.
                    Click anywhere in the timeline box to create a note for "now".</p>
                    <p>Need help? Press <code>Ctrl + /</code></p>
                </div>
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
