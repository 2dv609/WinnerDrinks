/**
 * Refreshes the page if the user wants to clear the game data and start over.
 */
import './App.css';

function ComponentGetToKnow() {
  return(
    <div>
      <button
        className="button is-danger"
        onClick={() => {
          window.location.reload();
        }}>
        Reset page
      </button>
    </div>
  );
}

export default ComponentGetToKnow;
