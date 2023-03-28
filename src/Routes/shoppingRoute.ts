import { Router } from 'express';
import shoppingController from '../Controllers/ShoppingController';
import verifyToken from '../middlewave/auth';
const router = Router();

router.get('/getAllProduct', verifyToken, shoppingController.getAllProductOfBagUser);
router.get('/getAllProductOfStore', verifyToken, shoppingController.getAllProductUserBought);
router.post('/addProductOfStore', verifyToken, shoppingController.addProductOfBagUser);
router.delete('/deleteProductOfStore', verifyToken, shoppingController.deleteProductOfBagUser);

export default router;
