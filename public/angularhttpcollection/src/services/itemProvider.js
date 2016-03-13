'use strict';

newapp.service('itemProvider', function($http, myConfig) {
    var url = myConfig.url + ':' + myConfig.port + '/api';
    this.getItem = function(itemId) {
        return $http.get(url + '/items/' + itemId)
        .then(function(xhr){
            var data = xhr.data;
            return data;
        }, function(xhr){
            return xhr.code;
        });
    };
    this.saveItem = function(item, action){
        var returnAcion = null;
        if (action === 'post') {
            returnAcion = $http.post(url + '/items', item);
        } else {
            returnAcion = $http.put(url + '/items/' + item._id, item);
        };
        return returnAcion
            .then(function(xhr){
                var data = xhr.data;
                return data;
            }, function(xhr){
                return xhr.code;
        });
    };
    this.deleteItem = function(item){
        return $http.delete(url + '/items/' + item._id, item)
        .then(function(xhr){
                var data = xhr.data;
                return data;
            }, function(xhr){
                return xhr.code;
        });
    };
});
