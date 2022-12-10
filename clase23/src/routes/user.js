import { Router } from 'express';
const router = Router();
import { login, logout, visit, infoSession } from '../controller/user.js';
import { validateLogIn } from '../middleweare/auth'

router.post('/login',login);
router.get('/info', validateLogIn, infoSession);
router.get('/visitas', validateLogIn, visit);
router.post('/logout', logout);

export default router;