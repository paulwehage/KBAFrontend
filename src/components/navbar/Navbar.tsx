import logo from '../../assets/logo_rounded.png';
import {useLogout} from '../../hooks/auth/useLogout.ts';
import './Navbar.css';
import {useUserContext} from '../../hooks/context/useUserContext.ts';
import {Link, useNavigate} from 'react-router-dom';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Logo" style={{height: '50px'}}/>
        <span>Flashcard Quiz</span>
      </Link>
      <div className="navbar-info">
        {user && <span className="navbar-username"> Hello {user.username}!</span>}
      </div>
      <div className="navbar-controls">
        <button className="navbar-button settings" onClick={() => navigate('/settings')}>Settings</button>
        <button className="navbar-button logout" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
