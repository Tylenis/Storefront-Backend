import { Product } from '../types/types';
import { client } from '../database';

export class ProductModel {
    async index(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows as [Product];
        } catch (error) {
            throw new Error(
                `Could not retrieve products from database. Error details: ${error}`
            );
        }
    }

    async showById(productid: number): Promise<Product | null> {
        try {
            const sql = 'SELECT * FROM products WHERE id=$1';
            const conn = await client.connect();
            const result = await conn.query(sql, [productid]);
            conn.release();
            if (result.rowCount > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(
                `Could not retrieve product id:${productid} from database. Error details: ${error}`
            );
        }
    }

    async showByCategory(category: string): Promise<Product[] | []> {
        try {
            const sql = 'SELECT * FROM products WHERE category=$1';
            const conn = await client.connect();
            const result = await conn.query(sql, [category]);
            conn.release();
            if (result.rowCount > 0) {
                return result.rows as [Product];
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(
                `Could not retrieve products category:${category} from database. Error details: ${error}`
            );
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const sql =
                'INSERT INTO products (name, price, stock, category) VALUES($1, $2, $3, $4) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [
                p.name,
                p.price,
                p.stock,
                p.category,
            ]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Could not create product ${p.name}. Error details: ${error}`
            );
        }
    }

    async edit(p: Product): Promise<Product> {
        try {
            const sql =
                'UPDATE products SET name=$1, price=$2, stock=$3, category=$4 WHERE id=$5 RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [
                p.name,
                p.price,
                p.stock,
                p.category,
                p.id,
            ]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Could not edit product :${p.name}. Error details: ${error}`
            );
        }
    }

    async delete(
        productid: number
    ): Promise<{ success: boolean; msg: string }> {
        try {
            const sql = `DELETE FROM products WHERE id=$1`;
            const conn = await client.connect();
            const result = await conn.query(sql, [productid]);
            conn.release();
            if (result.rowCount > 0) {
                return {
                    success: true,
                    msg: `Product id:${productid} was deleted successfully.`,
                };
            } else {
                return {
                    success: false,
                    msg: `Product id:${productid} does not exist.`,
                };
            }
        } catch (error) {
            throw new Error(
                `Could not delete product id:${productid}. Error details: ${error}`
            );
        }
    }
}
