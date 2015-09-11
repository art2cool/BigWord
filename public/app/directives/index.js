'use strict';

var application = angular.module('MyApp');

application.directive('searchResult', require('./searchresult.js'));
application.directive('testWords', require('./testwords.js'));
application.directive('testCards', require('./testcard.js'));


