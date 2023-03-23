//! LIBRARY
const dotenv = require('dotenv');

//! APP
const app = require('./app');

//! SHARE
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
app.listen(PORT);
console.info(`Server is listening on port:http://localhost:${PORT}`);
