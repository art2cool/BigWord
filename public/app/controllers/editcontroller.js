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
