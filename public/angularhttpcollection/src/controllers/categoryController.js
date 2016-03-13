'use strict';

newapp
  .controller('categoryList', function($rootScope, $scope, $http, $timeout, 
    collectionService, categoryProvider, itemProvider) {
    console.log('in categoryController');
    $scope.categories = [];
    $scope.items = [];
    $scope.states = {};
    $scope.filters = {};
    $scope.activeCategory = 'all';
    $scope.userCollection = [];

    // GET USER COLLECTION
    collectionService.getUserCollection($rootScope.user).then(function(collection) {
      $scope.userCollection = collection;
      getUserCollectionData($scope.userCollection);
    }, function(error) {
      console.log(error);
    });

    // GET USER CATEGORIES
    function getUserCollectionData(userCollection) {
        $scope.userCollection.userItems.forEach(function(itemId) {
        itemProvider.getItem(itemId).then(function(item) {
          $scope.items.push(item);
        }, function(error) {
          console.log(error);
        });
      });
      $scope.userCollection.userCategories.forEach(function(categoryId) {
        categoryProvider.getCategory(categoryId).then(function(category) {
          $scope.categories.push(category);
        }, function(error) {
          console.log(error);
        });
      });
    };
    // POST CATEGORY
    $scope.createCategory = function(category) {
      category['catId'] = $scope.categories.length + 1;
      saveCategory(category, 'post');
    };
    // UPDATE CATGORY
    $scope.showInput = function(idx) {
      $scope.hideOnBlur = true;
      $scope.inputShow = true;
      $scope.index = idx;
    };
    $scope.updateCategory = function(category){
      if (category.name == '') {
        $scope.activeCategory = 'all';
        removeCategory(category);
      } else {
      // Remove category from userCollection
        for (var i = $scope.userCollection.userCategories.length - 1; i >= 0; i--) {
          if ($scope.userCollection.userCategories[i] === category._id) {
            $scope.userCollection.userCategories.splice(i, 1);
          };
        };
        saveCategory(category, 'put');
      };
      $scope.hideOnBlur = true;
      $scope.inputShow = false;
    };
    // DELETE CATEGORY
    function removeCategory(category) {
      if ($scope.items.length > 0) {
        for (var i in $scope.items) {
          if ($scope.items[i].category_id === category.catId) {
            $scope.items[i].category_id = 0;
            saveItem($scope.items[i], 'put');
          };
        };
      };
      for (var i = $scope.userCollection.userCategories.length - 1; i >= 0; i--) {
        if ($scope.userCollection.userCategories[i] === category._id) {
          $scope.userCollection.userCategories.splice(i, 1);
        };
      };
      categoryProvider.deleteCategory(category).then(function(data) {
        updateCollection();
        updateCategories();
      }, function(error) {
        console.log(error);
      });
    };
    // SERVICES
    // ------------------------------------
    $scope.applyFilters = function(id) {
      $scope.filters = {
        category_id: id
      };
    };
    function saveCategory(category, action) {
      categoryProvider.saveCategory(category, action).then(function(category) {
        $scope.userCollection.userCategories.push(category._id);
        updateCategories();
        updateCollection();
      }, function(error) {
        console.log(error);
      });
    };
    function saveItem(item, action) {
      itemProvider.saveItem(item, action).then(function(item) {
        updateCollection();
        console.log(item);
      }, function(error) {
        console.log(error);
      });
    };
    function updateCategories(){
      $scope.$broadcast('updateCategories', $scope.userCollection.userCategories, $scope.userCollection.userItems);
    };
    // Update Items from ItemController
    $scope.$on('updateItems', function(event, myCategories, myItems){
      while ($scope.userCollection.userItems.length > 0) {
        $scope.userCollection.userItems.pop();
      };
      while ($scope.userCollection.userCategories.length > 0){
        $scope.userCollection.userCategories.pop();
      };
      for (var i = 0; i < myCategories.length; i++) {
        $scope.userCollection.userCategories.push(myCategories[i]);
      };
      for (var i = 0; i < myItems.length; i++) {
        $scope.userCollection.userItems.push(myItems[i]);
      };
      updateCollection();
    });
    function updateCollection() {
      $scope.newUserCollection = collectionService.updateCollection($scope.userCollection);
      while ($scope.categories.length > 0) {
        $scope.categories.pop();
      };
      while ($scope.items.length > 0) {
        $scope.items.pop();
      };
      getUserCollectionData($scope.newUserCollection);
    };
  });