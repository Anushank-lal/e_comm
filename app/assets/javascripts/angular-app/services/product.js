'use strict';

/* Factory */

ecom.factory('ProductList', ['$http',
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