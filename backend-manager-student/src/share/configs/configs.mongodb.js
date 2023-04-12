//! CONFIG
const CONFIGS = require('./config');

const DEVELOPER = {
    db: {
        host: CONFIGS.MONGO_INIT_MONGO_HOST,
        port: CONFIGS.MONGO_INIT_MONGO_PORT,
        db: CONFIGS.MONGO_INIT_DB_DATABASE,
        user: CONFIGS.MONGO_INIT_DB_ROOT_USERNAME,
        password: CONFIGS.MONGO_INI_TDB_ROOT_PASSWORD,
        source: CONFIGS.MONGO_INIT_DB_SOURCE,
    },
};
const PRODUCTION = {
    db: {
        host: CONFIGS.MONGO_INIT_MONGO_HOST,
        port: CONFIGS.MONGO_INIT_MONGO_PORT,
        db: CONFIGS.MONGO_INIT_DB_DATABASE,
        user: CONFIGS.MONGO_INIT_DB_ROOT_USERNAME,
        password: CONFIGS.MONGO_INI_TDB_ROOT_PASSWORD,
        source: CONFIGS.MONGO_INIT_DB_SOURCE,
    },
};
const config = { DEVELOPER, PRODUCTION };
const env = process.env.NODE_ENV || 'DEVELOPER';

module.exports = config[env];
