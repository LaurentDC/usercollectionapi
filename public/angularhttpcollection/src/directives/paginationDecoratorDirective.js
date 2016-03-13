'use strict';

newapp.directive('decoratePagination', function(){
	// Runs during compile
	return {
		restrict: 'E',
		templateUrl: 'views/list/directive/paginationdecorator.html'

	};
});