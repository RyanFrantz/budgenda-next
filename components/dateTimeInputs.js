export default function DateTimeInputs({date, time}) {
  return (
    <>
      <input type="date" id="agenda-date" name="agenda-date" defaultValue={date} />
      <input type="time" id="agenda-time" name="agenda-time" defaultValue={time} />
  </>
  );
}
