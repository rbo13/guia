var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan');

var config = require('./config');

var app = express();

//connect to mongodb
mongoose.connect(config.database, function(err){
  if(err) console.log(err);
  else    console.log('Connected to MongoDB');
});

//load the request middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

var api = require('./app/routes/api')(app, express);
app.use('/api/v1', api);

//load index page.
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/app/views/index.html');
});

app.listen(config.port, function(err){
  if(err){
    console.log(err);
  }else{
    console.log('Server is running. Browse to localhost:' +config.port);
  }
});

//add libraries: js, css
app.get('/css/prism.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/css/prism.css');
});
app.get('/css/ghpages-materialize.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/css/ghpages-materialize.css');
});
app.get('/css/main.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/css/main.css');
});
app.get('/js/jquery.timeago.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/js/jquery.timeago.js');
});
app.get('/js/prism.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/js/prism.js');
});
app.get('/js/init.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/js/init.js');
});
app.get('/bin/materialize.js', function(req, res){
    res.sendFile(__dirname + '/public/app/views/bin/materialize.js');
});
//images
app.get('/images/favicon/guia-favicon.png', function(req, res){
    res.sendFile(__dirname + '/public/app/views/images/favicon/guia-favicon.png');
});
app.get('/images/parallax1.jpg', function(req, res){
    res.sendFile(__dirname + '/public/app/views/images/parallax1.jpg');
});
app.get('/images/parallax2.jpg', function(req, res){
    res.sendFile(__dirname + '/public/app/views/images/parallax2.jpg');
});
app.get('/images/favicon/favicon.ico', function(req, res){
    res.sendFile(__dirname + '/public/app/views/images/favicon/favicon.ico');
});
//fonts
app.get('/font/roboto/Roboto-Regular.ttf', function(req, res){
    res.sendFile(__dirname + '/public/app/views/font/roboto/Roboto-Regular.ttf');
});
app.get('/font/roboto/Roboto-Light.ttf', function(req, res){
    res.sendFile(__dirname + '/public/app/views/font/roboto/Roboto-Light.ttf');
});