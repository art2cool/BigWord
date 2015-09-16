module.exports = 
	function(){
	// Runs during compile
		return {
			restrict: 'AE',
			templateUrl: 'app/views/searchresultlist.html',
			replace: true,
			scope: {
				wordObject: "="
			}
		} 
	};
	