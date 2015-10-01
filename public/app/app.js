require('angular');
require('angular-route');
require('extends-ng-model');

var MyApp = angular.module('MyApp', ['ngRoute']);


require('./controllers/index.js');
require('./directives/index.js');
require('./services/index.js');




MyApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/', {

		templateUrl: 'app/views/main.html',
		controller: 'mainController'
	})
	.when('/test/:id', {

		templateUrl: 'app/views/test.html',
		controller: 'testController'
	})
	.when('/vocabulary', {

		templateUrl: 'app/views/vocabulary.html',
		controller: 'mainController'
	})
	.when('/user/:name', {

		templateUrl: 'app/views/user.html',
		controller: 'mainController'
	})
	.when('/view/:word', {

		templateUrl: 'app/views/view.html',
		controller: 'viewController'
	})
	.when('/edit/', {

		templateUrl: 'app/views/edit.html',
		controller: 'addController'
	})
	.when('/:word/edit', {

		templateUrl: 'app/views/edit.html',
		controller: 'editController'
	})
	.when('/register', {

		templateUrl: 'app/views/login.html',
		controller: 'loginController'
	})
}])


