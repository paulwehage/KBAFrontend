import StepConnector from '@mui/material/StepConnector';

export const ColorlibConnector = () => {
  return (
    <StepConnector
      sx={{
        '& .MuiStepConnector-line': {
          borderColor: '#6797e8',
          borderTopWidth: 3, // Macht die Linie dicker
          top: '20%', // Zentriert die Linie vertikal
          transform: 'translateY(1300%)', // Korrektur für die vertikale Zentrierung
        },
      }}
    />
  );
};