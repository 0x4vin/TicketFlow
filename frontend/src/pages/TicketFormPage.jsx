// /frontend/src/pages/TicketFormPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api.js';
import { useAuth } from '../context/AuthContext';

const initialForm = {
    title: '',
    description: '',
    category: 'bug',
    priority: 'medium',
    status: 'new',
    assignedTo: '',
};

const TicketFormPage = () => {
    const { id } = useParams(); 
    const isEditMode = !!id;
    const navigate = useNavigate();
    const { user } = useAuth();

    const [formData, setFormData] = useState(initialForm);
    const [users, setUsers] = useState([]); // Array to hold assignable users
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitMessage, setSubmitMessage] = useState(null);

    // 1. Fetch existing ticket data for editing (If in Edit Mode)
    useEffect(() => {
        if (isEditMode) {
            const fetchTicket = async () => {
                setLoading(true);
                try {
                    // Fetch all tickets and find the specific one. 
                    // (A dedicated single ticket endpoint is better, but this works for now)
                    const res = await api.get(`/tickets`); 
                    const ticket = res.data.find(t => t._id === id); 
                    
                    if (ticket) {
                        setFormData({
                            title: ticket.title,
                            description: ticket.description,
                            category: ticket.category,
                            priority: ticket.priority,
                            status: ticket.status,
                            // Ensure assignedTo handles null or undefined values
                            assignedTo: ticket.assignedTo?._id || '', 
                        });
                    }
                } catch (err) {
                    setError('Failed to load ticket for editing. It may not exist or you lack permission.');
                } finally {
                    setLoading(false);
                }
            };
            fetchTicket();
        }
    }, [id, isEditMode]);

    // 2. Fetch assignable users (Admins/Devs only)
    useEffect(() => {
        if (['admin', 'developer'].includes(user.role)) {
            const fetchUsers = async () => {
                try {
                    // **THIS CALLS THE NEW API ENDPOINT WE CREATED**
                    const res = await api.get('/users'); 
                    setUsers(res.data);
                } catch (err) {
                    // Log error but don't stop the form from rendering
                    console.error("Could not fetch users for assignment:", err.response?.data?.message || err.message);
                }
            };
            fetchUsers();
        }
    }, [user.role]); // Depends only on the user role

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSubmitMessage(null);

        const dataToSend = { ...formData };
        
        // Final client-side check: Clients cannot set status or assignment
        if (user.role === 'client') {
             delete dataToSend.assignedTo;
             delete dataToSend.status; 
        }

        try {
            if (isEditMode) {
                await api.put(`/tickets/${id}`, dataToSend);
                setSubmitMessage('Ticket updated successfully!');
            } else {
                await api.post('/tickets', dataToSend);
                setSubmitMessage('Ticket created successfully!');
                setFormData(initialForm); // Clear form on creation
            }
            // Give a moment to see the success message before navigating
            setTimeout(() => navigate('/tickets'), 1500); 
        } catch (err) {
            const msg = err.response?.data?.message || (isEditMode ? 'Update failed.' : 'Creation failed.');
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <div className="text-center p-8">Loading Ticket Data...</div>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-8 bg-white border rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6">{isEditMode ? 'Edit Ticket' : 'Create New Ticket'}</h1>
            
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            {submitMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{submitMessage}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title and Description */}
                <div>
                    <label className="block text-gray-700">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="5" className="w-full p-2 border rounded" required></textarea>
                </div>

                {/* Category and Priority */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
                            <option value="bug">Bug</option>
                            <option value="feature">Feature</option>
                            <option value="update">Update</option>
                            <option value="support">Support</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Priority</label>
                        <select name="priority" value={formData.priority} onChange={handleChange} className="w-full p-2 border rounded">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>
                </div>
                
                {/* Status and Assignment (Admin/Developer only) */}
                {['admin', 'developer'].includes(user.role) && (
                    <div className="grid grid-cols-2 gap-4 border-t pt-4">
                        <div>
                            <label className="block text-gray-700">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
                                <option value="new">New</option>
                                <option value="assigned">Assigned</option>
                                <option value="in-progress">In-Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700">Assigned To</label>
                            <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="w-full p-2 border rounded">
                                <option value="">Unassigned</option>
                                {/* Display users if they were fetched successfully */}
                                {users.length > 0 ? (
                                    users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.role})</option>)
                                ) : (
                                    // Fallback text while loading or if list is empty
                                    <option disabled>Loading Developers...</option>
                                )}
                            </select>
                        </div>
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 mt-6"
                >
                    {loading ? 'Processing...' : isEditMode ? 'Update Ticket' : 'Create Ticket'}
                </button>
            </form>
        </div>
    );
};

export default TicketFormPage;