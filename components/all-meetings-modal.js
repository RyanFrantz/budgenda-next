export default function AllMeetingsModal() {
  return (
    <div id="all-meetings-modal" class="modal">
      <div class="modal-content-header">
        <span id="all-meetings-modal-close" class="modal-close">×</span>
        <a href="#" title="Clear Meetings">
        <span id="clear-meetings" class="material-icons float-right">delete</span>
        </a>
      </div>
        <div id="all-meetings-content" class="modal-content"></div>
    </div>
  );
}
