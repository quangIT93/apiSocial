import { Router } from 'express';
import educationController from '../Controllers/EducationController';
import verifyToken from '../middlewave/auth';
const router = Router();

router.get('/getEducationOfUser', verifyToken, educationController.getEducationOfUser);
router.post('/editEducationOfUser', verifyToken, educationController.editEducationOfUser);
router.post('/createEductionUser', verifyToken, educationController.createEductionUser);

export default router;
