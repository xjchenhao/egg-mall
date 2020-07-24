'use strict';
const Controller = require('../core/baseController');

class ProductController extends Controller {
  // 产品详情
  async detail() {
    const { ctx } = this;
    const { id } = ctx.query;

    const result = await ctx.model.Product.findById(id);

    this.success({
      ...result.toJSON(),
    });
  }

  // 商品列表
  async list() {
    const { ctx } = this;
    const { currentPage, pageSize } = ctx.query;

    const filteredQuery = ctx.helper.filterObjectEmptyValue({});

    const result = await ctx.model.Product
      .find({
        ...filteredQuery,
        state: 1,
      })
      .sort({
        createTime: -1,
      })
      .skip((Number(currentPage) - 1) * Number(pageSize))
      .limit(Number(pageSize))
      .exec();

    const pageTotalCount = await ctx.model.Product
      .find(filteredQuery).countDocuments();

    this.success(this.ctx.helper.formatPaging({
      resultList: result,
      totalLength: pageTotalCount,
      pageSize,
      currentPage,
    }));
  }
}

module.exports = ProductController;
