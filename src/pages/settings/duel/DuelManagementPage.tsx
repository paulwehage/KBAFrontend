import { useState } from 'react';
import DuelTile from '../../../components/tiles/duel/DuelTile.tsx';
import AddDuelTile from '../../../components/tiles/duel/AddDuelTile.tsx';
import './DuelManagementPage.css';
import BackButton from '../../../components/buttons/BackButton.tsx';
import {useDuels} from '../../../hooks/duels/useDuels.ts';
import {useLists} from '../../../hooks/lists/useLists.ts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {createDuel} from '../../../services/duelService.ts';
import {useUserContext} from '../../../hooks/context/useUserContext.ts';
import StatePopUp from '../../../components/pop-ups/StatePopUp.tsx';

const DuelManagementPage = () => {
  const { duels, fetchDuels } = useDuels();
  const { lists } = useLists();
  const { user } = useUserContext();
  const [isTileFlipped, setIsTileFlipped] = useState(false);
  const [selectedListId, setSelectedListId] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleFlipTile = () => {
    setIsTileFlipped(!isTileFlipped);
  };

  const handleAddDuel = async () => {
    if (isTileFlipped) {
      try {
        await createDuel(user?.userId, selectedListId);
        await fetchDuels();
        setShowSuccessPopup(true);
      } catch (error) {
        console.error('Failed to create duel:', error);
      }
      setIsTileFlipped(false);
    } else {
      handleFlipTile();
    }
  };

  const handleCancel = () => {
    setIsTileFlipped(false);
  };

  const handleListChange = (e) => {
    setSelectedListId(e.target.value);
  };

  return (
    <>
      <div className="duel-management-header">
        <BackButton/>
        <button className="header-button edit-button" onClick={() => setIsEditMode(!isEditMode)}>
          <FontAwesomeIcon icon={faPencilAlt}/> {isEditMode ? 'Done' : 'Edit'}
        </button>
      </div>
      <div className="duel-management-container">
        <div className="tiles-container">
          {duels?.map((duel) => (
            <DuelTile key={duel.duelId} duel={duel} isEditMode={isEditMode} lists={lists} />
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
      {showSuccessPopup && (
        <StatePopUp
          message="Duel successfully added"
          type="success"
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </>
  );
};

export default DuelManagementPage;
