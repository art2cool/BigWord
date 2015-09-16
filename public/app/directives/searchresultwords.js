module.exports = 
	function(){
	// Runs during compile
		return {
			restrict: 'AE',
			templateUrl: 'app/views/searchresultwords.html',
			replace: false,
			scope: {
				wordObject: "=",
			}
		} 
	};
	