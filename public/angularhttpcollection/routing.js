'use strict';

newapp.config(
    function ($routeProvider, $locationProvider, $httpProvider, myConfig) {
        var serverUrl = myConfig.url + ':' + myConfig.port + '/';
        $httpProvider.interceptors.push(function($q){
            return {
                response: function(response){
                    return response;
                },
                responseError: function(response){
                    if (response.status === 401) {
                        window.location = serverUrl;
                    }
                    return $q.reject(response);
                }
            };
        });
        $routeProvider
            .when('/itemlist', {
                controller: 'categoryList',
                templateUrl: 'views/list/list.html'
            })
            .otherwise({
                redirectTo : '/'
            })
    }
);
