import { client } from '../database';
import { TopProducts, TopProductsByVolume } from '../types/orderProductsTypes';

export class OrderProductsModel {

    async ShowTopProducts(qty: number): Promise<TopProducts[] | []> {
        try {
            const sql =
            'SELECT p.id, p.name, p.category, count(p.id) times_sold FROM ((products p INNER JOIN orders_products op on p.id=op.product_id) INNER JOIN orders o on op.order_id=o.id) GROUP BY p.id ORDER BY times_sold DESC LIMIT $1';
            const conn = await client.connect();
            const result = await conn.query(sql, [qty]);
            conn.release();
            return result.rows.map((el) => {
                return {
                    id: el.id,
                    name: el.name,
                    category: el.category,
                    times_sold: parseInt(el.times_sold),
                };
            });
        } catch (error) {
            throw new Error(
                `Could not retrieve top ${qty} from database.`
            );
        }
    }

    async ShowTopProductByVolume(qty: number): Promise<TopProductsByVolume[] | []> {
        try {
            const sql =
            'SELECT p.id, p.name, p.category, SUM(op.quantity) volume FROM ((products p INNER JOIN orders_products op on p.id=op.product_id) INNER JOIN orders o on op.order_id=o.id) GROUP BY p.id ORDER BY volume DESC LIMIT $1';
            const conn = await client.connect();
            const result = await conn.query(sql, [qty]);
            conn.release();
            return result.rows.map((el) => {
                return {
                    id: el.id,
                    name: el.name,
                    category: el.category,
                    volume: parseInt(el.volume),
                };
            });
        } catch (error) {
            throw new Error(
                `Could not retrieve top ${qty} from database.`
            );
        }
    }
}