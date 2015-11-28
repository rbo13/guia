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

//load index page.
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/app/views/index.html');
});
//load admin page
app.get('/dashboard', function(req, res){
    res.sendFile(__dirname + '/public/app/views/admin/admin.html')
});
http.listen(config.port, function(err){
  if(err){
    console.log(err);
  }else{
    console.log('Server is running. Browse to localhost:' +config.port);
  }
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
app.get('/css/admin.css', function(req, res){
    res.sendFile(__dirname + '/public/app/views/css/admin.css');
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