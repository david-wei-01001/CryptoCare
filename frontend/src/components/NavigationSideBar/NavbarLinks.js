import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavigationSidebar.css';

const NavbarLink = ({ page, img, activeImg }) => {
  const { pathname } = useLocation();
  const isActive = pathname === `/${page.toLowerCase()}`;

  let pageUrl = `/${page.toLowerCase()}`
  return (
    <Link to={pageUrl} className={`navbar-link ${isActive ? 'active' : ''}`}>
      <img src={isActive ? activeImg : img} alt={page}className="navbar-logo" />
      <span className="navbar-text">{page}</span>
    </Link>
  );
};

export default NavbarLink;
