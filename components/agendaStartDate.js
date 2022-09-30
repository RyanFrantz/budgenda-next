export default function AgendaStartDate({date, onDateChange}) {
  return (
    <input type="date" id="agenda-date" name="agenda-date"
      defaultValue={date} onChange={onDateChange}
    />
  );
}
