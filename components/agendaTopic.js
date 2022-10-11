import { useEffect, useRef } from 'react';
// An agenda topic of arbitrary size.

// Set the cursor so it visibly flashes and allows the user to start typing.
// TODO: Once I get this working, extract it to a separate module as this
// functionality will be useful for notes taken during a meeting.
const setCursor = (event) => {
  // The node for which this handler was called on.
  const node = event.target;
  // Get the current position of the caret.
  const selection = document.getSelection();
  /* By calling collapse() with the node element from the event target, we can
   * tell the browser to blink the caret there.
   * Per https://developer.mozilla.org/en-US/docs/Web/API/Selection/collapse:
   * If the content is focused and editable, the caret will blink there.
   * NOTE: Without styling the element, the cursor may not be visible. Ensure
   * some amount of padding is defined so that the cursor is visible.
   */
  selection.collapse(node);
};

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
        contentEditable={true} tabIndex="0"
        ref={topicRef} onFocus={setCursor}
      >
      </div>
    </div>
  );
}
