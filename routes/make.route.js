const express = require('express');
const app = express();
const makeRoutes = express.Router();

let Make = require('../model/Make');

// api to add make
makeRoutes.route('/add').post(function (req, res) {
  let make = new Make(req.body);
  make.save()
  .then(make => {
    res.status(200).json({'status': 'success','mssg': 'make added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get makes
makeRoutes.route('/').get(function (req, res) {
  Make.find(function (err, makes){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','makes': makes});
    }
  });
});

// api to get make
makeRoutes.route('/make/:id').get(function (req, res) {
  let id = req.params.id;
  Make.findById(id, function (err, make){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','make': make});
    }
  });
});

// api to update route
makeRoutes.route('/update/:id').put(function (req, res) {
    Make.findById(req.params.id, function(err, make) {
    if (!make){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        make.name = req.body.name;
        make.brand = req.body.brand;
        make.color = req.body.color;
        make.local = req.body.local;

        make.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
makeRoutes.route('/delete/:id').delete(function (req, res) {
  Make.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = makeRoutes;