
'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true }, // 名称
  content: { type: String, required: true }, // 产品介绍
  quantity: { type: Number, required: true, min: 0 }, // 产品数量
  salesVolume: { type: Number, default: 0, min: 0 }, // 销量

  // 原始售价（门店平时对外的售价）
  originalPrice: {
    type: mongoose.SchemaTypes.Decimal128,
    min: 0,
    required: true,
    get(val) {
      return Number(val);
    },
  },

  // 统一售价
  unifiedPrice: {
    type: mongoose.SchemaTypes.Decimal128,
    min: 0,
    get(val) {
      return Number(val);
    },
  },
  banner: [{ type: String, required: true }], // banner图片url数组
  state: { type: Number, default: 1, min: 0, max: 1 }, // 状态。0下架，1上架
  sort: { type: Number, default: 0 }, // 排序

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
  toJSON: { virtuals: true, getters: true },
});

module.exports = app => {

  const conn = app.mongooseDB.get('app');

  return conn.model('product', schema);
};
