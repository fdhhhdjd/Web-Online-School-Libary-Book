const CONFIGS = require('../configs/config')
const CONSTANTS = require('../configs/constants')
/**
 * @author Nguyễn Tiến Tài
 * @created_at 22/01/2023
 * @description Connect DB Postgresql
 */
const KNEX = require('knex')({
    client: CONSTANTS.CLIENT_PG,
    connection: {
        host: CONFIGS.POSTGRES_HOST,
        user: CONFIGS.POSTGRES_USER,
        password: CONFIGS.POSTGRES_PASSWORD,
        database: CONFIGS.POSTGRES_DB,
        port: CONFIGS.POSTGRES_PORT,
    },
    pool: { min: Number(CONFIGS.POSTGRES_CONNECT_MIN), max: Number(CONFIGS.POSTGRES_CONNECT_MAX) },
    debug: CONFIGS.NODE_ENV !== CONSTANTS.ENVIRONMENT_PRODUCT,
});

module.exports = KNEX;
