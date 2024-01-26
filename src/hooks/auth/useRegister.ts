import { useState } from 'react';
import { createUser } from '../../services/userService.ts';
import { useUserContext } from '../context/useUserContext.ts';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const { setUser, setIsAuthenticated } = useUserContext();
  const navigate = useNavigate();

  const closePopup = () => {
    setShowPopup(false);
    navigate('/');
  };

  const register = async (username: string) => {
    try {
      setLoading(true);
      const newUser = await createUser(username);
      if (newUser) {
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        setShowPopup(true);
        setTimeout(() => {
          closePopup(); // Schließt das Popup
          navigate('/');
        }, 3000); // 3 Sekunden Verzögerung
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, showPopup, closePopup };
};
