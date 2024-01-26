import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './AddUserTile.css';

const AddUserTile = () => {
  return (
    <div className="add-user-tile">
      <FontAwesomeIcon icon={faPlusCircle} className="add-icon" />
      <span>New User</span>
    </div>
  );
};

export default AddUserTile;