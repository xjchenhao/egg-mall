'use strict';

module.exports = () => {
  return async function apiLogger(ctx, next) {
    const reqData = {
      url: ctx.req.url,
      method: ctx.req.method,
      query: ctx.req.query,
      body: ctx.req.body,
      user: ctx.req.user,
    };


    ctx.logger.info('request:\n', reqData);

    await next();

    const resData = {
      statusCode: ctx.res.statusCode,
      result: JSON.stringify(ctx.body),
    };

    ctx.logger.info('response:\n', resData);
  };
};
