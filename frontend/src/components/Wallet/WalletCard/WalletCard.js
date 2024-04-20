import React from 'react';
import './WalletCard.css';
import SmallButton from '../../Button/SmallButton'


const WalletCard = () => {
  return (
    <div className="wallet-card-container">
      <div className="wallet-card-wrapper">
        <p className="wallet-card-header">Total Balance</p>
        <span className="wallet-card-amount">$1,202.82</span>
        <SmallButton onClick="" text="Add funds"/>
      </div>
    </div>
  );
};

export default WalletCard;

