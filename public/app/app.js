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


MyApp.controller('mainController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http){
	$scope.names = ["Volodya", "Nazar", "Ira", "Dominick", "Veronica"];
	$scope.name = $routeParams.name;
	$scope.words = [{
		word: 'girl',
		translate: 'Дівчина',
		image: 'http://attractwomenreport.com/wp-content/uploads/2013/11/Girl-Reading-Book.jpg',
		example: 'Girl listening to music.'
	}];

		$http.get('/vocabulary')
			.success(function(data) {
						
				$scope.words = data;
		
				console.log($scope.words);
			})
			.error(function(data, status) {
				console.log(data);
			})
}]);

MyApp.controller('addNew', ['$scope', '$http', '$location', function ($scope, $http, $location) {

$scope.NewWord = function(){

	var word = {
			word: $scope.word,
			translate: $scope.translate,
			image: $scope.image,
			example: $scope.example
		};

	$http.post('/new', word)
		.success(function (data) {
			$scope.word = '';
			 $scope.translate ='';
			  $scope.image='';
			   $scope.example='';
		console.log(data);
		})
		.error(function(data, status) {
				console.log(data);

		})

	}
	
}])