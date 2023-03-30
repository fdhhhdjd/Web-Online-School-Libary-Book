//! LIBRARY
const dotenv = require('dotenv');

//! APP
const app = require('./app');

//! SHARE
const CONSTANTS = require('../share/configs/constants');
const MESSAGES = require('../share/configs/message');
const CONFIGS = require('../share/configs/config');
const { handleException } = require('../share/utils/redis_pub_sub_helper');

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

const PORT = CONFIGS.PORT_STUDENT_API || 5001;
const server = app.listen(PORT);
console.info(`Server is listening on port:http://localhost:${PORT}`);

const handleError = (err) => handleException(err, CONSTANTS.NAME_SERVER.STUDENT, PORT);

process.on(CONSTANTS.ERROR_REJECTION, handleError);

process.on(CONSTANTS.ERROR_EXCEPTION, handleError);

process.on(CONSTANTS.SIGINT, () => {
    server.close(() => {
        console.error('Server Student::: Off ');
    });
});
