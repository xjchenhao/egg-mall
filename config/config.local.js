'use strict';

module.exports = appInfo => {
  const config = exports = {

    // 日志管理配置
    logger: {
      level: 'DEBUG',
      consoleLevel: 'DEBUG',
      disableConsoleAfterReady: false,
      // dir: '/data/logs',
    },

    // 鉴权校验配置
    isLogin: {
      enable: true,
    },

    // mongodb配置
    mongoose: {
      clients: {
        app: {
          url: 'mongodb://127.0.0.1:27017/gbdmall',
          options: {
            useFindAndModify: false, // 修复弃用警告。参考链接：https://mongoosejs.com/docs/deprecations.html#-findandmodify-
          },
        },
      },
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1515465031562_6723';

  return config;
};
