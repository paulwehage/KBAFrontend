import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './AddListTile.css';

const AddListTile = ({ onAdd, onCancel, isFlipped, onPathChange, onNameChange }) => {
  return (
    <div className={`flip-container ${isFlipped ? 'flip' : ''}`}>
      <div className="flipper" >
        <div className="add-list-tile">
          <FontAwesomeIcon icon={faPlusCircle} className="add-icon" />
          <span>Create new List</span>
        </div>
        <div className="back">
          <input type="text" placeholder="Enter list name" onChange={onNameChange} className="input" />
          <input type="text" placeholder="Enter absolute path" onChange={onPathChange} className="input" />
          <button className="add-button" onClick={onAdd}>Create</button>
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddListTile;
