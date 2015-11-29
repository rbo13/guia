(function(){
    'use strict';

  var config = require('../../config');
  var file = require('../models/Files');
  var jsonwebtoken = require('jsonwebtoken');
  var secretKey = config.secretKey;
  var loggedInUser, guide_id;
  var user, location, traveler,
    preference, guide, rating,
    review, trip, tour, reward,
    redeem, booking, note, negotiate;

  module.exports = function(app, express){
      var api = express.Router();
      var endpoints = require('../../endpoints/endpoints.js')();
//begin endpoints
      api.use('/user/:userId', endpoints.getById); //end getById endpoint
      api.route('/user/:userId')
         .get(endpoints.get)
         .patch(endpoints.patch)
         .delete(endpoints.deleteUser);

  //createUser
      var createUser = function(req, res){
          user = new file.User({
              facebook_id: req.body.facebook_id,
              name: req.body.name,
              birthday: req.body.birthday,
              age: req.body.age,
              gender: req.body.gender,
              profImage: req.body.profImage,
              guide_id: req.body.guide_id
          });
          if(!req.body.facebook_id){
              res.status(400).send('User not available!');
          }else{
              user.save(function(err){
                  if(err){
                      res.send(err);
                      return;
                  }else if(!err){
                      file.User.find({})
                          .populate('facebook_id')
                          .populate('name')
                          .populate('birthday')
                          .populate('age')
                          .populate('gender')
                          .populate('profImage')
                          .populate('guide_id');
                      res.json(user);
                  }
              }); //end user.save()
          }
      }; //end createUser
    //start: login endpoint
    api.post('/login', function(req, res){
      file.User.findOne({
        guide_id: req.body.guide_id,
        facebook_id: req.body.facebook_id
      }).select('guide_id facebook_id').exec(function(err, user){
          if(err) throw err;

          if(!user){
            createUser(req, res);
          } else if (user) {
              loggedInUser = user._id;
              res.json(user);
          }
      })
    });//end: login endpoint
    api.get('/users', endpoints.getAllUsers); //end get endpoint
    //POST location endpoint.
    api.route('/location')
        .post(function(req, res){
            location = new file.Location({
                country: req.body.country,
                city: req.body.city
            });
            //save to MongoDB
            location.save(function(err){
                if(err){
                    res.send(err);
                }
                file.Location.find({})
                    .populate('location.country')
                    .populate('location.city')
                    .exec(function(error, locations) {
                        console.log(JSON.stringify(locations, null, "\t"));
                    });
                res.json(location);
            })
        });//end of location POST endpoint.

    api.route('/locations').get(endpoints.getLocation); //end GET location endpoint
      //POST/GET guide endpoint
      api.route('/guide')
          .post(function(req, res){
              if(!loggedInUser){
                  guide = new file.Guide({
                      country: req.body.country,
                      city: req.body.city,
                      contact_number: req.body.contact_number,
                      email_address: req.body.email_address,
                      type: req.body.type,
                      guide_user_id: user._id
                  });
              }else if(loggedInUser){
                  guide = new file.Guide({
                      country: req.body.country,
                      city: req.body.city,
                      contact_number: req.body.contact_number,
                      email_address: req.body.email_address,
                      type: req.body.type,
                      guide_user_id: loggedInUser
                  });
              }

              //save to MongoDB
              guide.save(function(err){
                  if(err){
                      res.send(err);
                  }else if(!err){
                      file.Guide.find({})
                          .populate('location.country')
                          .populate('location.city')
                          .populate('contact_number')
                          .populate('email_address')
                          .populate('type')
                          .populate('guide_user_id');
                      res.json({
                          success: true,
                          message: "Guide Activated!"
                      });
                  }
              });
          });//end POST
      api.route('/guides').get(endpoints.getGuide); //end /GET guide endpoint
      //start getGuideById
      api.use('/guide/:userId', endpoints.getGuideById); //getTravelerById
      api.route('/guide/:userId')
         .get(endpoints.getGuideByIdRoute);//end
      //POST/GET - traveler endpoint
      api.route('/traveler')
          .post(function(req, res){
              if(!loggedInUser){
                  traveler = new file.Traveler({
                      traveler_user_id: user._id
                  });
              }else if(loggedInUser){
                  traveler = new file.Traveler({
                      traveler_user_id: loggedInUser
                  });
              }
              //save to MongoDB
              traveler.save(function(err){
                  if(err){
                      res.send(err);
                  }
                  file.Traveler.find({}).populate('traveler_user_id');
                  res.json({
                      success: true,
                      message: "Traveler Activated!"
                  })
              });
          })
        .get(endpoints.getTraveler);
      //end POST/GET - traveler endpoint

      api.use('/traveler/:travelerId', endpoints.getTravelerById); //getTravelerById
      api.route('/traveler/:travelerId')
         .get(endpoints.getTravelerByIdRoute)
         .patch(endpoints.patchTraveler); //register getTravelerById

      api.use('/location/:locationId', endpoints.getLocationById); //getLocationById
      api.route('/location/:locationId')
          .get(endpoints.getLocationByIdRoute)
          .patch(endpoints.patchLocation); //register getLocationById route
      //start POST-preference endpoint - traveler
      api.route('/preference')
             .post(function(req, res){
               preference = new file.Preference({
                   preference: req.body.preference
               });
                //save to mongodb
                preference.save(function(err){
                  if(err) res.send(err);
                  else if(!err){
                      file.Preference.find({})
                          .populate('preference');
                      res.json(preference);
                  }
                });
             });//end POST-preference endpoint
      //start GET-preference endpoint
       api.get('/preferences', endpoints.getPreference); //end get endpoint
       api.use('/preference/:preferenceId', endpoints.getPreferenceById); //end getByPreferenceId endpoint
       api.route('/preference/:preferenceId').get(endpoints.getPreferenceByIdRoute).patch(endpoints.patchPreference); //register route - GET endpoint
      //start POST-rating endpoint
      api.route('/rating/guide/:guideId')
             .post(function(req, res){
              rating = new file.Rating({
                   TravelerID: traveler._id,
                   GuideID: guide._id,
                   rating: req.body.rating
               });
                //save to mongodb
                rating.save(function(err){
                  if(err) res.send(err);
                  else if(!err){
                      file.Rating.find({})
                          .populate('TravelerID')
                          .populate('GuideID')
                          .populate('rating');
                      res.json(rating);
                  }
                });
             });
      //end POST-rating endpoint
       api.get('/ratings', endpoints.getRatings); //GET-rating endpoint
      //start POST-review endpoint
      api.route('/review/guide/:guideId')
          .post(function(req, res){
            review = new file.Review({
              review_traveler_id: traveler._id,
              review_guide_id: guide._id,
              comment: req.body.comment
            });
            review.save(function(err){
              if(err) res.send(err);
              else if(!err){
                  file.Review.find({})
                      .populate('review_traveler_id')
                      .populate('review_guide_id')
                      .populate('comment');
                  res.json(review);
              }
            });
          });
      //end POST-review endpoint
      api.get('/reviews', endpoints.getReviews); //GET-review endpoint
      //start POST-trip endpoint
      api.route('/trip')
         .post(function(req, res){
           trip = new file.Trip({
               trip_traveler_id: traveler._id,
               location: {
                   country: req.body.location.country,
                   city: req.body.location.city
               },
               destination: req.body.destination,
               date_from: req.body.date_from,
               date_to: req.body.date_to
           });
          //save to mongodb
           trip.save(function(err){
             if(err)  res.send(err);
             else if(!err){
                 file.Trip.find({})
                     .populate('location.country')
                     .populate('location.city')
                     .populate('destination')
                     .populate('date_from')
                     .populate('date_to');
                 res.json(trip);
             }
           });
         }); //end POST-trip endpoint
      api.get('/trips', endpoints.getTrips); //GET-trip endpoint
      //start POST-tour endpoint
      api.route('/tour')
         .post(function(req, res){
           tour = new file.Tour({
             name: req.body.name,
             duration: req.body.duration,
             details: req.body.details,
             tour_preference: req.body.preference,
             rate: req.body.rate,
             tour_guide_id: guide._id
           });
          //save to mongodb
           tour.save(function(err){
             if(err)  res.send(err);
             else if(!err){
                 file.Tour.find({})
                     .populate('name')
                     .populate('duration')
                     .populate('details')
                     .populate('tour_preference')
                     .populate('rate')
                     .populate('tour_guide_id');
                 res.json(tour);
             }
           });
         });//end POST-tour endpoint
      api.get('/tours', endpoints.getAllTours); //end GET-tour endpoint
      //start: POST - reward endpoint
      api.route('/reward')
          .post(function(req, res){
            reward = new file.Reward({
              reward_tour_id: tour._id,
              redeem_points: req.body.redeem_points
            });
            //save to mongoDB
            reward.save(function(err){
              if(err) res.send(err);
              else if(!err){
                  file.Reward.find({})
                      .populate('reward_tour_id')
                      .populate('redeem_points');
                  res.json(reward);
              }
            });
          });//end: POST - reward endpoint
      //start GET-reward endpoint
      api.get('/rewards', function(req, res){
          file.Reward.find({}, function(err, getRewards){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(getRewards);
          });
      });//end GET-reward endpoint
      //start: POST - redeem endpoint
      api.route('/redeem')
          .post(function(req, res){
            redeem = new file.Redeemed({
              redeem_traveler_id: traveler._id,
              redeem_reward_id: reward._id
            });
            //save to mongoDB
            redeem.save(function(err){
              if(err) res.send(err);
              else if(!err){
                  file.Redeemed.find({})
                      .populate('redeem_traveler_id')
                      .populate('redeem_reward_id');
                  res.json(redeem);
              }
            });
          });//end: POST - redeem endpoint
      //start GET-redeem endpoint
      api.get('/redeems', function(req, res){
          file.Redeemed.find({}, function(err, getRedeems){
              if(err){
                  res.send(err);
                  return;
              }
              res.json(getRedeems);
          });
      });//end GET-redeem endpoint
      //start: POST - booking endpoint
      api.route('/book')
         .post(function(req, res){
           booking = new file.Booking({
             booking_tour_id: tour._id,
             booking_traveler_id: traveler._id,
             schedule: req.body.schedule,
             rate: req.body.rate,
             status: req.body.status,
             booking_review_id: review._id,
             booking_rating_id: rating._id
           });
           //save to mongoDB
           booking.save(function(err){
             if(err)  res.send(err);
             else if(!err){
                 file.Booking.find({})
                     .populate('booking_tour_id')
                     .populate('booking_traveler_id')
                     .populate('schedule')
                     .populate('rate')
                     .populate('status')
                     .populate('booking_review_id')
                     .populate('booking_rating_id');
                 res.json(booking);
             }
           });
         });//end: POST - booking endpoint
      //start: POST - note endpoint
      api.route('/note')
          .post(function(req, res){
              note = new file.Note({
                  notes: req.body.notes
              });
              //save to mongoDB
              note.save(function(err){
                  if(err)  res.send(err);
                  else if(!err){
                      file.Note.find({})
                          .populate('notes');
                      res.json(note);
                  }
              });
          });//end: POST - note endpoint
      api.get('/notes', endpoints.getAllNotes); //end: GET - note endpoint
      api.use('/note/:noteId', endpoints.getNoteById); //end getByPreferenceId endpoint
      api.route('/note/:noteId').get(endpoints.getNoteByIdRoute); //end: getById - note endpoint
      //negotiation endpoint
      api.route('/negotiate')
          .post(function(req, res){
            negotiate = new file.Negotiate({
                negotiate_tour_id: tour._id,
                negotiate_traveler_id: traveler._id,
                proposed_rate: req.body.proposed_rate,
                offered_rate: req.body.offered_rate
            });
              negotiate.save(function(err){
                  if(err)   res.send(err);
                  else if(!err){
                      file.Negotiate.find({})
                          .populate('negotiate_tour_id')
                          .populate('negotiate_traveler_id')
                          .populate('proposed_rate')
                          .populate('offered_rate');
                      res.json(negotiate);
                  }
              })
          }); //end

    return api;
  };
})();