//! Library
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');

//! used library
const app = express();
if (process.env.NODE_ENV === 'PRODUCTION') {
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

module.exports = app;
