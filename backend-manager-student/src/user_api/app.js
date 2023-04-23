//! LIBRARY
const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const session = require('express-session');

//! SHARE GENERAL
const CONFIGS = require('../share/configs/config');
const CONSTANTS = require('../share/configs/constants');
const OPTIONS = require('../share/configs/option');
const MESSAGES = require('../share/configs/message');
const { returnReasons } = require('../share/middleware/handle_error');

//! CACHE MEMORY
const { REDIS_MASTER } = require('../share/db/init_multiple_redis');
let RedisStore = require('connect-redis')(session);

//! IMPORT MIDDLEWARE
const DEVICE_MIDDLEWARE = require('../share/middleware/device.middleware');

//! IMPORT ROUTES
const USER_API = require('./v1/routes/index.router');

//! INIT DB
require('../share/db/init.mongodb');

//! USED LIBRARY
const app = express();
if (CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT) {
    app.enable(CONSTANTS.TRUST_PROXY);
}

//! SWAGGER API ADMIN
if (CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_DEV) {
    const specs = swaggerJsDoc(OPTIONS.SWAGGER_USER);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
}

//! Session
app.use(
    session({
        store: new RedisStore({ client: REDIS_MASTER }),
        secret: CONFIGS.KEY_SESSION,
        resave: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
        saveUninitialized: true,
        cookie: {
            secure: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
            rolling: true,
            httpOnly: true,
            maxAge: CONSTANTS._1_HOURS_S,
        },
    }),
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    fileUpload({
        useTempFiles: true,
    }),
);
app.use(
    express.json({
        verify: (req, res, buffer) => (req.rawBody = buffer),
    }),
);

app.use(
    compression({
        level: CONSTANTS.COMPRESSION_ZIP_SEND_SERVER_LEVER,
        threshold: CONSTANTS.COMPRESSION_ZIP_SEND_THRESHOLD,
        filter: (req, res) => {
            if (req.headers[CONSTANTS.COMPRESSION_ZIP_SEND_SERVER]) {
                return false;
            }
            return compression.filter(req, res);
        },
    }),
);

//! CHECK DEVICE
app.use(DEVICE_MIDDLEWARE);

//! ROUTE
app.use(USER_API);

//! INIT HANDLE ERROR
app.use((req, res, next) => {
    const error = new Error(MESSAGES.GENERAL.NOTFOUND);
    error.status = CONSTANTS.HTTP.STATUS_4XX_NOT_FOUND;
    next(error);
});

/* eslint-disable no-unused-vars */
app.use((error, req, res, next) => {
    const statusCode = error.status || CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR;
    const message = error.message || MESSAGES.GENERAL.INTERNAL_SERVER;
    return res.status(statusCode).json({
        status: statusCode,
        stack: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_DEV ? error.stack : MESSAGES.MEDIA.STRING_EMPTY,
        message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_NOT_FOUND),
        element: message,
    });
});

//! REDIS PUBSUB
require('../share/db/redis_queue');

module.exports = app;
