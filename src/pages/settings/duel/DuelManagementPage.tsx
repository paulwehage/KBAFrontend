import {useEffect, useState} from 'react';
import DuelTile from '../../../components/tiles/duel/DuelTile.tsx';
import AddDuelTile from '../../../components/tiles/duel/AddDuelTile.tsx';
import './DuelManagementPage.css';
import BackButton from '../../../components/buttons/BackButton.tsx';
import {useDuels} from '../../../hooks/duels/useDuels.ts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {createDuel, deleteDuel} from '../../../services/duelService.ts';
import {useUserContext} from '../../../hooks/context/useUserContext.ts';
import StatePopUp from '../../../components/pop-ups/StatePopUp.tsx';
import {getAllLists} from '../../../services/listService.ts';

const DuelManagementPage = () => {
  const { duels, fetchDuels } = useDuels();
  const { user } = useUserContext();
  const [isTileFlipped, setIsTileFlipped] = useState(false);
  const [selectedListId, setSelectedListId] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessPopupDelete, setShowSuccessPopupDelete] = useState(false);
  const [showSuccessPopupCreate, setShowSuccessPopupCreate] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
      const fetchLists = async () => {
      try {
          const fetchedLists = await getAllLists();
          setLists(fetchedLists);
      } catch (error) {
          console.error('Failed to fetch users:', error);
      }
      };
      fetchLists();
  }, [lists]);

  const handleFlipTile = () => {
    setIsTileFlipped(!isTileFlipped);
  };

  const handleAddDuel = async () => {
    if (isTileFlipped) {
      try {
        await createDuel(user?.userId, selectedListId);
        await fetchDuels();
        setShowSuccessPopupCreate(true);
      } catch (error) {
        console.error('Failed to create duel:', error);
      }
      setIsTileFlipped(false);
    } else {
      handleFlipTile();
    }
  };

  const handleDeleteDuel = async (duelId: number) => {
    try {
      await deleteDuel(duelId);
      await fetchDuels();
      setShowSuccessPopupDelete(true);
    } catch (error) {
      console.error('Failed to delete duel:', error);
    }
  }

  const handleCancel = () => {
    setIsTileFlipped(false);
  };

  const handleListChange = (e) => {
    setSelectedListId(e.target.value);
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
      <div className="duel-management-header">
        <BackButton/>
        <button className="header-button edit-button" onClick={() => setIsEditMode(!isEditMode)}>
          <FontAwesomeIcon icon={faPencilAlt}/> {isEditMode ? 'Done' : 'Edit'}
        </button>
      </div>
      <div className="duel-management-container">
        <h1>Duel Management</h1>
        <div className="tiles-container">
          {duels?.map((duel) => (
            <DuelTile key={duel.duelId} duel={duel} isEditMode={isEditMode} lists={lists} onDelete={handleDeleteDuel}/>
          ))}
          {isEditMode && (
            <AddDuelTile
              onAdd={handleAddDuel}
              onCancel={handleCancel}
              isFlipped={isTileFlipped}
              lists={lists}
              onListChange={handleListChange}
            />
          )}
        </div>
      </div>
      {showSuccessPopupDelete && (
        <StatePopUp
          message="Duel successfully deleted!"
          type="success"
          onClose={() => setShowSuccessPopupDelete(false)}
        />
      )}
      {showSuccessPopupCreate && (
        <StatePopUp
          message="Duel successfully added!"
          type="success"
          onClose={() => setShowSuccessPopupCreate(false)}
        />
      )}
    </>
  );
};

export default DuelManagementPage;
