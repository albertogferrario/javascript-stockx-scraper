// eslint-disable-next-line import/no-extraneous-dependencies
const cheerio = require('cheerio');

module.exports = class Entity {
  constructor(client) {
    this.client = client;
  }

  static parseResponse = (response, queryKey) => {
    const $ = cheerio.load(response.data);
    let data = $('script#__NEXT_DATA__').text();

    if (!data) {
      data = $('script[data-name=query]').text();
    }

    const { queries } = JSON.parse(data).props.pageProps.req.appContext.states.query.value;

    for (let i = 0; i < queries.length; i += 1) {
      const query = queries[i];

      if (query.queryKey[0] === queryKey) {
        return query.state;
      }
    }

    throw new Error();
  };
};
