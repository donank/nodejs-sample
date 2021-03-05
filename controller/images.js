const pool = require('../db');

const fetchImages = () => {
    return pool.query('SELECT * FROM patient_images ORDER BY id ASC');
}

const fetchImageById = (id) => {
    return pool.query(`SELECT * FROM patient_images where id=${id}`);
}

const fetchImagesByDocId = (docId) => {
    return pool.query(`select pi2.id, pi2."label", pi2.image_detail, pi2.created_at, pi2.updated_at from patient_images pi2 
    join devices d on d.id = pi2.device_id 
    join doctors d2 on d.doctor_id = d2.id 
   where d2.id = '${docId}'
   `);
}

const addImage = (deviceId, location) => {
    return pool.query(`insert into patient_images (device_id, image_detail) values ('${deviceId}', '${location}')`);
}

module.exports = { fetchImages, fetchImageById, fetchImagesByDocId, addImage }