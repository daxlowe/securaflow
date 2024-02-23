import express, { Request, Response } from 'express';
import 
{
    getAllPossibleTickets,
    getAllAssignedTickets,
    getSingleTicket,
    createTicket, 
    deleteTicket,
    updateTicket,
    getTicketHandler,
    deleteTicketHandler,
    updateTicketHandler,
    createTicketHandler
} from '../controllers/ticketController';
import { body } from 'express-validator';
import { requireAuth } from '../middleware/requireAuth';
import deserializeUser from '../middleware/deserializeUser';
import { createTicketSchema, deleteTicketSchema, getTicketInput, getTicketSchema, updateTicketSchema } from '../schema/ticketSchema';
import { validate } from '../middleware/validateResource';
import requireUser from '../middleware/requireUser';

const router = express.Router();
router.use(deserializeUser);

//router.use(requireAuth);

const createTicketValidationRules = () => {
    return [
        body('title').notEmpty().withMessage('Title is required'),
        body('team').optional(),
        body('description').notEmpty().withMessage('Description is required'),
        body('difficulty').notEmpty().withMessage('Difficulty is required'),
        body('assignees').optional(),
        body('time_estimate').optional().isNumeric().withMessage('Time estimate must be a number'),
        body('current_status').notEmpty().withMessage('Current Status is required'),
        body('status_updates').optional().isArray().withMessage('Status updates must be an array'),
        body('vulnerability').isObject().withMessage('Vulnerability must be an object'),
        body('vulnerability.name').notEmpty().withMessage('Vulnerability Name is required'),
        body('vulnerability.cve_id').notEmpty().withMessage('CVE ID is required'),
        body('vulnerability.priority').notEmpty().withMessage('Priority is required'),
        body('comments').optional().isArray().withMessage('Comments must be an array')
    ];
}

// GET all tickets from user's groups
router.get('/', getAllPossibleTickets);

// GET all tickets assigned to user
router.get('/assigned', getAllAssignedTickets);

// GET a single ticket
router.get('/:id', [requireUser, validate(getTicketSchema)], getTicketHandler);

// CREATE a ticket
router.post('/', [requireUser, validate(createTicketSchema)], createTicketHandler);

// DELETE a ticket
router.delete('/:id', [requireUser, validate(deleteTicketSchema)], deleteTicketHandler);

// PATCH a ticket
router.patch('/:id', [requireUser, validate(updateTicketSchema)], updateTicketHandler);


// Other user routes (POST, PUT, DELETE, etc.)

export default router;