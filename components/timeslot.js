// A timeslot used to build a schedule.
import AgendaTopic from './agendaTopic.js';
import { useState } from 'react';

export default function Timeslot({id, dataTime}) {
  // Super simple: if the time slot has been clicked, display an
  // AgendaTopic for the user to fill in.
  const [hasTopic, setHasTopic ] = useState(false);

  return (
    <>
      <span className="time-tick" id={id} data-time={dataTime}
        onClick={() => setHasTopic(true)}
      />
      {hasTopic ? <AgendaTopic time={dataTime}/> : undefined}
    </>
  );
}
