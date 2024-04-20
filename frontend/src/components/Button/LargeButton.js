import React from 'react';
import './Button.css';

const LargeButton = ({ onClick, text }) => {
  return (
    <button className="large-button" onClick={onClick}>
      <span>{text}</span>
    </button>
  );
};

export default LargeButton;
