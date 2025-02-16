import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditEvent.css";

const EditEvent = ({ eventData, onClose, fetchEvents }) => { // ✅ Accept fetchEvents instead of setEvents
  const [formData, setFormData] = useState(eventData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFormData(eventData);
  }, [eventData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `http://localhost:8000/events/${eventData.id}/`, 
        formData
      );

      // ✅ Instead of using setEvents, fetch the updated events list
      await fetchEvents();  

      alert("✅ Event updated successfully!");
      onClose(); // Close edit form
    } catch (error) {
      alert("❌ Failed to update event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="edit-event-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Event</h2>
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p>Updating event...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />

            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />

            <label>Location:</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />

            <label>Category:</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />

            <label>Attendees:</label>
            <input type="number" name="attendees" value={formData.attendees} onChange={handleChange} required />

            <label>Ticket Price:</label>
            <input type="number" name="ticket_price" value={formData.ticket_price} onChange={handleChange} required />

            <label>Past Attendance:</label>
            <input type="number" name="past_attendance" value={formData.past_attendance} onChange={handleChange} required />

            <div className="button-group">
              <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Event"}</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditEvent;
