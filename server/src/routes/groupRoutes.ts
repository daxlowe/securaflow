import express, { Request, Response } from 'express';
import 
{
    createGroup,
    getGroupData
} from '../controllers/groupController'
import { requireAuth } from '../middleware/requireAuth';

const router = express.Router();

// GET all tickets with user
router.post('/create', createGroup);

router.get('/:id', getGroupData)

export default router;