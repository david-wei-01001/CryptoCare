import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import firebase from 'firebase/app';
// import 'firebase/database'; // Import the Firebase Realtime Database module
import LargeButton from '../../Button/LargeButton.js';
import DonationCoinCard from './DonationCoinCard.js';
import './DonationForm.css';
import { firestore } from '../../FireBase/firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { useUser } from '../../contexts/UserContext.js';
import Web3 from 'web3';

const web = new Web3('https://sepolia.infura.io/v3/f4f2f5cf43244fdf95f6bf89da328fbb');

const DonationForm = ({ charity, onClose }) => {
  const [bitcoinAmount, setBitcoinAmount] = useState('');
  const [ethereumAmount, setEthereumAmount] = useState('');
  const { charityName } = useParams();
  const [donatedCharity, setDonatedCharity] = useState(null);
  const [bitcoinPrivateKey, setBitcoinPrivateKey] = useState('');
  const [ethereumPrivateKey, setEthereumPrivateKey] = useState('');
  const user = useUser();



  const handleBitcoinPrivateKeyChange = (e) => {
    const key = e.target.value;
    setBitcoinPrivateKey(key);
  };

  const handleEthereumPrivateKeyChange = (e) => {
    const key = e.target.value;
    setEthereumPrivateKey(key);
  };

  const bitcoin_lightning = async () => {
      const headers = {
        "Grpc-Metadata-Macaroon": '0201036c6e6402f801030a105547e6aef8d75ed6bad06b59a99d5d731201301a160a0761646472657373120472656164120577726974651a130a04696e666f120472656164120577726974651a170a08696e766f69636573120472656164120577726974651a210a086d616361726f6f6e120867656e6572617465120472656164120577726974651a160a076d657373616765120472656164120577726974651a170a086f6666636861696e120472656164120577726974651a160a076f6e636861696e120472656164120577726974651a140a057065657273120472656164120577726974651a180a067369676e6572120867656e657261746512047265616400000620dbb354ad9f8a2bffcf835c5218989f1638435cf571df470c347674d1366627ca',
        "Accept": "application/json",
    };

    const url = "https://charity.u.voltageapp.io:8080/v1/invoices";
    const payload = {
        value: bitcoinAmount,
        memo: "for charity"
    };

    try {
        const response = await axios.post(url, payload, { headers });
        // return response.data;
        console.log(response)
    } catch (error) {
        console.error("Error creating invoice:", error);
        throw error;
    }

    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const newDonationEntry = {
      CharityName: charityName,
      BitcoinDonationAmount: bitcoinDonationAmount ? bitcoinDonationAmount : 0.0,
      ETHDonationAmount: ethDonationAmount ? ethDonationAmount : 0.0,
      DonationDate: today
    };

    if (user?.uid) {
      const userRef = doc(firestore, "users", user.uid);
      try {
        await updateDoc(userRef, {
          donationHistory: arrayUnion(newDonationEntry)
        });
        console.log('Donation added to history successfully.');
      } catch (error) {
        console.error('Error adding donation to history:', error);
      }
    } else {
      console.error('User not found, unable to update donation history.');
    }
  }

  const handleDonation = async () => {
    const [checksumAddress, setChecksumAddress] = useState('');
    const donationData = [];

    if (bitcoinAmount) {
      const bitcoinDonation = {
        coin: 'Bitcoin',
        amount: bitcoinAmount,
        charity: charityName,
        privateKey: bitcoinPrivateKey // Assuming privateKey is for Bitcoin
      };
      donationData.push(bitcoinDonation);
    }

    if (ethereumAmount) {
      const ethereumDonation = {
        coin: 'Ethereum',
        amount: ethereumAmount,
        charity: charityName,
        privateKey: ethereumPrivateKey // Use Ethereum private key
      };
      donationData.push(ethereumDonation);
    }
    // console.log(donationData);

    // Get Bitcoin private key
    // const bitcoinPrivateKey = document.getElementById('bitcoin').value;
    
    // Get Ethereum private key
    // const ethereumPrivateKey = document.getElementById('ethereum').value;
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userRef = doc(firestore, "users", user.uid);
          const docSnap = await getDoc(userRef);
  
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const ethereumAddress = userData.walletAddresses.ethereum;
  
            if (ethereumAddress) {
              // Convert the address to a checksum address
              const checksumAddress = web.utils.toChecksumAddress(ethereumAddress);
              setChecksumAddress(checksumAddress);
            } else {
              console.log('No Ethereum address found.');
            }
          } else {
            console.log('No user data available.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, []);
    // const address1 = web.utils.toChecksumAddress('0xc94DEB32c46234b5fc313eD1D4C91c04d77C0218');


    const address2 = web.utils.toChecksumAddress('0xEFD1FB3DC9196B250E9CBD275D16D454da6F1FaA');
  
    const nonce = await web.eth.getTransactionCount(address1);
  
    const tx = {
      nonce: nonce,
      to: address2,
      value: web.utils.toWei(ethereumAmount, 'ether'),
      gas: 21000,
      gasPrice: web.utils.toWei('40', 'gwei')
    };
  
    // const signedTx = await web.eth.accounts.signTransaction(tx, 'b5c6ee6f06e81579c7bd284b58af664d01be5ad85b1c882de1b50a81718ebaeb');
    const signedTx = await web.eth.accounts.signTransaction(tx, ethereumPrivateKey);
  
    const txReceipt = await web.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(txReceipt.transactionHash);

    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const newDonationEntry = {
      CharityName: charityName,
      BitcoinDonationAmount: bitcoinDonationAmount ? bitcoinDonationAmount : 0.0,
      ETHDonationAmount: ethDonationAmount ? ethDonationAmount : 0.0,
      DonationDate: today
    };

    if (user?.uid) {
      const userRef = doc(firestore, "users", user.uid);
      try {
        await updateDoc(userRef, {
          donationHistory: arrayUnion(newDonationEntry)
        });
        console.log('Donation added to history successfully.');
      } catch (error) {
        console.error('Error adding donation to history:', error);
      }
    } else {
      console.error('User not found, unable to update donation history.');
    }
  };

  const handleDonationAmountChange = (coin, donationAmount) => {
    if (coin === 'bitcoin') {
      setBitcoinAmount(donationAmount);
    } else if (coin === 'ethereum') {
      setEthereumAmount(donationAmount);
    }
  };

  const handleCharityChange = (charity) => {
    setDonatedCharity(charity);
  };

  return (
    <div className="overlay">
      <div className="donation-form">
        <img src={`${process.env.PUBLIC_URL}/XButton.svg`} className="close-button" alt="Close" onClick={onClose} />
        <h2>Donate to {charity.name}</h2>

        <div className="coin-container">
          <DonationCoinCard coin="bitcoin" onDonationAmountChange={handleDonationAmountChange} onCharityChange={handleCharityChange} />
          <input
            className="private-key-input"
            id='bitcoin'
            type="password" // Use type="password" to mask input
            value={bitcoinPrivateKey}
            onChange={handleBitcoinPrivateKeyChange}
            placeholder={`Enter Bitcoin private key to approve transaction`}
          />

          <DonationCoinCard coin="ethereum" onDonationAmountChange={handleDonationAmountChange} onCharityChange={handleCharityChange} />
          <input
            className="private-key-input"
            id='ethereum'
            type="password" // Use type="password" to mask input
            value={ethereumPrivateKey}
            onChange={handleEthereumPrivateKeyChange}
            placeholder={`Enter Ethereum private key to approve transaction`}
          />
        </div>

        <LargeButton onClick={handleDonation} text="Donate" />
        <LargeButton onClick={bitcoin_lightning} text="Donate Bitcoin Using Lightning Network" />
      </div>
    </div>
  );
};

export default DonationForm;
