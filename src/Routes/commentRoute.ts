import { Router } from 'express';
import commentController from '../Controllers/CommentController';
import verifyToken from '../middlewave/auth';
const router = Router();

router.get('/getAllPostFriend', verifyToken, commentController.getCommentPost);
router.delete('/deleleCommentPost', verifyToken, commentController.deleleCommentPost);
router.post('/createCommentPost', verifyToken, commentController.createCommentPost);

export default router;
