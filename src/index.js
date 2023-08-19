import { Product } from './entities';
import Client from './Client';

export default class StockXScraper {
  constructor(proxy = undefined) {
    const client = new Client('https://stockx.com', proxy);

    this.products = new Product(client);
  }
}
