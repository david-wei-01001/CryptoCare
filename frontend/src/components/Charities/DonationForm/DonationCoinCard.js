import React, { useState } from 'react';
import LargeButton from '../../Button/LargeButton.js';
import './DonationForm.css';

const DonationCoinCard = ({ coin, onDonationAmountChange }) => {
  const [donationAmount, setDonationAmount] = useState('');

  const handleAmountChange = (e) => {
    const amount = e.target.value;
    setDonationAmount(amount);
    onDonationAmountChange(coin, amount);
  };

  return (
    <div className="coin-card-container">
      <img src={`${process.env.PUBLIC_URL}/${coin}.svg`} className="coin-logo"/>

      <div className="flex-horizontal">
        <div className="text-flex-child">
          <p className="weight-600">Available Funds</p>
          <p>$1,203.23</p>
        </div>

        <div className="text-flex-child right-align">
          <p>Donation amount</p>
          <input
            type="number"
            value={donationAmount}
            onChange={handleAmountChange}
            placeholder="0.00"
          />
        </div>

      </div>


    </div>
  );
};

export default DonationCoinCard;
