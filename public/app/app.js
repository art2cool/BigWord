var MyApp = angular.module('MyApp', ['ngRoute']);

MyApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/', {

		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})
	.when('/test', {

		templateUrl: 'pages/test.html',
		controller: 'testController'
	})
	.when('/vocabulary', {

		templateUrl: 'pages/vocabulary.html',
		controller: 'mainController'
	})
	.when('/vocabulary/words', {

		templateUrl: 'pages/vocabularywords.html',
		controller: 'mainController'
	})
	.when('/user/:name', {

		templateUrl: 'pages/user.html',
		controller: 'mainController'
	})
	.when('/view/:word', {

		templateUrl: 'pages/view.html',
		controller: 'viewController'
	})
	.when('/edit/', {

		templateUrl: 'pages/edit.html',
		controller: 'addNew'
	})
	.when('/:word/edit', {

		templateUrl: 'pages/edit.html',
		controller: 'editController'
	})
	
}])


MyApp.directive('testCards', function(){
	return {
		restrict: 'AE',
		templateUrl: 'directives/testcards.html',
		replace: false
	};
});


MyApp.directive('searchResult', function(){
	// Runs during compile
	return {
		restrict: 'AE',
		templateUrl: 'directives/searchresult.html',
		replace: false,
		scope: {
			wordObject: "="
		}
	};
});

