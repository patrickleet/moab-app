import React, { Component } from 'react';
import { connect } from 'react-fela';
import autobind from 'autobind-decorator';
import { search } from '../../redux/search';
import DebounceInput from 'react-debounce-input';

class Search extends Component {

  @autobind
  onChange(event) {
    const { dispatch } = this.props
    dispatch(search(event.target.value))
  }

  render() {
    const { styles, keywords } = this.props

    return (
      <DebounceInput
        className={styles.input}
        type="text"
        placeholder="Search for artists..."
        minLength={1}
        debounceTimeout={300}
        onChange={this.onChange}
        value={keywords}
      />
    );
  }
}

const input = props => ({
  background: 'rgba(255,255,255,.1)',
  color: '#fff',
  fontSize: '2em',
  border: '1px solid rgba(255,255,255,.75)',
  borderRadius: 10,
  padding: '.1em .25em',
  textAlign: 'center',
  fontWeight: 200,
});

const mapStylesToProps = props => renderer => ({
  input: renderer.renderRule(input),
});

export default connect(mapStylesToProps)(Search);
