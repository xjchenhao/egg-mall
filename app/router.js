'use strict';


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const userRole = app.middleware.userRole(); // 客户端用户
  // const adminRole = app.role.can('admin'); // 系统管理员

  router.get('/', controller.home.index);

  /* 登录注册相关 */
  router.post('/api/login', controller.passport.login);
  router.post('/api/logout', controller.passport.logout);

  /* 产品相关 */
  router.get('/api/product/list', controller.product.list);
  router.get('/api/product/detail', controller.product.detail);

  /* 订单相关 */
  router.post('/api/order/create', userRole, controller.order.create); // 创建订单
  router.get('/api/order/list', userRole, controller.order.list); // 订单列表

  /* 用户资料相关 */
  router.get('/api/user/info', userRole, controller.user.info);
};
