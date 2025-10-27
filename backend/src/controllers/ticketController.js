// /backend/src/controllers/ticketController.js

import Ticket from '../models/Ticket.js';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private (Auth required)
export const createTicket = asyncHandler(async (req, res) => {
  const { title, description, category, priority } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error('Please add a title and description');
  }

  const ticket = await Ticket.create({
    title,
    description,
    category,
    priority,
    reporter: req.user._id, // Reporter is the logged-in user
  });

  res.status(201).json(ticket);
});

// @desc    Get all tickets (role-based)
// @route   GET /api/tickets
// @access  Private (Auth required)
export const getTickets = asyncHandler(async (req, res) => {
  let query = {};

  // Clients only see tickets they reported
  if (req.user.role === 'client') {
    query.reporter = req.user._id;
  }
  // Developers see tickets they reported OR are assigned to them
  else if (req.user.role === 'developer') {
    query.$or = [{ reporter: req.user._id }, { assignedTo: req.user._id }];
  }
  // Admins see all tickets

  const tickets = await Ticket.find(query)
    .populate('reporter', 'name role')
    .populate('assignedTo', 'name role')
    .sort({ createdAt: -1 });

  res.status(200).json(tickets);
});

// @desc    Update a ticket
// @route   PUT /api/tickets/:id
// @access  Private (Auth required)
export const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // Authorization check: Only the reporter, a developer, or an admin can update.
  const isReporter = ticket.reporter.toString() === req.user.id;
  const isAdminOrDev = ['admin', 'developer'].includes(req.user.role);

  if (!isReporter && !isAdminOrDev) {
    res.status(403);
    throw new Error('Not authorized to update this ticket');
  }

  // Prevent clients from changing 'assignedTo' or 'status'
  if (req.user.role === 'client') {
    delete req.body.assignedTo;
    // Allow clients to close/resolve their own tickets only if they are the reporter
    if (req.body.status && req.body.status !== 'closed' && req.body.status !== 'resolved') {
        res.status(403);
        throw new Error('Clients can only resolve or close their own tickets.');
    }
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate('reporter', 'name role')
    .populate('assignedTo', 'name role');

  res.status(200).json(updatedTicket);
});

// @desc    Delete a ticket
// @route   DELETE /api/tickets/:id
// @access  Private (Admin only)
export const deleteTicket = asyncHandler(async (req, res) => {
  // Check if user is Admin
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete tickets');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  await Ticket.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: 'Ticket removed' });
});