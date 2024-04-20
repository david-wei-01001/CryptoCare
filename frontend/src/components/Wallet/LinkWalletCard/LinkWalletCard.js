import React from 'react';
import './LinkWalletCard.css';
import SmallButton from '../../Button/SmallButton'


const LinkWalletCard = () => {
  return (
    <div className="link-wallet-card-container">
      <div className="wallet-card-wrapper">
        <p className="wallet-card-header">Connect your crypto wallet to start donating</p>
        <SmallButton onClick="" text="Link wallet"/>
      </div>
    </div>
  );
};

export default LinkWalletCard;

