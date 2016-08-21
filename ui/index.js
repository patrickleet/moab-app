// React
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Apollo Client
import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

// Fela.js styling
import { Provider as StyleProvider } from 'react-fela';
import createRenderer from './renderer';

// Redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import search from '../redux/search';

// Polyfill fetch
import 'whatwg-fetch';

// Views
import Layout from './Layout';
import Home from './Home';

// configure fela.js
const mountNode = document.getElementById('stylesheet');
const fontMountNode = document.getElementById('font-stylesheet');
const renderer = createRenderer(fontMountNode);

// Initialize ApolloClient
const client = new ApolloClient({
  networkInterface: createNetworkInterface('/graphql'),
  queryTransformer: addTypename,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) { // eslint-disable-line no-underscore-dangle
      return result.__typename + result.id; // eslint-disable-line no-underscore-dangle
    }
    return null;
  },
  shouldBatch: true,
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

        <Router history={history}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Home} />
          </Route>
        </Router>

    </ApolloProvider>
  </StyleProvider>
), document.getElementById('root'));
