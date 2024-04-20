import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LargeButton from '../../Button/LargeButton.js';
import './DonationForm.css';

const DonationForm = ({ charity, onClose }) => {
  const [amount, setAmount] = useState('');
  const { charityName } = useParams();

  const handleDonation = async () => {
    try {
      // Send donation request to backend
      const response = await axios.post('/api/donate', {
        charityName,
        amount,
      });
      console.log(response.data); // Handle success/failure
    } catch (error) {
      console.error('Error donating:', error);
    }
  };


  return (
    <div className="overlay"> {/* Dark overlay */}
      <div className="donation-form"> {/* Donation form */}
      <img src={`${process.env.PUBLIC_URL}/XButton.svg`} className="close-button" alt="Close" onClick={onClose} />
        <h2>Donate to {charity.name}</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter donation amount"
        />
        <LargeButton onClick={handleDonation} text="Donate"/>

      </div>
    </div>
  );
};

export default DonationForm;
