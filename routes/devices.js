var express = require('express');
var router = express.Router();
var devicesController = require('../controller/devices');

router.get('/', function (req, res, next) {
  devicesController.fetchDevices().then((result) => {
        res.status(200).json(result.rows)
    }).catch(err => {
      throw error
    })
});

module.exports = router;
