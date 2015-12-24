'use strict';

/* Factory */
ecom.factory("cartService", ['$http', '$q', '$route', 'UserInfo',
  function($http, $q, $route, UserInfo) {

    function addProductToCart(product_id) {
      var deferred = $q.defer();

      $http.put(apiPath + "/cart_items",
      {
        customer_id: UserInfo.info.id,
        product_id:  product_id,
        qty:         1
      })
      .then(function(response) {
        deferred.resolve(response.data);
      },
      function(error) {
        deferred.reject(error.data.error);
      });

      return deferred.promise;
    }


    function viewCart(product_id) {
      var deferred = $q.defer();

      $http.get(apiPath + "/cart_items?customer_id=" + UserInfo.info.id)
        .then(function(response) {
          deferred.resolve(response.data);
        },
        function(error) {
          deferred.reject(error.data.error);
        });

      return deferred.promise;
    }

    return {
      addProductToCart:  addProductToCart,
      viewCart:          viewCart
    };

  }
]);