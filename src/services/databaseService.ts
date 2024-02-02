import {API_BASE_URL} from '../constants';

export const clearDatabase = async () => {
  const response = await fetch(`${API_BASE_URL}/database/clear`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error clearing database');
  }
  return response.json();
}