import { Router } from 'express';
import jobController from '../Controllers/JobController';
import verifyToken from '../middlewave/auth';
const router = Router();

router.get('/getJobUser', verifyToken, jobController.getJobUser);
router.post('/createJobUser', verifyToken, jobController.createJobUser);
router.post('/EditJobUser', verifyToken, jobController.EditJobUser);

export default router;
