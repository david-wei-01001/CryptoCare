import React from 'react';
import './CharityCard.css';

const CharityCard = ({ charity }) => {
  return (
    <div className="charity-card">
      <div className="charity-wrapper">
        <div className="charity-logo">
          <img src={charity.logoUrl} alt="Charity Logo" />
        </div>
        <div className="charity-info">
          <h2 className="charity-name">{charity.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default CharityCard;
