import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationSidebar.css';

const NavbarLink = ({ page, img }) => {
  let pageUrl = `/${page.toLowerCase()}`
  return (
    <Link to={pageUrl} className="navbar-link">
      <img src={img} alt="Logo" className="navbar-logo" />
      <span className="navbar-text">{page}</span>
    </Link>
  );
};

export default NavbarLink;
