const pool = require('../db');

const fetchDoctors = () => {
    return pool.query('SELECT * FROM doctors ORDER BY id ASC');
}

const fetchDoctorById = (id) => {
    return pool.query(`SELECT * FROM doctors where id=${id}`);
}

const addDoctor = (doctorName) => {
    return pool.query(`INSERT INTO doctors VALUES ('${doctorName}') returning id`);
}


module.exports = { fetchDoctors, fetchDoctorById, addDoctor }