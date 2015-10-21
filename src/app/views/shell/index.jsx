import Prompt from './prompt';
import React from 'react';
import styles from './styles.scss';
import { Component } from 'react';
import { connect } from 'react-redux';

import {
  runCmd,
  loadInitOutput
} from '../../actions';

class Shell extends Component {
  constructor(props) {
    super(props);
    this.init = false;
  }

  static fetchData(getState, dispatch, location, params) {
    return new Promise((resolve) => {
      dispatch(loadInitOutput());
      resolve()
    });
  }

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

function mapStateToProps(state) {
  const { output } = state;
  return {
    output
  };
}

export default connect(mapStateToProps, {
  runCmd,
  loadInitOutput
})(Shell);
