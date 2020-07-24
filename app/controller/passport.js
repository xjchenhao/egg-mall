'use strict';
const Controller = require('./../core/baseController');

class PassportController extends Controller {

  // 登录
  async login() {
    const { ctx } = this;
    const { userName, password } = ctx.request.body;

    const createRule = {
      userName: 'string',
      password: 'string',
    };

    try {
      ctx.validate(createRule);
    } catch (err) {
      this.validateError(err);

      return;
    }
    const userData = await ctx.model.User.findOne({
      name: userName,
      password: ctx.helper.passwordEncrypt(password),
    })
      .populate('profile');

    if (!userData) {
      this.failure({
        code: '-1',
        msg: '账号或密码错误，请重新再试',
        data: {},
      });

      return;
    }

    await ctx.login({
      id: userData._id,
      type: 'app',
    });

    this.success();
  }

  // 退出登录
  async logout() {
    const { ctx } = this;

    await ctx.logout();

    this.success({});
  }
}

module.exports = PassportController;
