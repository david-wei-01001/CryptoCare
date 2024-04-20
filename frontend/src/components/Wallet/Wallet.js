import React from 'react';
import NavigationSidebar from '../NavigationSideBar/NavigationSidebar';
import Assets from './Assets/Assets';
import WalletCard from './WalletCard/WalletCard';
import './Wallet.css';

const Wallet = () => {
  return (
    <div className="wallet-container">
      <div className="sidebar">
        {<NavigationSidebar />}
      </div>
      <div className="wallet-content">
        <div className="top-section">
          <h1 className="header">Wallet</h1>
          <WalletCard />
        </div>


        <div className="bottom-section">
          <div className="assets-section">
            <div className="header-section">
              <h1 className="header">Assets</h1>
            </div>
            <Assets />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
