// /backend/src/routes/ticketRoutes.js

import express from 'express';
import { createTicket, getTickets, updateTicket, deleteTicket } from '../controllers/ticketController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

// All ticket routes require authentication
router.use(protect);

router.route('/')
  .post(createTicket)
  .get(getTickets);

router.route('/:id')
  .put(updateTicket)
  .delete(deleteTicket);

export default router;