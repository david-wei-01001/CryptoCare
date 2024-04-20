import React from 'react';
import './Assets.css';

const dummyAssetData = [
  {
    "name": "Bitcoin",
    "symbol": "BTC",
    "img": './bitcoin.svg' ,
    "amount": 0.020,
    "usdValue": 1203.23
  },
  {
    "name": "Bitcoin",
    "symbol": "BTC",
    "img": './bitcoin.svg' ,
    "amount": 0.020,
    "usdValue": 1203.23
  }
];

const Assets = () => {
  return (
    <div className="assets">
      {dummyAssetData.map((asset, index) => (
        <div key={index} className="asset-container">
          <div className="left-container">
            <img src={asset.img} alt={asset.name} className="asset-img"/>
            <div className="left-aligned-flex">
              <div className="weight-600">{asset.symbol}</div>
              <div className="med-gray-text">{asset.name}</div>
            </div>
          </div>

          <div className="left-aligned-flex">
            <div className="weight-600">${asset.usdValue.toLocaleString()}</div>
            <div className="med-gray-text">{asset.amount}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Assets;
