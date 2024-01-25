import { useState } from 'react';
import { createUser } from '../../services/userService.ts';
import { useUserContext } from '../context/useUserContext.ts';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const register = async (username: string) => {
    try {
      setLoading(true);
      const newUser = await createUser(username);
      if (newUser) {
        setUser(newUser);
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      alert("Fehler bei der Registrierung: " + err);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
