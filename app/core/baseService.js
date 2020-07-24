'use strict';

const { Service } = require('egg');
class BaseService extends Service {
  async proxy(url, opts, isDeepResult = true) {
    const { ctx } = this;
    let proxyResult = '';

    proxyResult = await ctx.curl(url, {
      dataType: 'json',

      // // 创建连接超时 3 秒，接收响应超时 5 秒
      // timeout: [ 3000, 5000 ],
      ...opts,
    });

    ctx.logger.info(`\n proxy => ${url}`, '\n', {
      req: {
        dataType: 'json',
        ...opts,
      },
      res: proxyResult,
      result: proxyResult.data,
    });

    if (proxyResult.status < 200 || proxyResult.status >= 300) {
      throw (proxyResult.data);
    }

    // 除了返回基本需要的data，具体的接口返回信息隐藏在原型链中。
    const result = (isDeepResult ? proxyResult.data.data : proxyResult.data) || {};
    return Object.defineProperties(result, {
      code: {
        value: proxyResult.data.code,
      },
      msg: {
        value: proxyResult.data.msg,
      },
    });
  }
}
module.exports = BaseService;
