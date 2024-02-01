import {API_BASE_URL} from '../constants';
import {Round} from '../types';

export const getAllNotPlayedRounds = async (userID: number, duelID: number) : Promise<Round[]> => {

  const response = await fetch(`${API_BASE_URL}/duel/notPlayedRounds?userId=${userID}&duelId=${duelID}`);
  console.log("GETALLNOTPLAYEDROUNDS",response)

  if (!response.ok) {
    throw new Error('Duels not found');
  }
  return response.json();

}

export const createAnswer = async (answer: string, roundId: number, playerId: number) => {

  console.log("CREATEANSWER",answer, roundId, playerId)

  const response = await fetch(`${API_BASE_URL}/duel/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answer, roundId, playerId }),
  });

  console.log("CREATEANSWERRESPONSE",response)

  if (!response.ok) {
    throw new Error('Error creating answer');
  }
  return response;
}