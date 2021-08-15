import { Request, Response } from 'express';

import { client } from '../database';

const topProductsByOrders = async (
    req: Request,
    res: Response
): Promise<void> => {
    const qty = parseInt(req.params.qty);
    try {
        const sql =
            'SELECT p.id, p.name, p.category, count(p.id) times_sold FROM ((products p INNER JOIN orders_products op on p.id=op.product_id) INNER JOIN orders o on op.order_id=o.id) GROUP BY p.id ORDER BY times_sold DESC LIMIT $1';
        const conn = await client.connect();
        const result = await conn.query(sql, [qty]);
        conn.release();
        if (result.rowCount > 0) {
            const final = result.rows.map((el) => {
                return {
                    id: el.id,
                    name: el.name,
                    category: el.category,
                    times_sold: parseInt(el.times_sold),
                };
            });
            res.json(final);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(400);
        res.json({
            msg: `Could not retrieve top ${qty} from database.`,
            error: error.toString(),
        });
    }
};

const topProductsByOrdersVolume = async (
    req: Request,
    res: Response
): Promise<void> => {
    const qty = parseInt(req.params.qty);
    try {
        const sql =
            'SELECT p.id, p.name, p.category, SUM(op.quantity) volume FROM ((products p INNER JOIN orders_products op on p.id=op.product_id) INNER JOIN orders o on op.order_id=o.id) GROUP BY p.id ORDER BY volume DESC LIMIT $1';
        const conn = await client.connect();
        const result = await conn.query(sql, [qty]);
        conn.release();
        if (result.rowCount > 0) {
            const final = result.rows.map((el) => {
                return {
                    id: el.id,
                    name: el.name,
                    category: el.category,
                    volume: parseInt(el.volume),
                };
            });
            res.json(final);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(400);
        res.json({
            msg: `Could not retrieve top ${qty} from database.`,
            error: error.toString(),
        });
    }
};

export { topProductsByOrders, topProductsByOrdersVolume };
