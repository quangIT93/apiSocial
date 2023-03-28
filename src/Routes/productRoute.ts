import { Router } from 'express';
import productController from '../Controllers/ProductController';
import verifyToken from '../middlewave/auth';
const router = Router();

router.get('/getAllProduct', verifyToken, productController.getAllProduct);
router.get('/getAllProductOfStore', verifyToken, productController.getAllProductOfStore);
router.post('/addProductOfStore', verifyToken, productController.addProductOfStore);
router.delete('/deleteProductOfStore', verifyToken, productController.deleteProductOfStore);

export default router;
