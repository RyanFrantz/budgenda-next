import { useEffect, useState } from 'react';
import { getYmd, getNiceTime, range } from './utils.js';
import TopNav from './topNav.js';
import MeetingTitle from './meetingTitle.js';
import Timeslot from './timeslot.js';

export default function ScheduledAgenda() {
  const [ dateTime, setDateTime ] = useState({date: "2022-09-29", time: "09:00"})
  const [ meetingTitle, setMeetingTitle ] = useState('Meeting Title');
  // Init time slot count at 0. When > 0 we'll render time slots.
  const [ timeSlotCount, setTimeSlotCount ] = useState(1);

  // When this component loads, set the nearest date and time in our inputs.
  // Set an empty dependency array so this effect only fires on first render.
  // Avoids the 'Maximum update depth exceeded...' error.
  useEffect(() => {
    const now = new Date();
    setDateTime({date: getYmd(now), time: getNiceTime(now)});
  }, []);

  // Track date changes.
  function updateDate(event) {
    setDateTime({date: event.target.value, time: dateTime.time});
  }

  // Track time changes.
  function updateTime(event) {
    setDateTime({date: dateTime.date, time: event.target.value});
  }
  const navHandlers = {
    date: updateDate,
    time: updateTime,
    button: () => console.log(`${dateTime.date} ${dateTime.time}`)
  };

  const meetingHandlers = {
    title: (event) => setMeetingTitle(event.target.value)
  };

  return (
    <>
      <TopNav date={dateTime.date} time={dateTime.time} handlers={navHandlers}/>
      <MeetingTitle title={meetingTitle} handlers={meetingHandlers}/>
      <main>
        {meetingTitle} scheduled at {dateTime.date} {dateTime.time}
        <div>
        {
          range(timeSlotCount).map(n => <Timeslot key={n}/>)
        }
        </div>
      </main>
    </>
  );
}
