import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // To handle and display errors
  const [successMessage, setSuccessMessage] = useState(''); // State to store success message


  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully, 
      console.log('Error during user logging in:', userCredential.user);

      setSuccessMessage('You have logged in successfully!'); // Update success message state to display to the user
      // TODO: Redirect the user or update the application state as needed
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

      setError(errorMessage); // Displaying a user-friendly error message
    }
  };
  console.log("hello")
  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log in</button>
      </form>
      <p>Don't have an account?<Link to="/register">Sign up</Link></p>
    </div>
  );
}

export default Login;
