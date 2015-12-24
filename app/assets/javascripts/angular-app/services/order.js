'use strict';

/* Factory */
ecom.factory("orderService", ['$http', '$q', '$route', 'UserInfo',
  function($http, $q, $route, UserInfo) {

    function listOrders() {
      var deferred = $q.defer();

      $http.get(apiPath + "/orders?customer_id=" + UserInfo.info.id)
        .then(function(response) {
          deferred.resolve(response.data);
        },function(error) {
          console.log(error)
          deferred.reject(error);
        });

      return deferred.promise;
    }


    function updateProduct(product) {
      var deferred = $q.defer();

      $http.patch(apiPath + "/products/" + product.id, {
        name:        product.name,
        description: product.description,
        status:      (product.status) ? 'enabled' : 'disabled',
        price:       product.price
      })
      .then(function(response) {
        deferred.resolve();
      },
      function(error) {
        deferred.reject(error.data.error);
      });

      return deferred.promise;
    }


    return {
      listOrders:       listOrders
    };

  }
]);