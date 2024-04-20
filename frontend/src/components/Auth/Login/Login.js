import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../FireBase/firebase.js';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // To handle and display errors
  const [successMessage, setSuccessMessage] = useState(''); // State to store success message
  const [showPassword, setShowPassword] = useState(false); // Define showPassword state
  const navigate = useNavigate();

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully, 
      console.log('User logging in:', userCredential.user);
      let successMessage = 'You have logged in successfully!';
      setSuccessMessage(successMessage); // Update success message state to display to the user
      
      // Redirect the user to dashboard
      navigate('/dashboard');

    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = '';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'This user does not exist, please retry.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect email or password, please retry.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many unsuccessful login attempts. Please try again later.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection and try again.';
          break;
        default:
          errorMessage = 'An unexpected error occurred. Please try again.';
      }

      setErrorMessage(errorMessage); // Displaying a user-friendly error message
    }
  };
  return (
    <div className="login-container">
      <div className="left-section">
        <h1>Charity Bitcoin App</h1>
        <div className="logo">
          {/* Your logo or image goes here */}
          <img src="../../../../public/logo512.png" alt="Logo" />
          
        </div>
      </div>
      <div className="right-section">
        <div className="form-container">
          <div className="form-header">
            <h2>Login</h2>
            {/* Display error and success messages */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
          </div>
          <div className="form-body">
            <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password'
                  required
                />
                <div className="password-toggle" onClick={togglePasswordVisibility}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </div>
              </div>
            </div>
            <button type="submit">Log in</button>
            </form>
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>




    // <div className="Login">
    //   {/* Display error and success messages */}
    //   {errorMessage && <div className="error-message">{errorMessage}</div>}
    //   {successMessage && <div className="success-message">{successMessage}</div>}
      
    //   <form onSubmit={handleSubmit}>
      //   <div>
      //     <label htmlFor="email">Email:</label>
      //     <input
      //       type="email"
      //       id="email"
      //       value={email}
      //       onChange={(e) => setEmail(e.target.value)}
      //       required
      //     />
      //   </div>
      //   <div>
      //     <label htmlFor="password">Password:</label>
      //     <input
      //       type="password"
      //       id="password"
      //       value={password}
      //       onChange={(e) => setPassword(e.target.value)}
      //       required
      //     />
      //   </div>
      //   <button type="submit">Log in</button>
      // </form>
      // <p>Don't have an account?<Link to="/register">Sign up</Link></p>
    // </div>
  );
}

export default Login;
