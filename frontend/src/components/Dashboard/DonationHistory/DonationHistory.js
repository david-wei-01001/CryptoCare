import React from 'react';
import './DonationHistory.css';
import DonationHistoryEmptyCard from './DonationHistoryEmptyCard'

const DonationHistory = ({ donationHistory }) => {
  // Sort the donations by date in descending order to show the most recent ones
  const sortedDonations = [...donationHistory].sort((a, b) => new Date(b.DonationDate) - new Date(a.DonationDate));

  // Get the most recent 3 donations
  const recentDonations = sortedDonations.slice(0, 3);

  return (
    <div className="donation-history-container">
      {donationHistory.length === 0 ? (
        <DonationHistoryEmptyCard />
      ) : (
        <div className="donation-history-list">
          {recentDonations.map((donation, index) => (
            <div key={index} className="donation-history-entry">
              <div className="donation-charity-name">{donation.CharityName}</div>
              <div className="donation-amount">${donation.DonationAmount.toFixed(2)}</div>
              <div className="donation-date">{new Date(donation.DonationDate).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
