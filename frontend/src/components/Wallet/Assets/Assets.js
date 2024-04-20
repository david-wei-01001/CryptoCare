import React, { useEffect, useState } from 'react';
import './Assets.css';
import { firestore } from '../../FireBase/firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { useUser } from '../../contexts/UserContext.js';


const Assets = () => {
  const [assets, setAssets] = useState([
    {
      "name": "Bitcoin",
      "symbol": "BTC",
      "img": `${process.env.PUBLIC_URL}/bitcoin.svg`,
      "amount": "0.00",
      "accountId": ""
    },
    {
      "name": "Ethereum",
      "symbol": "ETH",
      "img": `${process.env.PUBLIC_URL}/ethereum.svg`,
      "amount": "0.00",
      "accountId": ""
    }
  ]);

  const user = useUser();

  useEffect(() => {
    if (user?.uid) {
      const fetchWalletData = async () => {
        const userRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          const walletAddresses = userData.walletAddresses || {};

          // Fetch Bitcoin balance if address is present
          if (walletAddresses.bitcoin && walletAddresses.bitcoin !== "") {
            fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${walletAddresses.bitcoin}/balance`)
              .then(response => response.json())
              .then(data => {
                setAssets(assets => assets.map(asset => 
                  asset.symbol === "BTC" ? {...asset, amount: data.balance.toString(), accountId: walletAddresses.bitcoin} : asset
                ));
              })
              .catch(error => {
                console.error('Error fetching Bitcoin balance:', error);
                setAssets(assets => assets.map(asset => 
                  asset.symbol === "BTC" ? {...asset, amount: "0.00", accountId: "No Available Wallet"} : asset
                ));
              });
          } else {
            setAssets(assets => assets.map(asset => 
              asset.symbol === "BTC" ? {...asset, amount: "0.00", accountId: "No Available Wallet"} : asset
            ));
          }

          // Fetch Ethereum balance if address is present
          if (walletAddresses.ethereum && walletAddresses.ethereum !== "") {
            fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${walletAddresses.ethereum}&tag=latest&apikey=YourApiKeyToken`)
              .then(response => response.json())
              .then(data => {
                setAssets(assets => assets.map(asset => 
                  asset.symbol === "ETH" ? {...asset, amount: data.result, accountId: walletAddresses.ethereum} : asset
                ));
              })
              .catch(error => {
                console.error('Error fetching Ethereum balance:', error);
                setAssets(assets => assets.map(asset => 
                  asset.symbol === "ETH" ? {...asset, amount: "0.00", accountId: "No Available Wallet"} : asset
                ));
              });
          } else {
            setAssets(assets => assets.map(asset => 
              asset.symbol === "ETH" ? {...asset, amount: "0.00", accountId: "No Available Wallet"} : asset
            ));
          }
        } else {
          console.log("No such document!");
          // Set all assets to no available wallet if no user data found
          setAssets(assets.map(asset => ({ ...asset, amount: "0.00", accountId: "No Available Wallet" })));
        }
      };

      fetchWalletData();
    }
  }, [user?.uid]);

  return (
    <div className="assets">
      {assets.map((asset, index) => (
        <div key={index} className="asset-container">
          <div className="left-container">
            <img src={asset.img} alt={asset.name} className="asset-img"/>
            <div className="left-aligned-flex">
              <div className="weight-600">{asset.symbol}</div>
              <div className="med-gray-text">{asset.name}</div>
            </div>
          </div>

          <div className="left-aligned-flex right-align">
            {/* Check asset symbol to determine which currency symbol to prepend */}
            <div className="weight-600">
              {asset.symbol === 'BTC' ? `₿${asset.amount}` : 
              asset.symbol === 'ETH' ? `Ξ${asset.amount}` : 
              `$${asset.amount}`}
            </div>
            <div className="med-gray-text">{asset.accountId}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Assets;
