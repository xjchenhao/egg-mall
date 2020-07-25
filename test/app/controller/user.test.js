'use strict';

const { app } = require('egg-mock/bootstrap');
const url = require('url');

const { URLSearchParams } = url;

describe('test/app/controller/user.test.js', () => {

  describe('#info', () => {
    const userId = '5d8ad6e2a9ed49004c33bd41';
    const userProfileId = '5d8ad6e2a9ed49004c33bd31';

    beforeEach(async () => {
      await Promise.all([
        app.model.User.create({
          _id: userId,
          isRandomPassword: false,
          state: 1,
          name: 'test',
          password: '97cc9ac12f7ce594c9fd52b08acf91e83f608ec54729c2361b1dee92c4250e2ab5209666c77403d3c2c07ea8666d7ef9a55bb3c7dac357ee745d0821b485e48b',
          __v: 0,
          profile: userProfileId,
        }),
        app.model.UserProfile.create({
          _id: userProfileId,
          user: userId,
          nickName: '张三',
          avatarUrl: 'http://assets.shangqutong.cn/app/common/logo.png',
        }),
      ]);
    });

    afterEach(async () => {
      await Promise.all([
        app.model.User.deleteMany(),
        app.model.UserProfile.deleteMany(),
      ]);
    });

    it('should return 403', async function() {

      const query = {
      };

      await app
        .httpRequest()
        .get(`/api/user/info?${new URLSearchParams(query)}`)
        .expect(403);
    });

    it('should return ok', async function() {

      app.mockUserContext({
        id: userId,
        type: 'app',
      });

      const query = {
      };

      await app
        .httpRequest()
        .get(`/api/user/info?${new URLSearchParams(query)}`)
        .expect(200)
        .expect({
          code: '0',
          msg: 'OK',
          data: {
            avatarUrl: 'http://assets.shangqutong.cn/app/common/logo.png',
            nickName: '张三',
          },
        });
    });
  });
});
