'use strict';
const Controller = require('./../../core/baseController');

class CrmPassportController extends Controller {

  // 登录
  async login() {
    const { ctx } = this;
    const { name, password } = ctx.request.body;

    const createRule = {
      name: 'string',
      password: 'string',
    };

    try {
      ctx.validate(createRule);
    } catch (err) {
      this.validateError(err);

      return;
    }

    const userResult = await ctx.model.CrmUser.findOne({
      name,
      password: ctx.helper.passwordEncrypt(password),
    });

    if (!userResult) {
      this.failure({
        code: '-1',
        msg: '账号或密码错误',
        data: {
          name,
        },
      });

      return;
    }

    await ctx.login({
      id: userResult.id,
      type: 'oms',
    });

    ctx.session.maxAge = 7200000;

    this.success();
  }


  // 退出登录
  async logout() {
    const { ctx } = this;

    await ctx.logout();

    this.success({
    });
  }
}

module.exports = CrmPassportController;
