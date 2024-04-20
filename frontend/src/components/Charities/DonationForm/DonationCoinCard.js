import React, { useState, useEffect } from 'react';
import './DonationForm.css';
import { useUser } from '../../contexts/UserContext.js';
import { firestore } from '../../FireBase/firebase.js';
import { doc, getDoc } from 'firebase/firestore';

const DonationCoinCard = ({ coin, onDonationAmountChange }) => {
  const [availableAmount, setAvailableAmount] = useState('0.00');
  const [donationAmount, setDonationAmount] = useState('');
  const user = useUser(); // Get user data from context

  useEffect(() => {
    // Fetch the user's wallet address for the specified coin
    const fetchWalletAddress = async () => {
      if (user?.uid) {
        const userRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          const walletAddresses = userData.walletAddresses || {};
          const address = walletAddresses[coin];
          
          // Check if the wallet address for the specified coin is an empty string
          if (address) {
            // Retrieve the balance for Bitcoin
            if (coin === 'bitcoin') {
              fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`)
                .then(response => response.json())
                .then(data => {
                  // Convert from satoshis to BTC for display
                  setAvailableAmount(data.balance.toString());
                })
                .catch(error => {
                  console.error('Error fetching Bitcoin balance:', error);
                  setAvailableAmount('0.00');
                });
            }
            // Retrieve the balance for Ethereum
            else if (coin === 'ethereum') {
              fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=YourApiKeyToken`)
                .then(response => response.json())
                .then(data => {
                  setAvailableAmount(data.result.toString());
                })
                .catch(error => {
                  console.error('Error fetching Ethereum balance:', error);
                  setAvailableAmount('0.00');
                });
            }
          } else {
            console.log("No such wallet!");
            setAvailableAmount('0.00');
          }
        } else {
          console.log("No such document!");
          setAvailableAmount('0.00');
        }
      }
      else {
        console.log("No such user!");
        setAvailableAmount('0.00');
      }
    };

    fetchWalletAddress();
  }, [user?.uid, coin]);


  const handleAmountChange = (e) => {
    const amount = e.target.value;
    setDonationAmount(amount);
    onDonationAmountChange(coin, amount);
  };

  const isInputDisabled = availableAmount === '0.00';
  const currencySymbol = coin === 'bitcoin' ? '₿' : 'Ξ';

  return (
    <div className="coin-card-container">
      <img src={`${process.env.PUBLIC_URL}/${coin}.svg`} className="coin-logo"/>

      <div className="flex-horizontal">
        <div className="text-flex-child">
          <p className="weight-600">Available Funds</p>
          <p>{currencySymbol}{availableAmount}</p>
        </div>

        <div className="text-flex-child right-align">
          <p>Donation amount</p>
          <input
            type="number"
            value={donationAmount}
            onChange={handleAmountChange}
            placeholder="0.00"
            disabled={isInputDisabled}
          />
        </div>

      </div>


    </div>
  );
};

export default DonationCoinCard;
