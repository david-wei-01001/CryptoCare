import React from 'react';
import './FeaturedCharities.css';
import CharityCard from '../../Charities/CharityCard/CharityCard'


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
  },
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
  },
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

const FeaturedCharities = () => {
  return (
    <div className="featured-charities-container">
        {dummyCharityData.map((charity, index) => (
        <CharityCard key={index} charity={charity} />
      ))}
    </div>
  );
};

export default FeaturedCharities;
