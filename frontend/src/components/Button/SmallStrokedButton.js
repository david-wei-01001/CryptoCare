import React from 'react';
import './Button.css';

const SmallStrokedButton = ({ onClick, text }) => {
  return (
    <button className="small-button stroke" onClick={onClick}>
      <span>{text}</span>
    </button>
  );
};

export default SmallStrokedButton;
