const pool = require('../db');

const fetchImages = () => {
    return pool.query('SELECT * FROM patient_images ORDER BY id ASC');
}

const fetchImageById = (id) => {
    return pool.query(`SELECT * FROM patient_images where id=${id}`);
}

module.exports = { fetchImages, fetchImageById }