import { useEffect, useState } from 'react';
import { getYmd, getNiceTime, range } from './utils.js';
import TopNav from './topNav.js';
import MeetingTitle from './meetingTitle.js';
import Agenda from './agenda.js';

export default function ScheduledAgenda() {
  const [ dateTime, setDateTime ] = useState({date: "2022-09-29", time: "09:00"})
  const [ meetingTitle, setMeetingTitle ] = useState('Meeting Title');
  // Init time slot count at 0. When > 0 we'll render time slots.
  const [ timeSlotCount, setTimeSlotCount ] = useState(0);

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
    // Deafult to a 30-minute agenda, for now.
    button: () => setTimeSlotCount(30),
    save: () => console.log("I'm saving!")
  };

  const meetingHandlers = {
    title: (event) => setMeetingTitle(event.target.value)
  };

  return (
    <div className="container">
      <TopNav
        date={dateTime.date} time={dateTime.time}
        handlers={navHandlers} count={timeSlotCount}
      />
      <MeetingTitle title={meetingTitle} handlers={meetingHandlers}/>
      <main>
        {meetingTitle} scheduled at {dateTime.date} {dateTime.time}
        <Agenda dateTime={dateTime} count={timeSlotCount}/>
      </main>
    </div>
  );
}
