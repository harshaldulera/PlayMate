import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import logo from '../assets/logo.png';
import background from '../../public/background.jpg';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    if (username === 'admin' && password === 'admin') {
      onLogin(username, password);
      navigate('/home');
    } else {
      setError('Incorrect username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="song-posters">
        <img src={background} alt="Song Poster 1" />
      </div>
      <div className="login-form">
        <img src={logo} alt="PlayMate Logo" className="logo" />
        <h2 className='hello-123'>Welcome to PlayMate</h2>
        <p className="hello-123">Your favorite music player app</p> 
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
