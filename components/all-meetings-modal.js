import { useEffect } from 'react';

export default function AllMeetingsModal() {
  const openModal = (event) => {
    if (event.ctrlKey && (event.key == 'm')) {
      event.stopPropagation();
      event.preventDefault();
      console.log('New "m" handler!');
    }
  };

  const noDeps = []; // Clarify what we're doing at the end of useEffect().
  useEffect(() => {
    document.addEventListener('keydown', openModal);
    // Cleanup code. Avoids re-registering the same handler on each render.
    return () => {
      document.removeEventListener('keydown', openModal);
    };
  }, noDeps);

  return (
    <div id="all-meetings-modal" className="modal">
      <div className="modal-content-header">
        <span id="all-meetings-modal-close" className="modal-close">×</span>
        <a href="#" title="Clear Meetings">
        <span id="clear-meetings" className="material-icons float-right">delete</span>
        </a>
      </div>
      <div id="all-meetings-content" className="modal-content"></div>

      <style jsx global>{`
        /* Modal bits from
         * https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
        */
        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            padding-top: 100px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }

        /* Modal Content */
        .modal-content {
            background-color: #fefefe;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            /* Remove border between this and the header. */
            border-top: 0;
            width: 80%;
            min-height: 100px;
        }

        .modal-content-header {
            background-color: #fefefe;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            height: 15px;
            margin: auto;
            padding: 20px;
            width: 80%;
        }

        /* The Close Button */
        .modal-close {
            color: #aaaaaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .modal-close:hover,
        .modal-close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
      `}</style>
    </div>
  );
}
