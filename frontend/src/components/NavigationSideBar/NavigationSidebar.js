import React from 'react';
import './NavigationSidebar.css';
import NavbarLinks from './NavbarLinks';
import charitiesActive from '../../images/charitiesActive.svg';
import dashboardActive from '../../images/dashboardActive.svg';
import walletActive from '../../images/walletActive.svg';
import projectLogo from '../../images/projectLogo.svg';
import profileLogo from '../../images/profileLogo.svg';

const NavigationSidebar = () => {
  return (
    <div className="sidebar">
       <div className="nav-links">
        <div className="navbar-link app-logo">
          <img src={projectLogo} alt="Logo" className="navbar-logo" />
          <span className="navbar-text">APP NAME</span>
        </div>

        <NavbarLinks page="Dashboard" img = {dashboardActive}/>
        <NavbarLinks page="Charities" img = {charitiesActive} />
        <NavbarLinks page="Wallet" img = {walletActive}/>

        <div className="profile-info">
          <div className="navbar-link">
            <img src={profileLogo} alt="Logo" className="navbar-logo" />
            <span className="navbar-text">Stephen Flores</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;
