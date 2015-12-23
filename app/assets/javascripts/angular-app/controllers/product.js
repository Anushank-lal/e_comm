'use strict';

/* Controllers */
ecom.controller("ProductController", ['$scope', '$location',
  function($scope, $location) {

    $scope.products = {
      query: '',
      full_query: '',
      location: '',
      HotelDetailData: ''
    };


  }
]);
