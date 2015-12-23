'use strict';

/* Controllers */
ecom.controller("UserController", ['$scope', 'userService', '$location',
  function($scope, userService, $location){

    $scope.user = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: ''
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

    $scope.register = function () {
      if ($scope.registrationForm.$valid) {
        $scope.isSaving = true;
        var promise = userService.registration($scope.user);
        promise.then(
          function(response){ // success
            $location.path("/");
          },
          function(error){ // error
            $scope.registerErrorMessage = error;
          }
        ).finally(function() {
          // Always execute this on both error and success
          $scope.isSaving = false;
        });
      };
    };

  }
]);