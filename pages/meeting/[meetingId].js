import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Meeting() {
  const router = useRouter();
  //const { meetingId } = router.query;
  const [ meetingId, setMeetingId ] = useState(null);
  const [ title, setTitle ] = useState(null);
  const [ topics, setTopics ] = useState(null);

  // Wait until router is ready so we can extract the route parameter.
  //https://github.com/vercel/next.js/discussions/12661#discussioncomment-360764
  useEffect(() => {
    if(!router.isReady) return;
    const { meetingId } = router.query;
    setMeetingId(meetingId);
    setTitle(meetingTitle(meetingId));
    setTopics(meetingTopics(meetingId));
  }, [router.isReady]);

  // FIXME: This function exists in components/allMeetingsModal.js; extract it.
  const getMeetings = () => {
    const meetings = JSON.parse(localStorage.getItem('budgenda')) || {};
    return meetings;
  };

  const meetingTitle = (meetingId) => {
    const meetings = getMeetings();
    return meetings[meetingId]?.title || "Untitled";
  };

  const meetingTopics = (meetingId) => {
    const meetings = getMeetings();
    return meetings[meetingId]?.topics;
  };

  return (
    <>
    <h1>{title} {meetingId}</h1>
    <div className="topics">{topics}</div>
    </>
  );
};
