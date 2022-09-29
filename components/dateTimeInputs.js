import { useEffect, useState } from 'react';

// Prefix a number with 0 if it's less than 10.
function prefixZero(num) {
    return num < 10 ? `0${num}` : num;
}

// Return the time in HH:MM format.
// If a Date argument is not present, finds the current date.
function getHhmm(date = new Date()) {
  const hour = prefixZero(date.getHours());
  const min  = prefixZero(date.getMinutes());
  return `${hour}:${min}`;
}

// Return a "nice" time. Nice is defined as the nearest half hour.
function getNiceTime(date = new Date()) {
  const increment = 1000 * 60 * 30; // 30-min increment
  const nearestHalfHour = new Date(Math.round(date.getTime() / increment) * increment);
  return getHhmm(nearestHalfHour);
}

// Return the date in YYYY-MM-DD format.
// If a Date argument is not present, finds the current date.
function getYmd(date = new Date()) {
  const year  = prefixZero(date.getFullYear());
  const month = prefixZero(date.getMonth() + 1);
  const day   = prefixZero(date.getDate());
  return `${year}-${month}-${day}`;
}

export default function DateTimeInputs() {
  const [ dateTime, setDateTime ] = useState({date: "2022-09-29", time: "09:00"})

  // When this component loads, set the nearest date and time in our inputs.
  // Set an empty dependency array so this effect only fires on first render.
  // Avoids the 'Maximum update depth exceeded...' error.
  useEffect(() => {
    const now = new Date();
    setDateTime({date: getYmd(now), time: getNiceTime(now)});
  }, []);

  return (
    <>
      <input type="date" id="agenda-date" name="agenda-date" defaultValue={dateTime.date} />
      <input type="time" id="agenda-time" name="agenda-time" defaultValue={dateTime.time} />
  </>
  );
}
