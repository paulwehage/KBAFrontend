import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './AddUserTile.css';

const AddUserTile = ({ onAdd, onCancel, isFlipped, onUsernameChange }) => {
  return (
    <div className={`flip-container ${isFlipped ? 'flip' : ''}`}>
      <div className="flipper" onClick={!isFlipped ? onAdd : null}>
        <div className="add-user-tile">
          {/* Inhalte der Vorderseite (Originalzustand) */}
          <FontAwesomeIcon icon={faPlusCircle} className="add-icon" />
          <span>New User</span>
        </div>
        <div className="back">
          <input
            className="input"
            type="text"
            placeholder="Enter username"
            onChange={onUsernameChange} // Hier ändern
          />
          <button className="add-button" onClick={onAdd}>Add User</button>
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
    </div>
    </div>
  );
};


export default AddUserTile;
