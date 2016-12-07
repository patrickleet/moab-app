import React from 'react';
import Footer from '../components/Footer';

function Layout({ children, params, location }) {
  return (
    <div>
      <div>
        {children}
      </div>
      <Footer company="RateBeer" backgroundColor="#000" />
    </div>
  );
}

Layout.propTypes = {
  location: React.PropTypes.object,
  params: React.PropTypes.object,
  children: React.PropTypes.element,
};

export default Layout;
