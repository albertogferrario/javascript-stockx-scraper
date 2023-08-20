// eslint-disable-next-line import/no-extraneous-dependencies
const cheerio = require('cheerio');

module.exports = class Entity {
  constructor(client) {
    this.client = client;
  }

  static parseResponse = (response) => {
    const $ = cheerio.load(response.data);
    let data = $('script#__NEXT_DATA__').text();

    if (!data) {
      data = $('script[data-name=query]').text();
    }

    return JSON.parse(data).props.pageProps.req.appContext.states.query.value
      .queries[3].state;
  };
};
