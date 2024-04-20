import React from 'react';
import './NavigationSidebar.css';
import NavbarLinks from './NavbarLinks';

const NavigationSidebar = () => {
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
            <span className="navbar-text">Stephen Flores</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;
