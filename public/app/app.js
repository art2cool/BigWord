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

MyApp.controller('testController', ['$scope','$http', function ($scope, $http){
	$scope.counter = 0;
	$scope.quiz = function(){
		$scope.pictures = [];
			$http.get('/test/quiz')
			.success(function(data){
				console.log(data);
				$scope.ask = data[Math.floor(Math.random() * (data.length))].word; 
				$scope.pictures = data;	
			})
			.error(function(err,status){
				console.log(err);
				console.log(status);
			})
		}
		$scope.check = function (numb) {
			if(numb === $scope.ask) {
				$scope.counter++;
				$scope.quiz();

			}

		}
		// counter
}]);


MyApp.directive('testCards', function(){
	return {
		restrict: 'AE',
		templateUrl: 'directives/testcards.html',
		replace: false
	};
});


MyApp.controller('mainController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http){
	$scope.names = ["Volodya", "Nazar", "Ira", "Dominick", "Veronica"];

	$scope.name = $routeParams.name;

  	$http.get('/vocabulary')
	.success(function(data) {

		$scope.words = data;
	
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
		replace: false,
		scope: {
			wordObject: "="
		}
	};
});

MyApp.controller('viewController', ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location){
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


	$scope.wordDelete = function() {
		$http.delete('/view/'+ $routeParams.word + '/delete')
		.success(function(data){
			$location.path('/vocabulary');
		})
		.error(function( err, status) {
			console.log(err);
		})

	}
	$scope.next = function (param) {
	

		for(var i = 0; i < $scope.words.length; i++){
			if($scope.words[i].word === $routeParams.word){
				$scope.curentNumber = i;

				console.log($scope.words[i].word);

			break;
			}
		}

		if(param === 'next') $scope.curentNumber++;
		if(param === 'prev') $scope.curentNumber--;

			console.log($scope.words[$scope.curentNumber].word);
			$location.path('/view/'+ $scope.words[$scope.curentNumber].word);
	
	}

	
}])

MyApp.controller('editController', ['$scope','$http', '$routeParams','$timeout', function ($scope, $http, $routeParams, $timeout){

	$scope.clean = function (message) {

		$scope.message = message;
		$timeout(function() {

			$scope.word = ''; $scope.translate =''; $scope.image='';   $scope.example='';
			$scope.message = '';	
		}, 2000)

	}

	$http.get('/view/' + $routeParams.word)
	.success(function(data) {
		
		$scope.word = data[0].word; 
		$scope.translate = data[0].translate;
		$scope.image = data[0].image;
		$scope.example = data[0].example;

	})
	.error(function( err, status) {

		console.log(err);
	})

	$scope.NewWord = function(){

		var word = {
			word: $scope.word,
			translate: $scope.translate,
			image: $scope.image,
			example: $scope.example
		};
		$http.post('/' + $routeParams.word + '/edit', word)
		.success(function (data) {
			$scope.clean('Edit word');
			console.log(data);
		})
		.error(function(data, status) {
			console.log(data);

		})

	}



}])