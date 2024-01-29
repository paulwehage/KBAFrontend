import {API_BASE_URL} from '../constants';

export const getAllNotPlayedRounds = async (userID: number, duelID: number) => {
  /**
  const response = await fetch(`${API_BASE_URL}/duel/notPlayedRounds?userId=${userID}&duelId=${duelID}`);

  if (!response.ok) {
    throw new Error('Duels not found');
  }
  return response.json();
    **/
  return [
    {
      "question": "la bicicleta",
      "wrongAnswer1": "das Pferd",
      "wrongAnswer2": "Rad fahren",
      "wrongAnswer3": "das Handz",
      "correctAnswer": "das Fahrrad"
    },
    {
      "question": "la bicicleta",
      "wrongAnswer1": "das Pferd",
      "wrongAnswer2": "Rad fahren",
      "wrongAnswer3": "das Handz",
      "correctAnswer": "das Fahrrad"
    },
    {
      "question": "la bicicleta",
      "wrongAnswer1": "das Pferd",
      "wrongAnswer2": "Rad fahren",
      "wrongAnswer3": "das Handz",
      "correctAnswer": "das Fahrrad"
    },
    {
      "question": "la bicicleta",
      "wrongAnswer1": "das Pferd",
      "wrongAnswer2": "Rad fahren",
      "wrongAnswer3": "das Handz",
      "correctAnswer": "das Fahrrad"
    },
    {
      "question": "la bicicleta",
      "wrongAnswer1": "das Pferd",
      "wrongAnswer2": "Rad fahren",
      "wrongAnswer3": "das Handz",
      "correctAnswer": "das Fahrrad"
    },
    {
      "question": "la bicicleta",
      "wrongAnswer1": "das Pferd",
      "wrongAnswer2": "Rad fahren",
      "wrongAnswer3": "das Handz",
      "correctAnswer": "das Fahrrad"
    }
  ]
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