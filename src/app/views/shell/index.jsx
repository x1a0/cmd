import Prompt from './prompt';
import React from 'react';
import styles from './styles.scss';
import { Component } from 'react';
import { connect } from 'react-redux';
import { runCmd } from '../../actions';

class Shell extends Component {

  render() {
    const { output } = this.props;

    return (
      <div className={styles.shellWrapper}>
        <div className={styles.shell}>
          <div className={styles.output}>
            {output.map(function(line, i) {
              return <pre className={styles.line} key={i}>{line}</pre>;
            })}
          </div>
          <Prompt run={this.run} />
        </div>
      </div>
    );
  }

  run = (input) => {
    this.props.runCmd(input);
  }
}

export default connect(
  state => {
    const { output } = state;
    return {
      output
    };
  },
  { runCmd }
)(Shell);
