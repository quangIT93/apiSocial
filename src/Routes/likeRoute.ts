import { Router } from 'express';
import likeController from '../Controllers/LikeController';
import verifyToken from '../middlewave/auth';
const router = Router();

router.get('/getAllLikeOfPostId', verifyToken, likeController.getAllLikeOfPostId);
router.get('/getUserLikeOfPostId', verifyToken, likeController.getUserLikeOfPostId);
router.post('/createLikeForPostId', verifyToken, likeController.createLikeForPostId);
router.post('/deleteLikeForPostId', verifyToken, likeController.deleteLikeForPostId);

export default router;
