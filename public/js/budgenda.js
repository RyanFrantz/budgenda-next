
//
// Customizing Axes
// Code from the medium post: https://medium.com/@ghenshaw.work/customizing-axes-in-d3-js-99d58863738b
//

// Margin convention
const margin = {top: 32, right: 20, bottom: 32, left: 10};
/*
const width = 1200 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;
*/
const width = 1200 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

function buildTimeline() {
  let contentParent = document.querySelector("body .main-container .content");
  let existingTimeline = document.querySelector("svg"); // Only one, so far.
  if (existingTimeline) {
    contentParent.removeChild(existingTimeline);
  }

  // Create an SVG of our timeline.
  const svg = d3.select("body")
                .select(".main-container")
                .select(".content")
                // Insert the SVG just above the help message.
                .insert("svg", "#help-message")
                .attr("class", "timeline")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);


  // Define the scale for our axis.
  let duration = 30;
  let start = Date.now() - (60 * 2 * 1000);
  let end = Date.now() + (60 * duration * 1000);
  let xScale = d3.scaleTime()
                 .domain([start, end])
                 .range([0, width]);

  // NOTE: axisBottom() doesn't place the axis at the bottom of a graph.
  // It creates an axis where _tick marks_ are on the bottom.
  let xAxisGenerator = d3.axisBottom(xScale);

  // Customizations using the axis generator; these are done pre-render.
  // Start and end on a nice boundary.
  // For a 30-minute session, starts and ends 1-6 minutes on each side.
  xAxisGenerator.ticks(duration);
  let timeFormat = d3.timeFormat("%H:%M"); // 24-hour format.
  xAxisGenerator.tickFormat(timeFormat);
  xScale.nice();


  // Render the axis.
  let xAxis = svg.append("g").call(xAxisGenerator);

  // Customizations using the axis after it is called
  // Place the axis at the bottom of the graph.
  xAxis.attr("transform",`translate(${0},${height})`);

  // Optional: Remove text from alternate ticks, for legibility.
  // https://stackoverflow.com/questions/38921226/show-every-other-tick-label-on-d3-time-axis
  /*
  let ticks = d3.selectAll(".tick text");
  ticks.each(function(_,i){
    if(i%2 !== 0) d3.select(this).remove();
  });
  */

  // Elongate alternate ticks, for legibility.
  d3.selectAll(".tick line")
  .each(function(datum, idx){
    if(idx % 2 !== 0) d3.select(this)
      .attr("y2", "16");
  });

  // We also need to push the placement of text to be under the tick line.
  let _text = d3.selectAll(".tick text");
  _text.each(function(_,i){
    if(i%2 !== 0) d3.select(this)
      .attr("y", "16");
  });
} // End buildTimeline()

// Refresh it
function refreshTicks() {
  let interval = 1000;
  setTimeout('updateTick();', interval);
}

// Restore all ticks to their original styling.
function restoreTicks() {
  d3.selectAll("text")
  .attr("font-size", "10")
  .attr("fill", "currentColor");

  d3.selectAll("line")
  .attr("stroke", "currentColor")
  .attr("stroke-width", "1")
  .attr("y2", "6");
}

// Select a tick where the text is a specific value.
// We can use this to  modify the tick whose text value matches the time.
function updateTick() {
  restoreTicks();
  let time = getTime();

  // Select all tick elements, filtering on the one that matches the seconds
  // value. Then, style it.
  let tick = d3.selectAll("g.tick")
    .filter(function() {
      return d3.select(this.lastChild).text() == time;
    });

  // We expect only 2 children: 'line' and 'text'.
  let _line = d3.select(tick.nodes()[0].firstChild);
  let _text = d3.select(tick.nodes()[0].lastChild);
  _text.attr("font-size", "15").attr("fill", "red");
  _line.attr("y2", "-100")
    .attr("stroke", "red")
    .attr("stroke-width", "3");

  refreshTicks();
}

function prefix_zero(num) {
    return num < 10 ? `0${num}` : num;
}

// Return the time in HH:MM format.
function getTime() {
  let now  = new Date();
  let hour = prefix_zero(now.getHours());
  let min  = prefix_zero(now.getMinutes());
  return `${hour}:${min}`;
}

