var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

require('./server/config/mongoose.js');

app.use(express.static(path.join(__dirname, '/client')));
app.use(bodyParser.json());

require('./server/config/routes.js')(app);
var server = app.listen(8000, function() {
	console.log('chillin on: 8000');
});