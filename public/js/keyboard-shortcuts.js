const helpModal = document.getElementById("help-modal");
document.addEventListener("keydown", handleKeydown);

function handleKeydown(_event) {
  if (_event.key === 'Escape') {
    let allModals = document.getElementsByClassName("modal");
    // Clear all modals.
    for (let m of allModals) {
      m.style.display = "none";
    }
  }

  if (_event.ctrlKey) {
    // Ctrl + /
    switch (_event.key) {
      case '/':
        // Toggle help modal.
        helpModal.style.display =
          // On first page load, inline style is empty.
          (helpModal.style.display.length === 0 ||
            helpModal.style.display === "none") ? "block": "none";
        break;
      case 'a':
        // Start an ad hoc meeting.
        startAgenda();
        break;
      case 'c':
        // Copy exported notes to the clipboard.
        // Only works when the export modal has been populated.
        copyExportedNotes();
        break;
      case 'e':
        // Open the export modal.
        openExportModal();
        break;
      case 'm':
        // Open the meetings modal.
        openMeetingsModal();
        break;
      case 'n':
        // Create a new note at time "now".
        createNote(new Date());
        break;
      default:
        //console.log(_event.key); // Debug
        break;
    }
  }
}
