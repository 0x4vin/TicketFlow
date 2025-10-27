// /frontend/src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">TicketFlow</Link>

        <div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user.name} ({user.role})</span>
              <Link to="/tickets" className="text-gray-300 hover:text-white">Tickets</Link>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
              <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;