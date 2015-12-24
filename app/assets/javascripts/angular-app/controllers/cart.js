'use strict';

/* Controllers */
ecom.controller("CartController", ['$scope', 'cartService', 'UserInfo', '$location',
  function($scope, cartService, UserInfo, $location){

    $scope.cartObj = {
      cart: {},
      no_of_items: 0
    }

    if (UserInfo.isLogin) {
      var promise = cartService.viewCart();
      promise.then(
        function(response){ // success
          $scope.cartObj.cart = response;
          $scope.cartObj.no_of_items = response.cart_items.length;
        },
        function(error){ // error
        }
      );
    };

    $scope.addToCart = function (product_id) {
      var promise = cartService.addProductToCart(product_id);
      promise.then(
        function(response){ // success
          $scope.cartObj.no_of_items = $scope.cartObj.no_of_items + 1;
        },
        function(error){ // error
        }
      );

    };


  }
]);