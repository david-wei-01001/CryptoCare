import React from 'react';
import { useParams, Link } from 'react-router-dom';
import NavigationSidebar from '../../NavigationSideBar/NavigationSidebar';
import './IndividualCharityPage.css';
import SmallButton from '../../Button/SmallButton';

const dummyCharityData = [
  {
    "description": "Lil BUB is a one of a kind space cat. Since landing on Earth, she's raised over $1,000,000 for homeless pets nationwide.. Lil BUB\u2019s Big Fund exists to advocate for special needs companion animals and build a community that celebrates and fosters the",
    "ein": "844229672",
    "name": "Lil BUB's Big Fund",
    "profileUrl": "https://www.every.org/lilbubsbigfund",
    "logoUrl": "https://res.cloudinary.com/everydotorg/image/upload/c_lfill,w_24,h_24,dpr_2/c_crop,ar_24:24/q_auto,f_auto,fl_progressive/profile_pics/dsor2nxk97p87umlwhvt",
    "coverImageUrl": "https://res.cloudinary.com/everydotorg/image/upload/f_auto,c_limit,w_3840,q_80/profile_pics/ipxxsfqxtt6skku7vh1z",
    "logoCloudinaryId": "profile_pics/dsor2nxk97p87umlwhvt",
    "matchedTerms": [],
    "slug": "lilbubsbigfund",
    "location": "BLOOMINGTON, IN",
    "websiteUrl": "https://www.goodjobbub.org/",
    "tags": [
      "dogs",
      "cats",
      "animals"
    ]
  }
];

const IndividualCharityPage = () => {
  const { charityName } = useParams();

  // Find the charity data based on the charity name
  const charity = dummyCharityData.find(
    (charity) => charity.name.replace(/\s+/g, '-').toLowerCase() === charityName
  );

  // Render the content of the individual charity page
  return (
    <div className="wallet-container">
      <div className="sidebar">
        <NavigationSidebar />
      </div>

      <div className="individual-charity-content">
          <Link to="/charities" className="back">
            <img src="../../../BackButton.svg" alt="Back"></img>
            <div className="text-decoration-none">Back</div>
          </Link>
          <h1>{charity.name}</h1>
          <p>{charity.description}</p>
          <Link to={charity.websiteUrl} target="_blank" rel="noopener noreferrer">
            <p>Learn more</p>
          </Link>

          <SmallButton className="left-align-bttn" onClick="" text="Donate now"/>
      </div>


    </div>

      // <div className="individual-charity-page">
    //   <div className="charity-header">
    //     <img src={charity.logoUrl} alt="Charity Logo" />
    //     <h1>{charity.name}</h1>
    //   </div>
    //   <div className="charity-details">
    //     <p>Description: {charity.description}</p>
    //     <p>Location: {charity.location}</p>
    //     <p>Tags: {charity.tags.join(', ')}</p>
    //     <p>Website: <a href={charity.websiteUrl}>{charity.websiteUrl}</a></p>
    //     {/* Add more details as needed */}
    //   </div>
    // </div>
  );
};



export default IndividualCharityPage;
