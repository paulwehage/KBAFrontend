import {API_BASE_URL} from '../constants';

export const getAllDuels = async () => {
  const response = await fetch(`${API_BASE_URL}/duel`);

  if (!response.ok) {
    throw new Error('Duels not found');
  }
  return response.json();
}

export const createDuel = async (userID: number | undefined, flashcardListID: string) => {
   const response = await fetch(`${API_BASE_URL}/duel`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, flashcardListID })
    });
    if (!response.ok) {
        throw new Error('Error creating duel');
    }
    return response.json();
}

export const deleteDuel = async (id: string) => {
  //@TODO: Implement this function
}