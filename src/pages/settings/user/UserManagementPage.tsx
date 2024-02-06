import {SetStateAction, useEffect, useState} from 'react';
import UserTile from '../../../components/tiles/user/UserTile.tsx';
import AddUserTile from '../../../components/tiles/user/AddUserTile.tsx';
import BackButton from '../../../components/buttons/BackButton.tsx';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import StatePopUp from '../../../components/pop-ups/StatePopUp.tsx';
import {createUser, deleteUser} from '../../../services/userService.ts';
import {useUsers} from '../../../hooks/user/useUsers.ts';
import './UserManagementPage.css';
import {useUserContext} from '../../../hooks/context/useUserContext.ts';

const UserManagementPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [isTileFlipped, setIsTileFlipped] = useState(false);
  const {users, fetchUsers} = useUsers();
  const {user} = useUserContext();
  const loggedInUserId = user?.userId;
  const [showSuccessPopupCreate, setShowSuccessPopupCreate] = useState(false);
  const [showSuccessPopupDelete, setShowSuccessPopupDelete] = useState(false);

  const handleFlipTile = () => {
    setIsTileFlipped(!isTileFlipped);
  };

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);
      await fetchUsers();
      setShowSuccessPopupDelete(true);
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  const handleCreateUser = async () => {
    if (isTileFlipped) {
      await createUser(newUsername);
      setShowAddUser(false);
      try {
        await fetchUsers();
        setShowSuccessPopupCreate(true); // Zeige Erfolgspopup
        setNewUsername(''); // Setze den Benutzernamen zurück
      } catch (error) {
        alert('Failed to create user');
      }
    } else {
      handleFlipTile(); // Drehe das Tile um, um das Eingabefeld anzuzeigen
    }
  };

  useEffect(() => {
    if (showSuccessPopupCreate || showSuccessPopupCreate) {
      const timer = setTimeout(() => {
        setShowSuccessPopupCreate(false);
        setShowSuccessPopupDelete(false)
      }, 2000); // Setze Timer auf 2 Sekunden

      return () => clearTimeout(timer); // Bereinige den Timer
    }
  }, [setShowSuccessPopupCreate, setShowSuccessPopupDelete]);

  return (
    <>
      <div className="user-management-header">
        <BackButton/>
        <button className="header-button edit-button" onClick={() => setIsEditMode(!isEditMode)}>
          <FontAwesomeIcon icon={faPencilAlt}/> {isEditMode ? 'Done' : 'Edit'}
        </button>
      </div>
      <div className="user-management-container">
        <h1>Player Management</h1>
        <div className="tiles-container">
          {users?.map((user) => (
            <UserTile key={user.userId} user={user} isEditMode={isEditMode} onDelete={handleDelete} isDeletableUser={user.userId != loggedInUserId}/>
          ))}
          {isEditMode && (
            <AddUserTile
              onAdd={handleCreateUser}
              onCancel={handleFlipTile}
              isFlipped={isTileFlipped}
              onUsernameChange={(e: { target: { value: SetStateAction<string>; }; }) => setNewUsername(e.target.value)}
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
      {showSuccessPopupCreate && (
        <StatePopUp
          message="User successfully created!"
          type="success"
          onClose={() => setShowSuccessPopupCreate(false)}
        />
      )}
      {showSuccessPopupDelete && (
        <StatePopUp
          message="User successfully deleted!"
          type="success"
          onClose={() => setShowSuccessPopupDelete(false)}
        />
      )}
    </>

  );
};

export default UserManagementPage;