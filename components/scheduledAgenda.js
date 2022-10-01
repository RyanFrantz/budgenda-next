import { useEffect, useState } from 'react';
import { getYmd, getNiceTime } from './utils.js';
import TopNav from './topNav.js';

export default function ScheduledAgenda() {
  const [ dateTime, setDateTime ] = useState({date: "2022-09-29", time: "09:00"})

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
  const handlers = {
    date: updateDate,
    time: updateTime,
    button: () => console.log(`${dateTime.date} ${dateTime.time}`)
  };

  return (
    <>
      <TopNav date={dateTime.date} time={dateTime.time} handlers={handlers}/>
      <main>
      </main>
    </>
  );
}
