module.exports = 
	function(){
	// Runs during compile
	var index = 1;
		return {
			transclude: true,
			restrict: 'AE',
			templateUrl: 'app/views/searchresultwords.html',
			replace: false,
			scope: {
				wordObject: "=",
				index: '@',
				deleteFromList: '&'
			}
		} 
	};
	