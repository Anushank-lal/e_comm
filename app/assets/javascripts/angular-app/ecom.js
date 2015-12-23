'use strict';

/* App Module */
var ecom = angular.module('ecom', ['ngRoute', 'ngResource', 'templates',
                    'ui.bootstrap', 'ngAnimate' ]);

var apiPath = "/api/v1";

// Disable Debug Mode Angular Production
ecom.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}]);

// Disable Week Number DatePicker
ecom.config(['uibDatepickerConfig', function(uibDatepickerConfig) {
  uibDatepickerConfig.showWeeks = false;
}]);

// Routes
ecom.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/",{
        templateUrl: 'home/index.html'
      })
      .otherwise({
        redirectTo: '/'
      });

      // use the HTML5 History API
      $locationProvider.html5Mode(true).hashPrefix('!');
  }
]);
