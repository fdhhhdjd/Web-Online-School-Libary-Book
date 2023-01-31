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
const RateLimitMiddleware = require('../share/middlewares/ratelimit.middleware');
const MEDIA_API = require('./v1/routes/index.route');
const CONSTANTS = require('../share/configs/constants')
const OPTIONS = require('../share/configs/option');
const CONFIGS = require('../share/configs/config');

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

//! MIDDLEWARE
app.use(RateLimitMiddleware);

//! ROUTE
app.use(MEDIA_API);

module.exports = app;
