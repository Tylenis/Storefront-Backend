import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PSW,
    POSTGRES_TEST_DB,
    POSTGRES_TEST_USER,
    POSTGRES_TEST_PSW,
    ENV,
} = process.env;

let client: Pool;

if (ENV == 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_TEST_USER,
        password: POSTGRES_TEST_PSW,
    });
}
if (ENV == 'dev') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PSW,
    });
}

export { client };
