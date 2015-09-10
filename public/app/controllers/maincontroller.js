
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
