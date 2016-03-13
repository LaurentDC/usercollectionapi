'use strict';

newapp
	.filter('pagination', function(){
		return function(input, start) {
			start = +start;
			return input.slice(start);
		}
	})
	.filter('filterName', function(item, categories) {
        for (var i = 0; i < categories.length; i++) {
        	if (item.category_id === categories[i].id) {
            	return categories[i].name;
          	};
        };
    })
;