'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true }, // 登录名
    password: { type: String, required: true }, // 登录密码密文。sha3(pwd+salt)

    // 创建时间。只在首次插入数据的时候写入
    createTime: {
      type: Date,
      default: Date.now,
      get(time) {
        return new Date(time).valueOf();
      },
    },

    // 更新时间。每次数据变动的时候都要更新一下
    updateTime: {
      type: Date,
      default: Date.now,
      get(time) {
        return new Date(time).valueOf();
      },
    },
  },
  {
    usePushEach: true,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
    toJSON: { getters: true },
  }
);

module.exports = app => {
  const conn = app.mongooseDB.get('app');

  return conn.model('user', schema);
};
