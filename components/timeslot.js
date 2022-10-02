// A timeslot used to build a schedule.
import AgendaTopic from './agendaTopic.js';
import { useState } from 'react';

export default function Timeslot({id, dataTime}) {
  const [hasTopic, setHasTopic ] = useState(false);

  return (
    <>
      <span className="time-tick" id={id} data-time={dataTime}
        onClick={() => setHasTopic(true)}
      />
      {hasTopic ? <AgendaTopic/> : undefined}
    </>
  );
}
