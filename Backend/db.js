const {Pool} = require('pg');

const pool = new Pool({
    user: 'airline_user',
    host: 'localhost',
    database: 'airline_db',
    password: 'Kalana_23',
    port: 5432,
});

module.exports = pool;