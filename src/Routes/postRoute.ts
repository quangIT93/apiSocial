import { Router } from 'express';
import postController from '../Controllers/PostController';
import verifyToken from '../middlewave/auth';
const router = Router();

router.get('/getAllPostFriend', verifyToken, postController.getAllPostFriend);
router.get('/getAllPostUser', verifyToken, postController.getAllPostUser);
router.post('/createPost', verifyToken, postController.createPost);
router.post('/deletePost', verifyToken, postController.deletePost);

export default router;
