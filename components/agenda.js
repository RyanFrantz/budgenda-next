import Timeslot from './timeslot.js';
import { range, addMinutes, getHhmm, epoch } from './utils.js';

// Given our dateTime object, return a string that can be parsed by Date.
const parseableDateTime = (dateTime) => {
  return `${dateTime.date}T${dateTime.time}`
};

// Generate all the agenda's time slots.
const generateTimeSlots = (count, dateTime) => {
  // Our inputs determine agenda start.
  const agendaStart = new Date(parseableDateTime(dateTime));
  const slots = range(count).map(n => {
    // NOTE: We need to pass a copy of the date, else the original date's value
    // is updated, by reference, creating an almost Fibonacci-like increase
    // in time values!
    const timeSlotDateTime = addMinutes(n, new Date(agendaStart));
    const dataTime = getHhmm(timeSlotDateTime);
    const id = `timeslot_${epoch(timeSlotDateTime)}`;
    return <Timeslot id={id} dataTime={dataTime} key={n}/>
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
