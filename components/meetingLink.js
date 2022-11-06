import Link from 'next/link';
import { getYmd, getHhmm } from './utils.js';
/*
* Given a saved meeting's start time (ms since epoch) and the details
* we save about the agenda and notes, return a link. The link will have
* a handler attached that will load the meeting.
*/
// meetingStart is ms since epoch.
export default function MeetingLink({meetingStart, title}) {
  // NOTE: Link overrides onClick so we have to assign this handler on an 'a'
  // element that is a child of Link.
  const todoSaveAgenda = (e) => {
    console.log("Remember to save an agenda here!");
  };

  const d = new Date(Number.parseInt(meetingStart));
  const target = `/meeting/${meetingStart}`;
  const linkTitle = `${getYmd(d)} ${getHhmm(d)} ${title}`;
  return (
    // TODO: Be sure to save an agenda if one is being updated.
    <p className="meeting-link">
      <Link href={target}>
        <a onClick={todoSaveAgenda}>
          {linkTitle}
        </a>
      </Link>
    </p>
  );
}
