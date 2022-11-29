import { useEffect } from 'react';

export default function AdhocMeeting() {

  // FIXME: This is code is duped from meeting/[meetingId].js
  const createNote = (event) => {
    if (event.metaKey && (event.key == 'n')) {
      event.stopPropagation();
      event.preventDefault();
      console.log(`Creating new note at ${new Date()}`);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', createNote);
    return () => {
      document.removeEventListener('keydown', createNote);
    };
  }, []);

  return (
    <>
    <h1>Adhoc Meeting Placeholder Page!</h1>
    <main></main>
    {/*FIXME: These styles are duped from the schedule page. */}
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
        border-bottom: 1px solid;
        margin-left: 5px;
        /* Padding is required to make the cursor visible. */
        padding: 0.25rem;
      }

      /* Remove the bulky outline we see on inputs. */
      .agenda-topic:focus {
        outline: none;
      }

      .container {
        min-height: 100vh;
        padding: 2rem 0;
        /*
        * Parroting create-next-app styling.
        * Center-flexing breaks the styling of the vertical line in the agenda.
        flex: 1;
        display: flex;
        flex-direction: column;
        jusitfy-content: center;
        align-items: center;
        */
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

      :focus {
        background-color: #eee;
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
  );
};
