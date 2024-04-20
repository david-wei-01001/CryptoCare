import React from 'react';
import NavigationSidebar from '../NavigationSideBar/NavigationSidebar';
import Assets from './Assets/Assets';
import WalletCard from './WalletCard/WalletCard';
import LinkWalletCard from './LinkWalletCard/LinkWalletCard';
import './Wallet.css';

const Wallet = () => {
  return (
    <div className="wallet-container">
      <div className="sidebar">
        {<NavigationSidebar />}
      </div>
      <div className="wallet-content">
        <div className="top-section">
          <h1 className="header">Add a new Wallet</h1>
          <LinkWalletCard />
          {/* <WalletCard /> */}
        </div>


        <div className="bottom-section">
          <div className="assets-section">
            <div className="header-section">
              <h1 className="header">Connected Wallets</h1>
            </div>
            <Assets />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
