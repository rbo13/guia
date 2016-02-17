(function(){
    'use strict';

  var config = require('../../config');
  var file = require('../models/Files');
  var jsonwebtoken = require('jsonwebtoken');
  var async = require('async');
  var Pusher = require('pusher');
  var secretKey = config.secretKey;
  var loggedInUser, guide_id;
  var user, location, preference, guide,
    review, trip, tour, reward,
    redeem, booking, note, negotiate, admin, subscribe, log,
    album, conversation;

    var token;

    function createToken(admin){
        token = jsonwebtoken.sign({
            id: admin._id,
            username: admin.username
        }, secretKey, {
            expiresInMinute: 1440
        });

        return token;
    }

  module.exports = function(app, express, io){

      var pusher = new Pusher({
          appId: '179602',
          key: 'b21e529d3fc61f261eb1',
          secret: '30aef7c4afa9f4c08646',
      });

      var api = express.Router();
      var endpoints = require('../../endpoints/endpoints.js')();

      //route variable for socket to listen
      //var routes = {
      //    // /conversation/:id
      //    'conversation': '^\\/conversation\\/(\\d+)$',
      //    // /:something/:id
      //    'default': '^\\/(\\\w+)\\/(\\d+)$'
      //};

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
              coverPhoto: req.body.coverPhoto
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
                          .populate('coverPhoto')
                          .populate('guide_id');
                      return res.json(user);
                  }
              }); //end user.save()
          }
      }; //end createUser
    //start: login endpoint
    api.post('/login', function(req, res){
      file.User.findOne({
        facebook_id: req.body.facebook_id
      }).select('guide_id facebook_id points name age gender').exec(function(err, user){
          if(err) throw err;
          if(!user){
            createUser(req, res);
          } else if (user) {
              loggedInUser = user._id;
              return res.json(user);
          }
      });
    });//end: login endpoint
    api.get('/users', endpoints.getAllUsers); //end get endpoint
    //POST location endpoint.
    api.route('/location')
        .post(function(req, res){
            location = new file.Location({
                country: req.body.country,
                city: req.body.city
            });
            location.save(function(err, newLocation){
                if(err){
                    res.send(err);
                    return;
                }
                io.emit('location', newLocation);
                file.Location.find({})
                    .populate('country')
                    .populate('city')
                    .exec(function(error, locations) {
                        console.log(JSON.stringify(locations, null, "\t"));
                    });
                return res.json(newLocation);
            })
        });//end of location POST endpoint.
    api.route('/locations').get(endpoints.getLocation); //end GET location endpoint
      //POST/GET guide endpoint
      api.route('/guide')
          .post(function(req, res){
              if(!loggedInUser){
                    file.User.findById({ _id: req.body.guide_user_id }, function(err, user){
                        guide = new file.Guide({
                            country: req.body.country,
                            city: req.body.city,
                            contact_number: req.body.contact_number,
                            email_address: req.body.email_address,
                            type: req.body.type,
                            user: {
                                id: user._id,
                                name: user.name,
                                age: user.age,
                                gender: user.gender,
                                profImage: user.profImage
                            }
                        });
                        guide.save(function(err, newGuide){
                            if(err){
                                res.send(err);
                                return;
                            }
                            io.emit('new_guide', newGuide); //socket for adding new guide
                            res.json(guide);
                        });
                    });
                  file.User.findByIdAndUpdate({ _id: req.body.guide_user_id }, { guide_id: "pending" }, function(err, user){
                      console.log(user);
                  });
              }else if(loggedInUser){
                  file.User.findById({ _id: req.body.guide_user_id }, function(err, user){
                      guide = new file.Guide({
                          country: req.body.country,
                          city: req.body.city,
                          contact_number: req.body.contact_number,
                          email_address: req.body.email_address,
                          type: req.body.type,
                          user: {
                              id: user._id,
                              name: user.name,
                              age: user.age,
                              gender: user.gender,
                              profImage: user.profImage
                          }
                      });
                      guide.save(function(err, newGuide){
                          if(err){
                              res.send(err);
                              return;
                          }
                          io.emit('new_guide', newGuide); //socket for adding new guide
                          res.json(guide);
                      });
                  });
                  file.User.findByIdAndUpdate({ _id: req.body.guide_user_id }, { guide_id: "pending" }, function(err, user){
                      console.log(user);
                  });
              }
          });//end POST
      api.route('/guides').get(endpoints.getGuide); //end /GET guide endpoint
      //start getGuideById
      api.use('/guide/:userId', endpoints.getGuideById);
      api.route('/guide/:userId')
         .get(endpoints.getGuideByIdRoute)
         .patch(endpoints.patchGuide);//end
      api.use('/location/:locationId', endpoints.getLocationById); //getLocationById
      api.route('/location/:locationId')
          .get(endpoints.getLocationByIdRoute)
          .patch(function(req, res){
              if(req.body._id){
                  delete req.body._id;
              }
              for(var l in req.body){
                  req.getLocation[l] = req.body[l];
              }
              req.getLocation.save(function(err){
                  if(err)
                      return res.status(500).send(err);
                  else
                      return res.json(req.getLocation);
              });
          }); //register getLocationById route
      //start POST-preference endpoint
      api.route('/preference')
             .post(function(req, res){
               preference = new file.Preference({
                   preference: req.body.preference
               });
                preference.save(function(err, newPreference){
                  if(err) res.send(err);
                  else if(!err){
                      io.emit('preference', newPreference);
                      file.Preference.find({})
                          .populate('preference');
                      return res.json(preference);
                  }
                });
             });//end POST-preference endpoint
      //start GET-preference endpoint
       api.get('/preferences', endpoints.getPreference); //end get endpoint
       api.use('/preference/:preferenceId', endpoints.getPreferenceById); //end getByPreferenceId endpoint
       api.route('/preference/:preferenceId').get(endpoints.getPreferenceByIdRoute).patch(endpoints.patchPreference); //register route - GET endpoint
      //start POST-review endpoint
      api.route('/review')
          .post(function(req, res){
            file.Guide.findById({ _id: req.body.review_guide_id }, function(err, guide){
                var count = guide.reviewCount + 1;
                var ave = ((guide.rating * guide.reviewCount) + req.body.rating) / count;
                    file.Guide.findByIdAndUpdate({ _id: req.body.review_guide_id }, { reviewCount: count, rating: ave }, function(err, updatedguide){
                        if(err) throw err;
                        file.User.findById({_id: req.body.user.id},function(err, user){
                            var newpoint = user.points + req.body.points;
                            file.User.findByIdAndUpdate({ _id: req.body.user.id }, { points: newpoint}, function(err, newUser){
                                if(err) throw err;
                                file.Booking.findByIdAndUpdate({ _id: req.body.review_booking_id }, { status: 'done' }, function(err, updatedBooking){
                                    if(err) throw err;
                                    //TODO:
                                    else if(!err){
                                        trip = new file.Trip({
                                            trip_user_id: updatedBooking.user.id,
                                            location: updatedBooking.tour_location,
                                            date_from: updatedBooking.start_date,
                                            date_to: updateBooking.end_date
                                        });
                                        trip.save(function(err){
                                            if(err)  res.send(err);
                                            else if(!err){
                                                return res.json(trip);
                                            }
                                        });
                                    }
                                })
                            });
                        });
                });
            });
          });
      api.post('/doneBooking', function(req, res){
         file.Booking.findByIdAndUpdate({ _id: req.body.review_booking_id }, { status: 'done' }, function(err, bookingValue){
            if(err) throw err;
             res.send(bookingValue);
         });
      });
      api.get('/reviews', endpoints.getReviews); //GET-review endpoint
      api.get('/review/:guide_id', endpoints.getReviewByGuideId); //GET-review endpoint
      api.use('/review/:guide_id', endpoints.getReviewByGuideIdRoute);

      //start POST-trip endpoint
      //TODO:
      api.route('/trip')
         .post(function(req, res){
              var updateTrip = {
                  description: req.body.description,
                  image: req.body.image
              };
           file.Trip.findByIdAndUpdate({ _id: req.body._id }, updateTrip, function(err, trip){
               if(err) throw err;

               return res.json(trip);
           })
         }); //end POST-trip endpoint
      api.get('/trips', endpoints.getTrips); //GET-trip endpoint
      //start POST-tour endpoint
      api.route('/tour')
         .post(function(req, res){
            file.User.find({ guide_id: req.body.tour_guide_id }, function(err, user){
                if(err) throw err;

                user.forEach(function(user){

                    tour = new file.Tour({
                        name  : req.body.name,
                        tour_location : req.body.tour_location,
                        duration : req.body.duration,
                        duration_format: req.body.duration_format,
                        details  : req.body.details,
                        tour_preference : req.body.tour_preference,
                        tour_guide_id : req.body.tour_guide_id,
                        rate : req.body.rate,
                        points: req.body.rate * .05,
                        negotiable : req.body.negotiable,
                        main_image: req.body.main_image,
                        additional_image: req.body.additional_image,
                        user: {
                            id: user._id,
                            name: user.name,
                            birthday: user.birthday,
                            age: user.age,
                            gender: user.gender,
                            profImage: user.profImage
                        }
                    });
                    tour.save(function(err){
                        if(err)  return res.send(err);
                        else if(!err){
                            return res.json(tour)
                        }
                    });
                });
            });
         });//end POST-tour endpoint
      api.get('/tours', endpoints.getAllTours); //end GET-tour endpoint
      api.use('/tour/:tourId', endpoints.getTourById);
      api.route('/tour/:tourId').get(endpoints.getTourByIdRoute);
      //api.use('/tours/:tour_guide_id', endpoints.getTourByTourGuideId);
      api.post('/tours/:tour_guide_id', function(req, res){
            file.Tour.find({ tour_guide_id: req.params.tour_guide_id }, function(err, tours){

                tours.forEach(function(tour){
                    var tour_guide_id = [tour.tour_guide_id];
                    tour_guide_id.forEach(function(newTour){
                        newTour = req.body.tour_guide_id;
                        tour.tour_guide_id = newTour;

                        tour.save();
                    });
               });
          });
      });

      api.route('/tourByPreference')
          .post(function(req, res){
            var searchQuery = req.body.tour_preference;
                file.Tour.find({
                  tour_location: req.body.tour_location
                })
                .select('name tour_location duration duration_format details tour_guide_id tour_preference rate main_image additional_image points user.id user.name user.gender user.age').exec(function(err, tour){
                    if(err) throw err;
                        if(!tour){
                            res.json({
                                success: false,
                                message: "Tour not found"
                            });
                        }
            return res.json(tour);
        })
      }); //end POSt - tourByPreference endpoint
      //start: POST - reward endpoint
      api.route('/reward')
          .post(function(req, res){
            reward = new file.Reward({
              reward_tour_id: req.body.reward_tour_id,
              redeem_points: req.body.redeem_points
            });
            reward.save(function(err, newReward){
              if(err) res.send(err);
              else if(!err){
                  io.emit('reward', newReward);
                  file.Reward.find({})
                      .populate('reward_tour_id')
                      .populate('redeem_points');
                  return res.json(reward);
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
              return res.json(getRewards);
          });
      });//end GET-reward endpoint
      api.use('/reward/:rewardId', endpoints.getRewardById); //getLocationById
      api.route('/reward/:rewardId')
          .get(endpoints.getRewardByIdRoute)
          .patch(function(req, res){
              if(req.body._id){
                  delete req.body._id;
              }
              for(var r in req.body){
                  req.getReward[r] = req.body[r];
              }
              req.getReward.save(function(err){
                  if(err)
                      return res.status(500).send(err);
                  else
                      return res.json(req.getReward);
              });
          });
      //start: POST - redeem endpoint
      api.route('/redeem')
          .post(function(req, res){
            redeem = new file.Redeemed({
              //redeem_traveler_id: traveler._id,
              redeem_reward_id: reward._id
            });
            redeem.save(function(err){
              if(err) res.send(err);
              else if(!err){
                  file.Redeemed.find({})
                      .populate('redeem_reward_id');
                  return res.json(redeem);
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
              return res.json(getRedeems);
          });
      });//end GET-redeem endpoint
      //start: getAllBooking
      api.get('/bookings', function(req, res){
          file.Booking.find({}, function(err, getBookings){
              if(err){
                  res.send(err);
                  return;
              }
              return res.json(getBookings);
          });
      });//end
      //start: getAllBookingByGuideId
      api.post('/bookings', function(req, res){
          file.Booking.find({booking_guide_id: req.body.booking_guide_id}, function(err, getBookings){
              if(err){
                  res.send(err);
                  return;
              }
              return res.json(getBookings);
          });
      });//end
      //start: POST - booking endpoint
      api.route('/book')
         .post(function(req, res){
              file.Tour.findById({ _id: req.body.booking_tour_id }, function(err, tour){
                  if(err) throw err;
                  else{
                      file.User.findById({ _id: req.body.booking_user_id }, function(err, user){
                          if(err) throw err;
                          else{
                                booking = new file.Booking({
                                    tour: {
                                        id: tour._id,
                                        name: tour.name,
                                        tour_location: tour.tour_location,
                                        duration: tour.duration,
                                        duration_format: tour.duration_format,
                                        details: tour.details,
                                        tour_guide_id: tour.tour_guide_id,
                                        rate: tour.rate,
                                        main_image: tour.main_image,
                                        tour_preference: tour.tour_preference,
                                        points: tour.points
                                    },
                                    user: {
                                        name: user.name,
                                        profImage: user.profImage,
                                        age: user.age,
                                        gender: user.gender
                                    },
                                    booking_user_id: req.body.booking_user_id,
                                    booking_guide_id: req.body.booking_guide_id,
                                    start_date: req.body.start_date,
                                    end_date: req.body.end_date
                                });
                                booking.save(function(err){
                                    if(err) res.send(err);
                                    return res.json(booking);
                                });
                          }
                      });
                  }
              });
         });//end: POST - booking endpoint
      api.post('/booking', function(req, res){
          file.Booking.find({ booking_user_id: req.body.booking_user_id }, function(err, booking){
              if(err){
                  res.send(err);
                  return;
              }
              return res.json(booking);
          });
      });
      api.route('/acceptBooking').post(endpoints.acceptBooking); //end: POST - acceptBooking endpoint
      api.route('/declineBooking').post(endpoints.declineBooking); //end: POST - declineBooking endpoint
      api.route('/completeBooking').post(endpoints.completeBooking); //end: POST - completeBooking endpoint
      //start: POST - note endpoint
      api.route('/note')
          .post(function(req, res){
              note = new file.Note({
                  title: req.body.title,
                  note_content: req.body.note_content,
                  note_date: req.body.note_date,
                  note_guide_id: req.body.note_guide_id
              });
              note.save(function(err){
                  if(err) throw err;
                  else if(!err){
                      return res.json(note);
                  }
              });
          });//end: POST - note endpoint
      api.get('/notes', endpoints.getAllNotes); //end: GET - note endpoint
      api.use('/note/:note_guide_id', endpoints.getNoteById); //end getByPreferenceId endpoint
      api.route('/note/:note_guide_id').get(endpoints.getNoteByIdRoute).post(endpoints.deleteNote);
      api.route('/notes/:note_id')
         .post(function(req, res){
          file.Note.findByIdAndUpdate(req.params.note_id, { title: req.body.title, note_content: req.body.note_content, note_date: req.body.note_date }, function(err, newNote){
              if(err) throw err;
              return res.json(newNote);
          });
      });
      api.route('/negotiate')
          .post(function(req, res){
            negotiate = new file.Negotiate({
                negotiate_tour_id: tour._id,
                //negotiate_traveler_id: traveler._id,
                proposed_rate: req.body.proposed_rate,
                offered_rate: req.body.offered_rate
            });
              negotiate.save(function(err){
                  if(err)   res.send(err);
                  else if(!err){
                      file.Negotiate.find({})
                          .populate('negotiate_tour_id')
                          .populate('proposed_rate')
                          .populate('offered_rate');
                      return res.json(negotiate);
                  }
              })
          }); //end
      api.post('/subscribe', function(req, res){
          subscribe = new file.Subscriber({
              email: req.body.email
          });
          if(!req.body.email){
              res.status(400);
              res.send({ message: 'Email is Required', success: false });
          }else{
              subscribe.save(function(err){
                  if(err){
                      res.send(err);
                      return;
                  }
                  res.json({
                      success: true,
                      message: 'Success'
                  });
              });
          }
      });
      api.get('/subscribers', endpoints.getAllSubscribers); //end GET-subscriber endpoint
      api.post('/log', function(req, res){
          log = new file.Log({
              activity: req.body.activity
          });
          log.save(function(err, newLog){
              if(err){
                  res.send(err);
                  return;
              }
              io.emit('new_log', newLog); //socket for adding new guide
              res.json({
                  success: true,
                  message: 'Success'
              });
          });
      });
      api.get('/logs', endpoints.getAllLogs); //end GET-log endpoint
      api.post('/album', function(req, res){
          album = new file.Album({
              album_name: req.body.album_name,
              description: req.body.description,
              created: req.body.created,
              images: req.body.images,
              album_tour_id: req.body.album_tour_id,
              user: {
                  id: req.body.user.id,
                  facebook_id: req.body.user.facebook_id,
                  name: req.body.user.name,
                  profImage: req.body.user.profImage
              }
          });
          album.save(function(err, newAlbum){
              if(err){
                  res.send(err);
                  return;
              }
              file.Location.find({})
                  .populate('album_name')
                  .populate('description')
                  .populate('created')
                  .populate('images')
                  .populate('album_tour_id')
                  .populate('user.id')
                  .populate('user.facebook_id')
                  .populate('user.name')
                  .populate('user.profImage');
              return res.json(newAlbum);
          });
      });
      api.get('/albums', endpoints.getAllAlbums);
      api.use('/album/:albumId', endpoints.getAlbumById); //end getById endpoint
      api.route('/album/:albumId')
          .get(endpoints.getAlbumByIdRoute); //end

      //conversation
      api.post('/conversation', function(req, res){
          file.Conversation.findById({ _id: req.body._id }, function(err, conversation){
              conversation.messages.push({ id: req.body.messages.id, name: req.body.messages.name, profImage: req.body.messages.profImage, message: req.body.messages.message });

              pusher.trigger('conversation', 'new_conversation', conversation);
              conversation.save(function(err){
                  if(err) throw err;
                  return res.json(conversation);
              })
          });
      });
      //get conversation
      api.get('/conversations', endpoints.getAllConversations);
      //get conversation by id
      //api.use('/conversations/:userId', endpoints.getConversationByTravelerId);
      //api.route('/conversations/:userId').get(endpoints.getConversationByTravelerIdRoute);

      api.use('/conversation/:conversationId', function(req, res, next){
          file.Conversation.findById(req.params.conversationId, function(err, conversation){
              if(err) res.status(500).send(err);
              else if(conversation){
                  req.conversation = conversation;
                  next();
              }else{
                  return res.json(conversation);
              }
          });
      });

      api.route('/conversation/:conversationId').get(function(req, res){
          return res.json(req.conversation);
      });

      //TODO: CONTINUE SOCKET
      //var nsp = io.of('/api/v1/conversations');
      //
      //nsp.on('connection', function(socket){
      //   console.log('A user connected ' +socket.id);
      //});
      //signup admin
      api.post('/admin/signup', function(req, res){
          admin = new file.Admin({
              username: req.body.username,
              password: req.body.password
          });
          token = createToken(admin);
          admin.save(function(err){
              if(err){
                  res.send(err);
                  return;
              }
              res.json({
                  success: true,
                  message: 'Success, Admin has been created',
                  token: token
              });
          });
      });//end
      //admin login
      api.post('/admin/login', function(req, res){
          file.Admin.findOne({
              username: req.body.username
          }).select('username password').exec(function(err, admin){
              if(err) throw err;
              if(!admin){
                  res.send({ message: "No admin found"});
              }else if(admin){
                  var validPassword = admin.comparePassword(req.body.password);
                  if(!validPassword){
                      res.send({ message: "Invalid Password!" });
                  }else{
                      //create token
                      var token = createToken(admin);
                      res.json({
                          success: true,
                          message: "Success!",
                          token: token
                      });
                  }
              }
          });
      }); //end admin login
      //secure admin page
      api.use(function(req, res, next){
          //fetch the token.
          var token = req.body.token || req.param('token') || req.headers['x-access-token'];
          if(token){
              jsonwebtoken.verify(token, secretKey, function(err, decoded){
                  if(err){
                      res.status(403).send({ success:false, message: "Token dont match" });
                  }else{
                      //go to the next route
                      req.decoded = decoded;
                      next();
                  }
              });
          }else{
              res.status(403).send({ success:false, message: "Token Mismatch" });
          }
      });
    return api;
  };
})();
