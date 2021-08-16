import express from 'express';
import { verifyAuthToken } from '../middleware/authorization';

import {
    showAllProducts,
    showOneProduct,
    showProductsByCategory,
    createProduct,
    editProduct,
    deleteProduct,
} from '../controllers/productController';
import {
    topProductsByOrders,
    topProductsByOrdersVolume
} from '../controllers/orderProductsController';

const router = express.Router();

router.get('/all', showAllProducts);

router.get('/id/:productId', showOneProduct);

router.get('/category/:category', showProductsByCategory);

router.get('/top/:qty', verifyAuthToken, topProductsByOrders);

router.get('/top/byvolume/:qty', verifyAuthToken, topProductsByOrdersVolume);

router.post('/', verifyAuthToken, createProduct);

router.put('/id/:productId', verifyAuthToken, editProduct);

router.delete('/id/:productId', verifyAuthToken, deleteProduct);

export default router;
