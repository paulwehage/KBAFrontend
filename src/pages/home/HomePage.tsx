import './HomePage.css';
import logo from '../../assets/logo.png';
import { useUserContext } from '../../hooks/context/useUserContext.ts';
import {useLists} from '../../hooks/lists/useLists.ts';
import {DuelStepper} from '../../components/stepper/DuelStepper.tsx';
import {useState} from 'react';
import Quiz from '../../components/quiz/Quiz.tsx';

const HomePage = () => {
  const { user } = useUserContext();
  const { lists } = useLists();
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedDuelId, setSelectedDuelId] = useState(null);

  const handleStartQuiz = (duelId) => {
    setSelectedDuelId(duelId);
    setShowQuiz(true);
  };


  const handleBackToStepper = () => {
    setShowQuiz(false);
  };


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
      <img src={logo} alt="logo" style={{ width: '200px' }} />
      {!showQuiz ? (
        <DuelStepper
          user={user}
          lists={lists}
          onDuelSelected={handleDuelSelected}
          onStepperFinished={handleStepperFinished}
          onStartQuiz={handleStartQuiz}
        />
      ) : (
        <Quiz userId={user!.userId} duelId={selectedDuelId} onBackToStepper={handleBackToStepper}/>
      )}
    </div>
  );
}

export default HomePage;
