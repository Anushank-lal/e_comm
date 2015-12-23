'use strict';

/* Controllers */
ecom.controller("HomeController", ['$scope', '$location',
  function($scope, $location) {

    $scope.homeModelObj = {
      query: '',
      full_query: '',
      location: '',
      HotelDetailData: ''
    };

    $scope.init = function(base_path, site_settings) {
      // Setting default settings

    };

  }
]);
