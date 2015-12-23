'use strict';

/* Controllers */
ecom.controller("UserController", ['$scope', 'userService', '$location',
  function($scope, authenticationService, $location){

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
        var promise = authenticationService.login($scope.user.email, $scope.user.password);
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
        var promise = authenticationService.registration($scope.user);
        promise.then(
          function(response){ // success
            $location.path("/");
          },
          function(error){ // error
            $scope.registrationForm.email.$error.taken = error;
          }
        ).finally(function() {
          // Always execute this on both error and success
          $scope.isSaving = false;
        });
      };
    };

  }
]);