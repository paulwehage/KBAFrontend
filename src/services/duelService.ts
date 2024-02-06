import {API_BASE_URL} from '../constants';

export const getAllDuels = async () => {
  const response = await fetch(`${API_BASE_URL}/duel`);

  if (!response.ok) {
    throw new Error('Duels not found');
  }
  return response.json();
}

export const createDuel = async (userId: number | undefined, flashcardListId: string) => {
   const response = await fetch(`${API_BASE_URL}/duel`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, flashcardListId })
    });
    if (!response.ok) {
        throw new Error('Error creating duel');
    }
    return response.json();
}

export const deleteDuel = async (duelId: number) => {
    const response = await fetch(`${API_BASE_URL}/duel?duelId=${duelId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error deleting duel');
    }
    return response.ok;
}
export const getDuelsToStart = async (userID: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/duel/tostart?userId=${userID}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching duels to start:', error);
    return []; // Gebe einen leeren Array zurück, falls ein Fehler auftritt
  }
}

export const getDuelsToJoin = async (userID: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/duel/tojoin?userId=${userID}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching duels to join:', error);
    return []; // Gebe einen leeren Array zurück, falls ein Fehler auftritt
  }
}
export const getDuelsToPlay = async (userID: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/duel/toplay?userId=${userID}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching duels to join:', error);
  }
}

export const joinDuel = async (duelID: number, userID: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/duel/join?duelId=${duelID}&userId=${userID}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Error joining duel');
    }
    return response.json();
  } catch (error) {
    console.error('Error joining duel:', error);
  }
}

export const startDuel = async (duelID: number | null, userID: number)=> {
  try {
    const response = await fetch(`${API_BASE_URL}/duel/start?duelId=${duelID}&userId=${userID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error joining duel');
    }
    return response.json();
  } catch (error) {
    console.error('Error joining duel:', error);
  }
}

export const getWinners = async (duelID: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/duel/winners?duelId=${duelID}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching winners:', error);
  }
}


