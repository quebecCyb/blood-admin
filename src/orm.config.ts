import * as dotenv from 'dotenv';
dotenv.config();

// orm.config.js
export type OrmConfig = {
    type: 'mysql',
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    entities: any,
    synchronize: boolean,
    logging: boolean
}
export const ormConfig: OrmConfig = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [],
    synchronize: true,
    logging: false
};
