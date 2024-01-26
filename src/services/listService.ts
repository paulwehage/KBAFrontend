import {API_BASE_URL} from '../constants';

export const getAllLists = async () => {
  const response = await fetch(`${API_BASE_URL}/vocablist`);

  if (!response.ok) {
    throw new Error('Lists not found');
  }
  return response.json();
}