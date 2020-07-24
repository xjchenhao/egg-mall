/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    security: {
      // domainWhiteList: [ 'http://localhost:8000', ],
      csrf: {
        enable: false,
        // headerName: 'x-client-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      },
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    session: {
      key: 'TOKEN',
      maxAge: 86400000 * 30, // 30 天
      httpOnly: true,
      encrypt: true,
      renew: true, // 当用户Session的有效期仅剩下最大有效期一半的时候，访问api可以重置Session的有效期
    },
    passportLocal: {
      usernameField: 'phone',
      passwordField: 'password',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1595561025728_9728';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
