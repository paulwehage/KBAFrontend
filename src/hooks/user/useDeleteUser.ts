import { useState } from 'react';
import {deleteUser as deleteUserService} from '../../services/userService.ts';

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (userId: number) => {
    try {
      setLoading(true);
      await deleteUserService(userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
};
