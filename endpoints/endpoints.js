(function(){
  'use strict';

  var User = require('../app/models/User');
  var Guide = require('../app/models/Guide');
  var Location = require('../app/models/Location');
  var Preference = require('../app/models/Preference');
  var Review = require('../app/models/Review');
  var Trip = require('../app/models/Trip');
  var Tour = require('../app/models/Tour');
  var Note = require('../app/models/Note');
  var Reward = require('../app/models/Reward');
  var Subscriber = require('../app/models/Subscriber');
  var Log = require('../app/models/Log');
  var Album = require('../app/models/Album');
  var Conversation = require('../app/models/Conversation');
  var Booking = require('../app/models/Booking');
  var Booking = require('../app/models/Booking');
  var Redeemed = require('../app/models/Redeemed');
  var conversation;

  var endpoints = function(io){
      //getAllRedeems
      var getAllRedeems = function(req, res){
          Redeemed.find({}, function(err, getRedeems){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(getRedeems);
          });
      };
      //getAllConversations
      var getAllConversations = function(req, res){
          Conversation.find({}, function(err, getConversations){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(getConversations);
          });
      };
      //acceptBooking
      var acceptBooking = function(req, res){
          conversation = new Conversation;
          Booking.findOneAndUpdate({ status: 'pending', _id: req.body._id }, { status: 'accepted' }, function(err, booking){
              if(err) throw err;
              User.findById({ _id: booking.booking_user_id }, function(err, user){
                  if(err) throw err;
                  conversation.traveler.id = user._id;
                  conversation.traveler.name = user.name;
              });
              Guide.findById({ _id: booking.booking_guide_id }, function(err, guide){
                  if(err) throw err;
                  User.findById({ _id: guide.guide_user_id }, function(err, user_guide){
                      conversation.guide.id = user_guide.guide_id;
                      conversation.guide.name = user_guide.name;

                      conversation.save(function(err){
                          if(err) throw err;
                          res.json(conversation);
                      });
                  });
              });
          });
      };
      //declineBooking
      var declineBooking = function(req, res){
          Booking.findOneAndUpdate({ status: 'pending', _id: req.body._id }, { status: 'declined' }, function(err, booking){
              if(err) throw err;
              res.json(booking);
          })
      };
      //completeBooking
      var completeBooking = function(req, res){
          Booking.findOneAndUpdate({ status: 'accepted', _id: req.body._id }, { status: 'completed' }, function(err, booking){
              if(err) throw err;
              res.json(booking);
          });
      };
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

      var patchGuide = function(req, res){
          if(req.body._id){
              delete req.body._id;
          }
          for(var g in req.body){
              req.getGuide[g] = req.body[g];
          }
          req.getGuide.save(function(err){
              if(err)
                  res.status(500).send(err);
              else
                  res.json(req.getGuide);
          });
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

      var patchPreference = function(req, res) {
          if (req.body._id) {
              delete req.body._id;
          }
          for (var p in req.body) {
              req.preference[p] = req.body[p];
          }
          req.preference.save(function (err) {
              if (err)
                  res.status(500).send(err);
              else
                  res.json(req.preference);
          })
      }
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
          })
          .sort({created: 'desc'});
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

      var getTourById = function(req, res, next){
          Tour.findById(req.params.tourId, function(err, tour){
              if(err) res.status(500).send(err);
              else if(tour){
                  req.tour = tour;
                  next();
              }else{
                  res.status(404).send('No tour found!');
              }
          });
      };

      var getTourByIdRoute = function(req, res){
          res.json(req.tour)
      };
//end tours

      //reward
      var getRewardById = function(req, res, next){
          Reward.findById(req.params.rewardId, function(err, getReward){
              if(err) res.status(500).send(err);
              else if(getReward){
                  req.getReward = getReward;
                  next();
              }else{
                  res.status(404).send('No Reward found');
              }
          });
      };

      var getRewardByIdRoute = function(req, res){
          res.json(req.getReward);
      };
//end reward

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
          Note.find({ note_guide_id: req.params.note_guide_id }, function(err, note){
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
          res.json(req.note);
      };
//end note

      //subscriber
      var getAllSubscribers = function(req,res){
          Subscriber.find({}, function(err, getSubscribers){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(getSubscribers);
          });
      };//end
      //logs
      var getAllLogs = function(req, res){
          Log.find({}, function(err, getLogs){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(getLogs);
          });
      };//end

      var deleteNote = function(req, res){
          req.note.remove(function(err){
              if(err)
                  res.status(500).send(err);
              else
                  res.status(204).json({ message: "Note has been removed successfully!" });
          });
      };
      var getAlbumById = function(req, res, next){
          Album.findById(req.params.albumId, function(err, album){
              if(err) res.status(500).send(err);
              else if(album){
                  req.album = album;
                  next();
              }else{
                  res.status(404).send('No album found!');
              }
          });
      };

      var getAlbumByIdRoute = function(req, res){
          res.json(req.album);
      };

      var getAllAlbums = function(req, res){
          Album.find({}, function(err, albums){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(albums);
          });
      };

      var getReviewByGuideId = function(req, res, next){
          Review.find({'review_guide_id': req.params.guide_id}, function(err, reviews){
              if(err) res.status(500).send(err);
              else if(reviews){
                  req.reviews = reviews;
                  next();
              }else{
                  //res.status(404).send('No Reviews Found');
                  res.json(reviews);
              }
          });
      };
      var getReviewByGuideIdRoute = function(req, res){
          res.json(req.reviews);
      };

      return{
          getAllRedeems: getAllRedeems,
          getAllConversations: getAllConversations,
          acceptBooking: acceptBooking,
          declineBooking: declineBooking,
          completeBooking: completeBooking,
          getLocationById: getLocationById,
          getLocationByIdRoute: getLocationByIdRoute,
          getLocation: getLocation,
          getGuide: getGuide,
          getGuideById: getGuideById,
          getGuideByIdRoute: getGuideByIdRoute,
          patchGuide: patchGuide,
          getTraveler: getTraveler,
          getTravelerById: getTravelerById,
          getTravelerByIdRoute: getTravelerByIdRoute,
          patchTraveler: patchTraveler,
          getPreference: getPreference,
          getPreferenceById: getPreferenceById,
          getPreferenceByIdRoute: getPreferenceByIdRoute,
          patchPreference: patchPreference,
          getRatings: getRatings,
          getReviews: getReviews,
          getTrips: getTrips,
          getAllTours: getAllTours,
          getTourById: getTourById,
          getTourByIdRoute: getTourByIdRoute,
          getRewardById: getRewardById,
          getRewardByIdRoute: getRewardByIdRoute,
          getAllNotes: getAllNotes,
          getNoteById: getNoteById,
          getNoteByIdRoute: getNoteByIdRoute,
          getById: getById,
          getAllUsers: getAllUsers,
          get: get,
          patch: patch,
          deleteUser: deleteUser,
          getAllSubscribers: getAllSubscribers,
          getAllLogs: getAllLogs,
          deleteNote: deleteNote,
          getAlbumById: getAlbumById,
          getAlbumByIdRoute: getAlbumByIdRoute,
          getAllAlbums: getAllAlbums,
          getReviewByGuideId: getReviewByGuideId,
          getReviewByGuideIdRoute: getReviewByGuideIdRoute
      }
  };

module.exports = endpoints;
})();
