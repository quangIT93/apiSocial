import { Router } from 'express';
import authController from '../Controllers/AuthController';
import verifyToken from '../middlewave/auth';
const router = Router();

router.get('/', verifyToken, authController.home);
router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;
