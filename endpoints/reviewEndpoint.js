(function(){
    'use strict';

    var Review = require('../app/models/Review');

    var reviewEndpoint = function(){

        var get = function(req, res){
            Review.find({}, function(err, getReviews){
                if(err){
                    res.send(err);
                    return;
                }
                res.json(getReviews);
            });
        }

        return {
            get: get
        }
    }

    module.exports = reviewEndpoint;
})();