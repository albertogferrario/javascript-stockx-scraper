const Entity = require('../Entity');

module.exports = class Product extends Entity {
  static parseResponse = (response) => super.parseResponse(response, 'GetProduct');

  get = async (productSlug) => Product.parseResponse(await this.client.get(`/${productSlug}`)).data
    .product;
};
