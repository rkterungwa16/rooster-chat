var express = require('express')
, http = require('http')
, path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var sockets = require('./routes/sockets.js');


app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);
sockets.initialize(server)
server.listen(app.get('port'), function(){
console.log("Express server listening on port " +
app.get('port'));
});

app.get('/', function (req, res) {
  res.render('index', { title: 'Rooster-Chat' });
});

