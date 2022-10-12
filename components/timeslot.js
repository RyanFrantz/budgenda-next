// A timeslot used to build a schedule.
import AgendaTopic from './agendaTopic.js';
import { useState } from 'react';
import { getHhmm, epoch } from './utils.js';

export default function Timeslot({dateTime}) {
  // Super simple: if the time slot has been clicked, display an
  // AgendaTopic for the user to fill in.
  const [hasTopic, setHasTopic ] = useState(false);
  const dataTime = getHhmm(dateTime);
  const id = `timeslot_${epoch(dateTime)}`;

  return (
    <>
      <span className="time-tick" id={id} data-time={dataTime}
        onClick={() => setHasTopic(true)}
      />
      {hasTopic ? <AgendaTopic dateTime={dateTime}/> : undefined}
    </>
  );
}
