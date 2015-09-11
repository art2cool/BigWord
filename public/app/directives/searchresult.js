module.exports = 
	function(){
	// Runs during compile
		return {
			restrict: 'AE',
			templateUrl: 'app/views/searchresult.html',
			replace: false,
			scope: {
				wordObject: "="
			}
		}
	};