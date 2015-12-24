'use strict';

/* Factory */
ecom.factory('UserInfo', function(){
  var userInfo = {
    isLogin: false,
    token: null,
    info: {
      id: '',
      email: '',
      first_name: '',
      last_name: '',
      phone: ''
    }
  };
  return userInfo;
});
