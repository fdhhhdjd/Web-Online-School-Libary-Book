const KNEX = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT,
    },
    pool: { min: 0, max: 7 },
    debug: process.env.ENV !== 'production',
});

module.exports = KNEX;
