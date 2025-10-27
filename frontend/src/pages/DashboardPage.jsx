// /frontend/src/pages/DashboardPage.jsx

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome, {user.name}!</h1>
      <p className="text-xl text-gray-600 mb-8">
        Your role: <span className="font-semibold capitalize">{user.role}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Link to="/tickets" className="block p-6 bg-blue-100 rounded-lg shadow hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold text-blue-800">View All Tickets</h3>
          <p className="text-blue-600 mt-2">Check the status of your reported or assigned tickets.</p>
        </Link>
        <Link to="/tickets/new" className="block p-6 bg-green-100 rounded-lg shadow hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold text-green-800">Create New Ticket</h3>
          <p className="text-green-600 mt-2">Report a bug, request a feature, or submit a support query.</p>
        </Link>
        
        {/* Role-specific content placeholder */}
        {user.role === 'admin' && (
          <div className="p-6 bg-yellow-100 rounded-lg shadow">
            <h3 className="text-2xl font-semibold text-yellow-800">Admin Overview</h3>
            <p className="text-yellow-600 mt-2">View system reports and manage user accounts (Future Phase).</p>
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-semibold mb-4">Dashboard Overview (Stats Placeholder)</h2>
        <div className="bg-gray-100 p-6 rounded-lg">
          <p>
            *In **Phase 2**, this area will contain charts and key metrics
            (e.g., Open vs. Closed Tickets, Tickets per Developer).*
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;