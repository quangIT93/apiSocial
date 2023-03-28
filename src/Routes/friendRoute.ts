import { Router } from 'express';
import friendController from '../Controllers/FriendController';
import verifyToken from '../middlewave/auth';
const router = Router();

router.get('/allFriend', verifyToken, friendController.getAllFriend);
router.get('/allFriendOfUser', verifyToken, friendController.getAllFriendOfUser);

export default router;
