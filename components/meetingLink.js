/*
* Given a saved meeting's start time (ms since epoch) and the details
* we save about the agenda and notes, return a link. The link will have
* a handler attached that will load the meeting.
*/
export default function MeetingLink({meetingStart, title}) {
  return (
    // TODO: Convert meetingStart into a friendly date and time and use in title.
    // TODO: Add a click handler that will load the given meeting.
    <p key={meetingStart} id="`meeting_${meetingStart}`">
    {title}
    </p>
  );
}
