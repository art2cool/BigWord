module.exports = ['$scope','$http', '$routeParams','$timeout',  function ($scope, $http, $routeParams, $timeout){
	
	// $scope.message = '';
	// $scope.validate = function () {
	// 	return true;
	// 	};

	// $scope.clean = function (mess) {
	// 	messager.clean(mess);
	// };

	$http.get('http://localhost:3000/view/' + $routeParams.word)
	.then(function(data) {
		data = data.data;
		console.log(data);
		$scope.word = data[0].word; 
		$scope.translate = data[0].translate;
		$scope.image = data[0].image;
		$scope.example = data[0].example;

	}, function( err, status) {

		console.log(err);
	});

	$scope.NewWord = function(){
			var word = {
				word: $scope.word,
				translate: $scope.translate,
				image: $scope.image,
				example: $scope.example
			};
			$http.post('http://localhost:3000/' + $routeParams.word + '/edit', word)
				.then(function (data) {
					$scope.clean('Edit word');
				}, function(data, status) {
					console.log(data);
				})
			}
			

}];