import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKnight, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './DuelTile.css';

const DuelTile = ({ duel, lists, isEditMode, onDelete, isSelected, onClick }) => {
  const getListNameById = (listId: number) => {
    const list = lists.find(list => list.flashcardListId === listId);
    return list ? list.flashcardListname : 'List not found';
  };

  const handleTileClick = () => {
    if (!isEditMode) {
      onClick(duel.duelId);
    }
  };

  return (
    <div className={`duel-tile ${isEditMode ? 'shake' : ''} ${isSelected ? 'selected' : ''}`} onClick={handleTileClick}>
      {isEditMode && (
        <button className="delete-button" onClick={() => onDelete(duel.duelId)}>
          <FontAwesomeIcon icon={faTimesCircle}/>
        </button>
      )}
      <FontAwesomeIcon icon={faChessKnight} className="duel-icon"/>
      <div>
        <span>Players: {duel.playerUsernames.join(', ')}</span>
        <br />
        <span>List: {getListNameById(duel.flashcardsForDuelId)}</span>
      </div>
    </div>
  );
};

export default DuelTile;
