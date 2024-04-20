import React from 'react';
import './NavigationSidebar.css';
import NavbarLinks from './NavbarLinks';
import { useUser } from '../contexts/UserContext.js';

const NavigationSidebar = () => {
  const user = useUser();  // Access user data from the context

  return (
    <div className="sidebar">
       <div className="nav-links">
        <div className="navbar-link app-logo">
          <img src={`${process.env.PUBLIC_URL}/projectLogo.svg`} alt="Logo" className="navbar-logo" />
          <span className="navbar-text">APP NAME</span>
        </div>

        <NavbarLinks page="Dashboard" img={`${process.env.PUBLIC_URL}/dashboardActive.svg`} />
        <NavbarLinks page="Charities" img={`${process.env.PUBLIC_URL}/charitiesActive.svg`} />
        <NavbarLinks page="Wallet" img={`${process.env.PUBLIC_URL}/walletActive.svg`} />

        <div className="profile-info">
          <div className="navbar-link">
            <img src={`${process.env.PUBLIC_URL}/profileLogo.svg`}  alt="Logo" className="navbar-logo" />
            {/* Dynamically display the user's first and last name or a placeholder if not available */}
            <span className="navbar-text">{user ? `${user.firstName} ${user.lastName}` : 'Loading...'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;
