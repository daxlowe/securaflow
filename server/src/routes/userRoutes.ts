import express, { Request, Response, Router } from 'express';
import { requireAuth } from '../middleware/requireAuth';
// Import other necessary modules, like controllers or middleware
import { validate } from '../middleware/validateResource';
import { createUserSchema } from '../schema/userSchema';
import 
{
    loginUser, 
    signupUser,
    updateUser,
    getUserData,
    getUserGroups,
} from '../controllers/userController';

const router = express.Router();

router.post('/login', loginUser)

router.post('/signup', validate(createUserSchema), signupUser);

router.use(requireAuth);

router.get('/', getUserData);

router.patch('/', updateUser);

router.get('/:id/groups', getUserGroups);

// Other user routes (POST, PUT, DELETE, etc.)

export default router;
