'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const url = require('url');

const { URLSearchParams } = url;

describe('test/app/controller/product.test.js', () => {

  describe('#detail', () => {
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
    const product2 = {
      name: '我是产品2',
      content: '这是产品2的介绍',
      quantity: 10,
      salesVolume: 1,
      originalPrice: 2000,
      unifiedPrice: 100,
      banner: [ 'http://assets.shangqutong.cn/app/common/logo.png' ],
      state: 1,
      sort: 0,
      createTime: new Date('2021-10-10 10:10:10'),
    };
    const product3 = {
      name: '我是产品3',
      content: '这是产品3的介绍',
      quantity: 10,
      salesVolume: 1,
      originalPrice: 3000,
      unifiedPrice: 100,
      banner: [ 'http://assets.shangqutong.cn/app/common/logo.png' ],
      state: 0,
      sort: 0,
      createTime: new Date('2021-10-10 10:10:10'),
    };

    beforeEach(async () => {
      await app.model.Product.insertMany([ product1, product2, product3 ]);
    });

    afterEach(async () => {
      await app.model.Product.deleteMany();
    });

    it('should return ok', async function() {

      const query = {
        id: productId1,
      };

      const { body: result } = await app
        .httpRequest()
        .get(`/api/product/detail?${new URLSearchParams(query)}`)
        .expect(200);

      assert.equal(result.code, '0');
      assert.equal(result.msg, 'OK');

      assert.equal(result.data.name, product1.name);
      assert.equal(result.data.content, product1.content);
      assert.equal(result.data.quantity, product1.quantity);
      assert.equal(result.data.salesVolume, product1.salesVolume);
      assert.equal(result.data.unifiedPrice, product1.unifiedPrice);
      assert.equal(result.data.banner[0], product1.banner[0]);
      assert.equal(result.data.state, product1.state);
      assert.equal(result.data.sort, product1.sort);
      assert.equal(result.data.createTime, product1.createTime.valueOf());
    });
  });

  describe('#list', () => {
    const product1 = {
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
    const product2 = {
      name: '我是产品2',
      content: '这是产品2的介绍',
      quantity: 10,
      salesVolume: 1,
      originalPrice: 2000,
      unifiedPrice: 100,
      banner: [ 'http://assets.shangqutong.cn/app/common/logo.png' ],
      state: 1,
      sort: 0,
      createTime: new Date('2021-10-10 10:10:10'),
    };
    const product3 = {
      name: '我是产品3',
      content: '这是产品3的介绍',
      quantity: 10,
      salesVolume: 1,
      originalPrice: 3000,
      unifiedPrice: 100,
      banner: [ 'http://assets.shangqutong.cn/app/common/logo.png' ],
      state: 0,
      sort: 0,
      createTime: new Date('2021-10-10 10:10:10'),
    };

    beforeEach(async () => {
      await app.model.Product.insertMany([ product1, product2, product3 ]);
    });

    afterEach(async () => {
      await app.model.Product.deleteMany();
    });

    it('should return ok', async function() {
      const { body: result } = await app
        .httpRequest()
        .get('/api/product/list')
        .expect(200);

      assert.equal(result.code, '0');
      assert.equal(result.msg, 'OK');
      assert.equal(result.data.list.length, 2);

      assert.equal(result.data.list[0].name, product2.name);
      assert.equal(result.data.list[0].content, product2.content);
      assert.equal(result.data.list[0].quantity, product2.quantity);
      assert.equal(result.data.list[0].salesVolume, product2.salesVolume);
      assert.equal(result.data.list[0].unifiedPrice, product2.unifiedPrice);
      assert.equal(result.data.list[0].banner[0], product2.banner[0]);
      assert.equal(result.data.list[0].state, product2.state);
      assert.equal(result.data.list[0].sort, product2.sort);
      assert.equal(result.data.list[0].createTime, product2.createTime.valueOf());
    });
  });
});
