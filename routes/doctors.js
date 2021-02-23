var express = require('express');
var router = express.Router();
var doctorController = require('../controller/doctors');
/* GET home page. */
router.get('/', function (req, res, next) {
    doctorController.fetchDoctors().then((result) => {
        res.status(200).json(result.rows)
    }).catch(err => {
      throw error
    })
});

module.exports = router;
