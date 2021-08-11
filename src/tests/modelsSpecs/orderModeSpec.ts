import { OrderModel } from '../../models/orderModel';
import { ProductModel } from '../../models/productModel';
import { UserModel } from '../../models/userModel';
import { Order, Product, User } from '../../types/types';

const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();

describe('Test OrderModel', () => {
    let demoUser: User;
    let demoProduct: Product;
    let demoOrder: Order;

    beforeAll(async (): Promise<void> => {
        const newUser4: User = {
            firstname: 'Test4',
            lastname: 'Test4',
            username: 'Test4',
            password: 'Test4',
        };
        const newProductData = {
            name: 'Product9',
            stock: 99,
            price: 3.49,
            category: 'category2',
        };

        const createUser = await userModel.create(newUser4);
        demoUser = createUser;
        const createProduct = await productModel.create(newProductData);
        demoProduct = createProduct;
    });

    it('should have "create" method', (): void => {
        expect(orderModel.create).toBeDefined();
    });

    it('"create" method should create a new order and return order object', async (): Promise<void> => {
        const orderData: Order = {
            userId: demoUser.id as number,
            status: 'active',
        };
        const newOrder = await orderModel.create(orderData);
        demoOrder = newOrder;
        expect(newOrder.userId).toBe(orderData.userId);
        expect(newOrder.status).toBe(orderData.status);
    });

    it('should have "addProductToOrder" method', (): void => {
        expect(orderModel.addProductToOrder).toBeDefined();
    });

    it('"addProductToOrder" method should ad a product to the order and return object with "order_id", "product_id", "quantity" properties ', async (): Promise<void> => {
        const orderWithP = await orderModel.addProductToOrder(
            demoOrder.id as number,
            demoProduct.id as number,
            5
        );
        expect(orderWithP.orderId).toBe(demoOrder.id as number);
        expect(orderWithP.productId).toBe(demoProduct.id as number);
        expect(orderWithP.quantity).toBe(5);
    });

    it('should have "showAllByUserId" method', (): void => {
        expect(orderModel.showAllByUserId).toBeDefined();
    });

    it('"showAllByUserId" method should return an array of orders ', async (): Promise<void> => {
        const userOrders = await orderModel.showAllByUserId(
            demoUser.id as number
        );
        expect(userOrders[0].userId).toBe(demoUser.id as number);
    });

    it('should have "showByStatus" method', (): void => {
        expect(orderModel.showByStatus).toBeDefined();
    });

    it('"showByStatus" method should return an array of orders', async (): Promise<void> => {
        const userOrders = await orderModel.showByStatus(
            demoUser.id as number,
            'active'
        );
        expect(userOrders[0].userId).toBe(demoUser.id as number);
    });

    it('should have "editStatus" method', (): void => {
        expect(orderModel.editStatus).toBeDefined();
    });

    it('"editStatus" method should change order status and return order object', async (): Promise<void> => {
        const editedOrder = (await orderModel.editStatus(
            'completed',
            demoOrder.id as number,
            demoUser.id as number
        )) as Order;
        expect(editedOrder.userId).toBe(demoUser.id as number);
    });

    it('should have "deleteProductFromOrder" method', (): void => {
        expect(orderModel.deleteProductFromOrder).toBeDefined();
    });

    it('"deleteProductFromOrder" method should remove product from order and return object with "success" property', async (): Promise<void> => {
        const deletedFromOrder = await orderModel.deleteProductFromOrder(
            demoOrder.id as number,
            demoProduct.id as number,
            demoUser.id as number
        );
        expect(deletedFromOrder.success).toBeTrue();
    });

    it('should have "delete" method', (): void => {
        expect(orderModel.delete).toBeDefined();
    });

    it('"delete" method should delete order and return object with "success" property', async (): Promise<void> => {
        const deletedOrder = await orderModel.delete(
            demoOrder.id as number,
            demoUser.id as number
        );
        expect(deletedOrder.success).toBeTrue();
    });
});
