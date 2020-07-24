'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/passport.test.js', () => {

  describe('#logout', () => {

    let addDbRecordResult;
    beforeEach(async () => {
      addDbRecordResult = await app.model.User.create({
        name: 'testtesttest123123',
        password: '123123',
        state: 1,
      });
    });

    afterEach(async () => {
      await app.model.User.deleteMany();
    });

    it('should return ok', async function() {
      app.mockUserContext({
        userId: '123123123123123',
        type: 'app',
        phone: addDbRecordResult.phone,
      });
      await app
        .httpRequest()
        .post('/api/logout')
        .expect(200)
        .expect({
          code: '0',
          msg: 'OK',
          data: {},
        });
    });
  });

  describe('#login', () => {

    let addDbRecordResult;
    const userName = 'testtesttest123123';
    const password = '123456qq11';

    beforeEach(async () => {

      const ctx = app.mockContext();

      addDbRecordResult = await app.model.User.create({
        name: userName,
        password: ctx.helper.passwordEncrypt(password),
        state: 1,
        profile: '5d6389526e486c6dc30cecaf',
        isRandomPassword: true,
      });

      await app.model.UserProfile.create({
        _id: '5d6389526e486c6dc30cecaf',
        nickName: '代码道',
        user: addDbRecordResult._id,
      });
    });

    afterEach(async () => {
      await app.model.User.deleteMany();
      await app.model.UserProfile.deleteMany();
    });

    it('should return missing field', async () => {
      await app
        .httpRequest()
        .post('/api/login')
        .send({
        })
        .expect(200)
        .expect({
          code: '422',
          data: [
            { message: 'required', field: 'userName', code: 'missing_field' },
            { message: 'required', field: 'password', code: 'missing_field' },
          ],
          msg: '表单校验错误',
        });
    });

    it('should return invalid ', async () => {
      await app
        .httpRequest()
        .post('/api/login')
        .send({
          userName: false,
          password: false,
        })
        .expect(200)
        .expect({
          code: '422',
          msg: '表单校验错误',
          data: [
            { message: 'should be a string', code: 'invalid', field: 'userName' },
            { message: 'should be a string', code: 'invalid', field: 'password' },
          ],
        });
    });

    it('should return -1', async () => {
      await app
        .httpRequest()
        .post('/api/login')
        .send({
          type: 'phone',
          userName,
          password: '123',
        })
        .expect(200)
        .expect({
          code: '-1',
          msg: '账号或密码错误，请重新再试',
          data: {},
        });
    });

    it('should return ok', async () => {

      const result = await app
        .httpRequest()
        .post('/api/login')
        .send({
          type: 'phone',
          userName,
          password,
        })
        .expect(200);

      assert.equal(result.body.code, '0');
      assert.equal(result.body.msg, 'OK');
    });
  });
});
