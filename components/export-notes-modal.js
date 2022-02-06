export default function ExportNotesModal() {
  return (
    <div id="export-notes-modal" class="modal">
      <div class="modal-content-header">
        Press <span class="command">Ctrl + c</span> to select/copy all notes!
        <button type="button" id="copy-to-clipboard" class="copy-icon"></button>
        {/* an "x" */}
        <span class="modal-close">×</span>
      </div>
      <div id="modal-content" class="modal-content">
      <div id="export-decisions"></div>
      <div id="export-follow-up"></div>
      <div id="export-meeting-minutes"></div>
      </div>
    </div>
  );
}
