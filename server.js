var express    = require('express')
var bodyParser = require('body-parser')
var logger     = require('morgan')
var path = require('path');
var fs = require('fs');

var app = express()
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'))
app.use(require('./api/router'))
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 3000
var server = app.listen(port, function () {
  console.log('Server', process.pid, 'listening on', port)
  app.emit("appStarted");
})