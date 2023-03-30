//! LIBRARY
const dotenv = require('dotenv');

//!  APP
const app = require('./app');

//! REDIS PUBSUB
const REDIS_PUB_SUB = require('../share/utils/redis_pub_sub_helper');

//! SHARE
const CONSTANTS = require('../share/configs/constants');
const MESSAGE = require('../share/configs/message');

dotenv.config();

app.get('/', (req, res) => {
    const health_check = {
        uptime: process.uptime(),
        message: MESSAGE.MEDIA.SERVER,
        timestamp: Date.now(),
    };
    return res.send(health_check);
});

const PORT = process.env.PORT_MEDIA || 8000;
const server = app.listen(PORT, () => {
    console.info(`Server is listening on port:http://localhost:${PORT}`);
});

const handleException = (err) => {
    console.error('Unhandled Exception:', err);
    const message = `Server Media ${PORT}:: ${err.name}: ${err.message}`;
    // Publish data queue Redis
    return REDIS_PUB_SUB.queueMessageTelegram(CONSTANTS.QUEUE.REDIS_SERVER_MEDIA, {
        message,
    });
};

process.on(CONSTANTS.ERROR_REJECTION, handleException);

process.on(CONSTANTS.ERROR_EXCEPTION, handleException);

process.on(CONSTANTS.SIGINT, () => {
    server.close(() => {
        console.error('Server Media::: Off ');
    });
});
