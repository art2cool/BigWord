require(['MyApp'], function (MyApp){

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
});