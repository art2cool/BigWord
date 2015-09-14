module.exports = ['$scope','$http', '$routeParams', function ($scope, $http, $routeParams) {
	
	$scope.test = $routeParams.id;
	$scope.counter = 0;
	$scope.quiz = function(){
	
		$scope.pictures = [];
		$http.get('http://localhost:3000/test/quiz')
		.then(function(data){
			data = data.data;
			for (var i = 0; i < data.length; i++) {
				console.log(data[i].raiting);
			};
			if ($scope.test == 1) {
				$scope.ask = data[Math.floor(Math.random() * (data.length))].word; 
				$scope.pictures = data;	
			} else if( $scope.test == 2) {
				$scope.image = data[Math.floor(Math.random() * (data.length))].image; 
				$scope.answers = data;
			} else {
				console.log('routeParams ' + $routeParams.id);
			}
		}, function(err, status){
			console.log(err);
		})
	}
	$scope.check = function (numb) {
		if( $scope.test == 1 ) {
			if(numb === $scope.ask) {
				$scope.raiting = 'up';
				$scope.counter++;
				$scope.quiz();
			} else {
				$scope.raiting = 'down';
			}
			var mark = { word: $scope.ask, raiting: $scope.raiting}

			$http.post('http://localhost:3000/raiting/1', mark)
				.then(function(data) {
					console.log(data.data);
				}, function(err) {
					console.log(err);
				})

		} else if ($scope.test == 2){
			if(numb === $scope.image) {
				$scope.raiting = 'up';
				$scope.counter++;
				$scope.quiz();
			} else {
				$scope.raiting = 'down';
				}
			var mark = { image: $scope.image, raiting: $scope.raiting}

			$http.post('http://localhost:3000/raiting/2', mark)
				.then(function(data) {
					console.log(data.data);
				}, function(err) {
					console.log(err);
				})

			}
		}
	
}];