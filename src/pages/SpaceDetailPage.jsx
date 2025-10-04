import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../contexts/AuthContext";

function SpaceDetailPage() {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, addBooking } = useAuth();

  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    fetch("/data/spaces.json")
      .then((res) => res.json())
      .then((data) => {
        const foundSpace = data.find((s) => s.id === parseInt(spaceId));
        setSpace(foundSpace);
        if (foundSpace && foundSpace.time_slots.length > 0) {
          setSelectedSlot(foundSpace.time_slots[0]); // Default to first slot
        }
        setLoading(false);
      });
  }, [spaceId]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please log in to book a spot.");
      return;
    }
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }
    const bookingDetails = {
      spaceId: space.id,
      spaceName: space.name,
      spaceImage: space.main_image,
      date: selectedDate.toLocaleDateString(),
      slot: selectedSlot,
    };
    addBooking(bookingDetails);
    alert("Booking successful! View it in your dashboard.");
    navigate("/dashboard/my-bookings");
  };

  if (loading) return <p className="page-content">Loading space details...</p>;
  if (!space) return <p className="page-content">Space not found.</p>;

  return (
    <div className="page-content detail-page">
      <div className="detail-header">
        <img
          src={space.main_image}
          alt={space.name}
          className="detail-main-image"
        />
        <h1>{space.name}</h1>
        <p className="location">{space.location}</p>
      </div>

      <div className="detail-body">
        <div className="space-info">
          <h3>About this space</h3>
          <p>{space.description}</p>
          <h3>Amenities</h3>
          <ul className="amenities-list">
            {space.amenities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="booking-form-container">
          <h3>Book Your Spot</h3>
          <form onSubmit={handleBookingSubmit} className="booking-form">
            <div className="form-group">
              <label>Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                className="date-picker"
              />
            </div>
            <div className="form-group">
              <label>Time Slot</label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                {space.time_slots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="book-now-btn">
              {isAuthenticated ? `Book Now (₱${space.price})` : "Login to Book"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SpaceDetailPage;
