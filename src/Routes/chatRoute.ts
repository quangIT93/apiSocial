import { Router } from 'express';
import chatController from '../Controllers/ChatController';
import verifyToken from '../middlewave/auth';
const router = Router();

router.get('/getAllUserSend', verifyToken, chatController.getAllUserSend);
router.get('/getAllMessageOfChatId', verifyToken, chatController.getAllMessageOfChatId);
router.post('/createMessageOfChatId', verifyToken, chatController.createMessageOfChatId);
router.delete('/deleteChatId', verifyToken, chatController.deleteChatId);
router.delete('/deleteMessageOfChatId', verifyToken, chatController.deleteMessageOfChatId);

export default router;
