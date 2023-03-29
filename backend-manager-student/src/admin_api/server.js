//! LIBRARY
const dotenv = require('dotenv');

//! APP
const app = require('./app');

//! SHARE
const CONSTANTS = require('../share/configs/constants');
const MESSAGES = require('../share/configs/message');
const { sendTelegram } = require('../share/utils/telegram');

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

    const message = `Server Student and Admin ${PORT}:: ${err.name}: ${err.message}`;
    sendTelegram(message);
};

process.on(CONSTANTS.ERROR_REJECTION, handleException);

process.on(CONSTANTS.ERROR_EXCEPTION, handleException);

process.on(CONSTANTS.SIGINT, () => {
    server.close(() => {
        console.error('Server Student and Admin::: Off ');
    });
});
