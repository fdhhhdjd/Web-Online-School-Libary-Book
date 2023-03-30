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
        message: MESSAGES.STUDENT.SERVER,
        timestamp: Date.now(),
    };
    return res.send(health_check);
});

const PORT = process.env.PORT_USER_API || 5001;
const server = app.listen(PORT);
console.info(`Server is listening on port:http://localhost:${PORT}`);

const handleException = (err) => {
    console.error('Unhandled Exception:', err);
    const message = `Server Student ${PORT}:: ${err.name}: ${err.message}`;
    // Publish data queue Redis
    REDIS_PUB_SUB.queueMessageTelegram(CONSTANTS.QUEUE.REDIS_SERVER_STUDENT, {
        message,
    });
};

process.on(CONSTANTS.ERROR_REJECTION, handleException);

process.on(CONSTANTS.ERROR_EXCEPTION, handleException);

process.on(CONSTANTS.SIGINT, () => {
    server.close(() => {
        console.error('Server Student::: Off ');
    });
});
