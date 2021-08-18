import supertest from 'supertest';
import jwt from 'jsonwebtoken';

import app from '../index';
import { Order } from '../types/orderTypes';
import { User } from '../types/userTypes';
import { Product } from '../types/productTypes';
import { UserModel } from '../models/userModel';
import { ProductModel } from '../models/productModel';
import { OrderModel } from '../models/orderModel';

const newUser1: User = {
    firstname: 'Test1',
    lastname: 'Test1',
    username: 'Test1',
    password: 'Test1',
};

const newUser2: User = {
    firstname: 'Test2',
    lastname: 'Test2',
    username: 'Test2',
    password: 'Test2',
};

const newProduct1: Product = {
    name: 'Product1',
    stock: 10,
    price: 0.77,
    category: 'category1',
};

const newProduct2: Product = {
    name: 'Product2',
    stock: 15,
    price: 1.05,
    category: 'category1',
};

const newProduct3: Product = {
    name: 'Product3',
    stock: 27,
    price: 1.77,
    category: 'category2',
};

const newProduct4: Product = {
    name: 'Product4',
    stock: 5,
    price: 1.05,
    category: 'category1',
};

const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();

const request = supertest(app);

describe('Test storeFront API endpoints', (): void => {
    let user1Token: string;
    let orderId: number;
    let userId: number;
    let productId: number;

    beforeAll(async (): Promise<void> => {
        const user = await userModel.create(newUser1);
        const orderData: Order = {
            userId: user.id as number,
            status: 'active',
        };
        const token = jwt.sign(
            { user: user },
            process.env.TOKEN_SECRET as string
        );
        const prod1 = await productModel.create(newProduct1);
        await productModel.create(newProduct2);
        await productModel.create(newProduct3);
        const order = await orderModel.create(orderData);
        user1Token = token;
        userId = user.id as number;
        productId = prod1.id as number;
        orderId = order.id as number;
    });

    describe('Test "/" endpoint', (): void => {
        it('expect "/" to respond with json.', async (): Promise<void> => {
            const response = await request.get('/');
            expect(response.type).toBe('application/json');
        });
    });
    describe('Test "/user" endpoint', (): void => {
        let user2Token: string;

        it('expect POST "/user" to respond with json web token.', async (): Promise<void> => {
            const response = await request.post('/user').send(newUser2);
            user2Token = response.body;
            const decoded = jwt.decode(response.body) as { user: User };
            const user = decoded.user;
            expect(user.username).toBe('Test2');
        });

        it('expect GET "/user/all"  with authorization token to respond with status code 200 and json.', async (): Promise<void> => {
            const response = await request
                .get('/user/all')
                .set('Authorization', 'Bearer ' + user2Token);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
        });

        it('expect GET "/user/all"  without authorization token to respond with status code 401.', async (): Promise<void> => {
            const response = await request.get('/user/all');
            expect(response.status).toBe(401);
        });

        it('expect GET "/user/id/2" with authorization token to respond with status code 200 and json.', async (): Promise<void> => {
            const response = await request
                .get('/user/id/2')
                .set('Authorization', 'Bearer ' + user2Token);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
        });

        it('expect GET "/user/id/2" without authorization token to respond with status code 401.', async (): Promise<void> => {
            const response = await request.get('/user/id/2');
            expect(response.status).toBe(401);
        });

        it('expect POST "/user/login" with correct username and password to respond with status code 200 and json.', async (): Promise<void> => {
            const response = await request
                .post('/user/login')
                .send({ username: 'Test2', password: 'Test2' });
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
        });

        it('expect POST "/user/login" with incorrect username or password to respond with status code 401.', async (): Promise<void> => {
            const response = await request
                .post('/user/login')
                .send({ username: 'Test2', password: 'Test' });
            expect(response.status).toBe(401);
        });

        it('expect DELETE "/user/id/2" without authorization token to respond with status code 401.', async (): Promise<void> => {
            const response = await request.delete('/user/id/2');
            expect(response.status).toBe(401);
        });

        it('expect DELETE "/user/id/2" with authorization token to respond with status code 200 and json.', async (): Promise<void> => {
            const response = await request
                .delete(`/user/id/2`)
                .set('Authorization', 'Bearer ' + user2Token);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
        });
    });

    describe('Test "/product" endpoint', (): void => {
        it('expect GET "/product/all" to respond with status code 200, response type json and return an array.', async (): Promise<void> => {
            const response = await request.get('/product/all');
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(Array.isArray(response.body)).toBeTrue();
        });

        it('expect GET "/product/id/1" to respond with status code 200, response type json and return an object with "name" property.', async (): Promise<void> => {
            const response = await request.get('/product/id/1');
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body.name).toBe(newProduct1.name);
        });

        it('expect GET "/product/id/10" (product does not exist) to return null.', async (): Promise<void> => {
            const response = await request.get('/product/id/10');
            expect(response.body).toBe(null);
        });

        it('expect GET "/product/category/category1" to respond with status code 200, response type json and return an array.', async (): Promise<void> => {
            const response = await request.get('/product/category/category1');
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(Array.isArray(response.body)).toBeTrue();
        });

        it('expect GET "/product/top/5" with authorization token to respond with status code 200, response type json and return an array.', async (): Promise<void> => {
            const response = await request
                .get('/product/top/5')
                .set('Authorization', 'Bearer ' + user1Token);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(Array.isArray(response.body)).toBeTrue();
        });

        it('expect GET "/product/top/byvolume/5" with authorization token to respond with status code 200, response type json and return an array.', async (): Promise<void> => {
            const response = await request
                .get('/product/top/byvolume/5')
                .set('Authorization', 'Bearer ' + user1Token);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(Array.isArray(response.body)).toBeTrue();
        });

        it('expect POST "/product" with authorization token to respond with status code 200, response type json and return product object.', async (): Promise<void> => {
            const response = await request
                .post('/product')
                .set('Authorization', 'Bearer ' + user1Token)
                .send(newProduct4);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body.name).toBe(newProduct4.name);
        });

        it('expect PUT "/product/id/1" with authorization token to edit product data, respond with status code 200, response type json and return object with "id" property.', async (): Promise<void> => {
            const editedProductData = {
                name: 'Product1',
                stock: 100,
                price: 0.9,
                category: 'category1',
            };
            const response = await request
                .put(`/product/id/1`)
                .set('Authorization', 'Bearer ' + user1Token)
                .send(editedProductData);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(parseInt(response.body.id)).toBe(1);
        });

        it('expect DELETE "/product/id/2" with authorization token to respond with status code 200, response type json and return object with "success" property.', async (): Promise<void> => {
            const response = await request
                .delete('/product/id/2')
                .set('Authorization', 'Bearer ' + user1Token);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body.success).toBeTrue();
        });
    });

    describe('Test "/order" endpoint', (): void => {
        it('expect GET "/order/userid/1/all" with authorization token to respond with status code 200, response type json and return an array.', async (): Promise<void> => {
            const response = await request
                .get(`/order/userid/${userId}/all`)
                .set('Authorization', 'Bearer ' + user1Token);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(Array.isArray(response.body)).toBeTrue();
        });

        it('expect GET "/order/userid/1/active" with authorization token to respond with status code 200, response type json and return an array.', async (): Promise<void> => {
            const response = await request
                .get(`/order/userid/${userId}/active`)
                .set('Authorization', 'Bearer ' + user1Token);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(Array.isArray(response.body)).toBeTrue();
        });

        it('expect GET "/order/userid/1/completed" with authorization token to respond with status code 200, response type json and return an object with "id" property', async (): Promise<void> => {
            const response = await request
                .get(`/order/userid/${userId}/completed`)
                .set('Authorization', 'Bearer ' + user1Token);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(Array.isArray(response.body)).toBeTrue();
        });

        it('expect POST "/order/userid/1" with authorization token to  create a new order, respond with status code 200, response type json and return an object with "user_id" property.', async (): Promise<void> => {
            const orderData2: Order = { userId: userId, status: 'active' };
            const response = await request
                .post(`/order/userid/${userId}`)
                .set('Authorization', 'Bearer ' + user1Token)
                .send(orderData2);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body.userId).toBe(orderData2.userId);
        });

        it('expect POST "/order/userid/1/orderid/1/productid/1/qty/1" with authorization token to  add a product to the order, respond with status code 200, response type json and return an object with "product_id" property.', async (): Promise<void> => {
            const response = await request
                .post(
                    `/order/userid/${userId}/orderid/${orderId}/productid/${productId}/qty/1`
                )
                .set('Authorization', 'Bearer ' + user1Token);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body.productId).toBe(productId);
        });

        it('expect PUT "/order/userid/1/orderid/1" with authorization token to change order status, respond with status code 200, response type json and return an object with status property.', async (): Promise<void> => {
            const editdata = { status: 'completed' };
            const response = await request
                .put(`/order/userid/${userId}/orderid/${orderId}`)
                .set('Authorization', 'Bearer ' + user1Token)
                .send(editdata);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body.status).toBe(editdata.status);
        });

        it('expect DELETE "/order/userid/1/orderid/1/productid/1" with authorization token to remove a product from the order, respond with status code 200, response type json and return an object with "success" property.', async (): Promise<void> => {
            const response = await request
                .delete(
                    `/order/userid/${userId}/orderid/${orderId}/productid/${productId}`
                )
                .set('Authorization', 'Bearer ' + user1Token);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body.success).toBeTrue();
        });

        it('expect DELETE "/order/userid/1/orderid/1" with authorization token to remove an order, respond with status code 200, response type json and return an object with "success" property.', async (): Promise<void> => {
            const response = await request
                .delete(`/order/userid/${userId}/orderid/${orderId}`)
                .set('Authorization', 'Bearer ' + user1Token);
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body.success).toBeTrue();
        });
    });
});
