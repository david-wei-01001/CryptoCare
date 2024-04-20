import React from 'react';
import './Dashboard.css';
import NavigationSidebar from '../NavigationSideBar/NavigationSidebar';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        {<NavigationSidebar />}
      </div>
      <div className="content">
        <h1>Welcome, Stephan</h1>
      </div>
    </div>
  );
};

export default Dashboard;
