/*
 * NOTE: Keep this page on its own while I explore some new UI.
 * If this pans out, I'll fold it into the main page.
 */

import Head from 'next/head';
import Script from 'next/script';

/*
 *  Given a date, return milliseconds since the epoch.
 * Sat Jul 17 2021 16:57:34 GMT-0400 (Eastern Daylight Time)
 * -to-
 *  1626555454000
 */
function epoch(date) {
  return Date.parse(date);
}

function addMinutes(numMinutes, date = new Date()) {
  // setMinutes returns ms since epoch; convert back to Date object.
  return new Date(date.setMinutes(date.getMinutes() + numMinutes));
}

/* Return an ISO8601 string of the date and time selected by the user for
 * this agenda.
 */
function getSelectedDateAndTime() {
  const agendaDate = document.querySelector("#agenda-date").value;
  const agendaTime = document.querySelector("#agenda-time").value;
  return `${agendaDate}T${agendaTime}`;
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
    // NOTE: getHhmm() lives in the client-side js/budgenda-schedule.js, is used
    // below and by the code in js/budgenda-schedule.js#getNiceTime().
    // Feels a bit kludgy, but works for now.
    timeslot.setAttribute("data-time", getHhmm(timeslotDatetime));
    timeslot.id = `timeslot_${epoch(timeslotDatetime)}`;
    agenda.appendChild(timeslot);
  }
}

export default function Schedule() {
  return (
    <>
    <Head>
        <meta name="description" content="Meeting minutes, or it didn't happen!" />
    </Head>

    <nav>
        <input type="date" id="agenda-date" name="agenda-date" defaultValue="2022-06-28" />
        <input type="time" id="agenda-time" name="agenda-time" defaultValue="12:00" />
        <button onClick={createAgenda}>Create Agenda</button>
    </nav>
    <main>
    </main>

    <Script src="js/budgenda-schedule.js" onLoad={() => {initializeDateAndTime()}}/>

    </>
  )
}
