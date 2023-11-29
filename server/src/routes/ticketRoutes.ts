import express, { Request, Response } from 'express';
import 
{
    get_all_tickets,
    get_single_ticket,
    create_ticket, 
    delete_ticket,
    update_ticket,
    get_users_tickets,
} from '../controllers/ticketController';

const router = express.Router();

// GET all tickets with user
router.get('/', get_all_tickets);

// GET a single ticket
router.get('/:id', get_single_ticket);

// CREATE a ticket
router.post('/', create_ticket);

// DELETE a ticket
router.delete('/:id', delete_ticket);

// PATCH a ticket
router.patch('/:id', update_ticket);

// GET all tickets associated with user
router.get('/user/:userId', get_users_tickets);

// Other user routes (POST, PUT, DELETE, etc.)

export default router;