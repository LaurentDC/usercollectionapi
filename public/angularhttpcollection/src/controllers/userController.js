'use strict';

newapp
	.controller('userController', function($rootScope, $scope, $http, myConfig, userService){
		var url = myConfig.url + ':' + myConfig.port + '/api';
		var serverUrl = myConfig.url + ':' + myConfig.port + '/';
		$scope.getProfile = function(){
			window.location = serverUrl + 'profile';
		};
	});