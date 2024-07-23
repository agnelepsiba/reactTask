import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/styles.css';

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    if (inputValue.trim() !== '') {
      setMessage(`Welcome ${inputValue}`);
      setInputValue('');
      setValidationMessage('');
    } else {
      setValidationMessage('Please enter your name.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      {message ? (
        <>
          <p>{message}</p>
          <button onClick={handleRegisterClick}>Register</button>
          <button onClick={handleLoginClick}>Login</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter Name"
            onChange={(e) => {
              setInputValue(e.target.value);
              setValidationMessage('');
            }}
            value={inputValue}
          />
          <button onClick={handleClick}>Click</button>
          {validationMessage && <p className="error">{validationMessage}</p>}
        </>
      )}
    </div>
  );
}

export default Home;
