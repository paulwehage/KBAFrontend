import { useState } from 'react';
import { getUserByUsername } from '../../services/userService.ts';
import { useUserContext } from '../context/useUserContext.ts';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setIsAuthenticated } = useUserContext();
  const navigate = useNavigate();

  const login = async (username: string) => {
    try {
      setLoading(true);
      const user = await getUserByUsername(username);
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/');
      } else {
        alert("Benutzer nicht gefunden. Bitte registriere dich.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      alert("Fehler beim Login: " + err);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
