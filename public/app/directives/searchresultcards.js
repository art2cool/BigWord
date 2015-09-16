module.exports = 
	function(){
	// Runs during compile
		return {
			restrict: 'AE',
			templateUrl: 'app/views/searchresultcards.html',
			replace: true,
			scope: {
				wordObject: "="
			}
		} 
	};
	