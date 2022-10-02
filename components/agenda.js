import Timeslot from './timeslot.js';
import { range } from './utils.js';

export default function Agenda({dateTime, count}) {
  return (
    <div id="agenda">
    {
      range(count).map(n => <Timeslot key={n}/>)
    }
    </div>
  );
}
