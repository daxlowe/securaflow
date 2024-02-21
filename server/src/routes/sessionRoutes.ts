import express from 'express';
import { deleteSession, getUserSessions } from '../controllers/sessionController';
import { createUserSession } from '../controllers/sessionController';
import { validate } from '../middleware/validateResource';
import { createSessionSchema } from '../schema/sessionSchema';
import deserializeUser  from '../middleware/deserializeUser';
import requireUser from '../middleware/requireUser';

const router = express.Router();

router.post('/', validate(createSessionSchema), createUserSession);

router.use(deserializeUser);

router.get('/', requireUser, getUserSessions);

router.delete('/', requireUser, deleteSession);

export default router;
