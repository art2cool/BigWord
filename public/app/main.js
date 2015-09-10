require.config({
	paths: {
		'angular': './lib/angular.min.js',


	},

	shim: {
		'angular': {
			exports: 'angular'
		}
	}

});

require([

	'controllers/addnew',
	'controllers/editcontroller',
	'controllers/maincontroller',
	'controllers/testcontroller',
	'controllers/viewcontroller'

	])