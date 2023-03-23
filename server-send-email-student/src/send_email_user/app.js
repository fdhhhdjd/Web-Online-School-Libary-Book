//! LIBRARY
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');

//! SHARE
const CONFIGS = require('../share/configs/config');
const CONSTANTS = require('../share/configs/constants');

//! USED LIBRARY
const app = express();
if (CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT) {
    app.enable('trust proxy');
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
    compression({
        level: CONSTANTS.LEVEL,
        threshold: CONSTANTS.THRESHOLD,
        filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                return false;
            }
            return compression.filter(req, res);
        },
    }),
);

//! Redis PubSub users
require('./v1/redis_sub_queue');

module.exports = app;
