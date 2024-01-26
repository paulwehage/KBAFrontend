import { useState } from 'react';
import DuelTile from '../../../components/tiles/duel/DuelTile.tsx';
import AddDuelTile from '../../../components/tiles/duel/AddDuelTile.tsx';
import './DuelManagementPage.css';
import BackButton from '../../../components/buttons/BackButton.tsx';
import {useDuels} from '../../../hooks/duels/useDuels.ts';
import {useLists} from '../../../hooks/lists/useLists.ts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';

const DuelManagementPage = () => {
  const { duels, fetchDuels } = useDuels();
  const { lists } = useLists();
  const [isTileFlipped, setIsTileFlipped] = useState(false);
  const [selectedListId, setSelectedListId] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);


  const handleFlipTile = () => {
    setIsTileFlipped(!isTileFlipped);
  };

  const handleAddDuel = async () => {
    if (isTileFlipped) {
      // Logik, um ein neues Duell zu starten
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
            <DuelTile key={duel.duelId} duel={duel} isEditMode={isEditMode} />
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
    </>
  );
};

export default DuelManagementPage;
