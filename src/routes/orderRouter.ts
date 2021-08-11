import express from 'express';

import {
    showUserOrders,
    showCompletedUserOrders,
    showActivedUserOrders,
    createOrder,
    editOrderStatus,
    deleteOrder,
    addProductToOrder,
    deleteProductFromOrder,
} from '../controllers/orderController';
import { verifyAuthToken } from '../middleware/authorization';
import { verifyUserPermission } from '../middleware/permission';

const router = express.Router();

router.get(
    '/userid/:userId/all',
    verifyAuthToken,
    verifyUserPermission,
    showUserOrders
);

router.get(
    '/userid/:userId/active',
    verifyAuthToken,
    verifyUserPermission,
    showActivedUserOrders
);

router.get(
    '/userid/:userId/completed',
    verifyAuthToken,
    verifyUserPermission,
    showCompletedUserOrders
);

router.post(
    '/userid/:userId',
    verifyAuthToken,
    verifyUserPermission,
    createOrder
);

router.post(
    '/userid/:userId/orderid/:orderId/productid/:productId/qty/:qty',
    verifyAuthToken,
    verifyUserPermission,
    addProductToOrder
);

router.delete(
    '/userid/:userId/orderid/:orderId/productid/:productId',
    verifyAuthToken,
    verifyUserPermission,
    deleteProductFromOrder
);

router.put(
    '/userid/:userId/orderid/:orderId',
    verifyAuthToken,
    verifyUserPermission,
    editOrderStatus
);

router.delete(
    '/userid/:userId/orderid/:orderId',
    verifyAuthToken,
    verifyUserPermission,
    deleteOrder
);

export default router;
