module.exports = ['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {

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

		$http.post('http://localhost:3000/new', word)
		.success(function (data) {
			$scope.clean('Added in vocabulary');
			console.log(data);
		})
		.error(function(data, status) {
			console.log(data);

		})

	}
	
}];

