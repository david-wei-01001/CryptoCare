import React from 'react';
import './Donations.css';
import SmallButton from '../../Button/SmallButton'

const Donations = () => {
  return (
    <div className="donations-container">
      <div className="dontations-wrapper">
        <p className="donation-header">Total donations</p>
        <span className="donation-amount">$302.82</span>
        <SmallButton onClick="" text="Donations"/>
      </div>
    </div>
  );
};

export default Donations;
