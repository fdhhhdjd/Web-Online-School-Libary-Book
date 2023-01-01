const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

app.get('/', (req, res) => {
    const health_check = {
        uptime: process.uptime(),
        message: 'Server SendEmail Api',
        timestamp: Date.now(),
    };
    return res.send(health_check);
});

const PORT = process.env.PORT_EMAIL || 5002;
app.listen(PORT);
console.info(`Server is listening on port:http://localhost:${PORT}`);
