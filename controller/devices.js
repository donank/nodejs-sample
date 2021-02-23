const pool = require('../db');

const fetchDevices = () => {
    return pool.query('SELECT * FROM devices ORDER BY id ASC');
}

module.exports = { fetchDevices }