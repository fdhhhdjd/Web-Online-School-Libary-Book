const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

app.get('/', (req, res) => {
    const health_check = {
        uptime: process.uptime(),
        message: 'Server User Api',
        timestamp: Date.now(),
    };
    return res.send(health_check);
});

const PORT = process.env.PORT_USER_API || 5001;
app.listen(PORT);
console.info(`Server is listening on port:http://localhost:${PORT}`);
