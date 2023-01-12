//! Library
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const fileUpload = require('express-fileupload');

const RateLimitMiddleware = require('../share/middlewares/ratelimit.middleware');
const MEDIA_API = require('./v1/routes/index.route');

//! used library
const app = express();
if (process.env.NODE_ENV === 'production') {
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
    fileUpload({
        useTempFiles: true,
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

//! MIDDLEWARE
app.use(RateLimitMiddleware);

//! ROUTE
app.use(MEDIA_API);

module.exports = app;
