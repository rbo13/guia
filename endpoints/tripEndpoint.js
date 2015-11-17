(function(){
    'use strict';

    var Trip = require('../app/models/Trip');

    var tripEndpoint = function(){

        var get = function(req, res){
            Trip.find({}, function(err, getTrips){
                if(err){
                    res.send(err);
                    return;
                }
                res.json(getTrips);
            });
        }

        return {
            get: get
        }
    }

    module.exports = tripEndpoint
})();