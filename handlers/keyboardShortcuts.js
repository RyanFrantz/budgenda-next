export default function keyboardShortcuts(event) {
  event.stopPropagation();
  const helpModal = document.getElementById("help-modal");

  if (event.key === 'Escape') {
    let allModals = document.getElementsByClassName("modal");
    // Clear all modals.
    for (let m of allModals) {
      m.style.display = "none";
    }
  }

  if (event.ctrlKey) {
    // Ctrl + /
    switch (event.key) {
      case '/':
        // Toggle help modal.
        helpModal.style.display =
          // On first page load, inline style is empty.
          (helpModal.style.display.length === 0 ||
            helpModal.style.display === "none") ? "block": "none";
        break;
      case 'a':
        // Start an ad hoc meeting.
        console.log("Let's create an ad hoc agenda!");
        break;
      case 'c':
        // Copy exported notes to the clipboard.
        // Only works when the export modal has been populated.
        //copyExportedNotes();
        console.log('Copy exported notes...');
        break;
      case 'e':
        // Open the export modal.
        //openExportModal();
        console.log('Open export modal');
        break;
      case 'm':
        // Open the meetings modal.
        //openMeetingsModal();
        console.log('Open meetings modal');
        break;
      case 'n':
        // Create a new note at time "now".
        //createNote(new Date());
        console.log('Create note');
        break;
      default:
        //console.log(event.key); // Debug
        break;
    }
  }
}
