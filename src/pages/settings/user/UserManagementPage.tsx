import {useUsers} from '../../../hooks/user/useUsers.ts';
import {useEffect, useState} from 'react';
import UserTile from '../../../components/tiles/UserTile.tsx';
import AddUserTile from '../../../components/tiles/AddUserTile.tsx';
import './UserManagementPage.css';
import BackButton from '../../../components/buttons/BackButton.tsx';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDeleteUser} from '../../../hooks/user/useDeleteUser.ts';

const UserManagementPage = () => {
  const { users, fetchUsers } = useUsers(); // Einmaliger Aufruf der Hook
  const { deleteUser, error } = useDeleteUser();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (error) {
      alert('Failed to delete user');
    }
  }, [error]);

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    if (!error) {
      await fetchUsers(); // Benutzerliste neu laden
      alert('User deleted successfully');
    } else {
      alert('Failed to delete user');
    }
  };

  return (
    <>
      <div className="user-management-header">
        <BackButton/>
        <button className="header-button edit-button" onClick={() => setIsEditMode(!isEditMode)}>
          <FontAwesomeIcon icon={faPencilAlt}/> {isEditMode ? 'Done' : 'Edit'}
        </button>
      </div>
      <div className="user-management-container">
        <div className="tiles-container">
          {users?.map((user) => (
            <UserTile key={user.userId} user={user} isEditMode={isEditMode} onDelete={handleDelete}/>
          ))}
          <AddUserTile/>
        </div>
      </div>
    </>

  );
};

export default UserManagementPage;