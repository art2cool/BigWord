module.exports =  ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http){
	$scope.names = ["Volodya", "Nazar", "Ira", "Dominick", "Veronica"];

	$scope.name = $routeParams.name;
	$http.get('http://localhost:3000/vocabulary')
		.then(function(data) {
			$scope.words = data.data;
			console.log($scope.words);
			}, function(err, status) {
			console.log(err);
		});
		$scope.showWords = true;

		$scope.deleteEl = function($index) {

			console.log($index + ' elem');
		}

		$scope.deleteFromList = function () {
			console.log("index");

		}
}];
