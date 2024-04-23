import React from 'react';
import './Modal.css'

const Modal = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Modal Title</h2>
          <p>This is the modal content.</p>
        </div>
      </div>
    )
  );
};

export default Modal;
