import { useState, useEffect } from 'react';
import { Stack, Step, StepLabel, Stepper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight, faPlay, faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import {getSteps} from '../../utils';
import {getDuelsToJoin, getDuelsToStart} from '../../services/duelService.ts';
import DuelTile from '../tiles/duel/DuelTile.tsx';
import {ColorlibConnector} from './ColorlibConnector.tsx';
import {ColorlibStepIcon} from './ColorlibStepIcon.tsx';
import './DuelStepper.css';
import logo from '../../assets/logo.png';
import {useJoinDuel} from '../../hooks/duels/useJoinDuel.ts';

export const DuelStepper = ({ user, lists, onDuelSelected, onStepperFinished }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [duelAction, setDuelAction] = useState('');
  const [duels, setDuels] = useState([]);
  const [selectedDuelId, setSelectedDuelId] = useState(null);
  const steps = getSteps(duelAction);
  const {joinDuel} = useJoinDuel();

  useEffect(() => {
    const fetchDuels = async () => {
      if (activeStep === 1) {
        try {
          let duelsData = duelAction === 'join' ? await getDuelsToJoin(user!.userId) : await getDuelsToStart(user!.userId);
          setDuels(duelsData || []);
        } catch (error) {
          console.error('Error fetching duels:', error);
        }
      }
    };

    fetchDuels();
  }, [activeStep, duelAction, user]);

  const handleNext = () => {
    if (activeStep === 2) {
      onDuelSelected(selectedDuelId);
      onStepperFinished();
    } else {
      setActiveStep(prev => prev + 1);
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

  const handleJoinDuel = async () => {
    try {
      await joinDuel(selectedDuelId, user.userId);
    } catch (error) {
      console.error('Error joining duel:', error);
    }
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
        );
      case 2:
        const selectedDuel = duels.find(duel => duel.duelId === selectedDuelId);
        return (
          <div className="step-content step-content-general">
            <p className="paragraph">Are you sure you want to {duelAction === 'join' ? 'join' : 'start'} the duel?</p>
            {selectedDuel && (
              <DuelTile
                key={selectedDuel.duelId}
                duel={selectedDuel}
                lists={lists}
                isSelected={true} // Markieren Sie das ausgewählte Duell
                isEditMode={undefined} onDelete={undefined} onClick={undefined} />
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
          <button className="back-button" onClick={handleBack}><FontAwesomeIcon className="back-button-icon"
                                                                                icon={faArrowLeft}/>Back</button>
        )}
        {activeStep === 1 && selectedDuelId && (
          <button className="next-button" onClick={handleNext}>Next<FontAwesomeIcon className="next-button-icon"
                                                                                    icon={faArrowRight}/></button>
        )}
      </div>
    </>
  );
}