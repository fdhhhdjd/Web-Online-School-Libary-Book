//! LIBRARY
const dotenv = require('dotenv');

//! APP
const app = require('./app');

//! REDIS PUBSUB
const REDIS_PUB_SUB = require('../share/utils/redis_pub_sub_helper');

//! SHARE
const CONSTANTS = require('../share/configs/constants');
const MESSAGES = require('../share/configs/message');

//! USED LIBRARY
dotenv.config();

app.get('/', (req, res) => {
    const health_check = {
        uptime: process.uptime(),
        message: MESSAGES.ADMIN.SERVER,
        timestamp: Date.now(),
    };
    return res.send(health_check);
});

const PORT = process.env.PORT_ADMIN_API || 5000;
const server = app.listen(PORT);
console.info(`Server is listening on port:http://localhost:${PORT}`);

const handleException = (err) => {
    console.error('Unhandled Exception:', err);
    const message = `Server Admin ${PORT}:: ${err.name}: ${err.message}`;
    // Publish data queue Redis
    return REDIS_PUB_SUB.queueMessageTelegram(CONSTANTS.QUEUE.REDIS_SERVER_ADMIN, {
        message,
    });
};

process.on(CONSTANTS.ERROR_REJECTION, handleException);

process.on(CONSTANTS.ERROR_EXCEPTION, handleException);

process.on(CONSTANTS.SIGINT, () => {
    server.close(() => {
        console.error('Server Admin::: Off ');
    });
});
