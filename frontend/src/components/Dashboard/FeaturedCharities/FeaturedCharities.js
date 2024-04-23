import React from 'react';
import './FeaturedCharities.css';
import CharityCard from '../../Charities/CharityCard/CharityCard'

const CharityData = [
  {
    "description": "Together, we create science-based solutions for a healthy ocean and the wildlife and communities that depend on it.. You love the ocean as much as we do, and we can’t protect it without you.\n\nA healthy ocean means more than beautiful coasts and vibr",
    "ein": "237245152",
    "name": "Ocean Conservancy",
    "profileUrl": "https://www.every.org/ocean-conservancy",
    "logoUrl": "https://res.cloudinary.com/everydotorg/image/upload/c_lfill,w_24,h_24,dpr_2/c_crop,ar_24:24/q_auto,f_auto,fl_progressive/profile_pics/pp60avgm8rvzgwkbifel",
    "coverImageUrl": "https://res.cloudinary.com/everydotorg/image/upload/f_auto,c_limit,w_3840,q_80/profile_pics/zfc3rtokby5uaexqa8fo",
    "logoCloudinaryId": "profile_pics/pp60avgm8rvzgwkbifel",
    "matchedTerms": [],
    "slug": "ocean-conservancy",
    "location": "WASHINGTON, District of Columbia, 20036-1653 United States",
    "websiteUrl": "http://www.oceanconservancy.org",
    "tags": [
        "oceans",
        "environment"
    ]
  },
  {
    "description": "The Fungi Foundation is a global organization that works for the Fungi, their habitats, and the people who depend on them.. Launched in 2012, the Fungi Foundation is the first NGO dedicated to the fungi kingdom. Since its inception, it has achieved",
    "ein": "851478153",
    "name": "Fungi Foundation",
    "profileUrl": "https://www.every.org/ffungi",
    "logoUrl": "https://res.cloudinary.com/everydotorg/image/upload/c_lfill,w_24,h_24,dpr_2/c_crop,ar_24:24/q_auto,f_auto,fl_progressive/profile_pics/wq14eif08jx3kka2ixau",
    "coverImageUrl": "https://res.cloudinary.com/everydotorg/image/upload/f_auto,c_limit,w_3840,q_80/profile_pics/tqf7myovdptpxsde25rm",
    "logoCloudinaryId": "profile_pics/wq14eif08jx3kka2ixau",
    "matchedTerms": [],
    "slug": "ffungi",
    "location": "New York, NY, USA",
    "websiteUrl": "https://www.ffungi.org",
    "tags": [
        "wildlife",
        "education",
        "climate",
        "conservation",
        "research",
        "women-led",
        "environment"
    ]
  },
  {
    "description": "UN & civil society partnership supporting women working to build peace & respond to crises on the frontlines.. The Women’s Peace & Humanitarian Fund is an innovative partnership empowering local women to be a force for crisis response and lasting pe",
    "name": "Women's Peace & Humanitarian Fund",
    "profileUrl": "https://www.every.org/wphfund",
    "logoUrl": "https://res.cloudinary.com/everydotorg/image/upload/c_lfill,w_24,h_24,dpr_2/c_crop,ar_24:24/q_auto,f_auto,fl_progressive/profile_pics/nonakqqaxoboo6gzeqoh",
    "coverImageUrl": "https://res.cloudinary.com/everydotorg/image/upload/f_auto,c_limit,w_3840,q_80/profile_pics/hazkgsxk0dhyjwfespx2",
    "logoCloudinaryId": "profile_pics/nonakqqaxoboo6gzeqoh",
    "matchedTerms": [],
    "slug": "wphfund",
    "websiteUrl": "https://wphfund.org",
    "tags": [
        "gender-equality",
        "education",
        "womens-health",
        "health",
        "women-led",
        "humans"
    ]
  },
  {
    "description": "Multiple is a (501c3) non-profit dedicated to catalyzing innovation and supporting technologies for the autism community at scale.. Multiple is the engine for innovation—a global community of dedicated families, entrepreneurs, funders, and experts c",
    "name": "Multiple",
    "profileUrl": "https://www.every.org/multiple-hub-inc",
    "logoUrl": "https://res.cloudinary.com/everydotorg/image/upload/c_lfill,w_24,h_24,dpr_2/c_crop,ar_24:24/q_auto,f_auto,fl_progressive/profile_pics/kjse8kahl0bbtvh928nt",
    "coverImageUrl": "https://res.cloudinary.com/everydotorg/image/upload/f_auto,c_limit,w_3840,q_80/profile_pics/ng3iqa1ryvslhjrcwkba",
    "logoCloudinaryId": "profile_pics/kjse8kahl0bbtvh928nt",
    "matchedTerms": [],
    "slug": "multiple-hub-inc",
    "location": "San Francisco, CA, USA",
    "websiteUrl": "https://www.multiplehub.org",
    "tags": [
        "autism",
        "housing",
        "humans",
        "education",
        "disabilities",
        "science",
        "ukraine",
        "youth"
    ]
  }
];

const FeaturedCharities = () => {
  return (
    <div className="dashboard-featured-charities-container">
        {CharityData.map((charity, index) => (
        <CharityCard key={index} charity={charity} />
      ))}
    </div>
  );
};

export default FeaturedCharities;
