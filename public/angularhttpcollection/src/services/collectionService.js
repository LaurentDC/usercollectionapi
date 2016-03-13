'use strict';

newapp.service('collectionService', function($http, myConfig){
	var url = myConfig.url + ':' + myConfig.port + '/api';

	this.getUserCollection = function(user){
		return $http.get(url + '/usercollection/user/' + user._id)
          .then(function(xhr){
          	var data = xhr.data;
          	return data;
          }, function(xhr){
          	return xhr.code;
          });
	};

	this.updateCollection = function(userCollection){
		$http.put(url + '/usercollection/' + userCollection._id, userCollection)
			.then(function(response){
				return response.data;
			});
	};
});