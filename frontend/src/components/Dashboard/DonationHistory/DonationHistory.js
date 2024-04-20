import React from 'react';
import './DonationHistory.css';
import DonationHistoryEmptyCard from './DonationHistoryEmptyCard'

const DonationHistory = () => {
  return (
    <div className="donation-history-container">
      <DonationHistoryEmptyCard />
      {/* <div>Donation History</div> */}
    </div>
  );
};

export default DonationHistory;
