import express, { Request, Response, Router } from 'express';
import { requireAuth } from '../middleware/requireAuth';
// Import other necessary modules, like controllers or middleware
import 
{
    loginUser, 
    signupUser,
    updateUser,
    getUserData,
} from '../controllers/userController';

const router = express.Router();

// Example route for getting user data
router.get('/users/:id', getUserData);

router.post('/login', loginUser)

router.post('/signup', signupUser);

router.use(requireAuth);

router.patch('/', updateUser);

// Other user routes (POST, PUT, DELETE, etc.)

export default router;
