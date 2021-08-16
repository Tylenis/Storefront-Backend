import bcrypt from 'bcrypt';
import { User } from '../types/userTypes';
import { client } from '../database';

const pepper = process.env.BCRYPT_PSW;
const saltRounds = process.env.SALT_ROUNDS as string;

export class UserModel {
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows as [User];
        } catch (error) {
            throw new Error(
                `Could not retrieve users from database. Error details: ${error}`
            );
        }
    }

    async showById(userid: number): Promise<User | null> {
        try {
            const sql = 'SELECT * FROM users WHERE id=$1';
            const conn = await client.connect();
            const result = await conn.query(sql, [userid]);
            conn.release();
            if (result.rowCount > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(
                `Could not retrieve user id:${userid} from database. Error details: ${error}`
            );
        }
    }

    async showByUsername(
        username: string,
        password: string
    ): Promise<User | null> {
        try {
            const sql = 'SELECT * FROM users WHERE username=$1';
            const conn = await client.connect();
            const result = await conn.query(sql, [username]);
            conn.release();
            if (result.rowCount > 0) {
                const user = result.rows[0];
                const matchPsw = await bcrypt.compare(
                    password + pepper,
                    user.password
                );
                if (matchPsw) {
                    return user;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(
                `Could not retrieve user ${username} from database. Error details: ${error}`
            );
        }
    }

    async create(u: User): Promise<User> {
        try {
            const hashedPsw = await bcrypt.hash(
                u.password + pepper,
                parseInt(saltRounds)
            );
            const sql =
                'INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3, $4) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                u.username,
                hashedPsw,
            ]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Could not create user ${u.username}. Error details: ${error}`
            );
        }
    }

    async delete(userid: number): Promise<{ success: boolean; msg: string }> {
        try {
            const sql = `DELETE FROM users WHERE id=$1`;
            const conn = await client.connect();
            const result = await conn.query(sql, [userid]);
            conn.release();
            if (result.rowCount > 0) {
                return {
                    success: true,
                    msg: `User id:${userid} was deleted successfully.`,
                };
            } else {
                return {
                    success: false,
                    msg: `User id:${userid} does not exist.`,
                };
            }
        } catch (error) {
            throw new Error(
                `Could not delete user id:${userid}. Error details: ${error}`
            );
        }
    }
}
