import React from 'react';
import { connect } from 'react-fela';

const Footer = ({ company, styles }) => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.text}>© {company}</span>
      </div>
    </div>
  );
};

const footer = props => ({
  background: props.backgroundColor,
  color: '#fff',
});

const container = props => ({
  margin: '0 auto',
  padding: '20px 15px',
  maxWidth: '90vw',
  textAlign: 'center',
});

const text = props => ({
  color: '#fff',
});

// We use both the components props and
// the renderer to compose our classNames
const mapStylesToProps = props => renderer => ({
  footer: renderer.renderRule(footer, {
    backgroundColor: props.backgroundColor,
  }),
  container: renderer.renderRule(container),
  text: renderer.renderRule(text),
});

export default connect(mapStylesToProps)(Footer);
