/*
 * NOTE: Keep this page on its own while I explore some new UI.
 * If this pans out, I'll fold it into the main page.
 */

import Head from 'next/head';
import Script from 'next/script';
import TopNav from '../components/topNav.js';

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
    <TopNav/>
    <main>
    </main>

    <Script src="js/budgenda-schedule.js" onLoad={() => {initializeDateAndTime()}}/>

    <style jsx global>{`
      button {
        cursor: pointer;
        height: 20px;
        margin: 3px;
      }

      #agenda,
      .notes {
        display: flex;
        flex-direction: column;
        width: 50%;
        border-left: 2px solid; /* Creates the vertical line across all notes. */
        margin-left: 10px;
      }

      .agenda-item {
        border: 1px solid;
        margin-left: 5px;
      }

      input {
        height: 20px;
      }

      /* Give the clock time some wiggle room. */
      /* Found the correct selector by inspecting the DOM. */
      input[type=time i] {
        width: 105px;
        margin: 3px;
      }

      #meeting-title {
        margin-bottom: 5px;
      }

      nav {
        width: 90%;
        border: 1px solid;
        padding: 10px;
        margin-bottom: 5px;
      }

      .note {
        padding-left: 5px;
        padding-bottom: 5px;
      }

      .time-tick {
        padding-left: 15px;
        padding-bottom: 15px;
      }

      .time-tick::before {
        content: '';
        border: 1px solid;
        height: 6px;
        width: 6px;
        border-radius: 50%;
        /* Without absolute positioning, the circle looks like a smashed thing.*/
        position: absolute;
        left: 15px;
        background: white;
      }

      /* Note when using :nth-of-type on a class selector, it appears the browser
       * effectively backtracks, finding the element type, then uses that to compute
       * siblings and order. So if you have a set of <div>s, some of which you are
       * targetting by class, the browser will count ALL sibling <div>s, regardless
       * of class, to compute which will match :nth-of-type.
       * It is safest to be very specific and/or use an explicit element type other
       * than <div>.
       */
      .time-tick:nth-of-type(5n+1)::before {
        height: 18px;
        width: 18px;
        left: 9px;
      }

      .time-tick:nth-of-type(5n+1)::after {
        /* Find the data-* (custom) global attribute for the time.*/
        content: attr(data-time);
      }

      .time-tick:hover::after {
        content: attr(data-time);
        background: powderblue;
        cursor: pointer;
        border: 1px solid;
        padding: 5px;
        border-radius: 10%;
      }

      .note-detail {
        margin: 2px;
        padding: 5px;
      }

      .agenda,
      .notes > .note:nth-child(even) {
        background: lightgray;
      }

      .note-detail:hover {
        background-color: powderblue;
      }
    `}</style>

    </>
  )
}
