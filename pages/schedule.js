/*
 * NOTE: Keep this page on its own while I explore some new UI.
 * If this pans out, I'll fold it into the main page.
 */

import Head from 'next/head';
import ScheduledAgenda from '../components/scheduledAgenda.js';

// TODO: Fold this support into the Timeslot component.
function createAgendaItem(event) {
  const agendaItem = document.createElement("div");
  agendaItem.className = "agenda-item";
  agendaItem.setAttribute("contentEditable", "true");
  // TODO: Add a unique ID so we can keep agenda items sorted.
  event.target.insertAdjacentElement('afterend', agendaItem);
}

export default function Schedule() {
  return (
    <>
    <Head>
        <meta name="description" content="Meeting minutes, or it didn't happen!" />
    </Head>

    <ScheduledAgenda/>

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

      .agenda-topic {
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
