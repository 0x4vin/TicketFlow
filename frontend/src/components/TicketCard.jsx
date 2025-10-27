// /frontend/src/components/TicketCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// Simple component to display a ticket summary
const TicketCard = ({ ticket, onUpdate }) => {
  // Utility to get a color based on priority/status (for visual flair)
  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-indigo-100 text-indigo-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-200 text-gray-700';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 font-bold';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-600';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-white flex justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">
          <Link to={`/tickets/edit/${ticket._id}`} className="hover:text-blue-600 transition">
            {ticket.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 mb-2">Reported by: {ticket.reporter.name}</p>
        <p className={`text-sm ${getPriorityColor(ticket.priority)} capitalize`}>Priority: {ticket.priority}</p>
      </div>

      <div className="text-right">
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)} capitalize mb-2`}>
          {ticket.status}
        </span>
        <p className="text-sm text-gray-600">
          Assigned to: {ticket.assignedTo ? ticket.assignedTo.name : 'Unassigned'}
        </p>
        <p className="text-xs text-gray-400 mt-1">
            Created: {new Date(ticket.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default TicketCard;