(function(){
    'use strict';

    var Rating = require('../app/models/Rating');

    var ratingEndpoint = function(){

        var get = function(req, res){
            Rating.find({}, function(err, rating){
                if(err)   res.send(err);

                res.json(rating);
            })
        }

        return {
            get: get
        }
    }

    module.exports = ratingEndpoint;
})();