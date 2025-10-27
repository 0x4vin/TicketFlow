// /backend/src/app.js

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Body parser for raw JSON
app.use(morgan('dev')); // Logging HTTP requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// Global error handling middleware (must be last)
app.use(errorHandler);

export default app;