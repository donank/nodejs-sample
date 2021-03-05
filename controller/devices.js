const pool = require('../db');

const fetchDevices = () => {
    return pool.query('SELECT * FROM devices ORDER BY id ASC');
}

const addDevice = (id, doctorId) => {
    return pool.query(`insert into devices (id, doctor_id) values ('${id}', '${doctorId}') on conflict (id) do nothing;`)
}

module.exports = { fetchDevices, addDevice }