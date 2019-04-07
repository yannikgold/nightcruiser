var models = require('../models/mdl_generics');

var controller = {
    getOffers: function(req, callback){

        var period = new Date();
        period.setHours(period.getHours() - 6);

        models.findAll('locations', {'time' : {$gte: period}}, {}, function(err, result){
            if(!err){
                //Let the smaller radius offers be above the bigger ones -> they can be clicked in frontend
                result.sort(function(a, b){return b.radius-a.radius});

                //Remove all the expired offers
                result.forEach(function(item, index, object) {
                    var selectedDuration = item.duration * 60 * 60 * 1000; /* ms */
                    if((new Date() - new Date(item.time)) > selectedDuration){
                        object.splice(index, 1);
                    }
                });
                
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