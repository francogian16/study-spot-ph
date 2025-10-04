import React from "react";

function ConfirmationModal({ isOpen, onClose, onConfirm, title, children }) {
  // If the modal is not open, render nothing.
  if (!isOpen) {
    return null;
  }

  return (
    // The semi-transparent backdrop
    <div className="modal-overlay" onClick={onClose}>
      {/* The modal content box. We stop propagation to prevent the overlay's onClick from firing when clicking inside the modal. */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className="modal-body">{children}</div>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-secondary">
            Keep Booking
          </button>
          <button onClick={onConfirm} className="btn-danger">
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
