
'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'user', required: true, unique: true },
  nickName: { type: String }, // 用户昵称
  avatarUrl: { type: String }, // 头像的url
  province: { type: String }, // 省份
  city: { type: String }, // 城市
  district: { type: String }, // 县（区）
  gender: { type: String, enum: [ '男', '女', '保密' ] }, // 性别。直接存储字符串：男，女，保密
  birthday: { type: String }, // 生日
  company: { type: String }, // 公司名称
  companyAddress: { type: String }, // 公司地址
  duty: { type: String }, // 公司职务
  email: { type: String }, // 邮箱地址

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

schema.index({ company: 1 });


module.exports = app => {

  const conn = app.mongooseDB.get('app');

  return conn.model('user_profile', schema);
};
