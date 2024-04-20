import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import firebase from 'firebase/app';
// import 'firebase/database'; // Import the Firebase Realtime Database module
import LargeButton from '../../Button/LargeButton.js';
import DonationCoinCard from './DonationCoinCard.js';
import './DonationForm.css';

const DonationForm = ({ charity, onClose }) => {
  const [bitcoinAmount, setBitcoinAmount] = useState('');
  const [ethereumAmount, setEthereumAmount] = useState('');
  const { charityName } = useParams();
  const [donatedCharity, setDonatedCharity] = useState(null);
  const [bitcoinPrivateKey, setBitcoinPrivateKey] = useState('');
  const [ethereumPrivateKey, setEthereumPrivateKey] = useState('');



  const handleBitcoinPrivateKeyChange = (e) => {
    const key = e.target.value;
    setBitcoinPrivateKey(key);
  };

  const handleEthereumPrivateKeyChange = (e) => {
    const key = e.target.value;
    setEthereumPrivateKey(key);
  };

  const handleDonation = async () => {
    const donationData = [];

    if (bitcoinAmount) {
      const bitcoinDonation = {
        coin: 'Bitcoin',
        amount: bitcoinAmount,
        charity: charityName,
        privateKey: bitcoinPrivateKey // Assuming privateKey is for Bitcoin
      };
      donationData.push(bitcoinDonation);
    }

    if (ethereumAmount) {
      const ethereumDonation = {
        coin: 'Ethereum',
        amount: ethereumAmount,
        charity: charityName,
        privateKey: ethereumPrivateKey // Use Ethereum private key
      };
      donationData.push(ethereumDonation);
    }
    console.log(donationData);

    // TODO: store in the database
  };

  const handleDonationAmountChange = (coin, donationAmount) => {
    if (coin === 'bitcoin') {
      setBitcoinAmount(donationAmount);
    } else if (coin === 'ethereum') {
      setEthereumAmount(donationAmount);
    }
  };

  const handleCharityChange = (charity) => {
    setDonatedCharity(charity);
  };

  return (
    <div className="overlay">
      <div className="donation-form">
        <img src={`${process.env.PUBLIC_URL}/XButton.svg`} className="close-button" alt="Close" onClick={onClose} />
        <h2>Donate to {charity.name}</h2>

        <div className="coin-container">
          <DonationCoinCard coin="bitcoin" onDonationAmountChange={handleDonationAmountChange} onCharityChange={handleCharityChange} />
          <input
            className="private-key-input"
            type="password" // Use type="password" to mask input
            value={bitcoinPrivateKey}
            onChange={handleBitcoinPrivateKeyChange}
            placeholder={`Enter Bitcoin private key to approve transaction`}
          />

          <DonationCoinCard coin="ethereum" onDonationAmountChange={handleDonationAmountChange} onCharityChange={handleCharityChange} />
          <input
            className="private-key-input"
            type="password" // Use type="password" to mask input
            value={ethereumPrivateKey}
            onChange={handleEthereumPrivateKeyChange}
            placeholder={`Enter Ethereum private key to approve transaction`}
          />
        </div>

        <LargeButton onClick={handleDonation} text="Donate" />
      </div>
    </div>
  );
};

export default DonationForm;
