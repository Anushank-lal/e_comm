'use strict';

/* Factory */
ecom.factory('LocalStorage', ['localStorageService',
  function(localStorageService) {

    var LocalStorage = {
      getKey: function(key) {
        return localStorageService.get(key);
      },

      setKey: function(key, val) {
        return localStorageService.set(key, val);
      },

      removeKey: function(key) {
        return localStorageService.remove(key);
      },

      bindKey: function(scope, key) {
        return localStorageService.bind(scope, key);
      }
    };

    return LocalStorage;
  }
]);
