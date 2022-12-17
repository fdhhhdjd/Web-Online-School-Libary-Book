//! IMPORT LIBRARY
const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const DEVICE_MIDDLEWARE = require('../share/middleware/device.middleware');
//! MIDDLEWARE

//! IMPORT ROUTES
const AUTH_ADMIN = require('./v1/routes/admin.controller');

//! USED LIBRARY
const app = express();
if (process.env.NODE_ENV === 'PRODUCTION') {
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
app.use('/api/v1/admin', AUTH_ADMIN);

module.exports = app;
