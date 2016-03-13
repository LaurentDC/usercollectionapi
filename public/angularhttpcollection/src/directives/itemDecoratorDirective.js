'use strict';

newapp
	.directive('editItem', function(){
		return {
			templateUrl: 'views/item/directive/edititemdecorator.html',
			restrict: 'E'
		};
	})
	.directive('editingItem', function(){
		return {
			templateUrl: 'views/item/directive/editingitemdecorator.html',
			restrict: 'E'
		};
	})
	.directive('decorateItem', function(){
		return {
			templateUrl: 'views/item/directive/listitemdecorator.html',
			restrict: 'E'
		};
	})
;
