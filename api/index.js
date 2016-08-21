import express from 'express';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { schema, resolvers } from './schema';
import { IHeartRadioConnector } from './iHeartRadio/connector';
import { Artists } from './iHeartRadio/models';

dotenv.config({ silent: true });
let PORT = 3010;

if (process.env.PORT) {
  PORT = parseInt(process.env.PORT, 10) + 100;
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('dist'));

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

app.use('/graphql', apolloExpress((req) => {
  // Get the query, the same way express-graphql does it
  // https://github.com/graphql/express-graphql/blob/3fa6e68582d6d933d37fa9e841da5d2aa39261cd/src/index.js#L257
  const query = req.query.query || req.body.query;
  if (query && query.length > 2000) {
    // None of our app's queries are this long
    // Probably indicates someone trying to send an overly expensive query
    throw new Error('Query too large.');
  }

  const iHeartRadioConnector = new IHeartRadioConnector();

  return {
    schema: executableSchema,
    context: {
      Artists: new Artists({ connector: iHeartRadioConnector }),
    },
  };
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => console.log( // eslint-disable-line no-console
  `Server is now running on http://localhost:${PORT}`
));
