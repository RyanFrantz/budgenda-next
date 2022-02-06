export default function Sidebar() {
  return (
    <div class="sidebar">
        {/* Refresh the page so that we start a new ad hoc meeting. */}
        <a href="#" title="Ad hoc">
            <span id="new-adhoc-meeting" class="material-icons">bolt</span>
        </a>
        {/* TODO: Start a presentation-/demo-type meeting.
        <a href="#" title="Presentation">
            <span class="material-icons">tv</span>
        </a>
        */}
        {/* TODO: Start a decision-type meeting.
        <a href="#" title="Decision">
            <span class="material-icons">thumbs_up_down</span>
        </a>
        */}
        {/* List all stored meetings. */}
        <a href="#" title="All Meetings">
            <span id="all-meetings-button" class="material-icons">event</span>
        </a>
    </div>
  );
}
