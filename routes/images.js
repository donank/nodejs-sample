var express = require('express');
var router = express.Router();
var imagesController = require('../controller/images');
var devicesController = require('../controller/devices');
var path = require('path');
var multiparty = require('multiparty');
const fs = require('fs');

router.get('/', (req, res, next) => {
  imagesController.fetchImages().then((result) => {
    result.rows == "" ? res.status(200).json({data: []}) : res.status(200).json({ data: result.rows })
  }).catch(err => {
    throw error
  })
});

router.get('/:id', (req, res, next) => {
  imagesController.fetchImageById(req.params.id).then((result) => {
    res.status(200).json(result.rows[0])
  }).catch(err => {
    throw error
  })
});

router.post('/', (req, res, next) => {
  let dir = path.join(__dirname, `../public/images/${req.headers.doctor_id}/${req.headers.device_id}`)
  if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  var options = {
    uploadDir: path.join(__dirname, `../public/images/${req.headers.doctor_id}/${req.headers.device_id}`)
  }
  var form = new multiparty.Form(options);
  form.on('error', (err) =>  {
    console.log('Error parsing form: ' + err.stack);
  });
  form.parse(req, (err, fields, files) => {
    fs.rename(`${files.File[0].path}`, `${options.uploadDir}/${files.File[0].originalFilename}`, (err) => {
      if ( err ) console.log('ERROR: ' + err);
    })
    devicesController.addDevice(req.headers.device_id, req.headers.doctor_id).then(result => {
      imagesController.addImage(req.headers.device_id, `${req.headers.doctor_id}/${req.headers.device_id}/${files.File[0].originalFilename}`)
    })
  })

  form.on('close', () => {
      res.status(200).json({message: 'success'});
  });

  
});

router.get('/doctor/:id', (req, res, next) => {
  console.log(req.params.id)
  imagesController.fetchImagesByDocId(req.params.id).then((result) => {
    result.rows == "" ? res.status(200).json({data: []}) : res.status(200).json({data: result.rows})
  }).catch(err => {
    throw error
  })
});

router.get('/image_detail/:id', (req, res, next) => {
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
