import express, { Request, Response } from 'express';
import 
{
    getAllTickets,
    getSingleTicket,
    createTicket, 
    deleteTicket,
    updateTicket,
    getUsersTickets,
} from '../controllers/ticketController';

const router = express.Router();

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

// GET all tickets associated with user
router.get('/user/:userId', getUsersTickets);

// Other user routes (POST, PUT, DELETE, etc.)

export default router;