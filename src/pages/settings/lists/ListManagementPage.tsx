import BackButton from '../../../components/buttons/BackButton.tsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import './ListManagementPage.css';
import {useLists} from '../../../hooks/lists/useLists.ts';
import ListTile from '../../../components/tiles/list/ListTile.tsx';
import {useDeleteList} from '../../../hooks/lists/useDeleteList.ts';
import {FlashcardList} from '../../../types';
import AddListTile from '../../../components/tiles/list/AddListTile.tsx';
import {createList, deleteList} from '../../../services/listService.ts';
import StatePopUp from '../../../components/pop-ups/StatePopUp.tsx';

const ListManagementPage = () => {

  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessPopupDelete, setShowSuccessPopupDelete] = useState(false);
  const [showSuccessPopupCreate, setShowSuccessPopupCreate] = useState(false);
  const { lists, fetchLists} = useLists();
  const { error} = useDeleteList()
  const [isTileFlipped, setIsTileFlipped] = useState(false);
  const [content, setContent] = useState('');

  const handleFlipTile = () => {
    setIsTileFlipped(!isTileFlipped);
  };

  const handleCreateList = async () => {
    if (isTileFlipped) {
      try {
        await createList(content);
        await fetchLists();
        setShowSuccessPopupCreate(true);
      } catch (error) {
        console.error('Failed to create list:', error);
      }
      setIsTileFlipped(false);
    } else {
      handleFlipTile();
    }
  };

  const handleCancelCreateList = () => {
    setIsTileFlipped(false);
    setContent('');

  };

  const handleListContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleDelete = async (flashcardListId: number) => {
    await deleteList(flashcardListId);
    if (!error) {
      await fetchLists();
      setShowSuccessPopupDelete(true);
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
        <div>
          <h1>List Management</h1>
          {isEditMode && (
            <AddListTile
              isFlipped={isTileFlipped}
              onAdd={handleCreateList}
              onCancel={handleCancelCreateList}
              onContentChange={handleListContentChange}
            />
          )}
          {lists?.map((list: FlashcardList) => (
            <ListTile key={list.flashcardListId} flashcardList={list} isEditMode={isEditMode} onDelete={handleDelete}/>
          ))}
        </div>
      </div>
      {showSuccessPopupDelete && (
        <StatePopUp
          message="List successfully deleted"
          type="success"
          onClose={() => setShowSuccessPopupDelete(false)}
        />
      )}
      {showSuccessPopupCreate && (
        <StatePopUp
          message="List successfully created"
          type="success"
          onClose={() => setShowSuccessPopupCreate(false)}
        />
      )}
    </>
  )
}

export default ListManagementPage;