import React from 'react';
import { connect } from 'react-redux';

import styles from './styles.scss';

class Output extends React.Component {

  static propTypes = {
    lines: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  }

  render() {
    const { lines } = this.props;

    return (
      <div className={styles.output}>
        {lines.map(function(line, i) {
          return <pre className={styles.line} key={i}>{line}</pre>;
        })}
      </div>
    );
  }
}

const state2Props = (state) => {
  return {
    lines: state.output
  };
};

export default connect(
  state2Props
)(Output);
