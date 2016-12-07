// Express
import Express from 'express';

// React
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RouterContext } from 'react-router';

// Apollo 
import { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { renderToStringWithData } from 'react-apollo/server'

// Fela.js styling
import { Provider as StyleProvider } from 'react-fela';
import createRenderer from './renderer';

// Redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import search from '../redux/search';

// Proxy
import path from 'path';
import 'isomorphic-fetch';
import proxy from 'http-proxy-middleware';

import routes from './routes';
import Html from './routes/Html';
import createApolloClient from './helpers/create-apollo-client';

const basePort = process.env.PORT || 3000;
const apiHost = `http://localhost:${basePort + 10}`;
const apiUrl = `${apiHost}/graphql`;

export default function(parameters) {

  const app = new Express();
  app.use(express.static(path.join(__dirname, '../../', 'build/assets')))

  const apiProxy = proxy({ target: apiHost });
  app.use('/graphql', apiProxy);
  app.use('/graphiql', apiProxy);

  app.use((req, res) => {
    
    match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', error); // eslint-disable-line no-console
        res.status(500);
      } else if (renderProps) {
        
        const client = createApolloClient({
          ssrMode: true,
          networkInterface: createNetworkInterface({
            uri: apiUrl,
            opts: {
              credentials: 'same-origin',
              // transfer request headers to networkInterface so that they're
              // accessible to proxy server
              // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
              headers: req.headers,
            },
          })
        });

        // use combine reducers to integrate apollo with other reducers and hook up redux dev tools
        const store = createStore(
          combineReducers({
            routing: routerReducer,
            apollo: client.reducer(),
            search,
          }),
          compose(
            applyMiddleware(client.middleware())
          )
        );

        const renderer = createRenderer();

        const app = (
          <StyleProvider renderer={renderer}>
            <ApolloProvider store={store} client={client}>
              <RouterContext {...renderProps} />
            </ApolloProvider>
          </StyleProvider>
        );

        // rendering code
        renderToStringWithData(app)
          .then((content) => {

            if (_development_)
            {
              webpack_isomorphic_tools.refresh()
            }

            const initialState = client.store.getState()[client.reduxRootKey].data;

            const appCSS = renderer.renderToString();
            const appFonts = renderer.fontRenderer.renderToString();

            const html = (<Html 
              assets={webpack_isomorphic_tools.assets()}
              content={content} 
              state={{ apollo: { initialState } }}
              css={appCSS}
              fonts={appFonts}
            />);

            res.status(200);

            let appHTML = ReactDOM.renderToStaticMarkup(html);
          
            res.send(`<!doctype html>\n${appHTML}`);
            res.end();
          })
          .catch(e => console.error('RENDERING ERROR:', e)); // eslint-disable-line no-console
      } else {
        res.status(404).send('Not Found');
      }
    });
  });

  app.listen(basePort, () => console.log( // eslint-disable-line no-console
    `App Server is now running on http://localhost:${basePort}`
  ));

}