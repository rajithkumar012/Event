import React, { useEffect, useState } from "react";
import axios from "axios";
import EditEvent from "./EditEvent"; // Ensure correct import path
import "./EventList.css";

const EventList = ({ events, setEvents, setShowForm }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/events/");
        setEvents(response.data);
      } catch (err) {
        setError("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [setEvents]);

  const handleRowClick = (event) => {
    setSelectedEvent(event);
    setShowEditForm(false); // Ensure edit form doesn't auto-open on row click
  };

  const handleEdit = () => {
    if (!selectedEvent) {
      alert("⚠️ Please select an event to edit.");
      return;
    }
    setShowEditForm(true);
  };
  

  const handleDelete = async () => {
    if (!selectedEvent) {
      alert("⚠️ Please select an event to delete.");
      return;
    }
  
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${selectedEvent.title}"?`
    );
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:8000/events/${selectedEvent.id}/`);
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
      setSelectedEvent(null);
      alert("✅ Event deleted successfully!");
    } catch (err) {
      alert("❌ Failed to delete event.");
    }
  };
  

  return (
    <div className="event-list-container">
      <h2>Event Listings</h2>

      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}

      <table className="event-table">
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Date</th><th>Location</th>
            <th>Category</th><th>Attendees</th><th>Ticket Price</th>
            <th>Past Attendance</th><th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr>
              <td colSpan="9" className="no-data">No data available</td>
            </tr>
          ) : (
            events.map((event) => (
              <tr
                key={event.id}
                onClick={() => handleRowClick(event)}
                className={selectedEvent?.id === event.id ? "selected-row" : ""}
              >
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td>{event.category}</td>
                <td>{event.attendees}</td>
                <td>${event.ticket_price}</td>
                <td>{event.past_attendance}</td>
                <td>{event.popularity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="action-buttons">
  <button onClick={() => setShowForm(true)}>+ Add Event</button>
  <button onClick={handleEdit}>Edit Event</button>
  <button onClick={handleDelete} className="delete-btn">
    Delete Event
  </button>
</div>


{showEditForm && selectedEvent && (
  <EditEvent 
    eventData={selectedEvent} 
    onClose={() => setShowEditForm(false)} 
    fetchEvents={() => { // ✅ Pass fetchEvents function
      axios.get("http://localhost:8000/events/")
        .then(response => setEvents(response.data))
        .catch(error => console.error("Error fetching events:", error));
    }}
  />
)}


    </div>
  );
};

export default EventList;
