/*eslint-disable*/

db.dropDatabase();

db.users.insert([
  {
    "_id" : ObjectId("5d8ad6e2a9ed49004c33bd48"),
    "isRandomPassword" : false,
    "state" : 1,
    "name" : "test",
    "password" : "97cc9ac12f7ce594c9fd52b08acf91e83f608ec54729c2361b1dee92c4250e2ab5209666c77403d3c2c07ea8666d7ef9a55bb3c7dac357ee745d0821b485e48b",
    "lastAccessTime" : ISODate('2019-10-10T02:10:10.000Z'),
    "createTime" : ISODate('2019-10-10T02:10:10.000Z'),
    "updateTime" : ISODate('2019-10-10T02:10:10.000Z'),
    "__v" : 0,
    "profile" : ObjectId("5d8ad6e2a9dd49104c33bd49")
  }
]);

db.user_profiles.insert([
  {
    "_id" : ObjectId("5d8ad6e2a9dd49104c33bd49"),
    "user" : ObjectId("5d8ad6e2a9ed49004c33bd48"),
    "nickName" : "商趣通小秘书",
    "avatarUrl" : "http://assets.shangqutong.cn/app/common/logo.png",
    "createTime" : ISODate('2019-10-10T02:10:10.000Z'),
    "updateTime" : ISODate('2019-10-10T02:10:10.000Z'),
    "__v" : 0
  }
]);

db.products.insert([
  {
    name: '我是产品1',
    content: '这是产品1的介绍',
    quantity: 100,
    salesVolume: 0,
    originalPrice: 1000,
    unifiedPrice: 500,
    banner: [ 'http://assets.shangqutong.cn/app/common/logo.png' ],
    state: 1,
  },{
    name: '我是产品2',
    content: '这是产品2的介绍',
    quantity: 10,
    salesVolume: 1,
    originalPrice: 2000,
    unifiedPrice: 100,
    banner: [ 'http://assets.shangqutong.cn/app/common/logo.png' ],
    state: 1,
  },{
    name: '我是产品3',
    content: '这是产品3的介绍',
    quantity: 10,
    salesVolume: 1,
    originalPrice: 3000,
    unifiedPrice: 100,
    banner: [ 'http://assets.shangqutong.cn/app/common/logo.png' ],
    state: 0,
  }
]);

db.crm_users.insert([
  {
    "_id" : ObjectId("5d2ede78c54daec0bf0058fa"),
    "state" : 1,
    "name" : "admin",
    "realName" : "超级管理员",
    "password" : "97cc9ac12f7ce594c9fd52b08acf91e83f608ec54729c2361b1dee92c4250e2ab5209666c77403d3c2c07ea8666d7ef9a55bb3c7dac357ee745d0821b485e48b",
    "phone" : "18711111111",
    "email" : "admin@admin.com",
    "role" : ObjectId("5d2ede54c54daec0bf0058f9"),
    "createTime" : ISODate('2019-10-10T02:10:10.000Z'),
    "updateTime" : ISODate('2019-10-10T02:10:10.000Z'),
    "__v" : 0
  },
]);
