var mongoose = require('mongoose');

var schema = new mongoose.Schema({

	word: String,
	translate: String,
	image: String,
	example: String,
	date: { type: Date, default: Date.now },
	raiting: {type: Number, default: 10}

});
 
module.exports = mongoose.model('Word', schema); 