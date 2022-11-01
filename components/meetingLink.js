import { getYmd, getHhmm } from './utils.js';
/*
* Given a saved meeting's start time (ms since epoch) and the details
* we save about the agenda and notes, return a link. The link will have
* a handler attached that will load the meeting.
*/
// meetingStart is ms since epoch.
export default function MeetingLink({meetingStart, title}) {
  console.log(meetingStart);
  const d = new Date(Number.parseInt(meetingStart));
  return (
    // TODO: Add a click handler that will load the given meeting.
    <p key={meetingStart} id="`meeting_${meetingStart}`">
    {getYmd(d)} {getHhmm(d)} {title}
    </p>
  );
}
