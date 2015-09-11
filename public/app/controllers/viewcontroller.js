module.exports = ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location){
	$http.get('http://localhost:3000/view/' + $routeParams.word)
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
		$http.delete('http://localhost:3000/view/'+ $routeParams.word + '/delete')
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

	
}];
