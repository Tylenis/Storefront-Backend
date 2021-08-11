import { Request, Response } from 'express';
import { OrderModel } from '../models/orderModel';
import { Order } from '../types/types';

const orderModel = new OrderModel();

const showUserOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.userId);
        const userOrders = await orderModel.showAllByUserId(id);
        res.json(userOrders);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const showCompletedUserOrders = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = parseInt(req.params.userId);
        const completedOrders = await orderModel.showByStatus(id, 'completed');
        res.json(completedOrders);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const showActivedUserOrders = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const id = parseInt(req.params.userId);
        const activeOrders = await orderModel.showByStatus(id, 'active');
        res.json(activeOrders);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.params.userId);
        const newOrderData: Order = { userId: userId, status: req.body.status };
        const newOrder = await orderModel.create(newOrderData);
        res.json(newOrder);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const editOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderStatus = req.body.status;
        const orderId = parseInt(req.params.orderId);
        const userId = parseInt(req.params.userId);
        const editedOrder = await orderModel.editStatus(
            orderStatus,
            orderId,
            userId
        );
        res.json(editedOrder);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const addProductToOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const orderId = parseInt(req.params.orderId);
        const productId = parseInt(req.params.productId);
        const qty = parseInt(req.params.qty);
        const item = await orderModel.addProductToOrder(
            orderId,
            productId,
            qty
        );
        res.json(item);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const deleteProductFromOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const orderId = parseInt(req.params.orderId);
        const productId = parseInt(req.params.productId);
        const userId = parseInt(req.params.userId);
        const deleteMsg = await orderModel.deleteProductFromOrder(
            orderId,
            productId,
            userId
        );
        res.json(deleteMsg);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId = parseInt(req.params.orderId);
        const userId = parseInt(req.params.userId);
        const deletedOrder = await orderModel.delete(orderId, userId);
        res.json(deletedOrder);
    } catch (error) {
        res.status(400);
        res.json({ error: error.toString() });
    }
};

export {
    showUserOrders,
    showCompletedUserOrders,
    showActivedUserOrders,
    createOrder,
    editOrderStatus,
    deleteOrder,
    addProductToOrder,
    deleteProductFromOrder,
};
