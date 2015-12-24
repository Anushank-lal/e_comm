'use strict';

/* Factory */
ecom.factory("orderService", ['$http', '$q', '$route', 'UserInfo',
  function($http, $q, $route, UserInfo) {

    function listOrders() {
      var deferred = $q.defer();

      $http.get(apiPath + "/orders?customer_id=" + UserInfo.info.id)
        .then(function(response) {
          deferred.resolve(response.data.orders);
        },function(error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    return {
      listOrders: listOrders
    };

  }
]);