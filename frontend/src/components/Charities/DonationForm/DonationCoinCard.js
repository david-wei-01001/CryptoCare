import React, { useState, useEffect } from 'react';
import './DonationForm.css';
import { useUser } from '../../contexts/UserContext.js';
import { firestore } from '../../FireBase/firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { getBitcoinBalance, getMetamaskBalance } from "../../Wallet/WalletCard/WalletCard.js";

const DonationCoinCard = ({ coin, onDonationAmountChange }) => {
  const [availableAmount, setAvailableAmount] = useState('0.00');
  const [donationAmount, setDonationAmount] = useState('');
  const user = useUser(); // Get user data from context

  const apikey = "KRVSXGU4WGUYZPXJVHQX1EF9J81G9QFNSF";

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
            if (coin === 'bitcoin' && walletAddresses.bitcoin !== "") {
              try {
                const bitcoinBalance = await getBitcoinBalance(walletAddresses.bitcoin);
                setAvailableAmount(bitcoinBalance.toString());
              } catch (error) {
                console.error('Error fetching Bitcoin balance:', error);
                // Handle any errors, for example by setting the balance to 0 or an error message
                setAvailableAmount('0.00');
              }
            }
            // Retrieve the balance for Ethereum
            else if (coin === 'ethereum' && walletAddresses.ethereum !== "") {
              try {
                const ethereumBalance = await getMetamaskBalance(walletAddresses.ethereum);
                setAvailableAmount(ethereumBalance.toString());
              } catch (error) {
                console.error('Error fetching Bitcoin balance:', error);
                // Handle any errors, for example by setting the balance to 0 or an error message
                setAvailableAmount('0.00');
              }
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
