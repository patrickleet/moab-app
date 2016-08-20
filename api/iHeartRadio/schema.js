import { property } from 'lodash';

export const schema = [`
type Artist {
  artistName: String!
  artistId: Int!
}
`];

export const resolvers = {
  Artist: {}
};
