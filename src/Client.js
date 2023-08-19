import { Axios } from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

export default class Client extends Axios {
  constructor(baseURL, proxy = undefined) {
    const args = {
      baseURL,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
      },
    };

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
}
