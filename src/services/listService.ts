import {API_BASE_URL} from '../constants';

export const getAllLists = async () => {
  const response = await fetch(`${API_BASE_URL}/vocablist`);

  if (!response.ok) {
    throw new Error('Lists not found');
  }
  return response.json();
}

export const getListById = async (listId: number) => {
  // @TODO: Implement this function
  const response = await fetch(`${API_BASE_URL}/vocablist/byid?listid=${listId}`);

  if (!response.ok) {
    throw new Error('List not found');
  }
  return response.json();
}

export const importList = async (path: string) => {
  // @TODO: Implement this function
  const response = await fetch(`${API_BASE_URL}/vocablist/import`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
    });
    if (!response.ok) {
        throw new Error('Error importing list');
    }
    return response.json();
}

export const deleteList = async (listId: number) => {
  // @TODO: Implement this function
  const response = await fetch(`${API_BASE_URL}/vocablist?listId=${listId}`, {
    method: 'DELETE',
  });

    if (!response.ok) {
        throw new Error('Error deleting list');
    }
    console.log(response)
}