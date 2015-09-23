var Word = require('./schema');
var mongoose = require('mongoose');


module.exports = { 
raitingChange: function (req, res) {
	if (req.params.id === '1') {
		Word.findOne({word: req.body.word}, function(err, doc) {
			if (req.body.raiting === 'up') doc.raiting += 10;
			if (req.body.raiting === 'down') doc.raiting -= 20;
			if (doc.raiting > 100) doc.raiting = 100;
			if (doc.raiting < 0) doc.raiting = 0;
			doc.save();
		})

	}
	if (req.params.id === '2') {
		Word.findOne({image: req.body.image}, function(err, doc) {
			if (req.body.raiting === 'up') doc.raiting += 10;
			if (req.body.raiting === 'down') doc.raiting -= 20;
			if (doc.raiting > 100) doc.raiting = 100;
			if (doc.raiting < 0) doc.raiting = 0;
			doc.save();
		})
	}
	res.send("done");
},
getQuiz: function(req, res){
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
		words = words.splice(0, Math.floor(words.length/3));
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
}
}