// This is one half of a main loop between this function and displayTime().
function refresh_time() {
    var interval = 1000; // Milliseconds.
    setTimeout('displayTime()', interval)
}

// Entry point for our program.
function displayTime() {
    var today    = new Date();
    var hour     = prefix_zero(today.getHours());
    var minute   = prefix_zero(today.getMinutes());
    var second   = prefix_zero(today.getSeconds());
    var the_time = `${hour}:${minute}:${second}`;
    document.getElementById('the_clock').innerHTML = the_time;
    updateTick();
    refresh_time();
}

let allNotes = [];

// We'll set meetingStart when the agenda kicks off. We can use it as a key
// in localStorage to maintain some state for the meeting.
let meetingStart;

// Clear any existing notes from the document so we can start fresh.
function clearExistingNotes() {
  let notesParent = document.querySelector("#notes");
  while (notesParent.firstChild) {
    notesParent.removeChild(notesParent.firstChild);
  }
}

const notesDiv = document.getElementById("notes");
// Add an input box for the meeting title.
function addTitleInput(meetingTitle = null) {
  let title = document.createElement("input");
  title.setAttribute("id", "meeting-title");
  title.setAttribute("placeholder", "Meeting Title");
  // In case we're populating content from an existing meeting.
  if (meetingTitle) {
    title.value = meetingTitle;
  }
  notes.appendChild(title);
}

// Create a div whose id is the date of a given meeting.
// We'll use this as a watermark to ensure we're saving content to the
// proper meeting.
function createMeetingWatermark(date) {
  let watermark = document.createElement("div");
  watermark.id = "watermark";
  // Set a custom data-* attribute so we can look up the meeting's start date.
  watermark.setAttribute("data-watermark", date);
  notesDiv.appendChild(watermark);
}

// Get the agenda started by creating an initial note.
function startAgenda() {
  clearExistingNotes();
  let now = new Date();
  meetingStart = now;
  createMeetingWatermark(now);
  buildTimeline();
  registerClickHandlers(); // js/handlers.js
  addTitleInput();
  addExportButton(); // js/export.js
  // Create very first note.
  createNote(now);
  // There should only be a single note detail at this point.
  let firstNoteDetail = d3.select('.note-detail');
  firstNoteDetail.text('Meeting started');
  // Get the time display ticking.
  displayTime();
}

/*
 *  Given a date, return milliseconds since the epoch.
 * Sat Jul 17 2021 16:57:34 GMT-0400 (Eastern Daylight Time)
 * -to-
 *  1626555454000
 */
function epoch(date) {
  return Date.parse(date);
}

// Store the current state of all note content.
function storeNoteState() {
  // from js/export.js
  let exportedNotes = getNotesForExport();
  let meetingTitle = document.getElementById("meeting-title")?.value || null;
  let allMeetings = JSON.parse(localStorage.getItem("budgenda")) || {}
  let watermark;
  let _meetingStart;
  watermark = document.getElementById("watermark");
  if (watermark) {
    // Get the meeting's start from its watermark.
    _meetingStart = watermark.dataset.watermark;
  }
  // Only attempt to store if a meeting has started, else we have no notes.
  if (_meetingStart) {
    allMeetings[_meetingStart] = {
      metadata: {
        title: meetingTitle
      },
      notes: exportedNotes
    };
    localStorage.setItem("budgenda", JSON.stringify(allMeetings));
  }
}

/* Given an epoch value, search among existing notes to find which of them
 * have an earlier date and return that note'd ID.
 * This will be used to figure how where to insert a new note so that it
 * resides chronologically in the set of notes.
 */
function earlierNote(newNoteEpoch) {
  // Create a list of notes' epoch values...
  let notes = d3.select("#notes").selectAll(".note");
  let noteEpochs = d3.map(notes, n => {
    let noteId = d3.select(n).attr("id");
    let noteEpoch = Number(noteId.replace(/^note_/, ""));
    return noteEpoch;
  });

  // If no notes exist, return the new note's epoch.
  if (!noteEpochs.length) {
    return newNoteEpoch;
  }

  // ...sort them in descending order...
  noteEpochs.sort((a,b) => b - a);
  // ...and find the first value that is lower than newNoteEpoch.
  let earlier = noteEpochs.find(e => e < newNoteEpoch);
  // If idxLater == -1, earlier is the _earliest_ because -1 indicates we've wrapped to the end of the array.
  // Calling an array with index -1 returns undefined.
  let idxLater = noteEpochs.indexOf(earlier) - 1;
  let later = noteEpochs[idxLater];

  // The new note is younger than all existing notes.
  // Return the earliest existing note's epoch.
  if (!earlier) {
    return noteEpochs.slice(-1); // Last element in descending order.
  }
  // When our note is between two, insert it before the later of them.
  if (earlier && later) {
    return later;
  }
  // When we have an earlier value but nothing later, this note goes at the end.
  if (earlier && !later) {
    return null;
  }
}

