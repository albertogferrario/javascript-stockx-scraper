const { Product } = require('./entities');
const Client = require('./Client');

module.exports = class StockXScraper {
  constructor(
    region = 'gb',
    locale = 'en',
    currency = 'eur',
    proxy = undefined,
  ) {
    const client = new Client(
      'https://stockx.com',
      {
        language_code: locale.toLowerCase(),
        stockx_selected_currency: currency.toUpperCase(),
        stockx_selected_locale: locale.toLowerCase(),
        stockx_selected_region: region.toUpperCase(),
      },
      proxy,
    );

    this.products = new Product(client);
  }
};
