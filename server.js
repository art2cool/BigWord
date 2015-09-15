var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var quiz = require('./modules/raitingchange');
var Word = require('./modules/schema');
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

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');

});


app.post('/raiting/:id', function(req,res){
	quiz.raitingChange(req, res);
	
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


app.get('/test/quiz', function (req, res){
	
quiz.getQuiz(req, res);

});

app.listen(config.port, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Listen on port: " + config.port);
	}
})