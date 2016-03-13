'use strict';

var newapp = angular.module('collectify', ['ngRoute', 'ngResource']);

newapp.constant('myConfig', {
	'url': 'http://localhost',
	'port': '3000'
});

