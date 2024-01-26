import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './AddDuelTile.css';

const AddDuelTile = ({ onAdd, onCancel, isFlipped, lists }) => {
  return (
    <div className={`flip-container ${isFlipped ? 'flip' : ''}`}>
      <div className="flipper" onClick={!isFlipped ? onAdd : null}>
        <div className="add-duel-tile">
          <FontAwesomeIcon icon={faPlusCircle} className="add-icon" />
          <span>Add Duel</span>
        </div>
        <div className="back">
          <select className="select">
            {lists.map(list => (
              <option key={list.flashcardListId} value={list.flashcardListId}>
                {list.flashcardListname}
              </option>
            ))}
          </select>
          <button className="add-button" onClick={onAdd}>Add Duel</button>
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddDuelTile;
