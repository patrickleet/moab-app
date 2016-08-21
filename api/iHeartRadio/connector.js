import request from 'request';
import promisify from 'es6-promisify';

const pRequest = promisify(request);
const I_HEART_RADIO_API_ROOT = 'http://api-3283.iheart.com/api/v1';

export class IHeartRadioConnector {
  async get(path) {
    const options = {
      method: 'GET',
      url: I_HEART_RADIO_API_ROOT + path,
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      json: true,
    };
    const result = await pRequest(options);

    return result.body.artists || [];
  }
}
