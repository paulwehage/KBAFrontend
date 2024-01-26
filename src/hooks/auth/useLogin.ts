import { useState } from 'react';
import { getUserByUsername } from '../../services/userService.ts';
import { useUserContext } from '../context/useUserContext.ts';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const { setUser, setIsAuthenticated } = useUserContext();
  const navigate = useNavigate();

  const closePopup = () => {
    setShowPopup(false);
    navigate('/'); // Weiterleitung zur Homepage nach Schließen des Popups
  };

  const login = async (username: string) => {
    try {
      setLoading(true);
      const user = await getUserByUsername(username);
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        setShowPopup(true);
        setTimeout(() => {
          closePopup(); // Schließt das Popup
          navigate('/'); // Weiterleitung zur Homepage
        }, 3000); // 3 Sekunden Verzögerung
      } else {
        setShowPopup(true);
      }
    } catch (err) {
      setShowPopup(true);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return { login, showPopup, closePopup, loading, error };
};
