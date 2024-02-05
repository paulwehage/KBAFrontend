import {API_BASE_URL} from '../constants';
import {Round} from '../types';

export const getAllNotPlayedRounds = async (userID: number, duelID: number): Promise<Round[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/duel/notPlayedRounds?userId=${userID}&duelId=${duelID}`);
    if (!response.ok) {
      throw new Error('Duels not found');
    }
    const data = await response.json(); // Hier wird die Antwort in JSON umgewandelt
    console.log("GETALLNOTPLAYEDROUNDS DATA", data); // Logge die Daten, nicht den Stream
    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Fragen:', error);
    throw error; // Weiterwerfen des Fehlers, falls nötig
  }
};

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