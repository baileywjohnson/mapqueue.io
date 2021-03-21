const config = require("config")
const Pool = require("pg").Pool;

const connectionPool = new Pool({
    host: config.get('db.host'),
    user: config.get('db.user'),
    password: config.get('db.password'),
    port: config.get('db.port'),
    database: "mapqueue"
});

module.exports = connectionPool;