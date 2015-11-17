(function(){
  'use strict';

  var Traveler = require('../app/models/Traveler');

  var travelerEndpoint = function(){

   var getTravelerById = function(req, res, next){
       Traveler.findById(req.params.travelerId, function(err, getTraveler){
           if(err) res.status(500).send(err);
           else if(getTraveler){
               req.getTraveler = getTraveler;
               next();
           }else{
               res.status(404).send('No Traveler found!');
           }
       });
   }
    var get = function(req, res){
      Traveler.find({}, function(err, traveler){
          if(err)   res.send(err);

          res.json(traveler);
      });
    };

    var getById = function(req, res){
      res.json(req.getTraveler);
    };

    var patch = function(req, res){
        if(req.body._id){
            delete req.body._id;
        }
        for(var t in req.body){
            req.getTraveler[t] = req.body[t];
        }
        req.getTraveler.save(function(err){
            if(err)
                res.status(500).send(err);
            else
                res.json(req.getTraveler);
        });
     };

    return {
      getTravelerById: getTravelerById,
      get: get,
      getById: getById,
      patch: patch
    }
  };

  module.exports = travelerEndpoint;
})();
