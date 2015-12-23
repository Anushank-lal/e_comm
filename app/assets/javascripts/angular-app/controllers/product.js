'use strict';

/* Controllers */
ecom.controller("ProductsController", ['$scope', 'productList',
  function($scope, productList) {
    $scope.productList = new productList();
  }
]);

/* Controllers */
ecom.controller("ProductController", ['$scope', 'productService',
  function($scope, productService) {

    $scope.product = {
      id: '',
      name: '',
      description: '',
      status: false,
      price: ''
    };

    $scope.addProduct = function () {
      if ($scope.newProduct.$valid) {
        $scope.isSaving = true;
        var promise = productService.login($scope.product);
        promise.then(
          function(response){ // success
            $location.path("/");
          },
          function(error){ // error
            $scope.newProductErrorMessage = error;
          }
        ).finally(function() {
          // Always execute this on both error and success
          $scope.isSaving = false;
        });
      };
    };


    $scope.updateProduct = function () {
      if ($scope.editProduct.$valid) {
        $scope.isSaving = true;
        var promise = productService.login($scope.product);
        promise.then(
          function(response){ // success
            $location.path("/");
          },
          function(error){ // error
            $scope.editProductErrorMessage = error;
          }
        ).finally(function() {
          // Always execute this on both error and success
          $scope.isSaving = false;
        });
      };
    };

  }
]);
