var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan');

var config = require('./config');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//connect to mongodb
mongoose.connect(config.database, function(err){
  if(err) console.log(err);
  else    console.log('Connected to MongoDB');
});

//load the request middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
//load the api
var api = require('./app/routes/api')(app, express, io);
app.use('/api/v1', api);


http.listen(config.port, function(err){
  if(err){
    console.log(err);
  }else{
    console.log('Server is running. Browse to localhost:' +config.port);
  }
});

//load index page.
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/app/views/index.html');
});
//load admin page
app.get('/dashboard', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/dashboard.html');
});
app.get('/dashboard/guides', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/dashboard.html');
});
app.get('/dashboard/rewards', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/dashboard.html');
});
app.get('/dashboard/location', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/dashboard.html');
});
app.get('/dashboard/preference', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/dashboard.html');
});
app.get('/dashboard/logs', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/logs.html');
});
app.get('/dashboard/statistics', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/dashboard.html');
});
app.get('/guide.html', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/guide.html');
});
app.get('/add_rewards.html', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/add_rewards.html');
});
app.get('/add_location.html', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/add_location.html');
});
app.get('/add_preference.html', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/add_preference.html');
});
app.get('/logs.html', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/logs.html');
});
app.get('/statistics.html', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/statistics.html');
});
app.get('/admin.html', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/admin.html');
});
app.get('/admin', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/admin.html');
});
//album
app.get('/album', function(req, res){
    res.sendFile(__dirname + '/public/app/views/album/album.html');
});
app.get('/album.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/album/album.js');
});
app.get('/styles.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/album/styles.css');
});
app.get('/bootstrap.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/album/bootstrap.css');
});
//add libraries: js, css
app.get('/css/inconsolata.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/css/inconsolata.css');
});
app.get('/css/material-icons.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/css/material-icons.css');
});
app.get('/css/main.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/css/main.css');
});
app.get('/public/app/views/css/ghpages-materialize.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/css/ghpages-materialize.css');
});
app.get('/css/admin.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/css/admin.css');
});
app.get('/jade/search.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/jade/search.js');
});
app.get('/jade/lunr.min.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/jade/lunr.min.js');
});
//fonts
app.get('/font/roboto/Roboto-Regular.ttf', function(req, res){
    res.sendFile(__dirname + '/public/app/views/font/roboto/Roboto-Regular.ttf');
});
app.get('/font/roboto/Roboto-Light.ttf', function(req, res){
    res.sendFile(__dirname + '/public/app/views/font/roboto/Roboto-Light.ttf');
});
app.get('/images/parallax1-min.jpg', function(req, res){
    res.sendFile(__dirname + '/public/app/views/images/parallax1-min.jpg');
});
app.get('/images/parallax2-min.jpg', function(req, res){
    res.sendFile(__dirname + '/public/app/views/images/parallax2-min.jpg');
});
app.get('/images/guia.png', function(req, res){
    res.sendFile(__dirname + '/public/app/views/images/guia.png');
});
app.get('/images/default-user-img.png', function(req, res){
    res.sendFile(__dirname + '/public/app/views/images/default-user-img.png');
});
app.get('/images/guia-inline.png', function(req, res){
   res.sendFile(__dirname + '/public/app/views/images/guia-inline.png');
});
app.get('/views/images/guia-loader.gif', function(req, res){
    res.sendFile(__dirname + '/public/app/views/images/guia-loader.gif');
});
//angular files
app.get('/public/app/app.js', function(req, res){
    res.sendFile(__dirname + '/public/app/app.js');
});
app.get('/public/app/app.dashboard.js', function(req, res){
    res.sendFile(__dirname + '/public/app/app.dashboard.js');
});
app.get('/public/app/app.index.js', function(req, res){
    res.sendFile(__dirname + '/public/app/app.index.js');
});
app.get('/public/app/app.route.js', function(req, res){
    res.sendFile(__dirname + '/public/app/app.route.js');
});
app.get('/public/app/admin.security.js', function(req, res){
    res.sendFile(__dirname + '/public/app/admin.security.js');
});
app.get('/public/app/dashboard.route.js', function(req, res){
    res.sendFile(__dirname + '/public/app/dashboard.route.js');
});
app.get('/public/app/services/locationService.js', function(req, res){
    res.sendFile(__dirname + '/public/app/services/locationService.js');
});
app.get('/public/app/services/rewardService.js', function(req, res){
    res.sendFile(__dirname + '/public/app/services/rewardService.js');
});
app.get('/public/app/services/preferenceService.js', function(req, res){
    res.sendFile(__dirname + '/public/app/services/preferenceService.js');
});
app.get('/public/app/services/userService.js', function(req, res){
    res.sendFile(__dirname + '/public/app/services/userService.js');
});
app.get('/public/app/services/guideService.js', function(req, res){
    res.sendFile(__dirname + '/public/app/services/guideService.js');
});
app.get('/public/app/services/authService.js', function(req, res){
    res.sendFile(__dirname + '/public/app/services/authService.js');
});
app.get('/public/app/services/toastService.js', function(req, res){
    res.sendFile(__dirname + '/public/app/services/toastService.js');
});
app.get('/public/app/services/subscriberService.js', function(req, res){
    res.sendFile(__dirname + '/public/app/services/subscriberService.js');
});
app.get('/public/app/services/statisticService.js', function(req, res){
    res.sendFile(__dirname + '/public/app/services/statisticService.js');
});
app.get('/public/app/services/logService.js', function(req, res){
    res.sendFile(__dirname + '/public/app/services/logService.js');
});
app.get('/public/app/controllers/Dashboard.js', function(req, res){
    res.sendFile(__dirname + '/public/app/controllers/Dashboard.js');
});
app.get('/public/app/controllers/Admin.js', function(req, res){
    res.sendFile(__dirname + '/public/app/controllers/Admin.js');
});
app.get('/public/app/controllers/User.js', function(req, res){
    res.sendFile(__dirname + '/public/app/controllers/User.js');
});
app.get('/public/app/controllers/Reward.js', function(req, res){
    res.sendFile(__dirname + '/public/app/controllers/Reward.js');
});
app.get('/public/app/controllers/Location.js', function(req, res){
    res.sendFile(__dirname + '/public/app/controllers/Location.js');
});
app.get('/public/app/controllers/Preference.js', function(req, res){
    res.sendFile(__dirname + '/public/app/controllers/Preference.js');
});
app.get('/public/app/controllers/Statistics.js', function(req, res){
    res.sendFile(__dirname + '/public/app/controllers/Statistics.js');
});
app.get('/public/app/controllers/Subscriber.js', function(req, res){
    res.sendFile(__dirname + '/public/app/controllers/Subscriber.js');
});
app.get('/public/app/controllers/Logs.js', function(req, res){
    res.sendFile(__dirname + '/public/app/controllers/Logs.js');
});
app.get('/public/app/directives/reverse.js', function(req, res){
    res.sendFile(__dirname + '/public/app/directives/reverse.js');
});
//bower files
app.get('/bower_components/angular-chart.js/dist/angular-chart.min.js', function(req, res){
    res.sendFile(__dirname + '/bower_components/angular-chart.js/dist/angular-chart.min.js');
});
app.get('/bower_components/angular-chart.js/dist/angular-chart.css', function(req, res){
    res.sendFile(__dirname + '/bower_components/angular-chart.js/dist/angular-chart.css');
});
app.get('/bower_components/Chart.js/Chart.min.js', function(req, res){
    res.sendFile(__dirname + '/bower_components/Chart.js/Chart.min.js');
});
app.get('/bower_components/c3/c3.min.js', function(req, res){
    res.sendFile(__dirname + '/bower_components/c3/c3.min.js');
});
app.get('/bower_components/angular-sanitize/angular-sanitize.min.js', function(req, res){
    res.sendFile(__dirname + '/bower_components/angular-sanitize/angular-sanitize.min.js');
});
app.get('/bower_components/angular-toastr/dist/angular-toastr.tpls.js', function(req, res){
    res.sendFile(__dirname + '/bower_components/angular-toastr/dist/angular-toastr.tpls.js');
});
app.get('/bower_components/angular-toastr/dist/angular-toastr.css', function(req, res){
    res.sendFile(__dirname + '//bower_components/angular-toastr/dist/angular-toastr.css');
});
app.get('/bower_components/angular-animate/angular-animate.js', function(req, res){
    res.sendFile(__dirname + '/bower_components/angular-animate/angular-animate.js');
});
app.get('/bower_components/angular-confirm-modal/angular-confirm.min.js', function(req, res){
    res.sendFile(__dirname + '/bower_components/angular-confirm-modal/angular-confirm.min.js');
});
app.get('/bower_components/ngConfirmDialog/src/css/ngConfirmDialog.css', function(req, res){
    res.sendFile(__dirname + '/bower_components/ngConfirmDialog/src/css/ngConfirmDialog.css');
});
app.get('/bower_components/ngConfirmDialog/src/js/ngConfirmDialog.js', function(req, res){
    res.sendFile(__dirname + '/bower_components/ngConfirmDialog/src/js/ngConfirmDialog.js');
});
app.get('/socket.io/socket.io.js', function(req, res){
    res.sendFile(__dirname + '/socket.io/socket.io.js');
});