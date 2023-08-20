import Entity from '../Entity';

export default class Product extends Entity {
  static parseResponse = (response) => super.parseResponse(response);

  get = async (productSlug) => Product.parseResponse(await this.client.get(`/${productSlug}`)).data.product;
}
