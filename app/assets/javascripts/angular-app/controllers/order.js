'use strict';

/* Controllers */
ecom.controller("OrderController", ['$scope', 'orderService', 'UserInfo', '$location',
  function($scope, orderService, UserInfo, $location){

    $scope.orders = [];

    var promise = orderService.listOrders();;
    promise.then(
      function(response){ // success
        $scope.orders = response;
      },
      function(error){ // error
      }
    );

  }
]);