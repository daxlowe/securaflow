import express, { Request, Response } from 'express';
// Import other necessary modules, like controllers or middleware
import 
{
    loginUser, 
    signupUser
} from '../controllers/userController';

const router = express.Router();

// Example route for getting user data
router.get('/users/:id', (req: Request, res: Response) => {
    // Logic here, e.g., fetching user data
});

router.post('/login', loginUser)

router.post('/signup', signupUser);

// Other user routes (POST, PUT, DELETE, etc.)

export default router;
