'use strict';

newapp.service('userService', function($q, $http, $rootScope, myConfig) {
	console.log('in userService');
	var serverUrl = myConfig.url + ':' + myConfig.port + '/';
	var deffered = $q.defer();
	$http.get('/loggedin')
		.success(function(user) {
			if (user !== '0') {
				$rootScope.user = user;
				// $rootScope.userCollection = getUserCollection($rootScope.user, $http, $rootScope, serverUrl, $q);
				deffered.resolve();
			} else {
				console.log('You need to be logged in');
				deffered.reject();
				window.location = serverUrl;
			}
		});
	return deffered.promise;
});