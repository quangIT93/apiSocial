import { Router } from 'express';
import storeController from '../Controllers/StoreController';
import verifyToken from '../middlewave/auth';
const router = Router();

router.get('/getAllStore', verifyToken, storeController.getAllStore);
router.post('/addStore', verifyToken, storeController.addStore);
router.delete('/deleteStore', verifyToken, storeController.deleteStore);

export default router;
