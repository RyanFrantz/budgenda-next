import AgendaStartDate from './agendaStartDate.js';
import AgendaStartTime from './agendaStartTime.js';

/* Expects the following props:
 * date - A string representing a date.
 * time - A string representing a time..
 * handlers - An object containing event handlers that fire on input updates.
 */
export default function TopNav({date, time, handlers, count}) {
  return (
    <nav>
      <AgendaStartDate date={date} onDateChange={handlers.date}/>
      <AgendaStartTime time={time} onTimeChange={handlers.time}/>
      <button onClick={handlers.button}>Create Agenda</button>
      {/* When time slot count > 0, show the save button */}
      {count > 0 && <button>Save Agenda</button>}
    </nav>
  );
}
