import Timeslot from './timeslot.js';
import { range, addMinutes, parseableDateTime } from './utils.js';

// Generate all the agenda's time slots.
const generateTimeSlots = (count, dateTime) => {
  // Our inputs determine agenda start.
  const agendaStart = new Date(parseableDateTime(dateTime));
  const slots = range(count).map(n => {
    // NOTE: We need to pass a copy of the date, else the original date's value
    // is updated, by reference, creating an almost Fibonacci-like increase
    // in time values!
    const timeslotDateTime = addMinutes(n, new Date(agendaStart));
    return <Timeslot dateTime={timeslotDateTime} key={n}/>
  });
  return slots;
};

export default function Agenda({dateTime, count}) {
  return (
    <div id="agenda">
    {generateTimeSlots(count, dateTime)}
    </div>
  );
}
