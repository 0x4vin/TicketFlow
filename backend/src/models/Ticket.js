// /backend/src/models/Ticket.js

import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['bug', 'feature', 'update', 'support'], default: 'bug' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  status: { type: String, enum: ['new', 'assigned', 'in-progress', 'resolved', 'closed'], default: 'new' },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);