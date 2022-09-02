/* Note to self: I'm focused on building agenda at the moment. Once a rough
 * cut of that support is ready, I'll want to add support for adding notes
 * to support tracking progress during a meeting. Notes will look similar to
 * agenda items but their markup will indicate the difference.
 */

// Prefix a number with 0 if it's less than 10.
function prefixZero(num) {
    return num < 10 ? `0${num}` : num;
}

function initializeDateAndTime() {
  const now = new Date();
  const agendaDate = document.querySelector("#agenda-date");
  agendaDate.value = getYmd(now);
  const agendaTime = document.querySelector("#agenda-time");
  agendaTime.value = getNiceTime(now);
}

// Is there a better/more preferred way to handle this?
window.addEventListener('load', initializeDateAndTime);

/* Return an ISO8601 string of the date and time selected by the user for
 * this agenda.
 */
function getSelectedDateAndTime() {
  const agendaDate = document.querySelector("#agenda-date").value;
  const agendaTime = document.querySelector("#agenda-time").value;
  return `${agendaDate}T${agendaTime}`;
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

// Return the time in HH:MM format.
// If a Date argument is not present, finds the current date.
function getHhmm(date = new Date()) {
  const hour = prefixZero(date.getHours());
  const min  = prefixZero(date.getMinutes());
  return `${hour}:${min}`;
}

// Return a "nice" time. Nice is defined as the nearest half hour.
function getNiceTime(date = new Date()) {
  const increment = 1000 * 60 * 30; // 30-min increment
  const nearestHalfHour = new Date(Math.round(date.getTime() / increment) * increment);
  return getHhmm(nearestHalfHour);
}

// Return the date in YYYY-MM-DD format.
// If a Date argument is not present, finds the current date.
function getYmd(date = new Date()) {
  const year  = prefixZero(date.getFullYear());
  const month = prefixZero(date.getMonth() + 1);
  const day   = prefixZero(date.getDate());
  return `${year}-${month}-${day}`;
}

function addMinutes(numMinutes, date = new Date()) {
  // setMinutes returns ms since epoch; convert back to Date object.
  return new Date(date.setMinutes(date.getMinutes() + numMinutes));
}

function createAgendaItem(event) {
  const agendaItem = document.createElement("div");
  agendaItem.className = "agenda-item";
  agendaItem.setAttribute("contentEditable", "true");
  // TODO: Add a unique ID so we can keep agenda items sorted.
  event.target.insertAdjacentElement('afterend', agendaItem);
}

function createAgenda() {
  const agendeDateTime = new Date(getSelectedDateAndTime());
  const main = document.querySelector("main");
  const agenda = document.createElement("div");
  agenda.id = "agenda"

  const meetingTitle = document.createElement("input");
  meetingTitle.id = "meeting-title";
  meetingTitle.placeholder = "Meeting Title";
  main.appendChild(meetingTitle);

  /* TODO: Consider adding a custom data-* attribute here for use when storing
   * the agenda as a whole.
   */
  main.appendChild(agenda);

  // Generate a 30-minute agenda, for now.
  for (let i = 0; i <= 30; i++) {
    const timeslot = document.createElement("span");
    timeslot.className = "time-tick";
    timeslot.addEventListener("click", createAgendaItem);
    // NOTE: We need to pass a copy of now, else now's value is updated,
    // by reference, creating an almost Fibonacci-like increase in time values!
    const timeslotDatetime = addMinutes(i, new Date(agendeDateTime));
    timeslot.setAttribute("data-time", getHhmm(timeslotDatetime));
    timeslot.id = `timeslot_${epoch(timeslotDatetime)}`;
    agenda.appendChild(timeslot);
  }
}
