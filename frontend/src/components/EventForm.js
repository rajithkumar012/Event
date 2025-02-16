import React, { useState } from "react";
import axios from "axios";
import "./EventForm.css";

const EventForm = ({ refreshEvents = () => {}, setShowForm }) => {
  const [eventData, setEventData] = useState({
    title: "", date: "", location: "", category: "",
    attendees: "", ticket_price: "", past_attendance: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Success message state

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null); // Reset messages before submission

    try {
      const response = await axios.post("http://localhost:8000/events/", eventData);
      console.log("Event added:", response.data);
      setSuccess("Event added successfully! 🎉"); // Set success message
      refreshEvents(); // Refresh the event list

      // Clear the form after successful submission
      setEventData({
        title: "", date: "", location: "", category: "",
        attendees: "", ticket_price: "", past_attendance: ""
      });

      // Hide the success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
        setShowForm(false); // Hide form
      }, 3000);

    } catch (err) {
      console.error("Error adding event:", err);
      setError("Failed to add event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-form-fullscreen">
      <form className="event-form" onSubmit={handleSubmit}>
        <h2>Add New Event</h2>
        
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>} {/* Success message */}
        
        <input type="text" name="title" placeholder="Title" value={eventData.title} onChange={handleChange} required />
        <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={eventData.location} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={eventData.category} onChange={handleChange} required />
        <input type="number" name="attendees" placeholder="Attendees" value={eventData.attendees} onChange={handleChange} required />
        <input type="number" name="ticket_price" placeholder="Ticket Price" value={eventData.ticket_price} onChange={handleChange} required />
        <input type="number" name="past_attendance" placeholder="Past Attendance" value={eventData.past_attendance} onChange={handleChange} required />

        <div className="form-buttons">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
