(function(){
    'use strict';

    var Preference = require('../app/models/Preference');

    var preferenceEndpoint = function(){

        var get = function(req, res){
            Preference.find({}, function(err, preferences){
                if(err){
                    res.send(err);
                    return;
                }
                res.json(preferences);
            });
        }

        var getPreferenceById = function(req, res, next){
            Preference.findById(req.params.preferenceId, function(err, preference){
                if(err) res.status(500).send(err);
                else if(preference){
                    req.preference = preference;
                    next();
                }else{
                    res.status(404).send('No preference found!');
                }
            });
        }
        return {
            get: get,
            getPreferenceById: getPreferenceById
        }
    }

    module.exports = preferenceEndpoint;
})();