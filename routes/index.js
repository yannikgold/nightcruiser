var express = require('express');
var router = express.Router();
var models = require('../models/mdl_generics');
var controller = require('../controllers/contr_offers.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getOffers', function(req, res, next) {
  controller.getOffers(res, function(response){
    res.send(response);
  });
});

router.post('/newOffer', function(req, res, next) {
  controller.postOffer(req, function(){
    res.send('New offer added successfully!');
  });
});

module.exports = router;
