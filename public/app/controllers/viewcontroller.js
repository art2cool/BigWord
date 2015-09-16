module.exports = ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location){
	
	$http.get('http://localhost:3000/view/' + $routeParams.word)
		.then(function(data) {
			data = data.data;
			$scope.word = data[0].word; 
			$scope.translate = data[0].translate;
			$scope.image = data[0].image;
			$scope.example = data[0].example;
			$scope.raiting = data[0].raiting;
		}, function(err, status) {
			console.log(err);
		});


	$scope.wordDelete = function() {
		$http.delete('http://localhost:3000/view/'+ $routeParams.word + '/delete')
		.then(function(data){
			$location.path('/vocabulary');
		}, function( err, status) {
			console.log(err);
		})

	}
	$scope.next = function (param) {
		
		for(var i = 0; i < $scope.words.length; i++){
			if($scope.words[i].word === $routeParams.word){
				$scope.curentNumber = i;
				break;
			}
		}

		if(param === 'next') $scope.curentNumber++;
		if(param === 'prev') $scope.curentNumber--;

		$location.path('/view/'+ $scope.words[$scope.curentNumber].word);
		
	}

	
}];
