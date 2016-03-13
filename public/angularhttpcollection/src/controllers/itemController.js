'use strict';


newapp
  .controller('itemList', function($rootScope, $scope, $http,
    collectionService, itemProvider, categoryProvider) {
    console.log('in itemController');
    $scope.editorEnabled = false;
    $scope.checked = false;
    $scope.editDisabled = true;
    $scope.currentPage = 0;
    $scope.maxPage = 10;
    $scope.categories = [];
    $scope.items = [];
    $scope.userCollection = [];

    // GET USER COLLECTION
    collectionService.getUserCollection($rootScope.user).then(function(collection) {
      $scope.userCollection = collection;
      getUserCollectionData($scope.userCollection);
    }, function(error) {
      console.log(error);
    });

    // GET USER ITEMS & CATEGORIES
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
    // POST ITEM
    $scope.createItem = function(item) {
      item['itemId'] = $scope.items.length + 1;
      if (!item.category_id) {
        item.category_id = 0;
      }
      var action = 'post';
      saveItem(item, action);
    };
    // UPDATE ITEM
    $scope.editItem = function(item) {
      // Remove item from userCollection
      for (var i = $scope.userCollection.userItems.length - 1; i >= 0; i--) {
        if ($scope.userCollection.userItems[i] === item._id) {
          $scope.userCollection.userItems.splice(i, 1);
        };
      };
      var action = 'put';
      saveItem(item, action);
    };
    // DELETE ITEM
    $scope.removeItem = function(item) {
      for (var i = $scope.userCollection.userItems.length - 1; i >= 0; i--) {
        if ($scope.userCollection.userItems[i] === item._id) {
          $scope.userCollection.userItems.splice(i, 1);
        };
      };
      itemProvider.deleteItem(item).then(function(data) {
        updateCollection();
      }, function(error) {
        console.log(error);
      });
    };

    // SERVICES
    // ------------------------------------
    function updateItems(){
      $scope.$broadcast('updateItems', $scope.userCollection.userCategories, $scope.userCollection.userItems);
    };
    // Update Categories from CategoryController
    $scope.$on('updateCategories', function(event, myCategories, myItems){
      $scope.activeCategory = 'all';
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
    // Pagination
    $scope.numberOfPages = function() {
        return Math.ceil($scope.items.length / $scope.maxPage);
    };
    function saveItem(item, action) {
      itemProvider.saveItem(item, action).then(function(item) {
        $scope.userCollection.userItems.push(item._id);
        updateCollection();
        updateItems();
      }, function(error) {
        console.log(error);
      });
    };
    function updateCollection() {
      $scope.newUserCollection = collectionService.updateCollection($scope.userCollection);
      while ($scope.items.length > 0) {
        $scope.items.pop();
      };
      while ($scope.categories.length > 0){
        $scope.categories.pop();
      }
      getUserCollectionData($scope.newUserCollection);
    };
  });