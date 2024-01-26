import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './AddListTile.css';

const AddListTile = () => {
  return (
    <div className='add-list-tile'>
        <FontAwesomeIcon icon={faPlusCircle} className='add-icon' />
        <span>New List</span>
    </div>
  );
};

export default AddListTile;
