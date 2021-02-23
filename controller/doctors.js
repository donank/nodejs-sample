const pool = require('../db');

const fetchDoctors = () => {
    return pool.query('SELECT * FROM doctors ORDER BY id ASC');
}

module.exports = { fetchDoctors }