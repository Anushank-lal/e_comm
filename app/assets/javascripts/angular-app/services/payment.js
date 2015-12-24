'use strict';

/* Factory */
ecom.factory("paymentService", ['$http', '$q', '$rootScope', '$sce',
  function($http, $q, $rootScope, $sce) {

    function makePayment(order_no) {
      var deferred = $q.defer();

      $http.get(apiPath + "/payment?order_no=" + order_no)
        .then(function(response) {
          var data = {
            redirectUrl: $sce.trustAsResourceUrl(response.data.target_url),
            redirectMethod: 'POST',
            redirectData: response.data.payment_params
          };

          console.log(response)

          $rootScope.$broadcast('gateway.redirect', data);
          deferred.resolve();
        },function(error) {

          deferred.reject(error);
        });

      return deferred.promise;
    }

    return {
      makePayment: makePayment
    };

  }
]);