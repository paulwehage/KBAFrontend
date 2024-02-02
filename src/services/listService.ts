import {API_BASE_URL} from '../constants';

export const getAllLists = async () => {
  const response = await fetch(`${API_BASE_URL}/vocablist`);

  if (!response.ok) {
    throw new Error('Lists not found');
  }
  return response.json();
}

export const createList = async (content: string) => {
  const response = await fetch(`${API_BASE_URL}/vocablist`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });
    if (!response.ok) {
        throw new Error('Error importing list');
    }
    return response;
}

export const deleteList = async (listId: number) => {
  const response = await fetch(`${API_BASE_URL}/vocablist?flashcardListId=${listId}`, {
    method: 'DELETE',
  });

    if (!response.ok) {
        throw new Error('Error deleting list');
    }
    console.log(response)
}

export const loadInitialListData = async () => {
  const response = await fetch(`${API_BASE_URL}/vocablist/createinitial`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error('Error importing list');
  }
  return response.json();

}