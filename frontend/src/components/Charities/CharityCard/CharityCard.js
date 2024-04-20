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
          {/* <a href={charity.profileUrl} className="charity-link">Learn More</a> */}
        </div>
      </div>
    </div>
  );
};

export default CharityCard;
