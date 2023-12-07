import express, { Request, Response } from 'express';
import 
{
    createGroup
} from '../controllers/groupController'

const router = express.Router();

// GET all tickets with user
router.post('/create', createGroup);

export default router;