import React from 'react';
import { Link } from 'react-router-dom';
import './CharityCard.css';

const CharityCard = ({ charity }) => {
  return (
    <div className="charity-card">
      <Link className="charity-card-link" to={`/charities/${charity.name.replace(/\s+/g, '-').toLowerCase()}`}>
        <div className="charity-wrapper">
          <div className="charity-logo">
            <img src={charity.logoUrl} alt="Charity Logo" />
          </div>
          <div className="charity-info">
            <h2 className="charity-name">{charity.name}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CharityCard;
