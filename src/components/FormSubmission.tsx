import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import '../css/styles.css';

interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

function FormSubmission() {
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleClick = async () => {
    if (inputValue.trim() === '') {
      setValidationMessage('Please enter your message.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/form-submit', { name: inputValue }, {
        headers: { 'x-access-token': token }
      });
      setMessage(response.data.message);
      setInputValue('');
      setValidationMessage('');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setErrors(err.response.data.errors);
      } else {
        setValidationMessage('An error occurred while submitting the form.');
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h2>Form Submission</h2>
      {message ? (
        <>
          <p>{message}</p>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter message"
            onChange={(e) => {
              setInputValue(e.target.value);
              setValidationMessage('');
            }}
            value={inputValue}
          />
          <button onClick={handleClick}>Click</button>
          {validationMessage && <p style={{ color: 'red' }}>{validationMessage}</p>}
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default FormSubmission;
