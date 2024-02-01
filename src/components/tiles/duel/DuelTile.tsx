import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKnight, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './DuelTile.css';

const DuelTile = ({ duel, lists, isEditMode, onDelete, isSelected, onClick }) => {

  const handleTileClick = () => {
    if (!isEditMode) {
      onClick(duel.duelId);
    }
  };

  // Zusätzliche Klasse für den Fall, dass das Duell abgeschlossen ist
  const finishedClass = duel.finished ? 'finished' : '';

  return (
    <div className={`duel-tile ${finishedClass} ${isEditMode ? 'shake' : ''} ${isSelected ? 'selected' : ''}`} onClick={handleTileClick}>
      {isEditMode && (
        <button className="delete-button" onClick={() => onDelete(duel.duelId)}>
          <FontAwesomeIcon icon={faTimesCircle}/>
        </button>
      )}
      <FontAwesomeIcon icon={faChessKnight} className="duel-icon"/>
      <div>
        <span><b>Players:</b> {duel.playerUsernames.join(', ')}</span>
        <br />
        <span><b>List:</b> {duel.flashcardListName}</span>
        {duel.finished && (
          <p>{duel.winnerUsernames.length > 1 ? <span><b>Winners</b></span> : <span> <b>Winner</b></span>}: {duel.winnerUsernames.join(', ')}</p>
        )}
      </div>
    </div>
  );
};

export default DuelTile;

