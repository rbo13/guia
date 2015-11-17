(function(){
  'use strict';

  var Location = require('../app/models/Location');

  var locationEndpoint = function(){

    var getLocationById = function(req, res, next){
        Location.findById(req.params.locationId, function(err, getLocation){
            if(err) res.status(500).send(err);
            else if(getLocation){
                req.getLocation = getLocation;
                next();
            }else{
                res.status(404).send('No Location found!');
            }
        });
    }

    var get = function(req, res){
        Location.find({}, function(err, locations){
            if(err){
                res.send(err);
                return;
            }
            res.json(locations);
        });
    };

    var getById = function(req, res){
      res.json(req.getLocation);
    };

    return {
      getLocationById: getLocationById,
      get: get,
      getById: getById
    }
  };

  module.exports = locationEndpoint;
})();
