'use strict';

newapp.service('categoryProvider', function($http, myConfig){
	var url = myConfig.url + ':' + myConfig.port + '/api';
	this.getCategory = function(categoryId){
		return $http.get(url + '/categories/' + categoryId)
		.then(function(xhr){
			var data = xhr.data;
			return data;
		}, function(xhr){
			return xhr.code;
		});
	};
	this.saveCategory = function(category, action){
		var returnAction = null;
		if (action === 'post') {
			returnAction = $http.post(url + '/categories', category);
		} else {
			returnAction = $http.put(url + '/categories/' + category._id, category);
		};
		return returnAction
			.then(function(xhr){
				var data = xhr.data;
				return data;
			}, function(xhr){
				return xhr.code;
		});
	};
	this.deleteCategory = function(category){
        return $http.delete(url + '/categories/' + category._id, category)
        	.then(function(xhr){
            	var data = xhr.data;
            	return data;
            }, function(xhr){
                return xhr.code;
        });
    };
});
