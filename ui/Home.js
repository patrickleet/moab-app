import React, {Component} from 'react';
import Intro from './Intro';
import Artists from './Artists';
import {connect} from 'react-redux';

// TODO:
// should probaly refactor connect to a container,
// and put that in Layout

@connect(mapStateToProps)
export default class Home extends Component {
  render() {
    const {
      dispatch,
      keywords
    } = this.props;

    return (
      <div>
        <Intro dispatch={dispatch}/>
        <Artists keywords={keywords}/>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    keywords: state.search.keywords
  };
}
