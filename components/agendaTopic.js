// An agenda topic of arbitrary size.

export default function AgendaTopic({time}) {
  return (
    <>
      <span>{time}</span>
      <div className="agenda-topic" id={`topic_${time}`}
        contentEditable={true}>
      </div>
      </>
  );
}
