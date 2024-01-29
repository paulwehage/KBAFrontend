import { useState, useEffect } from 'react';
import './HomePage.css';
import { Stack, Step, StepLabel, Stepper } from '@mui/material';
import { ColorlibConnector } from '../../components/stepper/ColorlibConnector.tsx';
import { ColorlibStepIcon } from '../../components/stepper/ColorlibStepIcon.tsx';
import { getSteps } from '../../utils';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faRightToBracket, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DuelTile from '../../components/tiles/duel/DuelTile.tsx';
import { getDuelsToJoin, getDuelsToStart } from '../../services/duelService.ts';
import { useUserContext } from '../../hooks/context/useUserContext.ts';
import {useLists} from '../../hooks/lists/useLists.ts';

const HomePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [duelAction, setDuelAction] = useState('');
  const [duels, setDuels] = useState([]);
  const { lists } = useLists();
  const [selectedDuelId, setSelectedDuelId] = useState(null);
  const steps = getSteps();
  const { user } = useUserContext();

  useEffect(() => {
    const fetchDuels = async () => {
      if (activeStep === 1) {
        try {
          let duelsData;
          if (duelAction === 'join') {
            duelsData = await getDuelsToJoin(user!.userId);
            console.log("DUELS TO JOIN", duelsData)
          } else if (duelAction === 'start') {
            duelsData = await getDuelsToStart(user!.userId);
            console.log("DUELS TO START", duelsData)

          }
          setDuels(duelsData || []);
        } catch (error) {
          console.error('Error fetching duels:', error);
        }
      }
    };

    fetchDuels();
  }, [activeStep, duelAction, user!.userId]);

  const handleDuelAction = (action: string) => {
    setDuelAction(action);
    handleNext();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const selectDuel = (duelId: number ) => {
    setSelectedDuelId(duelId);
    handleNext();
  };

  const isDuelSelected = (duelId: number) => {
    return selectedDuelId === duelId;
  };

  const getContentForStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="step-content step-content-buttons">
            <button className="join-button" onClick={() => handleDuelAction('join')}>Join Duel <FontAwesomeIcon
              icon={faRightToBracket}/></button>
            <button className="start-button" onClick={() => handleDuelAction('start')}>Start Duel <FontAwesomeIcon
              icon={faPlay}/></button>
          </div>
        );
      case 1:
        return (
          <div className="step-content step-content-duels">
            {duels.length > 0 ? (
              duels.map((duel) => (
                <DuelTile
                  key={duel.duelId}
                  duel={duel}
                  lists={lists}
                  onClick={() => selectDuel(duel.duelId)}
                  isSelected={isDuelSelected(duel.duelId)}
                />
              ))
            ) : (
              <p>No duels available.</p>
            )}
          </div>
        );
      case 2:
        return (
          <div className="step-content step-content-general">
            <p>Are you sure you want to {duelAction === 'join' ? 'join' : 'start'} the duel?</p>
            <button onClick={handleNext}>Yes</button>
          </div>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <div className="home-container">
      <img src={logo} alt="logo" style={{width: '200px'}}/>
      <Stack sx={{width: '100%'}} spacing={4}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector/>}>
        {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon} icon={index + 1}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
        {getContentForStep(activeStep)}
      <div className="step-buttons">
        {activeStep !== 0 && (
          <button className="back-button" onClick={handleBack}><FontAwesomeIcon className="back-button-icon" icon={faArrowLeft}/>Back</button>
        )}
      </div>
    </div>
  );
}

export default HomePage;
