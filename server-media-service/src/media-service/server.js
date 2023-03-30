//! LIBRARY
const dotenv = require('dotenv');

//!  APP
const app = require('./app');

//! SHARE
const CONSTANTS = require('../share/configs/constants');
const CONFIGS = require('../share/configs/config');
const MESSAGE = require('../share/configs/message');
const { handleException } = require('../share/utils/redis_pub_sub_helper');

dotenv.config();

app.get('/', (req, res) => {
    const health_check = {
        uptime: process.uptime(),
        message: MESSAGE.MEDIA.SERVER,
        timestamp: Date.now(),
    };
    return res.send(health_check);
});

const PORT = CONFIGS.PORT_MEDIA || 8000;
const server = app.listen(PORT, () => {
    console.info(`Server is listening on port:http://localhost:${PORT}`);
});

const handleError = (err) => {
    handleException(err, CONSTANTS.NAME_SERVER.MEDIA, PORT);
};

process.on(CONSTANTS.ERROR_REJECTION, handleError);

process.on(CONSTANTS.ERROR_EXCEPTION, handleError);

process.on(CONSTANTS.SIGINT, () => {
    server.close(() => {
        console.error('Server Media::: Off ');
    });
});
