import Clock from '../components/clock.js';
import Sidebar from '../components/sidebar.js';
import HelpMessage from '../components/help.js';
import Notes from '../components/notes.js';
import ExportNotesModal from '../components/export-notes-modal.js';
import HelpModal from '../components/help-modal.js';
import AllMeetingsModal from '../components/all-meetings-modal.js';

export default function Main() {
  return (
    <>
      {/* With <main> present, we can probably remove the "main-container" div. */}
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
    </>
  );
}
