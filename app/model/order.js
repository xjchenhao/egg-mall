
'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'user', required: true }, // 关联的用户
  product: { type: mongoose.SchemaTypes.ObjectId, ref: 'product', required: true }, // 关联的产品
  count: { type: Number, default: 1, min: 1 }, // 下单商品数量
  amount: { type: mongoose.SchemaTypes.Decimal128, min: 0, required: true, get(val) { return Number(val); } }, // 总金额
  // 创建时间
  createTime: {
    type: Date,
    default: Date.now,
    get(time) {
      return new Date(time).valueOf();
    },
  },

  // 更新时间
  updateTime: {
    type: Date,
    default: Date.now,
    get(time) {
      return new Date(time).valueOf();
    },
  },
}, {
  usePushEach: true,
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  toJSON: { getters: true },
});


module.exports = app => {

  const conn = app.mongooseDB.get('app');

  return conn.model('order', schema);
};
