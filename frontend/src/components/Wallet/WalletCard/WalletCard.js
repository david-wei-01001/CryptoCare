import React from 'react';
import './WalletCard.css';
import SmallButton from '../../Button/SmallButton'
import Web3 from 'web3';
const axios = require('axios');

const web = new Web3('https://sepolia.infura.io/v3/f4f2f5cf43244fdf95f6bf89da328fbb');

export const getMetamaskBalance = async () => {
  const balanceWei = await web.eth.getBalance('0xc94DEB32c46234b5fc313eD1D4C91c04d77C0218');
  const balanceEth = web.utils.fromWei(balanceWei, 'ether');
  console.log(balanceEth);
  return balanceEth;
}

export const getBitcoinBalance = async () => {
  // API for mainnet wallet
  const apiURL = `https://blockstream.info/api/address/bc1p4s5766n3dartnljxqv0dta5ylcxtv7l4udxtletm0enayfqf99gsn739q7/utxo`;

  // API for testnet wallet
  // const apiURL = `https://mempool.space/testnet/api/address/${address}/utxo`;

  try {
      // Make the API call
      const response = await axios.get(apiURL);

      let totalBalance = 0;

      if (response.status === 200) {
          const data = response.data;

          data.forEach(utxo => {
              totalBalance += utxo.value;
          });

          // console.log(`Total Balance: ${totalBalance} satoshis`);
      } else {
          console.error(`Error: API request failed with status code ${response.status}`);
      }

      return totalBalance;
  } catch (error) {
      console.error("Error:", error);
      throw error;
  }
}

const WalletCard = () => {
  return (
    <div className="wallet-card-container">
      <div className="wallet-card-wrapper">
        <p className="wallet-card-header">Total Balance</p>
        <span className="wallet-card-amount">$1,202.82</span>
        <SmallButton onClick="" text="Add funds"/>
      </div>
    </div>
  );
};

export default WalletCard;

