import { Router } from 'express';
import authController from '../Controllers/AuthController';

const router = Router();

router.post('/login', authController.login);
router.get('/register', authController.register);

export default router;
