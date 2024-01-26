import BackButton from '../../../components/buttons/BackButton.tsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import './ListManagementPage.css';
import {useUsers} from '../../../hooks/user/useUsers.ts';

const ListManagementPage = () => {

  const [isEditMode, setIsEditMode] = useState(false);
  const { users, fetchUsers } = useUsers();

  return (
    <>
      <div className="list-management-header">
        <BackButton/>
        <button className="header-button edit-button" onClick={() => setIsEditMode(!isEditMode)}>
          <FontAwesomeIcon icon={faPencilAlt}/> {isEditMode ? 'Done' : 'Edit'}
        </button>
      </div>
      <div className="list-management-container">
        <h1>List Management</h1>
        {/* Hier kommen die Listen hin */}
      </div>
    </>
  )
}

export default ListManagementPage;