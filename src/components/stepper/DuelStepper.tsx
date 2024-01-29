import {useState, useEffect} from 'react';
import {Stack, Step, StepLabel, Stepper} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight, faPlay, faRightToBracket, faGamepad} from '@fortawesome/free-solid-svg-icons';
import {getSteps} from '../../utils';
import {getDuelsToJoin, getDuelsToPlay, getDuelsToStart} from '../../services/duelService.ts';
import DuelTile from '../tiles/duel/DuelTile.tsx';
import {ColorlibConnector} from './ColorlibConnector.tsx';
import {ColorlibStepIcon} from './ColorlibStepIcon.tsx';
import './DuelStepper.css';
import {useJoinDuel} from '../../hooks/duels/useJoinDuel.ts';
import {useStartDuel} from '../../hooks/duels/useStartDuel.ts';
import StatePopUp from '../pop-ups/StatePopUp.tsx';

export const DuelStepper = ({user, lists, onDuelSelected, onStepperFinished}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [duelAction, setDuelAction] = useState('');
  const [duels, setDuels] = useState([]);
  const [selectedDuelId, setSelectedDuelId] = useState(null);
  const steps = getSteps();
  const {joinDuel, showPopup: showPopUpJoin, closePopup: closePopUpJoin, error: errorJoin} = useJoinDuel();
  const {startDuel, showPopup: showPopUpStart, closePopup: closePopUpStart, error: errorStart} = useStartDuel();

  useEffect(() => {
    const fetchDuels = async () => {
      if (activeStep === 1) {
        try {
          let duelsData;
          if (duelAction === 'join') {
            duelsData = await getDuelsToJoin(user!.userId)
          }
          if (duelAction === 'start') {
            duelsData = await getDuelsToStart(user!.userId);
          } else {
            console.log("Es wurde play gedrückt.")
            //duelsData = await getDuelsToPlay(user!.userId)
          }
          setDuels(duelsData || []);
        } catch (error) {
          console.error('Error fetching duels:', error);
        }
      }
    };

    fetchDuels();
  }, [activeStep, duelAction, user]);

  const handleNext = async () => {
    try {
      if (activeStep === 2) {
        if (duelAction === 'join') {
          await joinDuel(selectedDuelId, user.userId);
          setActiveStep(0);
          setDuelAction('');
          setSelectedDuelId(null);
        } else if (duelAction === 'start') {
          await startDuel(selectedDuelId, user.userId);
          //@TODO: Implement logic for starting the quiz and for redirection
        } else if (duelAction == 'play') {
          // @TODO: Wait for implementation -> redirection to quiz component
          // get all not played rounds --> Context maybe
          // with this date building the quiz component
          // play Round with round id from first step (Quiz component)
        }
      } else {
        setActiveStep(prev => prev + 1); // Gehe zum nächsten Schritt
      }
    } catch (error) {
      console.error('Error in duel process:', error);
      // Fehlerbehandlung, z. B. Anzeigen einer Fehlermeldung
    }
  };

  const handleBack = () => {
    if (activeStep === 1) {
      // Schritt "Join Duel" entfernen, wenn er existiert
      setDuelAction('');
      setSelectedDuelId(null); // Deselektiert das ausgewählte Duel
    }
    setActiveStep(prev => prev - 1);
  };

  const handleDuelSelection = (duelId: number) => {
    setSelectedDuelId(duelId);
  };

  const handleDuelAction = (action) => {
    setDuelAction(action);
    handleNext();
  };

  const getContentForStep = (step: number) => {
    const selectedDuel = duels.find(duel => duel.duelId === selectedDuelId);

    switch (step) {
      case 0:
        return (
          <div className="step-content step-content-buttons">
            <button className="join-button" onClick={() => handleDuelAction('join')}>Join Duel <FontAwesomeIcon
              icon={faRightToBracket} className="button-icon"/></button>
            <button className="start-button" onClick={() => handleDuelAction('start')}>Start Duel <FontAwesomeIcon
              icon={faPlay} className="button-icon"/></button>
            <button className="play-button" onClick={() => handleDuelAction('play')}>Play Duel <FontAwesomeIcon
              icon={faGamepad} className="button-icon"/></button>
          </div>
        );
      case 1:
        return (
          <>
            <div className="step-content">
              {duels.length > 0 ? (
                duels.map((duel) => (
                  <DuelTile
                    key={duel.duelId}
                    duel={duel}
                    lists={lists}
                    isSelected={duel.duelId === selectedDuelId}
                    onClick={() => handleDuelSelection(duel.duelId)}
                  />
                ))
              ) : (
                <p>No duels available.</p>
              )}
            </div>
          </>
        );
      case 2:
        return (
          <div className="step-content step-content-general">
            <p className="paragraph">Are you sure you want to {duelAction} the duel?</p>
            {selectedDuel && (
              <DuelTile
                key={selectedDuel.duelId}
                duel={selectedDuel}
                lists={lists}
                isSelected={true}
              />
            )}
            <button onClick={handleNext} className="confirm-start-button">Yes</button>
          </div>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <>
      <Stack sx={{width: '100%'}} spacing={3}>
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
          <button className="back-button" onClick={handleBack}><FontAwesomeIcon className="back-button-icon"
                                                                                icon={faArrowLeft}/>Back</button>
        )}
        {activeStep === 1 && selectedDuelId && (
          <button className="next-button" onClick={handleNext}>Next<FontAwesomeIcon className="next-button-icon"
                                                                                    icon={faArrowRight}/></button>
        )}
        {showPopUpJoin && (
          <StatePopUp
            message={errorJoin ? "Joining duel failed. Please try again!" : "Joined Duel. Go start it or wait for your friends to do it!"}
            type={errorJoin ? "error" : "success"} onClose={closePopUpJoin}/>
        )}
        {showPopUpStart && (
          <StatePopUp
            message={errorStart ? "Starting duel failed. Please try again!" : "Started Duel. Have fun playing!"}
            type={errorStart ? "error" : "success"} onClose={closePopUpStart}/>
        )}
      </div>
    </>
  );
}