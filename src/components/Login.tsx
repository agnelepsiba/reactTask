import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import '../css/styles.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    if (username.trim() === '' || password.trim() === '') {
      setValidationMessage('Username and Password are required.');
      return false;
    }
    setValidationMessage('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      if (response.data.token) {
        dispatch(login(response.data.token));
        navigate('/form-submission');
      } else {
        setError('Login failed, no token received.');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.status === 401) {
          setError('Invalid credentials');
        } else {
          setError('An error occurred during login.');
        }
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        {validationMessage && <p style={{ color: 'red' }}>{validationMessage}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;