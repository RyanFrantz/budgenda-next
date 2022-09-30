export default function DateTimeInputs({date, time, onDateTimeChange}) {
  return (
    <>
      <input type="date" id="agenda-date" name="agenda-date" defaultValue={date} onChange={onDateTimeChange}/>
      <input type="time" id="agenda-time" name="agenda-time" defaultValue={time} onChange={onDateTimeChange}/>
  </>
  );
}
