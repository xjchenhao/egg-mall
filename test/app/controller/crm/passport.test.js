'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/crm/passport.test.js', () => {

  describe('#login()', () => {
    const userId = '5cecfe69d6531d07adf2c073';

    const userData = {
      _id: userId,
      name: '我是商会管理员name',
      realName: '我是商会管理员realName',
      password: '111',
      phone: '18711111111',
      state: 1,
    };

    beforeEach(async () => {
      const ctx = app.mockContext();

      await Promise.all([
        app.model.CrmUser.create({
          ...userData,
          password: ctx.helper.passwordEncrypt(userData.password),
        }),
      ]);
    });

    afterEach(async () => {
      await Promise.all([
        app.model.CrmUser.deleteMany(),
      ]);
    });

    it('should return missing field', async function() {

      await app
        .httpRequest()
        .post('/crmApi/login')
        .send({
        })
        .expect(200)
        .expect({
          code: '422',
          msg: '表单校验错误',
          data: [
            { message: 'required', field: 'name', code: 'missing_field' },
            { message: 'required', field: 'password', code: 'missing_field' },
          ],
        });
    });

    it('should return invalid', async function() {

      await app
        .httpRequest()
        .post('/crmApi/login')
        .send({
          name: false,
          password: false,
        })
        .expect(200)
        .expect({
          code: '422',
          msg: '表单校验错误',
          data: [
            { message: 'should be a string', code: 'invalid', field: 'name' },
            { message: 'should be a string', code: 'invalid', field: 'password' },
          ],
        });
    });

    it('should return -1', async function() {

      await app
        .httpRequest()
        .post('/crmApi/login')
        .send({
          name: userData.name,
          password: 'errorPassword',
        })
        .expect(200)
        .expect({
          code: '-1',
          msg: '账号或密码错误',
          data: { name: userData.name },
        });
    });

    it('should return ok', async function() {

      await app
        .httpRequest()
        .post('/crmApi/login')
        .send({
          name: userData.name,
          password: userData.password,
        })
        .expect(200)
        .expect({
          code: '0',
          msg: 'OK',
          data: {},
        });
    });
  });

  describe('#logout()', () => {

    const addUserData = {
      name: 'testtesttest123123',
      password: '123123',
      state: 1,
    };

    let addUserId = '';
    beforeEach(async () => {
      const addUserResult = await app.model.CrmUser.create(addUserData);

      addUserId = addUserResult.id;
    });

    afterEach(async () => {
      await Promise.all([
        app.model.CrmUser.findByIdAndDelete(addUserId),
      ]);
    });

    it('should return ok', async function() {

      app.mockUserContext({
        id: addUserId,
        type: 'crm',
        name: addUserData.name,
      });

      await app
        .httpRequest()
        .post('/crmApi/logout')
        .expect(200)
        .expect({
          code: '0',
          msg: 'OK',
          data: {
          },
        });
    });
  });
});
