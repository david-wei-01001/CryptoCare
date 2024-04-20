import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavigationSidebar from '../../NavigationSideBar/NavigationSidebar';
import './IndividualCharityPage.css';
import SmallButton from '../../Button/SmallButton';
import DonationForm from '../DonationForm/DonationForm';
import CharityData from '../Data/CharityData';


const IndividualCharityPage = () => {
  const { charityName } = useParams();
  const [showDonationModal, setShowDonationModal] = useState(false);

  // Find the charity data based on the charity name
  const charity = CharityData.find(
    (charity) => charity.name.replace(/\s+/g, '-').toLowerCase() === charityName
  );

  const handleDonateClick = () => {
    setShowDonationModal(true);
  };

  const handleCloseDonationModal = () => {
    setShowDonationModal(false); // Set showDonationModal to false when donation modal needs to be closed
  };

  // Render the content of the individual charity page
  return (
    <div className="individual-charity-container">
      <div className="sidebar">
        <NavigationSidebar />
      </div>

      <div className="individual-charity-content">
        <Link to="/charities" className="back">
          <img src="../../../BackButton.svg" alt="Back" />
          <div className="text-decoration-none">Back</div>
        </Link>
        <h1>{charity.name}</h1>
        <p>{charity.description}</p>
        <Link to={charity.websiteUrl} target="_blank" rel="noopener noreferrer">
          <p>Learn more</p>
        </Link>

        <SmallButton className="left-align-bttn" onClick={handleDonateClick} text="Donate now" />

        {/* Render the donation modal if showDonationModal is true */}
        {showDonationModal && (
          <DonationForm charity={charity} onClose={handleCloseDonationModal} />
        )}
      </div>
    </div>
  );
};

export default IndividualCharityPage;
