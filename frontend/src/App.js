import React, { useState } from "react";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import "./App.css";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]); // Add new event to list
    setShowForm(false); // Hide form after submission
  };

  return (
    <div className="app-container">
      <h2>Event Management</h2>
      {!showForm ? (
        <EventList events={events} setEvents={setEvents} setShowForm={setShowForm} />
      ) : (
        <EventForm addEvent={addEvent} setShowForm={setShowForm} />
      )}
    </div>
  );
};

export default App;
