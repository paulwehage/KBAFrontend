import { useState } from 'react';
import {createUser as createUserService} from '../../services/userService.ts';

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (userName: string) => {
    console.log(userName)
    try {
      setLoading(true);
      await createUserService(userName);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};
