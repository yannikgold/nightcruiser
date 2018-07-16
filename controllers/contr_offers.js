var models = require('../models/mdl_generics');

var controller = {
    getOffers: function(req, callback){
        models.findAll('locations', {}, {}, function(err, result){
            if(!err){
                result.sort(function(a, b){return b.radius-a.radius});
                callback(result);
            } else {
                console.error(err);
            }
        });
    },
    postOffer: function(req, callback){
        var offer = req.body;
        offer.time = new Date();
        offer.location = {
            "type" : "Point", 
            "coordinates" : [
                offer.coordinates.lat,
                offer.coordinates.lng
            ]
        }
        delete offer.coordinates;

        console.log(req.body);
        //req.body.time = new Date();

        models.addNew('locations', offer, function(err, result){
            if(!err){
                callback();
            } else {
                console.error(err);
            }
        });
    }
}

module.exports = controller;