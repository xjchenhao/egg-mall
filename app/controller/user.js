'use strict';
const Controller = require('../core/baseController');

class UserController extends Controller {
  // 用户信息
  async info() {
    const { ctx } = this;
    const { id: userId } = ctx.user;

    const result = await ctx.model.User.findById(userId).populate('profile');

    this.success({
      nickName: result.profile.nickName,
      avatarUrl: result.profile.avatarUrl,
    });
  }
}

module.exports = UserController;
