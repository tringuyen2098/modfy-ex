import knex from 'knex';
import pgSetting from '../config/postgres.json' assert { type: 'json' };
import logger from '../utils/logger.js';

const env = process.env.ENV || "development";
class Database {

    instance;

    constructor() {
        this.connect();
    }

    connect(type = 'pgsql') {
        const pgsql = knex(pgSetting[env]);

        pgsql.raw("SELECT 1").then(() => {
            logger.info("PostgreSQL connected");
        })
        .catch((e) => {
            console.error(e);
            logger.error("PostgreSQL not connected");
        });
    }

    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

export default Database.getInstance();

