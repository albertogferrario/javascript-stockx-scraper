const { Axios } = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');

module.exports = class Client extends Axios {
  constructor(baseURL, cookies = undefined, proxy = undefined) {
    const args = {
      baseURL,
      headers: {
        Host: (new URL(baseURL)).host,
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'max-age=0',
      },
    };

    if (cookies) {
      args.headers.Cookie = Client.makeCookiesString(cookies);
    }

    if (proxy) {
      args.httpsAgent = new HttpsProxyAgent({
        host: proxy.host,
        port: proxy.port,
        username: proxy.username,
        password: proxy.password,
      });
    }

    super(args);
  }

  async get(url, config) {
    const response = await super.get(url, config);

    if (response.status !== 200) {
      throw Error(`Request error, status code: ${response.status}`);
    }

    return response;
  }

  static makeCookiesString = (cookiesObject) => {
    let result = '';

    Object.keys(cookiesObject).forEach((key) => {
      result += `${key}=${cookiesObject[key]}; `;
    });

    return result;
  };
};
