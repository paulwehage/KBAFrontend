import  { StepIconProps } from '@mui/material/StepIcon';
import {faPlay, faCheckCircle, faList, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ReactElement} from 'react';
import { styled } from '@mui/material/styles';


export const ColorlibStepIcon = (props: StepIconProps) => {
  const { active, completed } = props;

  const ColorlibStepIconRoot = styled('div')<{}>(() => ({
    backgroundColor: '#e0e0e0',
    zIndex: 1,
    color: 'rgba(19,18,18,0.87)',
    fontSize: '1.5rem',
    width: 70,
    height: 70,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    marginTop: '1rem',
    alignItems: 'center',
    ...(active && {
      backgroundColor: '#2C75F2',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(completed && {
      backgroundColor: '#2CF2AF',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
  }));

  const icons: { [index: string]: ReactElement } = {
    1: <FontAwesomeIcon icon={faPlay} />,
    2: <FontAwesomeIcon icon={faList} />,
    3: <FontAwesomeIcon icon={faQuestionCircle} />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }}>
      {completed ? <FontAwesomeIcon icon={faCheckCircle} /> : icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};
