// /frontend/src/pages/TicketListPage.jsx

import React, { useState, useEffect } from 'react';
import api from '../api/api.js';
import { Link } from 'react-router-dom';
import TicketCard from '../components/TicketCard.jsx';

const TicketListPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get('/tickets');
      setTickets(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch tickets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);
  
  // Function to pass to TicketCard to refresh the list after an action
  const handleTicketUpdate = () => {
      fetchTickets();
  };

  if (loading) return <div className="text-center p-8">Loading Tickets...</div>;
  if (error) return <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded text-center">{error}</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Tickets</h1>
        <Link 
          to="/tickets/new" 
          className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition font-semibold"
        >
          + New Ticket
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tickets.length === 0 ? (
          <p className="text-center text-gray-500 text-lg p-8 border rounded-lg">No tickets found.</p>
        ) : (
          tickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} onUpdate={handleTicketUpdate} />
          ))
        )}
      </div>
    </div>
  );
};

export default TicketListPage;