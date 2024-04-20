import React from 'react';
import './LinkWalletCard.css';
import LargeButton from '../../Button/LargeButton'


const LinkWalletCard = () => {
  return (
    <div className="link-wallet-card-container">
      <div className="wallet-card-wrapper">
      <p className="wallet-card-header">Connect a new wallet to your account</p>
        <input
          type="text"
          placeholder="Enter your MetaMask ID"
          className="wallet-input"
        />
        <LargeButton onClick={() => {}} text="Link new Wallet" />
      </div>
    </div>
  );
};

export default LinkWalletCard;

