'use strict';

/* Controllers */
ecom.controller("HomeController", ['$scope', '$location', 'UserInfo','userService',
  function($scope, $location, UserInfo, userService) {

    $scope.UserInfo = UserInfo;

    $scope.homeModelObj = {
      query: '',
      full_query: '',
      location: '',
      HotelDetailData: ''
    };

    $scope.init = function(base_path, site_settings) {
      // Setting default settings

    };

    $scope.logout = function() {
      userService.logout();
    };

  }
]);
