import {API_BASE_URL} from '../constants';

export const getUserByUsername = async (username: string) => {
  const response = await fetch(`${API_BASE_URL}/user/byusername?username=${username}`);

  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
};

export const getUserById = async (userId: number) => {
  const response = await fetch(`${API_BASE_URL}/user/byid?userId=${userId}`);

  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
};

export const getAllUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/user`);

  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}

export const createUser = async (username: string) => {
  const response = await fetch(`${API_BASE_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};

export const deleteUser = async (userId: number) => {
  const response = await fetch(`${API_BASE_URL}/user?userId=${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  console.log(response)
  return response.ok;
};