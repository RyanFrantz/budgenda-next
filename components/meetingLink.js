import { getYmd, getHhmm } from './utils.js';
/*
* Given a saved meeting's start time (ms since epoch) and the details
* we save about the agenda and notes, return a link. The link will have
* a handler attached that will load the meeting.
*/
// meetingStart is ms since epoch.
export default function MeetingLink({meetingStart, title}) {
  const openMeeting = (e) => {
    console.log(`Meeting ID: ${e.target.id}`);
  };

  const d = new Date(Number.parseInt(meetingStart));
  return (
    // TODO: Add a click handler that will load the given meeting.
    <p className="meeting-link">
    {/* FIXME: Use Link here? Link to a page like /meeting ? */}
      <a href="#" id={meetingStart} onClick={openMeeting}>
      {getYmd(d)} {getHhmm(d)} {title}
      </a>
    </p>
  );
}
