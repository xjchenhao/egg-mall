'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/order.test.js', () => {
  const userId = '5d8ad6e2a9ed49004c33bd41';

  describe('#create', () => {
    const productId1 = '5d6484c4c33dd8005bc4ce0d';
    const product1 = {
      _id: productId1,
      name: '我是产品1',
      content: '这是产品1的介绍',
      quantity: 100,
      salesVolume: 0,
      originalPrice: 1000,
      unifiedPrice: 500,
      banner: [ 'http://assets.shangqutong.cn/app/common/logo.png' ],
      state: 1,
      sort: 0,
      createTime: new Date('2020-10-10 10:10:10'),
    };

    beforeEach(async () => {
      await app.model.Product.insertMany([ product1 ]);
    });

    afterEach(async () => {
      await Promise.all([
        app.model.Product.deleteMany(),
        app.model.Order.deleteMany(),
      ]);
    });

    it('should return missing field', async () => {

      app.mockUserContext({
        id: userId,
        type: 'app',
      });
      await app
        .httpRequest()
        .post('/api/order/create')
        .send({
        })
        .expect(200)
        .expect({
          code: '422',
          data: [
            { message: 'required', field: 'productId', code: 'missing_field' },
          ],
          msg: '表单校验错误',
        });
    });

    it('should return invalid ', async () => {

      app.mockUserContext({
        id: userId,
        type: 'app',
      });
      await app
        .httpRequest()
        .post('/api/order/create')
        .send({
          productId: false,
        })
        .expect(200)
        .expect({
          code: '422',
          msg: '表单校验错误',
          data: [
            { message: 'should be a string', code: 'invalid', field: 'productId' },
          ],
        });
    });

    it('should return -1', async function() {

      app.mockUserContext({
        id: userId,
        type: 'app',
      });

      await app
        .httpRequest()
        .post('/api/order/create')
        .send({
          productId: '5d6484c4c33dd8005bc4ce01',
        })
        .expect(200)
        .expect({
          code: '-1',
          msg: '不存在的产品id',
          data: {},
        });
    });

    it('should return ok', async function() {

      app.mockUserContext({
        id: userId,
        type: 'app',
      });

      await app
        .httpRequest()
        .post('/api/order/create')
        .send({
          productId: productId1,
        })
        .expect(200)
        .expect({
          code: '0',
          msg: 'OK',
          data: {},
        });

      const orderData = await app.model.Order.findOne();
      assert.equal(orderData.product, productId1);
      assert.equal(orderData.user, userId);
      assert.equal(orderData.amount, 500);
    });
  });

  describe('#list', () => {
    const orderId = '5d6484c4c33dd8005bc4ce0d';
    const orderData = {
      _id: orderId,
      user: userId,
      product: '5d6484c4c33dd8005bc4ce03',
      count: 1,
      amount: 300,
    };

    beforeEach(async () => {
      await app.model.Order.insertMany(orderData);
    });

    afterEach(async () => {
      await Promise.all([
        app.model.Order.deleteMany(),
      ]);
    });

    it('should return ok', async function() {

      app.mockUserContext({
        id: userId,
        type: 'app',
      });

      const { body: result } = await app
        .httpRequest()
        .get('/api/order/list')
        .send({ })
        .expect(200);

      assert.equal(result.code, '0');
      assert.equal(result.msg, 'OK');
      assert.equal(result.data.list.length, 1);

      assert.equal(result.data.list[0]._id, orderData._id);
      assert.equal(result.data.list[0].user, orderData.user);
      assert.equal(result.data.list[0].product, orderData.product);
      assert.equal(result.data.list[0].amount, orderData.amount);
    });
  });
});
