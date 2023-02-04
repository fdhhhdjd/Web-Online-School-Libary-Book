//! IMPORT LIBRARY
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

//! CACHE MEMORY
const { REDIS_MASTER } = require('../share/db/init_multiple_redis');
let RedisStore = require('connect-redis')(session);
//! IMPORT ROUTES
const ADMIN_API = require('./v1/routes/index.route');

//! USED LIBRARY
const app = express();

if (CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT) {
    app.enable(CONSTANTS.TRUST_PROXY);
}

//! SWAGGER API ADMIN
if (CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_DEV) {
    const specs = swaggerJsDoc(OPTIONS.SWAGGER_ADMIN);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
}
//! SESSION
app.use(
    session({
        store: new RedisStore({ client: REDIS_MASTER }),
        secret: CONFIGS.KEY_SESSION,
        resave: process.env.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
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

//! ROUTE
app.use(ADMIN_API);

module.exports = app;
