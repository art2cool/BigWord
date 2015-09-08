var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config');


var app = express();

app.use(express.static(path.join(__dirname, '/public/app/')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

mongoose.connect(config.database, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Database connected');
	}
})


app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');

});

app.get('/add', function (req, res) {
	console.log("add this to mongoDB");
});


app.listen(config.port, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Listen on port: " + config.port);
	}
})