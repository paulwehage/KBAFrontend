export const getSteps = (duelAction: string) => {
  const baseSteps = ['Choose Action', 'Select Duel'];
  if (duelAction === 'join') {
    return [...baseSteps, 'Join Duel', 'Start Duel'];
  }
  return [...baseSteps, 'Start Duel'];
};