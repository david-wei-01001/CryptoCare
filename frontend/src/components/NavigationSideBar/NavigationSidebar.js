import React, { useEffect, useState } from 'react';
import './NavigationSidebar.css';
import NavbarLinks from './NavbarLinks';
import { useUser } from '../contexts/UserContext.js';
import { firestore } from '../FireBase/firebase.js'; // Adjust the path to your Firebase config
import { doc, getDoc } from 'firebase/firestore';

const NavigationSidebar = () => {
  const user = useUser();  // Access user data from the context
  const [firstName, setFirstName] = useState('');  // State to store the first name
  const [lastName, setLastName] = useState('');  // State to store the last name


  useEffect(() => {
    if (user?.uid) {
      const fetchFullName = async () => {
        try {
          const docRef = doc(firestore, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // Assuming the field in Firestore is named 'firstName'
            setFirstName(docSnap.data().firstName);
            setLastName(docSnap.data().lastName);
          } else {
            console.log("No such document!");
            setFirstName("Unknown");
            setLastName("User");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setFirstName("Unknown");
          setLastName("User");
        }
      };

      fetchFullName();
    }
  }, [user?.uid]);  // Dependency array to re-fetch if user.uid changes

  return (
    <div className="sidebar">
       <div className="nav-links">
        <div className="navbar-link app-logo">
          <img src={`${process.env.PUBLIC_URL}/projectLogo.svg`} alt="Logo" className="navbar-logo" />
          <span className="navbar-text">APP NAME</span>
        </div>

        <NavbarLinks className="link-container" page="Dashboard" img={`${process.env.PUBLIC_URL}/dashboardInactive.svg`} activeImg={`${process.env.PUBLIC_URL}/dashboardActive.svg`} />

        <NavbarLinks className="link-container" page="Charities" img={`${process.env.PUBLIC_URL}/charitiesInactive.svg`} activeImg={`${process.env.PUBLIC_URL}/charitiesActive.svg`} />

        <NavbarLinks className="link-container" page="Wallet" img={`${process.env.PUBLIC_URL}/walletInactive.svg`} activeImg={`${process.env.PUBLIC_URL}/walletActive.svg`} />

        <div className="profile-info">
          <div className="navbar-link">
            <img src={`${process.env.PUBLIC_URL}/profileLogo.svg`}  alt="Logo" className="navbar-logo" />
            {/* Dynamically display the user's first and last name or a placeholder if not available */}
            <span className="navbar-text">{firstName && lastName ? `${firstName} ${lastName}` : 'Loading...'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;
