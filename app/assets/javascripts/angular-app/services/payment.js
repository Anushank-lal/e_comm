'use strict';

/* Factory */
ecom.factory("paymentService", ['$http', '$q', '$rootScope', '$sce',
  function($http, $q, $rootScope, $sce) {

    function makePayment(order_no) {
      var deferred = $q.defer();

      $http.get(apiPath + "/payment?order_no=" + order_no)
        .then(function(response) {
          var data = {
            redirectUrl: $sce.trustAsResourceUrl(response.data.order.payment_url),
            redirectMethod: 'POST',
            redirectData: { order_no: response.data.order.order_no, amount: response.data.order.total }
          };

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