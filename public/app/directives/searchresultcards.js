module.exports = 
	function(){
	// Runs during compile
		return {
			restrict: 'AE',
			templateUrl: 'app/views/searchresultcards.html',
			replace: true,
			scope: {
				wordObject: "="
			},
			link: function($scope, elem, attr) {
				//console.log(attr.name.substring(0,1));


			}
		} 
	};
	