export default function AgendaStartTime({time, onTimeChange}) {
  return (
    <input type="time" id="agenda-time" name="agenda-time"
      defaultValue={time} onChange={onTimeChange}
    />
  );
}
