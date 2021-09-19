const copyButton = document.getElementById("copy-to-clipboard");
const modalContent = document.getElementById("modal-content");

function copyExportedNotes() {
  window.getSelection().selectAllChildren(modalContent);
  document.execCommand("copy");
}
// Register an event handler to support copying modal content to clipboard.
copyButton.onclick = copyExportedNotes;
