var express = require('express')
, routes = require('./routes')
, http = require('http')
, path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
	res.render('index', { title: 'Rooster-Chat' });
});


var server = http.createServer(app).listen(app.get('port'), function(){
console.log("Express server listening on port " +
app.get('port'));
});

var sockets = require('./routes/sockets.js');
sockets.initialize(server)