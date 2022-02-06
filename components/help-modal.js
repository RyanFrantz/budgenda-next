export default function HelpModal() {
  return (
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
  );
}
