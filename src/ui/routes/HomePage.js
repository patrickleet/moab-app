import React, { Component } from 'react';
import Intro from '../components/Intro';
import Artists from '../components/Artists';
import { connect } from 'react-redux';

// TODO:
// should probaly refactor connect to a container,
// and put that in Layout

@connect(mapStateToProps)
export default class HomePage extends Component {
  render() {
    const {
      dispatch,
      keywords,
    } = this.props

    return (
      <div>
        <Intro dispatch={dispatch} keywords={keywords} />
        <Artists keywords={keywords} />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const location = props.location

  return {
    keywords: state.search.keywords || location.query.keywords
  }
}
