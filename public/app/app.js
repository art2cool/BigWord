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
	.when('/view/:word', {

		templateUrl: 'pages/view.html',
		controller: 'viewController'
	})
	.when('/edit/', {

		templateUrl: 'pages/edit.html',
		controller: 'addNew'
	})
	
}])


MyApp.controller('mainController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http){
	$scope.names = ["Volodya", "Nazar", "Ira", "Dominick", "Veronica"];
	
	$scope.name = $routeParams.name;

		$http.get('/vocabulary')
			.success(function(data) {
						
				$scope.words = data;
		
				console.log($scope.words);
			})
			.error(function(data, status) {
				console.log(data);
			})

		

}]);

MyApp.controller('addNew', ['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {

$scope.clean = function (message) {
	
	$scope.message = message;
	$timeout(function() {

		$scope.word = ''; $scope.translate =''; $scope.image='';   $scope.example='';
		$scope.message = '';	
	}, 2000)
	
}


$scope.NewWord = function(){

	var word = {
			word: $scope.word,
			translate: $scope.translate,
			image: $scope.image,
			example: $scope.example
		};

	$http.post('/new', word)
		.success(function (data) {
			$scope.clean('Added in vocabulary');
		console.log(data);
		})
		.error(function(data, status) {
				console.log(data);

		})

	}
	
}]);

MyApp.directive('searchResult', function(){
	// Runs during compile
	return {
		restrict: 'AE',
		templateUrl: 'directives/searchresult.html',
		replace: true
	};
});

MyApp.controller('viewController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http){
	$http.get('/view/' + $routeParams.word)
		.success(function(data) {
			console.log(data[0]);
			$scope.word = data[0].word; 
			$scope.translate = data[0].translate;
			$scope.image = data[0].image;
			$scope.example = data[0].example;
	
		})
		.error(function( err, status) {

			console.log(err);
		})


	console.log($scope.word);


	$scope.wordDelete = function() {
		$http.delete('/view/'+ $routeParams.word + '/delete')
			.success(function(data){
				console.log(data)
			})
			.error(function( err, status) {
				console.log(err);
			})

	}

	
}])