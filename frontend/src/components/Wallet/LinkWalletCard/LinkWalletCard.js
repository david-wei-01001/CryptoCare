import React, { useState } from 'react';
import { firestore } from '../../FireBase/firebase'; // Adjust the path as needed
import { doc, updateDoc } from 'firebase/firestore';
import { useUser } from '../../contexts/UserContext'; // Adjust if you have a user context
import './LinkWalletCard.css';
import LargeButton from '../../Button/LargeButton';

const LinkWalletCard = () => {
  const [walletId, setWalletId] = useState('');
  const [coinType, setCoinType] = useState('');
  const user = useUser(); // Assuming you have a user context providing user details

  const handleLinkWallet = async () => {
    if (!walletId.trim() || !coinType.trim()) {
      alert('Both fields are required.');
      return;
    }
    const formattedCoinType = coinType.trim().toLowerCase();
    if (formattedCoinType !== 'btc' && formattedCoinType !== 'bitcoin' && formattedCoinType !== 'eth' && formattedCoinType !== 'ethereum') {
      alert('Please enter a valid coin type (BTC or ETH).');
      return;
    }

    const coinKey = (formattedCoinType === 'btc' || formattedCoinType === 'bitcoin') ? 'bitcoin' : 'ethereum';

    try {
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, {
        [`walletAddresses.${coinKey}`]: walletId.trim()
      });
      alert('Wallet linked successfully!');
    } catch (error) {
      console.error('Error linking wallet:', error);
      alert('Failed to link wallet.');
    }
  };

  return (
    <div className="link-wallet-card-container">
      <div className="wallet-card-wrapper">
        <p className="wallet-card-header">Connect a new wallet to your account</p>
        <input
          type="text"
          placeholder="Enter your Wallet ID"
          className="wallet-input"
          value={walletId}
          onChange={(e) => setWalletId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the coin you are linking (BTC or ETH)"
          className="coin-input"
          value={coinType}
          onChange={(e) => setCoinType(e.target.value)}
        />
        <LargeButton onClick={handleLinkWallet} text="Link new Wallet" />
      </div>
    </div>
  );
};

export default LinkWalletCard;
