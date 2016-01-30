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
//terms
app.get('/terms', function(req, res){
    res.sendFile(__dirname + '/public/app/views/terms.html');
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
    res.sendFile(__dirname + '/public/app/views/admin/dashboard.html');
});
app.get('/dashboard/statistics', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/dashboard.html');
});
app.get('/dashboard/reviews', function(req, res){
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
app.get('/reviews.html', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/reviews.html');
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
app.get('/album.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/album/album.js');
});
app.get('/album', function(req, res){
    res.sendFile(__dirname + '/public/app/views/album/album.html');
});
app.get('/albumService.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/album/albumService.js');
});
app.get('/bootstrap.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/album/bootstrap.css');
});
app.get('/css/bootstrap.min.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/css/bootstrap.min.css');
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
app.get('/css/landing.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/css/landing.css');
});
app.get('/dist/css/flat-ui.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/dist/css/flat-ui.css');
});
app.get('/dist/fonts/lato/lato-bold.woff', function(req, res){
    res.sendFile(__dirname + '/public/app/views/dist/fonts/lato/lato-bold.woff');
});
app.get('/dist/fonts/lato/lato-regular.woff', function(req, res){
    res.sendFile(__dirname + '/public/app/views/dist/fonts/lato/lato-regular.woff');
});
app.get('/dist/fonts/glyphicons/flat-ui-icons-regular.woff', function(req, res){
    res.sendFile(__dirname + '/public/app/views/dist/fonts/glyphicons/flat-ui-icons-regular.woff');
});app.get('/dist/fonts/glyphicons/flat-ui-icons-regular.ttf', function(req, res){
    res.sendFile(__dirname + '/public/app/views/dist/fonts/glyphicons/flat-ui-icons-regular.ttf');
});
app.get('/js/bootstrap.min.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/js/bootstrap.min.js');
});
app.get('/js/scrolling-nav.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/js/scrolling-nav.js');
});
app.get('/dist/js/flat-ui.min.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/dist/js/flat-ui.min.js');
});
app.get('/docs/assets/js/application.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/docs/assets/js/application.js');
});
app.get('/css/tandc.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/css/tandc.css');
});
app.get('/public/app/views/css/ghpages-materialize.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/css/ghpages-materialize.css');
});
app.get('/css/admin.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/css/admin.css');
});
app.get('/album/mobile.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/album/mobile.css');
});
app.get('/album/desktop.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/album/desktop.css');
});
app.get('/album/jquery.nailthumb.1.1.min.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/album/jquery.nailthumb.1.1.min.css');
});
app.get('/jade/search.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/jade/search.js');
});
app.get('/jade/lunr.min.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/jade/lunr.min.js');
});
app.get('/album/jquery.nailthumb.1.1.min.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/album/jquery.nailthumb.1.1.min.js');
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
app.get('/images/pp.jpg', function(req, res){
    res.sendFile(__dirname + '/public/app/views/images/pp.jpg');
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
app.get('/img/brandlogo.png', function(req, res){
    res.sendFile(__dirname + '/public/app/views/img/brandlogo.png');
});
app.get('/img/favicon.ico', function(req, res){
    res.sendFile(__dirname + '/public/app/views/img/favicon.ico');
});
app.get('/img/icons/png/map.png', function(req, res){
    res.sendFile(__dirname + '/public/app/views/img/icons/png/Map.png');
});
app.get('/img/guia-inline.png', function(req, res){
    res.sendFile(__dirname + '/public/app/views/img/guia-inline.png');
});
app.get('/img/circbutton.png', function(req, res){
    res.sendFile(__dirname + '/public/app/views/img/circbutton.png');
});
app.get('/img/circbutton-hover.png', function(req, res){
    res.sendFile(__dirname + '/public/app/views/img/circbutton-hover.png');
});
app.get('/img/cover.jpg', function(req, res){
    res.sendFile(__dirname + '/public/app/views/img/cover.jpg');
});
app.get('/img/cover2.jpg', function(req, res){
    res.sendFile(__dirname + '/public/app/views/img/cover2.jpg');
});
app.get('/img/icons/png/retina-ready.png', function(req, res){
    res.sendFile(__dirname + '/public/app/views/img/icons/png/Retina-Ready.png');
});
app.get('/img/icons/png/compas.png', function(req, res){
    res.sendFile(__dirname + '/public/app/views/img/icons/png/Compas.png');
});
app.get('/img/icons/png/gift-box.png', function(req, res){
    res.sendFile(__dirname + '/public/app/views/img/icons/png/Gift-Box.png');
});
app.get('/img/icons/png/clipboard.png', function(req, res){
    res.sendFile(__dirname + '/public/app/views/img/icons/png/Clipboard.png');
});
app.get('/img/icons/png/watches.png', function(req, res){
    res.sendFile(__dirname + '/public/app/views/img/icons/png/Watches.png');
});
app.get('/img/icons/png/share.png', function(req, res){
    res.sendFile(__dirname + '/public/app/views/img/icons/png/share.png');
});
app.get('/img/guia.png', function(req, res){
    res.sendFile(__dirname + '/public/app/views/img/guia.png');
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
app.get('/public/app/services/reviewService.js', function(req, res){
    res.sendFile(__dirname + '/public/app/services/reviewService.js');
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
app.get('/public/app/controllers/Review.js', function(req, res){
    res.sendFile(__dirname + '/public/app/controllers/Review.js');
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