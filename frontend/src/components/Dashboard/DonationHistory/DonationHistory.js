import React, { useEffect, useState } from 'react';
import './DonationHistory.css';
import DonationHistoryEmptyCard from './DonationHistoryEmptyCard'
import { useUser } from '../../contexts/UserContext.js';
import { firestore } from '../../FireBase/firebase.js';
import { doc, getDoc } from 'firebase/firestore';

const DonationHistory = () => {
  const user = useUser();  // Get user data from context
  const [donationHistory, setDonationHistory] = useState([]);

  // Retrieve donationhistory
  useEffect(() => {
    if (user?.uid) {
      const fetchDonationHistory = async () => {
        try {
          const docRef = doc(firestore, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().donationHistory) {
            // Set donationHistory with data retrieved from Firestore
            setDonationHistory(docSnap.data().donationHistory);
          } else {
            console.log("No such document or no donation history!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchDonationHistory();
    }
  }, [user?.uid]);

  // Sort the donations by date in descending order to show the most recent ones
  const sortedDonations = donationHistory.slice().sort((a, b) => new Date(b.DonationDate) - new Date(a.DonationDate));

  // Get the most recent 3 donations
  const recentDonations = sortedDonations.slice(0, 4);

  return (
    <div className="donation-history-container">
      {donationHistory.length === 0 ? (
        <DonationHistoryEmptyCard />
      ) : (
        <div className="donation-history-card">
          {recentDonations.map((donation, index) => (
            <div key={index} className="donation-history-entry">
              <div className="donation-charity-name">{donation.CharityName}</div>
              <div className="donation-detail">
              <div className="donation-amount">₿{donation.BitcoinDonationAmount.toFixed(2)}</div>
              <div className="donation-amount">Ξ{donation.ETHDonationAmount.toFixed(2)}</div>
              <div className="donation-date">{new Date(donation.DonationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
