'use strict';

/* Factory */
ecom.factory('UserInfo', function(){
  var userInfo = {
    isLogin: false,
    token: null,
    info: {
      email: '',
      first_name: '',
      last_name: '',
      phone: ''
    }
  };
  return userInfo;
});
