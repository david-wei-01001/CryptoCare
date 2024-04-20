import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import NavigationSidebar from '../NavigationSideBar/NavigationSidebar';
import Donations from './Donations/Donations';
import FeaturedCharities from './FeaturedCharities/FeaturedCharities';
import DonationHistory from './DonationHistory/DonationHistory';
import SmallStrokedButton from '../Button/SmallStrokedButton';
import { useUser } from '../contexts/UserContext.js';
import { firestore } from '../FireBase/firebase.js';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useUser();  // Get user data from context
  const [firstName, setFirstName] = useState('');  // State to store the first name

  useEffect(() => {
    if (user?.uid) {
      const fetchFirstName = async () => {
        try {
          const docRef = doc(firestore, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // Assuming the field in Firestore is named 'firstName'
            setFirstName(docSnap.data().firstName);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchFirstName();
    }
  }, [user?.uid]);  // Dependency array to re-fetch if user.uid changes

  const handleViewAllClick = () => {
    navigate('/charities');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        {<NavigationSidebar />}
      </div>
      <div className="dashboard-content">
        <div className="top-section">
          <div className="donations-card">
            <h1 className="header">Welcome, {firstName || 'User'}</h1>
            <Donations />
          </div>

          <div className="donations-card">
            <h1 className="header">Donation History</h1>
            <DonationHistory />
          </div>
        </div>

        <div className="bottom-section">
          <div className="featured-charities">
            <div className="header-section">
              <h1 className="header">Featured Charities</h1>
              <SmallStrokedButton className="bttn" onClick={handleViewAllClick} text="View all"/>
            </div>

            <FeaturedCharities />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
