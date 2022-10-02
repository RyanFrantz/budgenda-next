// A timeslot used to build a schedule.

export default function Timeslot({id, dataTime}) {
  return (
    <span className="time-tick" id={id} data-time={dataTime}></span>
  );
}
