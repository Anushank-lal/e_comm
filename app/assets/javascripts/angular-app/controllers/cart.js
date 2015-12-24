'use strict';

/* Controllers */
ecom.controller("CartController", ['$scope', 'orderService', 'UserInfo', '$location',
  function($scope, orderService, UserInfo, $location){

    if (!UserInfo.isLogin) {
      $location.path("/login")
    };

    $scope.cart = {

    }

    $scope.login = function () {
      if ($scope.loginForm.$valid) {
        $scope.isSaving = true;
        var promise = userService.login($scope.user.email, $scope.user.password);
        promise.then(
          function(response){ // success
            $location.path("/");
          },
          function(error){ // error
            $scope.loginErrorMessage = error;
          }
        ).finally(function() {
          // Always execute this on both error and success
          $scope.isSaving = false;
        });
      };
    };


  }
]);