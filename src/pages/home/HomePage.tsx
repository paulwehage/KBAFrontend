import './HomePage.css';
import logo from '../../assets/logo.png';
import { useUserContext } from '../../hooks/context/useUserContext.ts';
import {useLists} from '../../hooks/lists/useLists.ts';
import {DuelStepper} from '../../components/stepper/DuelStepper.tsx';
import {useState} from 'react';

const HomePage = () => {
  const { user } = useUserContext();
  const { lists } = useLists();
  const [duelStarted, setDuelStarted] = useState(false);

  const handleDuelSelected = (duelId: number) => {
    console.log("Selected Duel ID:", duelId);
    // Behandeln Sie die Auswahl eines Duells
  };

  const handleStepperFinished = () => {
    console.log("Stepper finished");
    // Behandeln Sie das Ende des Steppers
  };

  return (
    <div className="home-container">
      <img src={logo} alt="logo" style={{width: '200px'}}/>
      <DuelStepper
        user={user}
        lists={lists}
        onDuelSelected={handleDuelSelected}
        onStepperFinished={handleStepperFinished}
      />
      {duelStarted && <p>Duel has been started!</p>} {/* Zeigt eine Nachricht an, wenn das Duell gestartet wurde */}
    </div>
  );
}

export default HomePage;
