# Ninsaki

[![Greenkeeper badge](https://badges.greenkeeper.io/patrickleet/moab-app.svg?token=449f10cfd40b47927dc4ff423a8a65d03ff33b25491d1318c1b11baa51313b43&ts=1520715073612)](https://greenkeeper.io/)

Demonstrates:

1. GraphQL schema, resolvers, models, and connectors to read from iHeartRadio REST API
2. Web server using Express, with SSR
3. React app with Redux, React Router, and Apollo Client

## Running the app

### 1. Install Node/npm

Make sure you have Node.js installed (the app has been tested with Node `6.3.1`)

### 2. Install dependencies

```
npm install
```

### 3. Run the app

```
npm start
```

- Open the client at http://localhost:3000

#### Apollo Server

The server will run on port 3010, but the Webpack dev server proxies it to 3000. You can access the server's GraphiQL UI at <http://localhost:3000/graphiql>.

Try entering the following query and variables!

```
  query Artists($keywords: String!, $offset: Int, $limit: Int) {
    artists(keywords: $keywords, offset: $offset, limit: $limit) {
      artistName
      artistId
    }
  }
```

```
{
  "keywords": "Taylor",
  "offset": 0,
  "limit": 10
}
```

## Technology choices

- Apollo server - graphql server
- Apollo client - graphql client
- GraphiQL - interactive graphql query ui
- React - view layer
- React router - router for react (only has one route currently)
- Webpack - bundler
- Babel - enables es6 as well as es7 decorators
- Redux - flux implementation
- Fela.js - styling

## Build production bundle

```
npm run build
```
