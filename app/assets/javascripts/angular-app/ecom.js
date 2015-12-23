'use strict';

/* App Module */
var ecom = angular.module('ecom', ['ngRoute', 'ngResource', 'templates',
                    'ui.bootstrap', 'ngAnimate', 'LocalStorageModule', 'infinite-scroll' ]);

var apiPath = "/api/v1";

// Disable Debug Mode Angular Production
ecom.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}]);

ecom.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('ecomm');
  //localStorageServiceProvider.setStorageType('sessionStorage')
  localStorageServiceProvider.setNotify(true, true);
}]);

// Routes
ecom.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/",{
        templateUrl: 'product/index.html',
        controller: 'ProductController',
      })
      .when("/login",{
        templateUrl: 'user/login.html',
        controller: 'UserController',
      })
      .when("/register",{
        templateUrl: 'user/register.html',
        controller: 'UserController',
      })
      .otherwise({
        redirectTo: '/'
      });

      // use the HTML5 History API
      $locationProvider.html5Mode(true).hashPrefix('!');
  }
]);
