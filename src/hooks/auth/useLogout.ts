import { useNavigate } from 'react-router-dom';
import {useUserContext} from '../context/useUserContext.ts';

export const useLogout = () => {
  const { setIsAuthenticated, setUser } = useUserContext();
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return { logout };
};
