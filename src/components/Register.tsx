import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import '../css/styles.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const validateForm = () => {
    if (username.trim() === '' || password.trim() === '') {
      setValidationMessage('Username and Password are required.');
      return false;
    }

    if (!gmailRegex.test(username.trim())) {
      setValidationMessage('Please enter a valid Gmail address.');
      return false;
    }

    setValidationMessage('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/register', { username, password });
      console.log('Registration Response:', response.data);
      if (response.data.token) {
        dispatch(login(response.data.token));
        navigate('/form-submission');
      } else {
        setError('Registration successful, but no token received.');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setError('Email already registered');
      } else {
        setError('An error occurred during registration.');
      }
    }
  };

  const handleBackToLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username (Gmail):</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
        {validationMessage && <p style={{ color: 'red' }}>{validationMessage}</p>}
        {error && (
          <>
            <p style={{ color: 'red' }}>{error}</p>
            <button onClick={handleBackToLoginClick}>Back to Login</button>
          </>
        )}
      </form>
    </div>
  );
}

export default Register;
