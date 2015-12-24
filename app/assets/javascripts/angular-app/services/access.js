"use strict";

ecom.factory('Access', ['$q', 'UserInfo', '$location', 'userService',
  function($q, UserInfo, $location, userService) {

    var Access = {

      OK: 200,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,

      isAnonymous: function() {
        var deferred = $q.defer();

        if (UserInfo.isLogin) {
          deferred.reject(Access.UNAUTHORIZED);
        }
        else{
          deferred.resolve(Access.OK);
        };

        return deferred.promise;
      },


      isAuthenticated: function() {
        var deferred = $q.defer();

        if (UserInfo.isLogin) {
          deferred.resolve(Access.OK);
        }
        else{
          deferred.reject(Access.UNAUTHORIZED);
        };

        return deferred.promise;
      }

    };

    return Access;

  }
]);