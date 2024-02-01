import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './ListTile.css';

const ListTile = ({ flashcardList, isEditMode, onDelete }) => {

  return (
    <div className={`list-tile ${isEditMode ? 'shake' : ''}`}>
      {isEditMode && (
        <button className="delete-button" onClick={() => onDelete(flashcardList.flashcardListId)}>
          <FontAwesomeIcon icon={faTimesCircle}/>
        </button>
      )}
      <FontAwesomeIcon icon={faList} className="list-icon"/>
      <span>{flashcardList.flashcardListName}</span>
    </div>
  );
};

export default ListTile;