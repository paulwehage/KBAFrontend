import {API_BASE_URL} from '../constants';
import {Round} from '../types';

export const getAllNotPlayedRounds = async (userID: number, duelID: number) : Promise<Round[]> => {

  const response = await fetch(`${API_BASE_URL}/duel/notPlayedRounds?userId=${userID}&duelId=${duelID}`);

  if (!response.ok) {
    throw new Error('Duels not found');
  }
  return response.json();

}

export const createAnswer = async (answer: string, duelID: number, userID: number) => {

  const response = await fetch(`${API_BASE_URL}/duel/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answer, duelID, userID }),
  });

  if (!response.ok) {
    throw new Error('Error creating user');
  }
  return response.json();

}