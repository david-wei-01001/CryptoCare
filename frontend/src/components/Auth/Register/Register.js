import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LargeButton from '../../Button/LargeButton';
import './Register.css';

// Import Firebase services
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../FireBase/firebase.js';
import { doc, setDoc } from 'firebase/firestore';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use Firebase Auth to create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      // Clear form fields
      setEmail('');
      setPassword('');
      setFirstName('');
      setSuccessMessage('Registration successful! Redirecting to login...');
      navigate('/');
      // Add first and last name to Firestore under 'users' collection
      await setDoc(doc(firestore, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        totalBitcoin: 0,
        totalETH: 0,
        donationHistory: [],
        // totalBitcoin: 0.1,
        // totalETH: 1,
        // donationHistory: [
        //     { CharityName: "Charity A", BitcoinDonationAmount: 0.01, ETHDonationAmount: 0.1, DonationDate: "2021-01-01" },
        //     { CharityName: "Charity B", BitcoinDonationAmount: 0.02, ETHDonationAmount: 0.2, DonationDate: "2021-02-01" },
        //     { CharityName: "Charity C", BitcoinDonationAmount: 0.03, ETHDonationAmount: 0.3, DonationDate: "2021-03-01" },
        //     { CharityName: "Charity D", BitcoinDonationAmount: 0.04, ETHDonationAmount: 0.4, DonationDate: "2021-04-01" }
        //   ],

        walletAddresses: {
          bitcoin: "",  // Empty string indicating no Bitcoin address provided yet
          ethereum: ""  // Empty string indicating no Ethereum address provided yet
        }
      });

    } catch (error) {
      console.error("Error registering user:", error.message);

      // Clear existing error messages
      setFirstNameError('');
      setLastNameError('');
      setEmailError('');
      setPasswordError('');

      // let errorMessage = '';
      switch (error.code) {
        case 'auth/email-already-in-use':
          setEmailError('This email address is already in use by another account.');
          break;
        case 'auth/invalid-email':
          setEmailError('The email address is invalid.');
          break;
        case 'auth/operation-not-allowed':
          setEmailError('Email/password accounts are not enabled. Contact support.');
          break;
        case 'auth/weak-password':
          setPasswordError('The password is too weak. Please use a stronger password.');
          break;
        default:
          setFirstNameError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="Register">
      {/* Display error and success messages */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="header-section">
          <h1 className="weight-500">Welcome</h1>
          <p className="med-gray-text">To get started, create an account.</p>
        </div>

        <div className="input-section">
          <div className="error-message" style={{ visibility: firstNameError ? 'visible' : 'hidden' }}>{firstNameError}</div>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </div>
        <div className="input-section">
          <div className="error-message" style={{ visibility: lastNameError ? 'visible' : 'hidden' }}>{lastNameError}</div>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="input-section">
          <div className="error-message" style={{ visibility: emailError ? 'visible' : 'hidden' }}>{emailError}</div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-section">
          <div className="error-message" style={{ visibility: passwordError ? 'visible' : 'hidden' }}>{passwordError}</div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <LargeButton onClick={handleSubmit} text="Register" className="register-bttn" />
      </form>
    </div>
  );
}

export default Register;
