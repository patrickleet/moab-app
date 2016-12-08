/* eslint-disable react/no-danger */

import React, { PropTypes } from 'react';

// XXX: production setup?
const basePort = process.env.PORT || 3000;
const scriptUrl = `http://localhost:${basePort + 20}/build/bundle.js`;

const Html = ({ assets, content, state, css, fonts }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style id="stylesheet" dangerouslySetInnerHTML={{ __html: css.replace(" ", '') }}></style>
      <style id="font-stylesheet" dangerouslySetInnerHTML={{ __html: fonts }}></style>
      <title>Ninsaki SSR</title>
    </head>
    <body>
      <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
      <script
        dangerouslySetInnerHTML={{ __html: `window.__APOLLO_STATE__=${JSON.stringify(state)};` }}
        charSet="UTF-8"
      />
      <script src={scriptUrl} charSet="UTF-8" />
    </body>
  </html>
);

Html.propTypes = {
  assets: PropTypes.object,
  content: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default Html;