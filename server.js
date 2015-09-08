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
});


var schema = new mongoose.Schema({

	word: String,
	translate: String,
	image: String,
	example: String,
	date: { type: Date, default: Date.now },
	raiting: {type: Number, default: 100}

});

var Word = mongoose.model('Word', schema); 

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');

});

app.get('/vocabulary', function (req, res) {

	Word.find(function (err, words){
		res.send(words);
	})
});


app.post('/new', function (req, res) {
	var word = new Word({

		word: req.body.word,
		translate: req.body.translate,
		image: req.body.image,
		example: req.body.example
	
	})
	word.save();
	res.send('added new word');
	console.log("add this to mongoDB");
});


app.listen(config.port, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Listen on port: " + config.port);
	}
})