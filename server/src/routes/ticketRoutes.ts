import express, { Request, Response } from 'express';
import 
{
    getAllTickets,
    getSingleTicket,
    createTicket, 
    deleteTicket,
    updateTicket
} from '../controllers/ticketController';

import { requireAuth } from '../middleware/requireAuth';

const router = express.Router();

router.use(requireAuth);

// GET all tickets with user
router.get('/', getAllTickets);

// GET a single ticket
router.get('/:id', getSingleTicket);

// CREATE a ticket
router.post('/', createTicket);

// DELETE a ticket
router.delete('/:id', deleteTicket);

// PATCH a ticket
router.patch('/:id', updateTicket);


// Other user routes (POST, PUT, DELETE, etc.)

export default router;