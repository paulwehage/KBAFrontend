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

  return (
    <div className="home-container">
      <img src={logo} alt="logo" style={{ width: '200px' }} />
      {!showQuiz ? (
        <DuelStepper
          user={user}
          lists={lists}
          onStartQuiz={handleStartQuiz}
          onJoinSuccess={handleBackToStepper}
        />
      ) : (
        <Quiz userId={user!.userId} duelId={selectedDuelId} onBackToStepper={handleBackToStepper}/>
      )}
    </div>
  );
}

export default HomePage;
