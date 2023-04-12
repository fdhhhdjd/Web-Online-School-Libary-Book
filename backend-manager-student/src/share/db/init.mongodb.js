//! LIBRARY
const mongoose = require('mongoose');

//! CONFIGS
const CONSTANTS = require('../configs/constants');
const HELPERS = require('../utils/helper');
const { db: { host, port, db, user, password, source } } = require('../configs/configs.mongodb');

//! PUBSUB
const { handleException } = require('../utils/redis_pub_sub_helper');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 10/04/2023
 * @description setup nosql MongoDb
 */

const connectString = HELPERS.getURIFromTemplate(CONSTANTS.MONGO.STRING_CONNECT, {
    user,
    password,
    host,
    port,
    db,
    source,
});

// Singleton
class Database {
    constructor() {
        this.connect();
    }

    // Connect
    // eslint-disable-next-line class-methods-use-this
    connect() {
        //! DEVELOPERS
        // eslint-disable-next-line no-constant-condition, no-self-compare
        if (1 === 1) {
            mongoose.set('debug', CONSTANTS.DELETED_ENABLE);
            mongoose.set('debug', { color: CONSTANTS.DELETED_ENABLE });
        }

        mongoose.connect(connectString, {
            maxPoolSize: CONSTANTS.MONGO.POOL_SIZE,
            useNewUrlParser: CONSTANTS.DELETED_ENABLE,
            useUnifiedTopology: CONSTANTS.DELETED_ENABLE,
            // eslint-disable-next-line no-unused-vars
        }).then((_) => {
            console.info('CONNECTED TO MONGODB SUCCESS !!');
        }).catch((err) => {
            handleException(err, CONSTANTS.NAME_SERVER.DB, CONSTANTS.NAME_DATABASE.MONGO);
            console.error(err);
        });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongoDb = Database.getInstance();

module.exports = instanceMongoDb;
