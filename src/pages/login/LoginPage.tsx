// LoginPage.tsx

import React, { useState } from 'react';
import { useLogin } from '../../hooks/auth/useLogin.ts';
import { useRegister } from '../../hooks/auth/useRegister.ts';
import logo from '../../assets/logo.png';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const { login } = useLogin();
  const { register } = useRegister();

  const handleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();
    await login(username);
  };

  const handleRegister = async (event: React.MouseEvent) => {
    event.preventDefault();
    await register(username);
  };

  return (
    <div className="login-container">
      <img src={logo} style={{ width: '200px' }} alt="logo" />
      <h1>Flashcard Quiz</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Benutzername"
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button login">
        Start
      </button>
      <button onClick={handleRegister} className="login-button register">
        Registrieren
      </button>
    </div>
  );
};

export default LoginPage;
