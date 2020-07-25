
'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({

  name: { type: String, unique: true, required: true }, // 登录名
  realName: { type: String }, // 真实姓名
  password: { type: String, required: true }, // 登录密码密文。sha3(pwd+salt)
  email: { type: String }, // 邮箱
  phone: { type: String }, // 手机号
  state: { type: Number, default: 1, min: 0, max: 1 }, // 状态。0禁用，1激活

  createTime: {
    type: Date,
    default: Date.now,
    get(time) {
      return new Date(time).valueOf();
    },
  }, // 创建时间。只在首次插入数据的时候写入
  updateTime: {
    type: Date,
    default: Date.now,
    get(time) {
      return new Date(time).valueOf();
    },
  }, // 更新时间。每次数据变动的时候都要更新一下
}, {
  usePushEach: true,
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  toJSON: { getters: true },
});

schema.index({ createTime: -1 });

module.exports = app => {

  const conn = app.mongooseDB.get('app');

  return conn.model('crm_user', schema);
};
