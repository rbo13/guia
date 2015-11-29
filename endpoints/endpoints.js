(function(){
  'use strict';

  var User = require('../app/models/User');
  var Guide = require('../app/models/Guide');
  var Location = require('../app/models/Location');
  var Traveler = require('../app/models/Traveler');
  var Preference = require('../app/models/Preference');
  var Rating = require('../app/models/Rating');
  var Review = require('../app/models/Review');
  var Trip = require('../app/models/Trip');
  var Tour = require('../app/models/Tour');
  var Note = require('../app/models/Note');

  var endpoints = function(){
//user
      var getById = function(req, res, next){
          User.findById(req.params.userId, function(err, user){
              if(err) res.status(500).send(err);
              else if(user){
                  req.user = user;
                  next();
              }else{
                  res.status(404).send('No user found!');
              }
          });
      };
      var getAllUsers = function(req, res){
          User.find({}, function(err, users){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(users);
          });
      };
      var get = function(req, res){
          res.json(req.user);
      };
      var patch = function(req, res){
          if(req.body._id){
              delete req.body._id;
          }
          for(var u in req.body){
              req.user[u] = req.body[u];
          }
          req.user.save(function(err){
              if(err)
                  res.status(500).send(err);
              else
                  res.json(req.user);
          });
      };
      var deleteUser = function(req, res){
          req.user.remove(function(err){
              if(err)
                  res.status(500).send(err);
              else
                  res.status(204).json({ message: "User has been removed successfully!" });
          });
      };
//end user

//guide
      var getGuide = function(req, res){
          Guide.find({}, function(err, guide){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(guide);
          });
      };

      var getGuideById = function(req, res, next){
          Guide.findById(req.params.userId, function(err, guide){
              if(err) res.status(500).send(err);
              else if(guide){
                  req.getGuide = guide;
                  next();
              }else{
                  res.status(404).send('No Guide found!');
              }
          });
      };

      var getGuideByIdRoute = function(req, res){
          res.json(req.getGuide);
      };
//end guide

//location
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
      };

      var getLocationByIdRoute = function(req, res){
          res.json(req.getLocation);
      };

      var getLocation = function(req, res){
          Location.find({}, function(err, locations){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(locations);
          });
      };

      var patchLocation = function(req, res){
          if(req.body._id){
              delete req.body._id;
          }
          for(var l in req.body){
              req.getLocation[l] = req.body[l];
          }
          req.getLocation.save(function(err){
              if(err)
                  res.status(500).send(err);
              else
                  res.json(req.getLocation);
          });
      };
//end location

//traveler
      var getTraveler = function(req, res){
          Traveler.find({}, function(err, traveler){
              if(err)   res.send(err);

              res.json(traveler);
          });
      };

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
      };

      var getTravelerByIdRoute = function(req, res){
          res.json(req.getTraveler);
      };

      var patchTraveler = function(req, res){
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
//end traveler

//start preference
      var getPreference = function(req, res){
          Preference.find({}, function(err, preferences){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(preferences);
          });
      };

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
      };

      var getPreferenceByIdRoute = function(req, res){
          res.json(req.preference)
      };
//end preference

//start rating
      var getRatings = function(req, res){
          Rating.find({}, function(err, rating){
              if(err)   res.send(err);

              res.json(rating);
          })
      };
//end rating

//start review
      var getReviews = function(req, res){
          Review.find({}, function(err, getReviews){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(getReviews);
          });
      };
//end review

//start trip
      var getTrips = function(req, res){
          Trip.find({}, function(err, getTrips){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(getTrips);
          });
      };
//end trip

//start tours
      var getAllTours = function(req, res){
          Tour.find({}, function(err, getTours){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(getTours);
          });
      };
//end tours

//start note
      var getAllNotes = function(req, res){
          Note.find({}, function(err, getNotes){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(getNotes);
          });
      };

      var getNoteById = function(req, res, next){
          Note.findById(req.params.noteId, function(err, note){
              if(err) res.status(500).send(err);
              else if(note){
                  req.note = note;
                  next();
              }else{
                  res.status(404).send('No note found!');
              }
          });
      };

      var getNoteByIdRoute = function(req, res){
          res.json(req.note)
      };
//end note
      return{
          getLocationById: getLocationById,
          getLocationByIdRoute: getLocationByIdRoute,
          getLocation: getLocation,
          getGuide: getGuide,
          patchLocation: patchLocation,
          getGuideById: getGuideById,
          getGuideByIdRoute: getGuideByIdRoute,
          getTraveler: getTraveler,
          getTravelerById: getTravelerById,
          getTravelerByIdRoute: getTravelerByIdRoute,
          patchTraveler: patchTraveler,
          getPreference: getPreference,
          getPreferenceById: getPreferenceById,
          getPreferenceByIdRoute: getPreferenceByIdRoute,
          getRatings: getRatings,
          getReviews: getReviews,
          getTrips: getTrips,
          getAllTours: getAllTours,
          getAllNotes: getAllNotes,
          getNoteById: getNoteById,
          getNoteByIdRoute: getNoteByIdRoute,
          getById: getById,
          getAllUsers: getAllUsers,
          get: get,
          patch: patch,
          deleteUser: deleteUser
      }
  };

module.exports = endpoints;
})();
