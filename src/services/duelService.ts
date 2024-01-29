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

export const deleteDuel = async (id: number) => {
  //@TODO: Implement this function
}
//@TODO: This is just a workaround, reimplement this, when endpoint is fixed
export const getDuelsToStart = async (userID: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/duel/tostart?userid=${userID}`);
    if (!response.ok) {
      if (response.status === 404) {
        // Keine Duels gefunden, gebe einen leeren Array zurück
        return [];
      }
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching duels to start:', error);
    return []; // Gebe einen leeren Array zurück, falls ein Fehler auftritt
  }
}

//@TODO: This is just a workaround, reimplement this, when endpoint is fixed
export const getDuelsToJoin = async (userID: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/duel/tojoin?userid=${userID}`);
    if (!response.ok) {
      if (response.status === 404) {
        // Keine Duels gefunden, gebe einen leeren Array zurück
        return [];
      }
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching duels to join:', error);
    return []; // Gebe einen leeren Array zurück, falls ein Fehler auftritt
  }
}
//@TODO: Not yet implemented, waiting for endpoint
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
    const response = await fetch(`${API_BASE_URL}/duel/join?duelid=${duelID}&userid=${userID}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Error joining duel');
    }
    console.log(response)
    return response.json();
  } catch (error) {
    console.error('Error joining duel:', error);
  }
}

export const startDuel = async (duelID: number | null, userID: number)=> {
  try {
    const response = await fetch(`${API_BASE_URL}/duel/start?duelid=${duelID}&userid=${userID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    if (!response.ok) {
      throw new Error('Error joining duel');
    }
    return response.json();
  } catch (error) {
    console.error('Error joining duel:', error);
  }
}


