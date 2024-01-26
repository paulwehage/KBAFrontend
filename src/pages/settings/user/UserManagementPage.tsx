import {useUsers} from '../../../hooks/user/useUsers.ts';
import {useEffect, useState} from 'react';
import UserTile from '../../../components/tiles/user/UserTile.tsx';
import AddUserTile from '../../../components/tiles/user/AddUserTile.tsx';
import './UserManagementPage.css';
import BackButton from '../../../components/buttons/BackButton.tsx';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDeleteUser} from '../../../hooks/user/useDeleteUser.ts';
import StatePopUp from '../../../components/pop-ups/StatePopUp.tsx';
import {useCreateUser} from '../../../hooks/user/useCreateUser.ts';

const UserManagementPage = () => {
  const { users, fetchUsers } = useUsers();
  const { deleteUser, error } = useDeleteUser();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Neuer State für das Popup
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [isTileFlipped, setIsTileFlipped] = useState(false);
  const { createUser } = useCreateUser();

  const handleFlipTile = () => {
    setIsTileFlipped(!isTileFlipped);
  };

  const handleDelete = async (userId: number) => {
    await deleteUser(userId);
    if (!error) {
      await fetchUsers(); // Benutzerliste neu laden
      setShowSuccessPopup(true); // Zeige das Popup nach erfolgreichem Löschen
    } else {
      alert('Failed to delete user');
    }
  };

  const handleCreateUser = async () => {
    if (isTileFlipped) {
      await createUser(newUsername);
      setShowAddUser(false);
      if (!error) {
        await fetchUsers(); // Aktualisiere die Benutzerliste
        setShowSuccessPopup(true); // Zeige Erfolgspopup
        setNewUsername(''); // Setze den Benutzernamen zurück
      }
    } else {
      handleFlipTile(); // Drehe das Tile um, um das Eingabefeld anzuzeigen
    }
  };

  useEffect(() => {
    if (error) {
      alert('Failed to delete user');
    }
  }, [error]);

  useEffect(() => {
    if (error) {
      alert('Failed to delete user');
    }
  }, [error]);

  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 2000); // Setze Timer auf 2 Sekunden

      return () => clearTimeout(timer); // Bereinige den Timer
    }
  }, [showSuccessPopup]);

  return (
    <>
      <div className="user-management-header">
        <BackButton/>
        <button className="header-button edit-button" onClick={() => setIsEditMode(!isEditMode)}>
          <FontAwesomeIcon icon={faPencilAlt}/> {isEditMode ? 'Done' : 'Edit'}
        </button>
      </div>
      <div className="user-management-container">
        <h1>User Management</h1>
        <div className="tiles-container">
          {users?.map((user) => (
            <UserTile key={user.userId} user={user} isEditMode={isEditMode} onDelete={handleDelete}/>
          ))}
          {isEditMode && (
            <AddUserTile
              onAdd={handleCreateUser}
              onCancel={handleFlipTile}
              isFlipped={isTileFlipped}
              onUsernameChange={(e) => setNewUsername(e.target.value)}
            />)}
        </div>
      </div>
      {showAddUser && (
        <div className="add-user-modal">
          <input
            type="text"
            placeholder="Enter username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button onClick={handleCreateUser}>Add User</button>
          <button onClick={() => setShowAddUser(false)}>Cancel</button>
        </div>
      )}
      {showSuccessPopup && (
        <StatePopUp
          message="User successfully deleted"
          type="success"
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </>

  );
};

export default UserManagementPage;