//! LIBRARY
const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');

//! Share
const CONFIGS = require('../share/configs/config');
const CONSTANTS = require('../share/configs/constants');

//! IMPORT MIDDLEWARE
const DEVICE_MIDDLEWARE = require('../share/middleware/device.middleware');

//! IMPORT ROUTES
const USER_API = require('./v1/routes/index.router');

//! USED LIBRARY
const app = express();
if (CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT) {
    app.enable('trust proxy');
}
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
        level: 6,
        threshold: 100 * 1000,
        filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                return false;
            }
            return compression.filter(req, res);
        },
    }),
);

app.use(DEVICE_MIDDLEWARE);

//! ROUTE
app.use(USER_API);

module.exports = app;
