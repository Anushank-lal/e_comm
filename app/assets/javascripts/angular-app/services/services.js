'use strict';

/* Factory */
ecom.factory('UserInfo', function(){
  var userInfo = {
    isLogin: false,
    info: {
      email: '',
      first_name: '',
      last_name: '',
      phone: ''
    }
  };
  return userInfo;
});
