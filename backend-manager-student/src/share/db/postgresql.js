//! CONFIGS
const CONFIGS = require('../configs/config');
const CONSTANTS = require('../configs/constants');

//! PUBSUB
const { handleException } = require('../utils/redis_pub_sub_helper');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 22/01/2023
 * @updated_at 10/04/2023
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
    pool: {
        min: Number(CONSTANTS.PG.POSTGRES_CONNECT_MIN),
        max: Number(CONSTANTS.PG.POSTGRES_CONNECT_MAX),
        acquireTimeoutMillis: Number(CONSTANTS.PG.ACQUIRE_TIMEOUT_MILLIS),
        createTimeoutMillis: Number(CONSTANTS.PG.CREATE_TIMEOUT_MILLIS),
        idleTimeoutMillis: Number(CONSTANTS.PG.IDLE_TIMEOUT_MILLIS),
        reapIntervalMillis: Number(CONSTANTS.PG.REAP_INTERVAL_MILLIS),
    },
    debug: CONFIGS.NODE_ENV !== CONSTANTS.ENVIRONMENT_PRODUCT,
});

KNEX.raw('SELECT 1')
    .then(() => console.info('CONNECTED TO POSTGRESQL SUCCESS !!'))
    .catch((err) => {
        console.error('Failed to connect to PostgreSQL database', err);
        return handleException(err, CONSTANTS.NAME_SERVER.DB, CONSTANTS.NAME_DATABASE.PG);
    });

module.exports = KNEX;
