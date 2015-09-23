module.exports = 
	function () {
		return {
			templateUrl: 'app/views/letters.html',
			transclude: true,
			replace: false,
			scope: {
				letters: '='
			}
		}

	};