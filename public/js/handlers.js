// Create a new note when a tick is clicked.
function tickOnClick(_event, datum) {
  // datum here is a Date string.
  if (!allNotes.find(n => n.id == epoch(datum))) {
    createNote(datum);
  }

  // We have a click event registered on a parent that we don't
  // want to fire.
  _event.stopPropagation();
}

function timelineOnClick(_event, datum) {
  let date = new Date();
  createNote(date);
}

function registerClickHandlers() {
  // Select all tick text elements and bind events to them.
  d3.selectAll(".tick").on("click", tickOnClick);

  d3.selectAll(".timeline").on("click", timelineOnClick);
}
