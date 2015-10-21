import React from 'react';
import { Component } from 'react';

import styles from './styles.scss';

export default class Prompt extends Component {

  static propTypes = {
    run: React.PropTypes.func.isRequired
  }

  onKeyPress = (event) => {
    if (event.which === 13) { // Enter
      this.props.run(this.refs.input.value);
      this.refs.input.value = '';
    }
  }

  render() {
    return (
      <div className={styles.prompt}>
        <div className={styles.prefix}>></div>
        <input ref="input" type="text" autoFocus={true} onKeyPress={this.onKeyPress} />
      </div>
    );
  }
}
