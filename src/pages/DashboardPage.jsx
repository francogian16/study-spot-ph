import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ConfirmationModal from "../components/ConfirmationModal"; // Import the new component

function DashboardPage() {
  const { user, bookings, cancelBooking } = useAuth();

  // State for controlling the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to hold the ID of the booking to be cancelled
  const [bookingToCancel, setBookingToCancel] = useState(null);

  // Function to open the modal and set the target booking
  const handleOpenConfirmModal = (bookingId) => {
    setBookingToCancel(bookingId);
    setIsModalOpen(true);
  };

  // Function to close the modal and clear the target booking
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBookingToCancel(null);
  };

  // Function to be executed when the user confirms the cancellation
  const handleConfirmCancel = () => {
    if (bookingToCancel) {
      cancelBooking(bookingToCancel);
    }
    // Close the modal after confirming
    handleCloseModal();
  };

  return (
    <>
      {" "}
      {/* Use a Fragment to wrap the page content and the modal */}
      <div className="page-content dashboard">
        <h1>Welcome to your Dashboard, {user.name}</h1>

        <div className="dashboard-section">
          <h2>My Bookings</h2>
          {bookings.length > 0 ? (
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <img src={booking.spaceImage} alt={booking.spaceName} />
                  <div className="booking-details">
                    <h4>{booking.spaceName}</h4>
                    <p>Date: {booking.date}</p>
                    <p>Slot: {booking.slot}</p>
                  </div>
                  {/* This button now opens the modal instead of calling cancelBooking directly */}
                  <button
                    onClick={() => handleOpenConfirmModal(booking.id)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>You have no active bookings. Go find a spot!</p>
          )}
        </div>
      </div>
      {/* Render the modal component here */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancel}
        title="Confirm Cancellation"
      >
        <p>
          Are you sure you want to permanently cancel this booking? This action
          cannot be undone.
        </p>
      </ConfirmationModal>
    </>
  );
}

export default DashboardPage;
