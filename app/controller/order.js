'use strict';
const Controller = require('./../core/baseController');

class OrderController extends Controller {

  // 创建订单
  async create() {
    const { ctx } = this;
    const { productId } = ctx.request.body;
    const { id: userId } = ctx.user;

    const createRule = {
      productId: 'string',
    };

    try {
      ctx.validate(createRule);
    } catch (err) {
      this.validateError(err);

      return;
    }

    const productData = await ctx.model.Product.findById(productId);

    if (!productData) {
      this.failure({
        code: '-1',
        msg: '不存在的产品id',
        data: {},
      });

      return;
    }

    if (productData.quantity === 0) {
      this.failure({
        code: '-2',
        msg: 'sorry，已售罄',
        data: {},
      });

      return;
    }


    const result = await Promise.all([
      ctx.model.Order.create({
        user: userId,
        product: productId,
        amount: productData.unifiedPrice,
      }),
      ctx.model.Product.findByIdAndUpdate(productId, {
        $inc: {
          quantity: -1,
          salesVolume: 1,
        },
      }),
    ]);

    ctx.logger.debug('创建订单结果：', result);

    this.success();
  }

  // 订单列表
  async list() {
    const { ctx } = this;
    const { id: userId } = ctx.user;

    const result = await ctx.model.Order.find({
      user: userId,
    }).populate('product');

    this.success({
      list: result,
    });
  }
}

module.exports = OrderController;
