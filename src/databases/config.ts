import { Pool } from 'pg';

export const dbConnection = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'Ec1007256470',
    database: 'event_managenement_db',
    port: 5432
});
