import { useEffect, useState } from 'react';

import MeetingLink from './meetingLink.js';

export default function AllMeetingsContent() {

  const getMeetings = () => {
    let meetings = JSON.parse(localStorage.getItem('budgenda')) || {};
    console.log('In getMeetings()...');
    console.log(meetings);
    return meetings;
  };

  // Return an array of links referencing saved meeting agenda.
  function generateMeetingLinks(meetings = {}) {

    const meetingKeys = Object.keys(meetings);
    const meetingLinks = meetingKeys.map(k => {
      const meeting = meetings[k];
      return <MeetingLink meetingStart={k} title={meeting.title}/>
    });
    // FIXME: The modal should be updated when the localstorage is updated.
    return meetingLinks;
  }

  const [ savedMeetings, setSavedMeetings ] = useState([]);
  useEffect(() => {
    setSavedMeetings(getMeetings());
    console.log(savedMeetings);
  }, []);

  return (
    <div id="all-meetings-content" className="modal-content">
      <h3>Saved Meeting Agenda</h3>
      {generateMeetingLinks(savedMeetings)}

      <style jsx global>{`
        /* Modal Content */
        .modal-content {
            background-color: #fefefe;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            /* Remove border between this and the header. */
            border-top: 0;
            width: 80%;
            min-height: 100px;
        }
      `}</style>
    </div>
  );
}