// Given a date string, parse it, and return the time.
function dateToTime(date) {
  let d = new Date(Date.parse(date))
  let hours = prefix_zero(d.getHours());
  let minutes = prefix_zero(d.getMinutes());
  let seconds = prefix_zero(d.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

/* Create a new note element.
 * Secnarios:
 * 1. There are no notes so we append to the top-level #notes.
 *    earlierNote(_epoch) == _epoch
 * 2. There are existing notes so we determine which to insert before.
 *    earlierNote(_epoch) == <some epoch to insert before>
 * 3. There are existing notes and this note is older than them all so
 *    we append to the top-level #notes.
 *    earlierNote(_epoch) == null
*/
function createNote(date) {
  storeNoteState();
  let _epoch = epoch(date);
  // Define an id value to aid in storing and sorting notes.
  let noteId = `note_${_epoch}`;
  let newNote;
  let earlierNoteEpoch = earlierNote(_epoch);
  if (! earlierNoteEpoch || earlierNoteEpoch == _epoch) {
    // append to top-level #notes.
    newNote = d3.select("#notes").append("div")
      .attr("class", "note")
      .attr("id", `${noteId}`);
  } else {
    // insert note after the given note's ID that matches insertNoteBefore
    let earlierNoteId = `#note_${earlierNoteEpoch}`;
    newNote = d3.select("#notes").insert("div", earlierNoteId)
      .attr("class", "note")
      .attr("id", `${noteId}`);
  }

  // TODO: Consider moving these checkboxes into their own div to better
  // manage/style them.
  let checkboxId = `${noteId}_follow_up`;
  newNote.append("input")
    .attr("type", "checkbox")
    .attr("id", checkboxId)
    .attr("class", "note-attribute")
    .attr("name", "follow-up");

  newNote.append("label")
    .attr("for", checkboxId)
    .attr("class", "note-attribute")
    .text("Follow-up");

  let decisionCheckboxId = `${noteId}_decision`;
  newNote.append("input")
    .attr("type", "checkbox")
    .attr("id", decisionCheckboxId)
    .attr("class", "note-attribute")
    .attr("name", "decision");

  newNote.append("label")
    .attr("for", decisionCheckboxId)
    .attr("class", "note-attribute")
    .text("Decision");

  // Create a div above all details that shows the time of the note.
  newNote.append("div")
    .attr("class", "note-time")
    //.text(date);
    .text(dateToTime(date));

  // Create a contenteditable container for all note details.
  // As a user types notes, new divs will be created (on line breaks).
  newNote.append("div")
    .attr("class", "note-details")
    .attr("contenteditable", true)
    .append("div")
    .attr("class", "note-detail")
    .attr("tabindex", "0") // Make this focusable.
    /* Insert a zero-width character to give the element some height.*/
    .html("&#8203;");

  // Focus on the newly created note.
  let sel = `#${noteId} > .note-details > .note-detail`;
  d3.select(sel).on("focus", setCursor); // On focus, set the cursor.
  let firstDetail = document.querySelector(sel);
  firstDetail.focus();

  // Push the new note into our list of notes.
  allNotes.push({id: _epoch, details: []});
}

/* Set the cursor so it visibly flashes and allows the user to start typing. */
function setCursor(_event, datum) {
  el = _event.target;
  // Selection here is, roughly, the tick that was clicked.
  let sel = document.getSelection();
  /* By calling collapse() with the node element in the event target, we can
   * tell the browser to blink the caret there.
   * Per https://developer.mozilla.org/en-US/docs/Web/API/Selection/collapse:
   * If the content is focused and editable, the caret will blink there.
   */
  let offset = 1;
  sel.collapse(el, offset);
}
