import { Order, OrderDetail } from '../types/orderTypes';
import { client } from '../database';
import { formatOrderData } from '../utilities/dataFormatters';

export class OrderModel {
    async showAllByUserId(userid: number): Promise<OrderDetail[] | Order[]> {
        try {
            const sql =
                'SELECT * FROM ((orders_products op INNER JOIN orders o on op.order_id=o.id) INNER JOIN Products p on op.product_id=p.id) WHERE o.user_id=$1';
            const conn = await client.connect();
            const result = await conn.query(sql, [userid]);
            conn.release();
            if (result.rowCount > 0) {
                const final = formatOrderData(result.rows);
                return final;
            } else {
                const sql2 = 'SELECT * FROM orders WHERE user_id=$1';
                const conn2 = await client.connect();
                const result2 = await conn2.query(sql2, [userid]);
                conn2.release();
                return result2.rows;
            }
        } catch (error) {
            throw new Error(
                `Could not retrieve orders from database. Error details: ${error}`
            );
        }
    }

    async showByStatus(
        userid: number,
        status: string
    ): Promise<OrderDetail[] | Order[]> {
        try {
            const sql =
                'SELECT * FROM ((orders_products op INNER JOIN orders o on op.order_id=o.id) INNER JOIN Products p on op.product_id=p.id) WHERE o.user_id=$1 AND o.status=$2';
            const conn = await client.connect();
            const result = await conn.query(sql, [userid, status]);
            conn.release();
            if (result.rowCount > 0) {
                const final = formatOrderData(result.rows);
                return final;
            } else {
                const sql2 =
                    'SELECT * FROM orders WHERE user_id=$1 AND status=$2';
                const conn2 = await client.connect();
                const result2 = await conn2.query(sql2, [userid, status]);
                conn2.release();
                return result2.rows;
            }
        } catch (error) {
            throw new Error(
                `Could not retrieve orders from database. Error details: ${error}`
            );
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const sql =
                'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [o.userId, o.status]);
            conn.release();
            const final: Order = {
                id: parseInt(result.rows[0].id),
                userId: parseInt(result.rows[0].user_id),
                status: result.rows[0].status,
            };
            return final;
        } catch (error) {
            throw new Error(
                `Could not create order id:${o.id}. Error details: ${error}`
            );
        }
    }

    async addProductToOrder(
        orderid: number,
        productid: number,
        qantity: number
    ): Promise<{
        id: number;
        orderId: number;
        productId: number;
        quantity: number;
    }> {
        try {
            const sql =
                'INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [orderid, productid, qantity]);
            conn.release();
            const final = {
                id: parseInt(result.rows[0].id),
                orderId: parseInt(result.rows[0].order_id),
                productId: parseInt(result.rows[0].product_id),
                quantity: parseInt(result.rows[0].quantity),
            };
            return final;
        } catch (error) {
            throw new Error(
                `Could not create add product id:${productid} to order id:${orderid}. Error details: ${error}`
            );
        }
    }

    async deleteProductFromOrder(
        orderid: number,
        productid: number,
        userid: number
    ): Promise<{ success: boolean; msg: string }> {
        try {
            const sql =
                'DELETE FROM orders_products op USING orders o WHERE op.order_id=o.id AND op.order_id=$1 AND op.product_id=$2 AND o.user_id=$3';
            const conn = await client.connect();
            const result = await conn.query(sql, [orderid, productid, userid]);
            conn.release();
            if (result.rowCount > 0) {
                return {
                    success: true,
                    msg: `Product id:${productid} was removed from order id:${orderid} successfully.`,
                };
            } else {
                return {
                    success: false,
                    msg: `Product id:${productid} does not exist in order id:${orderid}.`,
                };
            }
        } catch (error) {
            throw new Error(
                `Could not remove product id:${productid} from order id:${orderid}. Error details: ${error}`
            );
        }
    }

    async editStatus(
        status: string,
        orderId: number,
        userId: number
    ): Promise<Order | { success: boolean; msg: string }> {
        try {
            const sql =
                'UPDATE orders SET status=$1 WHERE id=$2 AND user_id=$3 RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [status, orderId, userId]);
            conn.release();
            if (result.rowCount > 0) {
                const final: Order = {
                    id: result.rows[0].id,
                    userId: parseInt(result.rows[0].user_id),
                    status: result.rows[0].status,
                };
                return final;
            } else {
                return {
                    success: false,
                    msg: `Order id:${orderId} does not exist.`,
                };
            }
        } catch (error) {
            throw new Error(
                `Could not edit order id:${orderId}. Error details: ${error}`
            );
        }
    }

    async delete(
        orderid: number,
        userid: number
    ): Promise<{ success: boolean; msg: string }> {
        try {
            const sql = 'DELETE FROM orders WHERE id=$1 AND user_id=$2';
            const conn = await client.connect();
            const result = await conn.query(sql, [orderid, userid]);
            conn.release();
            if (result.rowCount > 0) {
                return {
                    success: true,
                    msg: `Order id:${orderid} was deleted successfully.`,
                };
            } else {
                return {
                    success: false,
                    msg: `Order id:${orderid} does not exist.`,
                };
            }
        } catch (error) {
            throw new Error(
                `Could not delete order id:${orderid}. Error details: ${error}`
            );
        }
    }
}
