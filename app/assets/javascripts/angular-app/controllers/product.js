'use strict';

/* Controllers */
ecom.controller("ProductController", ['$scope', 'ProductList',
  function($scope, ProductList) {

    $scope.productList = new ProductList();

  }
]);
