import { useEffect, useRef } from 'react';
import { epoch, getHhmm } from './utils.js';
// An agenda topic of arbitrary size.

// An editable block used to define an agenda topic.
// The element will be focusable (tabindex=0) so that we can automatically
// move the cursor to the block on creation.
export default function AgendaTopic({dateTime}) {
  // This reference will be populated with the div node representing a topic.
  const topicRef = useRef(null);
  const time = getHhmm(dateTime);
  const id = `topic_${epoch(dateTime)}`;

  // On initial render, focus on the editable div.
  useEffect(() => {
    topicRef.current.focus();
  }, []);

  return (
    <div>
      <label for={id}>{time}</label>
      <div className="agenda-topic" id={id}
        contentEditable={true} tabIndex="0" ref={topicRef}
      >
      </div>
    </div>
  );
}
