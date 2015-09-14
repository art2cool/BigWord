module.exports = ['$scope','$timeout', function ($scope, $timeout) {


$scope.clean = function (message) {

		$scope.message = message;
		$timeout(function() {
			$scope.word = ''; $scope.translate =''; $scope.image='';   $scope.example='';
			$scope.message = '';	
		}, 2000)

	};
	}

]