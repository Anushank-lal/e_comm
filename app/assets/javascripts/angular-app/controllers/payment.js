'use strict';

/* Controllers */
ecom.controller("PaymentController", ['$scope', 'paymentService', 'UserInfo', '$location', '$routeParams',
  function($scope, paymentService, UserInfo, $location, $routeParams){

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

ecom.controller("PaymentResultController", ['$scope', '$location', '$routeParams',
  function($scope, $location, $routeParams){

    var payment_status = $routeParams.status;

    $scope.order_no = $routeParams.order_no;

    if (payment_status == true) {
      $scope.payment_status = "Successfull";
      $scope.order_status = "Successfull";
    }
    else if(payment_status == false){
      $scope.payment_status = "Failed";
      $scope.order_status = "Failed";
    }
    else{
      $location.path("/");
    };

  }
]);