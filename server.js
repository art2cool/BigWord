var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();

app.use(express.static(path.join(__dirname, '/public/app/')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');

});



app.listen(process.env.PORT || 3000, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Listen on port: 3000");
	}
})