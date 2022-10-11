import { useEffect, useRef } from 'react';
// An agenda topic of arbitrary size.

// An editable block used to define an agenda topic.
// The element will be focusable (tabindex=0) so that we can automatically
// move the cursor to the block on creation.
export default function AgendaTopic({time}) {
  // This reference will be populated with the div node representing a topic.
  const topicRef = useRef(null);

  // On initial render, focus on the editable div.
  useEffect(() => {
    topicRef.current.focus();
  }, []);

  return (
    <div>
      <span>{time}</span>
      <div className="agenda-topic" id={`topic_${time}`}
        contentEditable={true} tabIndex="0" ref={topicRef}
      >
      </div>
    </div>
  );
}
