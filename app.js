var express = require('express');
var bodyparser = require('body-parser');

var connection = require('./connection');
var routes = require('./routes');
 
var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);

connection.init();
routes.configure(app);

var server = app.listen(8081, function() {
  console.log('Server listening on port ' + server.address().port);
});