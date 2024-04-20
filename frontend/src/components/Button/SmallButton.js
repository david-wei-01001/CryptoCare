import React from 'react';
import './Button.css';

const SmallButton = ({ onClick, text }) => {
  return (
    <button className="small-button" onClick={onClick}>
      <span>{text}</span>
    </button>
  );
};

export default SmallButton;
