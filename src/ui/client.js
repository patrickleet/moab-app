// React
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

// Apollo Client
import { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Client } from 'subscriptions-transport-ws';

import * as ReactGA from 'react-ga';

// Fela.js styling
import { Provider as StyleProvider } from 'react-fela';
import createRenderer from './renderer';

// Redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import search from '../redux/search';

// Polyfill fetch
import 'isomorphic-fetch';

// A Routes file is a good shared entry-point between client and server
import routes from './routes'
import createApolloClient from './helpers/create-apollo-client';
import addGraphQLSubscriptions from './helpers/subscriptions';

const wsClient = new Client('ws://localhost:8080');
// configure fela.js
const mountNode = document.getElementById('stylesheet');
const fontMountNode = document.getElementById('font-stylesheet');
const renderer = createRenderer(fontMountNode);

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
  transportBatching: true,
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

// Initialize Analytics
ReactGA.initialize('XXX');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

// Initialize ApolloClient
const client = createApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  initialState: window.__APOLLO_STATE__, // eslint-disable-line no-underscore-dangle
  ssrForceFetchDelay: 100,
});

// use combine reducers to integrate apollo with other reducers and hook up redux dev tools
const store = createStore(
  combineReducers({
    routing: routerReducer,
    apollo: client.reducer(),
    search,
  }),
  compose(
    applyMiddleware(client.middleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// Render
render((
  <StyleProvider renderer={renderer} mountNode={mountNode}>
    <ApolloProvider store={store} client={client}>

        <Router history={history} onUpdate={logPageView}>
          {routes}
        </Router>

    </ApolloProvider>
  </StyleProvider>
), document.getElementById('content'));