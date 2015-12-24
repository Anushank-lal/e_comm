'use strict';

/* Controllers */
ecom.controller("PaymentController", ['$scope', 'paymentService', 'UserInfo', '$location',
  function($scope, paymentService, UserInfo, $location){

    $scope.makePayment = function (order_no) {
      if ($scope.UserInfo.isLogin) {
        var promise = paymentService.makePayment(order_no);
        promise.then(
          function(response){ // success

          },
          function(error){ // error
          }
        );
      };
    };


  }
]);