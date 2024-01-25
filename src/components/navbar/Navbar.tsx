import logo from '../../assets/logo_rounded.png';
import {useLogout} from '../../hooks/auth/useLogout.ts';
import './Navbar.css';

const Navbar = () => {
  const { logout } = useLogout();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo" style={{ height: '50px' }} />
        <span>Flashcard Quiz</span>
      </div>
      <div className="navbar-controls">
        <button className="navbar-button settings">Einstellungen</button>
        <button className="navbar-button logout" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
