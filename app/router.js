'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/login', controller.passport.login);
  router.post('/api/logout', controller.passport.logout);
  router.get('/api/product/list', controller.product.list);
  router.get('/api/product/detail', controller.product.detail);
};
