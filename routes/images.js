var express = require('express');
var router = express.Router();
var imagesController = require('../controller/images');
var path = require('path');

router.get('/', function (req, res, next) {
  imagesController.fetchImages().then((result) => {
    result.rows == "" ? res.status(200).json({data: []}) : res.status(200).json({ data: result.rows })
  }).catch(err => {
    throw error
  })
});

router.get('/:id', function (req, res, next) {
  imagesController.fetchImageById(req.params.id).then((result) => {
    res.status(200).json(result.rows[0])
  }).catch(err => {
    throw error
  })
});

router.get('/doctor/:id', function (req, res, next) {
  console.log(req.params.id)
  imagesController.fetchImagesByDocId(req.params.id).then((result) => {
    result.rows == "" ? res.status(200).json({data: []}) : res.status(200).json({data: result.rows})
  }).catch(err => {
    throw error
  })
});

router.get('/image_detail/:id', function (req, res, next) {
  imagesController.fetchImageById(req.params.id).then((result) => {
    var options = {
      root: path.join(process.cwd(), 'public'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
    var imagePath = result.rows[0].image_detail
    res.sendFile(`images/${imagePath}`, options, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Sent Image Successfully')
      }
    })
  }).catch(err => {
    throw error
  })
});

module.exports = router;
