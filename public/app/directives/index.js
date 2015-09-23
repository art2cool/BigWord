'use strict';

var application = angular.module('MyApp');

application.directive('searchResultWords', require('./searchresultwords.js'));
application.directive('searchResultList', require('./searchresultlist.js'));
application.directive('searchResultCards', require('./searchresultcards.js'));
application.directive('testWords', require('./testwords.js'));
application.directive('testCards', require('./testcard.js'));
application.directive('testLetters', require('./testletters.js'));



