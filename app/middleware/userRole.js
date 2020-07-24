'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const app = ctx.app;
    const isEnable = app.config.isLogin.enable;

    const authFun = await app.role.can('user');
    await authFun(ctx, next);

    if (!ctx.user) {
      return;
    }

    if (isEnable && ctx.user.isDestroy === true) {

      await ctx.logout();

      ctx.body = {
        code: '603',
        msg: '该用户已注销',
        data: {},
      };
      ctx.status = 200;

      return;
    }

  };
};
