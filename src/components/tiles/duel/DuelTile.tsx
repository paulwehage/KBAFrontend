import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessKnight, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './DuelTile.css';

const DuelTile = ({ duel, lists, isEditMode, onDelete }) => {

  const getListNameById = (listId: any) => {
    console.log(lists)
    console.log(listId)
    const list = lists.find(list => list.flashcardListId === listId);
    return list ? list.flashcardListname : 'List not found';
  };

  return (
    <div className={`duel-tile ${isEditMode ? 'shake' : ''}`}>
      {isEditMode && (
        <button className="delete-button" onClick={() => onDelete(duel.duelId)}>
          <FontAwesomeIcon icon={faTimesCircle}/>
        </button>
      )}
      <FontAwesomeIcon icon={faChessKnight} className="duel-icon"/>
      <div>
        <span>Players: {duel.playerUsernames.join(', ')}</span>
        <br />
        <span>List: {getListNameById(duel.flashcardsForDuelId)}</span>      </div>
    </div>
  );
};

export default DuelTile;
