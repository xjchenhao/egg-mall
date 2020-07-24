
'use strict';

module.exports = function(app) {


  app.role.use('admin', ctx => {
    const isEnable = app.config.isLogin.enable;

    if (isEnable) {
      return ctx.user
      && ctx.user.type === 'oms'
      && ctx.user.id
      && ctx.user.code === 'admin'
      && true;
    }

    return true;
  });

  app.role.use('user', async ctx => {
    const isEnable = app.config.isLogin.enable;

    if (isEnable) {
      return ctx.user
      && ctx.user.type === 'app'
      && ctx.user.id
      && true;
    }

    return true;
  });

  app.role.failureHandler = function(ctx, action) {
    ctx.body = {
      code: '403',
      msg: ctx.helper.errorCode['403'],
      data: {
        needRole: action,
      },
    };

    ctx.status = 403;
  };
};
