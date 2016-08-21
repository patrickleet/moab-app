import querystring from 'querystring';
import log from 'llog';

export class Artists {
  constructor({ connector }) {
    this.connector = connector;
  }

  search(keywords) {
    const query = {
      keywords,
      queryTrack: false,
      queryBundle: false,
      queryArtist: true,
      queryStation: false,
      queryFeaturedStation: false,
      queryTalkShow: false,
      queryTalkTheme: false,
      queryKeyword: false,
      countryCode: 'US',
    };
    log.info('Searching for artists by keywords', { keywords });
    return this.connector.get(`/catalog/searchAll?${querystring.stringify(query)}`);
  }
}
