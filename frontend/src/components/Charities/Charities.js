import React, { useState } from 'react';
import NavigationSidebar from '../NavigationSideBar/NavigationSidebar';
import './Charities.css';
import CharityCard from './CharityCard/CharityCard';
import CharityData from './Data/CharityData';

const Charities = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const charitiesPerPage = 12;

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const displayedCharities = CharityData.slice(
    currentPage * charitiesPerPage,
    currentPage * charitiesPerPage + charitiesPerPage
  );

  return (
    <div className="charities-container">
      <NavigationSidebar />
      <div className="charities-content">
          <h1>Featured Charities</h1>
          <div className="featured-charities-container">
            {displayedCharities.map((charity, index) => (
              <CharityCard key={index} charity={charity} />
            ))}
          </div>
          <div className="prev-next-container">
            {currentPage > 0 && <div onClick={prevPage} className="pagination-button">Previous</div>}
            {displayedCharities.length === charitiesPerPage && (
              <div onClick={nextPage} className="pagination-button">Next</div>
            )}
          </div>
      </div>
    </div>
  );
};

export default Charities;

