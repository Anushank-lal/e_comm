'use strict';

/* Factory */
ecom.factory("userService", ['$http', '$q', '$location', 'UserInfo', 'LocalStorage',
  function($http, $q, $location, UserInfo, LocalStorage) {

    function login(email, password) {
      var deferred = $q.defer();

      $http.post(apiPath + "/users",
      {
        email:    email,
        password: password
      })
      .then(function(response) {
        UserInfo.isLogin = true;
        UserInfo.info    = {
          email:      response.data.user.email,
          first_name: response.data.user.first_name,
          last_name:  response.data.user.last_name
        };

        LocalStorage.setKey('UserInfo', UserInfo);
        deferred.resolve();
      },
      function(error) {
        LocalStorage.setKey('UserInfo', UserInfo);
        deferred.reject(error.data.error);
      });

      return deferred.promise;
    }


    function logout() {
      var deferred = $q.defer();

      $http.delete(apiPath + "/logout")
        .then(function(response) {
          UserInfo.isLogin   = false;
          UserInfo.info      = null;

          LocalStorage.setKey('UserInfo', UserInfo);
          deferred.resolve();
          $location.path("/login");

        },function(error) {
          UserInfo.isLogin   = false;
          UserInfo.info      = null;

          LocalStorage.setKey('UserInfo', UserInfo);
          deferred.reject(error);
          $location.path("/login");
        });

      return deferred.promise;
    }


    function registration(user) {
      var deferred = $q.defer();

      $http.post(apiPath + "/signup?locale=" + SiteSettings.locale, {
        first_name:       user.first_name,
        last_name:        user.last_name,
        email:            user.email,
        password:         user.password,
        confirm_password: user.confirm_password
      })
      .then(function(response) {
        UserInfo.isLogin = true;
        UserInfo.token   = response.data.user.access_token;
        UserInfo.info    = {
          email:      response.data.user.email,
          first_name: response.data.user.first_name,
          last_name:  response.data.user.last_name,
          phone:      response.data.user.phone
        };

        LocalStorage.setKey('UserInfo', UserInfo);

        deferred.resolve();
      },
      function(error) {
        LocalStorage.setKey('UserInfo', UserInfo);
        deferred.reject(error.data.error);
      });

      return deferred.promise;
    }


    return {
      login:          login,
      logout:         logout,
      registration:   registration
    };

  }
]);