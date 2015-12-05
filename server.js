var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan');

var config = require('./config');
var app = express();
var http = require('http').Server(app);
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
var api = require('./app/routes/api')(app, express);
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
app.get('/statistics.html', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/statistics.html');
});
app.get('/admin', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/admin.html');
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
//angular files
app.get('/public/app/app.js', function(req, res){
    res.sendFile(__dirname + '/public/app/app.js');
});
app.get('/public/app/app.dashboard.js', function(req, res){
    res.sendFile(__dirname + '/public/app/app.dashboard.js');
});
app.get('/public/app/app.route.js', function(req, res){
    res.sendFile(__dirname + '/public/app/app.route.js');
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
//bower files
app.get('/bower_components/angular-chart.js/dist/angular-chart.min.js', function(req, res){
    res.sendFile(__dirname + '/bower_components/angular-chart.js/dist/angular-chart.min.js');
});
app.get('/bower_components/Chart.js/Chart.min.js', function(req, res){
    res.sendFile(__dirname + '/bower_components/Chart.js/Chart.min.js');
});
app.get('/bower_components/c3/c3.min.js', function(req, res){
    res.sendFile(__dirname + '/bower_components/c3/c3.min.js');
});