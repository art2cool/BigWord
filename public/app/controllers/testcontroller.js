MyApp.controller('testController', ['$scope','$http', '$routeParams', function ($scope, $http, $routeParams){
	
	$scope.test = $routeParams.id;
	$scope.counter = 0;
	$scope.quiz = function(){
	
		$scope.pictures = [];
		$http.get('/test/quiz')
		.success(function(data){
			console.log(data);
			if ($scope.test == 1) {
				$scope.ask = data[Math.floor(Math.random() * (data.length))].word; 
				$scope.pictures = data;	
			} else if( $scope.test == 2) {
				$scope.image = data[Math.floor(Math.random() * (data.length))].image; 
				$scope.answers = data;
			} else {
				console.log('routeParams ' + $routeParams.id);
			}
		}) 
		.error(function(err,status){
			console.log(err);
			console.log(status);
		})
	}
	$scope.check = function (numb) {
		if( $scope.test == 1 ) {
			if(numb === $scope.ask) {
				$scope.counter++;
				$scope.quiz();
			}
		} else if ($scope.test == 2){
			if(numb === $scope.image) {
				$scope.counter++;
				$scope.quiz();
			}	
		}
	}
		// counter
	}]);
