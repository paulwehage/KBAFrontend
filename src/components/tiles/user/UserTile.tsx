import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './UserTile.css';

const UserTile = ({ user, isEditMode, onDelete, isDeletableUser }) => {

  return (
    <div className={`user-tile ${isEditMode ? 'shake' : ''}`}>
      {(isEditMode && isDeletableUser) && (
        <button className="delete-button" onClick={() => onDelete(user.userId)}>
          <FontAwesomeIcon icon={faTimesCircle}/>
        </button>
      )}
      <FontAwesomeIcon icon={faUser} className="user-icon"/>
      <span>{user.username}</span>
    </div>
  );
};

export default UserTile;