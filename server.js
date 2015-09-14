var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var schema = require('./modules/schema');


var app = express();

app.use(express.static('/public/app/'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(function (req, res, next) {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
 res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

 next();
});

mongoose.connect(config.database, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Database connected');
	}
});

var Word = mongoose.model('Word', schema); 

app.post('/raiting/:id', function (req, res) {
	if (req.params.id === '1') {
		Word.findOne({word: req.body.word}, function(err, doc) {
			if (req.body.raiting === 'up') doc.raiting += 10;
			if (req.body.raiting === 'down') doc.raiting -= 20;

			doc.save();
		})

	}
	if (req.params.id === '2') {
		Word.findOne({image: req.body.image}, function(err, doc) {
			if (req.body.raiting === 'up') doc.raiting += 10;
			if (req.body.raiting === 'down') doc.raiting -= 20;

			doc.save();
		})
	}
	res.send("done");
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');

});

app.get('/vocabulary', function (req, res) {

	Word.find(function (err, words){
		res.send(words);
	})
});


app.post('/new', function (req, res){
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

app.post('/:word/edit', function (req, res){

	Word.findOne({word: req.params.word}, function(err, doc){
		
			doc.word = req.body.word;
			doc.translate = req.body.translate;
			doc.image = req.body.image;
			doc.example = req.body.example;
			doc.save();
		})
	
		res.send('Edit word');
});

app.get('/view/:word', function (req,res){
	Word.find({word: req.params.word},function (err, words){
		res.send(words);
	})
});

app.delete('/view/:word/delete', function (req,res){

	Word.remove({word: req.params.word}, function (err, result){
		res.send('deleted');

	});	

})


app.get('/test/quiz', function (req,res){
	
	Word.find(function (err, words){
		var data = [];
		
			words.sort(function(a,b) {
			if(a.raiting < b.raiting) {
				return -1;
			} if (a.raiting > b.raiting) {
				return 1;
			};
			return 0;
		});
		words = words.splice(0, Math.floor(words.length/2));
		function randoms(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		while(data.length < 4 ){

			var random = randoms(0, words.length-1);
			var	elem = words.splice(random, 1);
			data.push( elem[0] );
			
		}

		res.send(data);
	});

});

app.listen(config.port, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Listen on port: " + config.port);
	}
})