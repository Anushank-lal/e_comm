'use strict';

/* Factory */

ecom.factory('productList', ['$http',
  function($http){
    var ProductList = function() {
      this.products = [];
      this.busy = false;
      this.more = true;
      this.limit = 5;
      this.offset = 0;
    };

    ProductList.prototype.nextPage = function() {
      if (this.busy) return;
      this.busy = true;

      var url = apiPath + "/products?limit=" + this.limit + "&offset=" + this.offset;

      $http.get(url).success(function(data) {
        var products = data.products;
        console.log("Next offset : " + data.last);
        // Pushing Results
        for (var i = 0; i < products.length; i++) {
          this.products.push(products[i]);
        }
        if (products.length){
          this.offset = data.last;
          this.busy = false;
          this.more = true;
        }
        else{
          // No More Results
          this.busy = true;
          this.more = false;
        };
      }.bind(this));
    };

    return ProductList;
  }
]);


ecom.factory("productService", ['$http', '$q', '$route',
  function($http, $q, $route) {

    function addProduct(product) {
      var deferred = $q.defer();

      $http.post(apiPath + "/products",
      {
        name:        product.name,
        description: product.description,
        status:      product.status,
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


    function showProduct(id) {
      var deferred = $q.defer();

      id = $route.current.params.id;

      $http.get(apiPath + "/products/" + id)
        .then(function(response) {
          deferred.resolve(response.data);
        },function(error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }


    function updateProduct(product) {
      var deferred = $q.defer();

      $http.patch(apiPath + "/products/" + product.id, {
        name:        product.name,
        description: product.description,
        status:      product.status,
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
      addProduct:     addProduct,
      showProduct:    showProduct,
      updateProduct:  updateProduct
    };

  }
]);