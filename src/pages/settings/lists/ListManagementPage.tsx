import BackButton from '../../../components/buttons/BackButton.tsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import './ListManagementPage.css';
import {useLists} from '../../../hooks/lists/useLists.ts';
import ListTile from '../../../components/tiles/list/ListTile.tsx';
import {deleteList} from '../../../services/listService.ts';
import {useDeleteList} from '../../../hooks/lists/useDeleteList.ts';
import {FlashcardList} from '../../../types';
import AddListTile from '../../../components/tiles/list/AddListTile.tsx';

const ListManagementPage = () => {

  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Neuer State für das Popup
  const { lists, fetchLists} = useLists();
  const { error} = useDeleteList()

  const handleDelete = async (flashcardListId: number) => {
    await deleteList(flashcardListId);
    if (!error) {
      await fetchLists();
      setShowSuccessPopup(true);
    } else {
      alert('Failed to delete user');
    }
  };
  lists.map((list: FlashcardList) => console.log(list.flashcardListname))


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
        {isEditMode && (<AddListTile/>)}
        {lists?.map((list: FlashcardList) => (
          <ListTile key={list.flashcardListId} flashcardList={list} isEditMode={isEditMode} onDelete={handleDelete}/>
        ))}
      </div>
    </>
  )
}

export default ListManagementPage;