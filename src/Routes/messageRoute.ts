import { Router } from 'express';
import messageController from '../Controllers/MessageController';
import verifyToken from '../middlewave/auth';
const router = Router();

router.get('/getAllMessageUserSend', verifyToken, messageController.getAllMessageUserSend);
router.get('/getAllUserSend', verifyToken, messageController.getAllUserSend);
router.post('/createMessageSenderId', verifyToken, messageController.createMessageSenderId);
router.delete(
  '/deleteMessageIdUserIdSend',
  verifyToken,
  messageController.deleteMessageIdUserIdSend
);

export default router;
