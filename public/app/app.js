var MyApp = angular.module('MyApp', ['ngRoute']);

MyApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {

			templateUrl: 'pages/main.html',
			controller: 'mainController'
		})
		.when('/vocabulary', {

			templateUrl: 'pages/vocabulary.html',
			controller: 'mainController'
		})

		.when('/user/:name', {

			templateUrl: 'pages/user.html',
			controller: 'mainController'
		})
		.when('/edit', {

			templateUrl: 'pages/edit.html',
			controller: 'addNew'
		})
	
}])


MyApp.controller('mainController', ['$scope', '$routeParams', function ($scope, $routeParams){
	$scope.names = ["Volodya", "Nazar", "Ira", "Dominick", "Veronica"];
	$scope.name = $routeParams.name;


}]);

MyApp.controller('addNew', ['$scope', '$http', function($scope, $http){

	$scope.AddNew = function () {

		console.log('click');
	}
	
}])