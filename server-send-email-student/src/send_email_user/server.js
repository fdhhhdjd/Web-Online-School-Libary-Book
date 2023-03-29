//! LIBRARY
const dotenv = require('dotenv');

//! APP
const app = require('./app');

//! SHARE
const CONSTANTS = require('../share/configs/constants');
const MESSAGE = require('../share/configs/message');
const { sendTelegram } = require('../share/utils/telegram');

dotenv.config();

app.get('/', (req, res) => {
    const health_check = {
        uptime: process.uptime(),
        message: MESSAGE.SEND_EMAIL,
        timestamp: Date.now(),
    };
    return res.send(health_check);
});

const PORT = process.env.PORT_EMAIL || 5002;
const server = app.listen(PORT);
console.info(`Server is listening on port:http://localhost:${PORT}`);

const handleException = (err) => {
    console.error('Unhandled Exception:', err);

    const message = `Server Send Email ${PORT}:: ${err.name}: ${err.message}`;
    sendTelegram(message);
};

process.on(CONSTANTS.ERROR_REJECTION, handleException);

process.on(CONSTANTS.ERROR_EXCEPTION, handleException);

process.on(CONSTANTS.SIGINT, () => {
    server.close(() => {
        console.error('Server Send Email::: Off ');
    });
});
