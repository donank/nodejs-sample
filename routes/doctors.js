var express = require('express');
var router = express.Router();
var doctorController = require('../controller/doctors');
/* GET home page. */
router.get('/',  (req, res, next) => {
    doctorController.fetchDoctors().then((result) => {
        res.status(200).json({data: result.rows})
    }).catch(err => {
      throw error
    })
});

router.post('/', (req, res, next) => {
  console.log(req.body)
  doctorController.addDoctor(req.body.name).then((result) => {
    res.status(201).json(result.rows[0])
  })
})

module.exports = router;
