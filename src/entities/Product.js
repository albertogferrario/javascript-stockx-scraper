import Entity from '../Entity';

export default class Product extends Entity {
  static parseResponse = (response) => super.parseResponse(response).data.product.variants;

  getVariants = async (productSlug) => Product.parseResponse(await this.client.get(`/${productSlug}`));
}
