import { merge } from 'lodash';
import { schema as iHeartRadioSchema, resolvers as iHeartRadioResolvers } from './iHeartRadio/schema';
import log from 'llog';

const rootSchema = [`
type Query {
  artists(keywords: String, offset: Int, limit: Int): [Artist]
}

schema {
  query: Query
}
`];

const rootResolvers = {
  Query: {
    artists(_, {keywords, offset, limit}, context) {
      const protectedLimit = (limit < 1 || limit > 10) ? 10 : limit;
      return context.Artists.search(keywords, offset, limit);
    }
  }
};

export const schema = [...rootSchema, ...iHeartRadioSchema];
export const resolvers = merge(rootResolvers, iHeartRadioResolvers);
