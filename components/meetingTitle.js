export default function MeetingTitle({title, handlers}) {
  return (
    <div>
      <input id="meeting-title" defaultValue={title} onChange={handlers.title}/>
    </div>
  );
}
