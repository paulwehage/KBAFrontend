import {API_BASE_URL} from '../constants';
import {Round} from '../types';

export const getAllNotPlayedRounds = async (userID: number, duelID: number): Promise<Round[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/duel/notPlayedRounds?userId=${userID}&duelId=${duelID}`);
    if (!response.ok) {
      throw new Error('Duels not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Fehler beim Abrufen der Fragen:', error);
    throw error; // Weiterwerfen des Fehlers, falls nötig
  }
};

export const createAnswer = async (answer: string, roundId: number, playerId: number) => {

  const response = await fetch(`${API_BASE_URL}/duel/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answer, roundId, playerId }),
  });

  if (!response.ok) {
    throw new Error('Error creating answer');
  }
  return response;
}