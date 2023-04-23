//! IMPORT LIBRARY
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

//! SHARE GENERAL
const DEVICE_MIDDLEWARE = require('../share/middlewares/device.middleware');
const { returnReasons } = require('../share/middlewares/handle_error');

//! SHARE
const MEDIA_API = require('./v1/routes/index.route');
const CONSTANTS = require('../share/configs/constants');
const OPTIONS = require('../share/configs/option');
const CONFIGS = require('../share/configs/config');
const MESSAGES = require('../share/configs/message');

//! USED LIBRARY
const app = express();
if (process.env.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT) {
    app.enable(CONSTANTS.TRUST_PROXY);
}

//! SWAGGER API ADMIN
if (CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_DEV) {
    const specs = swaggerJsDoc(OPTIONS.SWAGGER_MEDIA);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
}

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    express.json({
        verify: (req, res, buffer) => (req.rawBody = buffer),
    }),
);
app.use(
    fileUpload({
        useTempFiles: true,
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
//! MIDDLAWARE
app.use(DEVICE_MIDDLEWARE);

//! ROUTE
app.use(MEDIA_API);

//! INIT HANDLE ERROR
app.use((req, res, next) => {
    const error = new Error(MESSAGES.MEDIA.NOT_FOUND);
    error.status = CONSTANTS.HTTP.STATUS_4XX_NOT_FOUND;
    next(error);
});

/* eslint-disable no-unused-vars */
app.use((error, req, res, next) => {
    const statusCode = error.status || CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR;
    const message = error.message || MESSAGES.MEDIA.INTERNAL_SERVER;
    return res.status(statusCode).json({
        status: statusCode,
        stack:
            CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_DEV
                ? error.stack
                : MESSAGES.MEDIA.STRING_EMPTY,
        message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_NOT_FOUND),
        element: message,
    });
});

module.exports = app;
