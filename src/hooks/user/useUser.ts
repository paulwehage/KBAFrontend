// hooks/useUser.ts

import { useState, useEffect } from 'react';
import {getUserById, getUserByUsername} from '../../services/userService.ts';

export const useUser = (userId?: number, userName?: string) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (userId) {
    useEffect(() => {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const data = await getUserById(userId);
          setUser(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : String(err));
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }, [userId]);
  }

  if (userName) {
    useEffect(() => {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const data = await getUserByUsername(userName);
          setUser(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : String(err));
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }, [userId]);
  }

  if (userId && userName) {
    console.error("Entweder ID oder Name angeben!")
  }


  return { user, loading, error };
};
