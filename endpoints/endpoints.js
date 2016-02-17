(function(){
  'use strict';

  var file = require('../app/models/Files');
  var conversation;

  var endpoints = function(io){

      //acceptBooking
      var acceptBooking = function(req, res){
          conversation = new file.Conversation;
          file.Booking.findOneAndUpdate({ status: 'pending', _id: req.body._id }, { status: 'accepted' }, function(err, booking){
              if(err) throw err;
              return res.json(booking);
              //file.User.findById({ _id: booking.booking_user_id }, function(err, user){
              //    if(err) throw err;
              //    conversation.traveler.id = user._id;
              //    conversation.traveler.name = user.name;
              //});
              //file.Guide.findById({ _id: booking.booking_guide_id }, function(err, guide){
              //    if(err) throw err;
              //    file.User.findById({ _id: guide.guide_user_id }, function(err, user_guide){
              //        conversation.guide.id = user_guide.guide_id;
              //        conversation.guide.name = user_guide.name;
              //
              //        conversation.save(function(err){
              //            if(err) throw err;
              //            return res.json(conversation);
              //        });
              //    });
              //});
          });
      };
      //declineBooking
      var declineBooking = function(req, res){
          file.Booking.findOneAndUpdate({ status: 'pending', _id: req.body._id }, { status: 'declined' }, function(err, booking){
              if(err) throw err;
              return res.json(booking);
          })
      };
      //completeBooking
      var completeBooking = function(req, res){
          file.Booking.findOneAndUpdate({ status: 'accepted', _id: req.body._id }, { status: 'completed' }, function(err, booking){
              if(err) throw err;
              return res.json(booking);
          });
      };

      //getAllConversations
      var getAllConversations = function(req, res){
          file.Conversation.find({}, function(err, getConversations){
              if(err){
                  res.send(err);
                  return;
              }
              return res.json(getConversations);
          });
      };
      //conversationById
      var getConversationByTravelerId = function(req, res, next){
          file.Conversation.find({ 'traveler.id': req.params.userId }, function(err, conversations){
              if(err) res.status(500).send(err);
              else if(conversations){
                  req.conversations = conversations;
                  next();
              }else{
                  return res.json(conversations);
              }
          });
      };

      var getConversationByTravelerIdRoute = function(req, res){
          return res.json(req.conversations);
      };

      var getConversationById = function(req, res, next){
          file.Conversation.findById(req.params.conversationId, function(err, conversation){
              if(err) res.status(500).send(err);
              else if(conversation){
                  req.conversation = conversation;
                  next();
              }else{
                  return res.json(conversation);
              }
          });
      };

      var getConversationByIdRoute = function(req, res){
          return res.json(req.conversation);
      };

    //user
      var getById = function(req, res, next){
          file.User.findById(req.params.userId, function(err, user){
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
          file.User.find({}, function(err, users){
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
          file.Guide.find({}, function(err, guide){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(guide);
          });
      };

      var getGuideById = function(req, res, next){
          file.Guide.findById(req.params.userId, function(err, guide){
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
          file.Location.findById(req.params.locationId, function(err, getLocation){
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
          file.Location.find({}, function(err, locations){
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
          file.Traveler.find({}, function(err, traveler){
              if(err)   res.send(err);

              res.json(traveler);
          });
      };

      var getTravelerById = function(req, res, next){
          file.Traveler.findById(req.params.travelerId, function(err, getTraveler){
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
          file.Preference.find({}, function(err, preferences){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(preferences);
          });
      };

      var getPreferenceById = function(req, res, next){
          file.Preference.findById(req.params.preferenceId, function(err, preference){
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
          file.Rating.find({}, function(err, rating){
              if(err)   res.send(err);

              res.json(rating);
          })
      };
//end rating

//start review
      var getReviews = function(req, res){
          file.Review.find({}, function(err, getReviews){
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
          file.Trip.find({}, function(err, getTrips){
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
          file.Tour.find({}, function(err, getTours){
              if(err) throw err;

              return res.json(getTours);
          });
      };

      var getTourById = function(req, res, next){
          file.Tour.findById(req.params.tourId, function(err, tour){
              if(err) res.status(500).send(err);
              else if(tour){
                  req.tour = tour;
                  next();
              }else{
                  return res.status(404).send('No tour found!');
              }
          });
      };

      var getTourByIdRoute = function(req, res){
          return res.json(req.tour)
      };

      //var getTourByTourGuideId = function(req, res, next){
      //    file.Tour.find({ tour_guide_id: req.params.tour_guide_id })
      //        .exec(function(err, tour){
      //           if(err) throw err;
      //            else if(tour){
      //               req.tourGuide = tour;
      //               next();
      //           }else{
      //               res.status(404).send('No tour found!');
      //           }
      //        });
      //};
      //
      //var getTourByTourGuideIdRoute = function(req, res){
      //    res.json(req.tourGuide);
      //};

      //var patchTour = function(req, res){
      //    file.Tour.find({ tour_guide_id: req.params.tour_guide_id }, function(err, resp){
      //        resp.forEach(function(doc){
      //
      //            res.send(doc);
      //            //var tour_guide_id = [doc.tour_guide_id];
      //            //
      //            //tour_guide_id.forEach(function(tour){
      //            //    tour = req.body.tour_guide_id;
      //            //
      //            //    doc.tour_guide_id = tour;
      //            //    doc.save(function(err, doc){
      //            //        res.send(doc);
      //            //    });
      //            //});
      //        })
      //    });
      //};
//end tours

      //reward
      var getRewardById = function(req, res, next){
          file.Reward.findById(req.params.rewardId, function(err, getReward){
              if(err) res.status(500).send(err);
              else if(getReward){
                  req.getReward = getReward;
                  next();
              }else{
                  return res.status(404).send('No Reward found');
              }
          });
      };

      var getRewardByIdRoute = function(req, res){
          return res.json(req.getReward);
      };
//end reward

//start note
      var getAllNotes = function(req, res){
          file.Note.find({}, function(err, getNotes){
              if(err){
                  res.send(err);
                  return;
              }
              return res.json(getNotes);
          });
      };

      var getNoteById = function(req, res, next){
          file.Note.find({ note_guide_id: req.params.note_guide_id }, function(err, note){
              if(err) res.status(500).send(err);
              else if(note){
                  req.note = note;
                  next();
              }else{
                  return res.status(404).send('No note found!');
              }
          });
      };

      var getNoteByIdRoute = function(req, res){
          return res.json(req.note);
      };

      var deleteNote = function(req, res){
          file.Note.findByIdAndRemove(req.params.note_guide_id, function(err, note){
              if(err) throw err;

              return res.json(note);
          });
      };
//end note

      //subscriber
      var getAllSubscribers = function(req,res){
          file.Subscriber.find({}).sort({ created: -1 }).exec(function(err, getSubscribers){
              if(err){
                  res.send(err);
                  return;
              }
              return res.json(getSubscribers);
          });
      };//end
      //logs
      var getAllLogs = function(req, res){
          file.Log.find({}, function(err, getLogs){
              if(err){
                  res.send(err);
                  return;
              }
              return res.json(getLogs);
          });
      };//end


      var getAlbumById = function(req, res, next){
          file.Album.findById(req.params.albumId, function(err, album){
              if(err) res.status(500).send(err);
              else if(album){
                  req.album = album;
                  next();
              }else{
                  return res.status(404).send('No album found!');
              }
          });
      };

      var getAlbumByIdRoute = function(req, res){
          return res.json(req.album);
      };

      var getAllAlbums = function(req, res){
          file.Album.find({}, function(err, albums){
              if(err){
                  return res.send(err);
                  return;
              }
              return res.json(albums);
          });
      };

      var getReviewByGuideId = function(req, res, next){
          file.Review.find({'review_guide_id': req.params.guide_id}, function(err, reviews){
              if(err) res.status(500).send(err);
              else if(reviews){
                  req.reviews = reviews;
                  next();
              }else{
                  //res.status(404).send('No Reviews Found');
                  return res.json(reviews);
              }
          });
      };
      var getReviewByGuideIdRoute = function(req, res){
          return res.json(req.reviews);
      };

      return{
          acceptBooking: acceptBooking,
          declineBooking: declineBooking,
          completeBooking: completeBooking,
          getAllConversations: getAllConversations,
          getConversationByTravelerId: getConversationByTravelerId,
          getConversationByTravelerIdRoute: getConversationByTravelerIdRoute,
          getConversationById: getConversationById,
          getConversationByIdRoute: getConversationByIdRoute,
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
          //getTourByTourGuideId: getTourByTourGuideId,
          //getTourByTourGuideIdRoute:getTourByTourGuideIdRoute,
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
          getReviewByGuideIdRoute: getReviewByGuideIdRoute,
          //patchTour: patchTour
      }
  };

module.exports = endpoints;
})();
