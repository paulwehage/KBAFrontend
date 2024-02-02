import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './AddListTile.css';

const AddListTile = ({ onAdd, onCancel, isFlipped, onContentChange }) => {
  return (
    <div className={`flip-container ${isFlipped ? 'flip' : ''}`}>
      <div className="flipper" onClick={!isFlipped ? onAdd : null}>
        <div className="add-list-tile">
          <FontAwesomeIcon icon={faPlusCircle} className="add-icon" />
          <span><b>Create new List</b></span>
        </div>
        <div className="back">
          <input type="text" placeholder="Enter list content" onChange={onContentChange} className="input" />
          <button className="add-button" onClick={onAdd}>Create</button>
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddListTile;
