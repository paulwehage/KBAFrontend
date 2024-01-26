import {useEffect, useState} from 'react';
import { useLogin } from '../../hooks/auth/useLogin.ts';
import { useRegister } from '../../hooks/auth/useRegister.ts';
import logo from '../../assets/logo.png';
import './LoginPage.css';
import StatePopUp from '../../components/pop-ups/StatePopUp.tsx';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [isEmpty, setIsEmpty] = useState(false); // Zustand für leere Eingabe hinzufügen
  const { login, showPopup: showLoginPopup, closePopup, error } = useLogin();
  const { register, showPopup: showRegisterPopup, closePopup: closeRegisterPopup } = useRegister();


  const handleLogin = async (event) => {
    event.preventDefault();
    await login(username);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    await register(username);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (username.trim() === '') {
        setIsEmpty(true); // Eingabe ist leer
      } else {
        setIsEmpty(false); // Eingabe ist nicht leer
      }
    }, 500); // 500 Millisekunden Debounce-Zeit

    return () => clearTimeout(timer);
  }, [username]);

  return (
    <div className="login-container">
      <img src={logo} style={{width: '200px'}} alt="logo"/>
      <h1>Flashcard Quiz</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Benutzername"
        className={`login-input ${isEmpty ? 'empty-input' : ''}`}
      />
      <button onClick={handleLogin} className="login-button login" disabled={isEmpty}>
        Start
      </button>
      <button onClick={handleRegister} className="login-button register" disabled={isEmpty}>
        Register
      </button>
      {showLoginPopup && (
        <StatePopUp
          message={error ? "User not found. Please register." : `Welcome back ${username}! Have fun playing our Flashcard Quiz!`}
          type={error ? "error" : "success"} onClose={closePopup}/>
      )}
      {showRegisterPopup && (
        <StatePopUp
          message={error ? "Registration failed. Please try again!" : `Welcome ${username}! Have fun playing our Flashcard Quiz!`}
          type={error ? "error" : "success"} onClose={closeRegisterPopup}/>
      )}
    </div>
  );
};

export default LoginPage;
